import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Check, Loader2, Send, ShoppingCart, Globe, Rocket, User, AppWindow, MoreHorizontal, ArrowRight, ArrowLeft, Sparkles, MessageSquare, Zap } from "lucide-react";
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
                className="sm:max-w-[600px] w-[95%] p-0 overflow-hidden rounded-3xl border-none shadow-2xl bg-white z-[100000]"
                onPointerDownOutside={(e) => e.preventDefault()}
            >
                <div 
                    id="modal-scroll-root"
                    className="max-h-[85vh] overflow-y-auto overflow-x-hidden custom-scrollbar overscroll-contain"
                    onWheel={(e) => e.stopPropagation()}
                >
                    {step !== 3 && (
                        <div className="bg-blue-950 px-6 py-10 sm:px-10 sm:py-12 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <Sparkles className="w-32 h-32 rotate-12" />
                            </div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-0.5 bg-blue-500/30 text-blue-200 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-blue-400/20">
                                            Phase {step}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                                        {step === 1 ? "Get Started" : "The Vision"}
                                    </h2>
                                </div>
                                <div className="hidden sm:flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${step === 1 ? 'bg-blue-500 text-white shadow-lg' : 'bg-blue-900/50 text-blue-400'}`}>
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${step === 2 ? 'bg-blue-500 text-white shadow-lg' : 'bg-blue-900/50 text-blue-400'}`}>
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
                                            <Label className="text-xs font-black uppercase tracking-widest text-blue-950">Full Name</Label>
                                            <Input placeholder="e.g. Elon Musk" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required className="h-14 bg-slate-50 border-2 rounded-2xl px-6 text-lg" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-black uppercase tracking-widest text-blue-950">Email</Label>
                                            <Input type="email" placeholder="hello@world.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required className="h-14 bg-slate-50 border-2 rounded-2xl px-6 text-lg" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-black uppercase tracking-widest text-blue-950">Mobile</Label>
                                            <Input type="tel" placeholder="+91" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required className="h-14 bg-slate-50 border-2 rounded-2xl px-6 text-lg" />
                                        </div>
                                        <Button type="button" onClick={nextStep} className="w-full h-16 bg-blue-600 text-white rounded-2xl text-xl font-black italic">CONTINUE <ArrowRight className="ml-2 w-6 h-6" /></Button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-10">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {projectTypes.map((type) => (
                                                <button
                                                    key={type.id}
                                                    type="button"
                                                    onClick={() => handleChange("projectType", type.id)}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-3xl border-4 transition-all h-28 ${
                                                        formData.projectType === type.id ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-50 bg-slate-50 text-slate-400"
                                                    }`}
                                                >
                                                    {type.icon}
                                                    <span className="text-[10px] font-black uppercase mt-2">{type.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Select value={formData.budget} onValueChange={(val) => handleChange("budget", val)}>
                                                <SelectTrigger className="h-14 bg-slate-50 border-2 rounded-2xl px-6 font-bold">
                                                    <SelectValue placeholder="Project Budget" />
                                                </SelectTrigger>
                                                <SelectContent className="z-[100001] bg-white border shadow-2xl rounded-2xl">
                                                    <SelectItem value="< 30k">Starter (Under ₹30k)</SelectItem>
                                                    <SelectItem value="30k-75k">Professional (₹30k - ₹75k)</SelectItem>
                                                    <SelectItem value="75k-1.5L">Premium (₹75k - ₹1.5L)</SelectItem>
                                                    <SelectItem value="1.5L-5L">Enterprise (₹1.5L - ₹5L)</SelectItem>
                                                    <SelectItem value="5L+">Custom Tier (₹5L+)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select value={formData.timeline} onValueChange={(val) => handleChange("timeline", val)}>
                                                <SelectTrigger className="h-14 bg-slate-50 border-2 rounded-2xl px-6 font-bold">
                                                    <SelectValue placeholder="Target Timeline" />
                                                </SelectTrigger>
                                                <SelectContent className="z-[100001] bg-white border shadow-2xl rounded-2xl">
                                                    <SelectItem value="Urgent">Rapid (2-4 Weeks)</SelectItem>
                                                    <SelectItem value="1-2 Months">Standard (1-2 Months)</SelectItem>
                                                    <SelectItem value="3+ Months">Enterprise (3+ Months)</SelectItem>
                                                    <SelectItem value="Flexible">Strategic / Flexible</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Textarea
                                            placeholder="Tell us about your project..."
                                            className="min-h-[160px] bg-slate-50 border-2 rounded-3xl p-6 text-lg"
                                            value={formData.description}
                                            onChange={(e) => handleChange("description", e.target.value)}
                                            required
                                        />
                                        <div className="flex gap-4">
                                            <Button type="button" variant="ghost" onClick={() => setStep(1)} className="h-16 flex-1 font-bold">Back</Button>
                                            <Button type="submit" disabled={isSubmitting} className="h-16 flex-[2] bg-blue-950 text-white rounded-2xl text-xl font-black italic">
                                                {isSubmitting ? <Loader2 className="animate-spin" /> : "LAUNCH"}
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
