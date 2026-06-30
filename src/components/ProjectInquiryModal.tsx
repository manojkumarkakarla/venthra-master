import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Check, Loader2, Send, ShoppingCart, Globe, Rocket, User, AppWindow, MoreHorizontal, ArrowRight, ArrowLeft, Sparkles, MessageSquare, Zap, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProjectInquiryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ProjectInquiryModal = ({ open, onOpenChange }: ProjectInquiryModalProps) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = 'var(--removed-body-scroll-bar-size)';
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [open]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        description: "",
    });

    const projectTypes = [
        { id: "E-commerce", label: "E-commerce", icon: <ShoppingCart className="w-5 h-5" /> },
        { id: "Corporate", label: "Corporate", icon: <Globe className="w-5 h-5" /> },
        { id: "Startup", label: "Startup MVP", icon: <Rocket className="w-5 h-5" /> },
        { id: "AI", label: "AI & ML", icon: <Zap className="w-5 h-5 text-yellow-500" /> },
        { id: "Mobile App", label: "Mobile App", icon: <Rocket className="w-5 h-5 text-blue-500" /> },
        { id: "UI/UX", label: "UI/UX Design", icon: <Sparkles className="w-5 h-5 text-purple-500" /> },
        { id: "Web App", label: "Web App", icon: <AppWindow className="w-5 h-5" /> },
        { id: "SAAS", label: "SAAS Platform", icon: <MessageSquare className="w-5 h-5" /> },
        { id: "Other", label: "Other", icon: <MoreHorizontal className="w-5 h-5" /> },
    ];

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.projectType) {
            toast({ variant: "destructive", title: "Selection Required", description: "Please select a project type." });
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setStep(3);
                setFormData({ name: "", email: "", phone: "", company: "", projectType: "", budget: "", timeline: "", description: "" });
            } else {
                throw new Error(data.message || 'Failed to send email');
            }
        } catch (error: any) {
            toast({ variant: "destructive", title: "Submission Failed", description: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        if (step === 1) {
            if (!formData.name || !formData.email || !formData.phone) {
                toast({ variant: "destructive", title: "Missing Information", description: "Please fill all required fields." });
                return;
            }
            setStep(2);
            // Wait for render then scroll
            setTimeout(() => {
                const scrollArea = document.getElementById('modal-scroll-root');
                if (scrollArea) scrollArea.scrollTop = 0;
            }, 10);
        }
    };

    const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => setStep(1), 300);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent 
                className="sm:max-w-[600px] w-[95%] p-0 overflow-hidden rounded-3xl border-none shadow-2xl bg-white z-[100000] [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
            >
                <div 
                    id="modal-scroll-root"
                    className="max-h-[85vh] overflow-y-auto overflow-x-hidden custom-scrollbar overscroll-contain relative"
                    onWheel={(e) => e.stopPropagation()}
                >
                    {/* Highly visible Close Button */}
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-[999] w-10 h-10 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors shadow-md border border-slate-200"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {step !== 3 && (
                        <div className="bg-gradient-to-br from-teal-50 via-slate-50 to-blue-50 px-6 py-10 sm:px-10 sm:py-12 relative overflow-hidden border-b border-slate-100">
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <Sparkles className="w-32 h-32 text-teal-500 rotate-12" />
                            </div>
                            <div className="relative z-10 flex items-center justify-between mt-2">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-white text-teal-700 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-teal-200 shadow-sm">
                                            Step {step} of 2
                                        </span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                                        {step === 1 ? "Start Your Project" : "Project Details"}
                                    </h2>
                                </div>
                                <div className="hidden sm:flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${step === 1 ? 'bg-gradient-to-br from-teal-400 to-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${step === 2 ? 'bg-gradient-to-br from-teal-400 to-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                                        <Zap className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="px-6 py-8 sm:px-10 sm:py-10 pb-20">
                        {step === 3 ? (
                            <div className="flex flex-col items-center justify-center text-center py-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <div className="relative mb-10">
                                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20 scale-150"></div>
                                    <div className="w-28 h-28 bg-gradient-to-br from-blue-900 to-blue-950 rounded-3xl flex items-center justify-center shadow-2xl rotate-3">
                                        <Check className="w-14 h-14 text-white -rotate-3" strokeWidth={4} />
                                    </div>
                                </div>
                                
                                <div className="space-y-4 mb-10">
                                    <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tighter uppercase italic leading-none">
                                        Strategy Phase Initiated
                                    </h2>
                                    <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
                                    <p className="text-slate-600 font-medium text-lg max-w-[340px] mx-auto leading-relaxed">
                                        Excellent choice, <span className="text-blue-900 font-bold">{formData.name || 'Visionary'}</span>. Your brief has been securely transmitted to our elite engineering team.
                                    </p>
                                </div>

                                <div className="w-full space-y-4 mb-10 text-left">
                                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4 items-start group hover:bg-white hover:border-blue-200 transition-all">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">1</div>
                                        <div>
                                            <h4 className="font-bold text-blue-950 text-sm">Brief Analysis</h4>
                                            <p className="text-xs text-slate-500">Our tech leads will analyze your requirements and feasibility.</p>
                                        </div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4 items-start group hover:bg-white hover:border-blue-200 transition-all">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">2</div>
                                        <div>
                                            <h4 className="font-bold text-blue-950 text-sm">Strategic Sync</h4>
                                            <p className="text-xs text-slate-500">We'll contact you at {formData.email} to discuss the roadmap.</p>
                                        </div>
                                    </div>
                                </div>

                                <Button 
                                    onClick={handleClose} 
                                    className="w-full h-16 bg-blue-950 hover:bg-black text-white font-black rounded-2xl text-xl shadow-2xl transition-all hover:-translate-y-1 active:scale-95 group"
                                >
                                    BACK TO HQ <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </Button>
                                
                                <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Venthra Solutions © 2026</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-600">Full Name</Label>
                                            <Input placeholder="e.g. Elon Musk" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required className="h-14 bg-white border border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-2xl px-6 text-base shadow-sm transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-600">Email</Label>
                                            <Input type="email" placeholder="hello@world.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required className="h-14 bg-white border border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-2xl px-6 text-base shadow-sm transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-600">Mobile</Label>
                                            <Input type="tel" placeholder="+91" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required className="h-14 bg-white border border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-2xl px-6 text-base shadow-sm transition-all" />
                                        </div>
                                        <Button type="button" onClick={nextStep} className="w-full h-14 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white rounded-2xl text-lg font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                                            Continue to Details <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-600">Project Type</Label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {projectTypes.map((type) => (
                                                    <button
                                                        key={type.id}
                                                        type="button"
                                                        onClick={() => handleChange("projectType", type.id)}
                                                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all h-24 ${
                                                            formData.projectType === type.id ? "border-teal-500 bg-teal-50 text-teal-700 shadow-sm" : "border-slate-100 bg-white hover:bg-slate-50 text-slate-500 hover:border-slate-200 shadow-sm"
                                                        }`}
                                                    >
                                                        {type.icon}
                                                        <span className="text-[11px] font-bold mt-2">{type.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-slate-600">Budget Range</Label>
                                                <Select value={formData.budget} onValueChange={(val) => handleChange("budget", val)}>
                                                    <SelectTrigger className="h-14 bg-white border border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-2xl px-6 font-medium text-slate-700 shadow-sm">
                                                        <SelectValue placeholder="Select Budget" />
                                                    </SelectTrigger>
                                                    <SelectContent className="z-[100001] bg-white border border-slate-100 shadow-xl rounded-2xl">
                                                        <SelectItem value="< 30k">Starter (Under ₹30k)</SelectItem>
                                                        <SelectItem value="30k-75k">Professional (₹30k - ₹75k)</SelectItem>
                                                        <SelectItem value="75k-1.5L">Premium (₹75k - ₹1.5L)</SelectItem>
                                                        <SelectItem value="1.5L-5L">Enterprise (₹1.5L - ₹5L)</SelectItem>
                                                        <SelectItem value="5L+">Custom Tier (₹5L+)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-slate-600">Timeline</Label>
                                                <Select value={formData.timeline} onValueChange={(val) => handleChange("timeline", val)}>
                                                    <SelectTrigger className="h-14 bg-white border border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-2xl px-6 font-medium text-slate-700 shadow-sm">
                                                        <SelectValue placeholder="Select Timeline" />
                                                    </SelectTrigger>
                                                    <SelectContent className="z-[100001] bg-white border border-slate-100 shadow-xl rounded-2xl">
                                                        <SelectItem value="Urgent">Rapid (2-4 Weeks)</SelectItem>
                                                        <SelectItem value="1-2 Months">Standard (1-2 Months)</SelectItem>
                                                        <SelectItem value="3+ Months">Enterprise (3+ Months)</SelectItem>
                                                        <SelectItem value="Flexible">Strategic / Flexible</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-600">Project Details</Label>
                                            <Textarea
                                                placeholder="Tell us about your project vision, features, and goals..."
                                                className="min-h-[140px] bg-white border border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-2xl p-6 text-base shadow-sm transition-all resize-none"
                                                value={formData.description}
                                                onChange={(e) => handleChange("description", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex gap-3 pt-2">
                                            <Button type="button" variant="outline" onClick={() => setStep(1)} className="h-14 px-6 font-bold rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">Back</Button>
                                            <Button type="submit" disabled={isSubmitting} className="h-14 flex-1 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white rounded-2xl text-lg font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                                                {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Inquiry"}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectInquiryModal;
