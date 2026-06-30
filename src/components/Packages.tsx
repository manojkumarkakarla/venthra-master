import { Check, ShieldCheck, Database, Rocket, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

const packages = [
    {
        title: "Starter Launch",
        subtitle: "Quick Digital Entry",
        price: "₹6,499",
        category: "Landing Page",
        bestFor: "Individuals needing a digital business card or simple landing page.",
        features: [
            "Single Page Landing",
            "Mobile Friendly",
            "WhatsApp & Call Buttons",
            "Hosting Included",
            "Basic Contact Info"
        ],
        icon: Rocket,
        popular: false,
        color: "teal"
    },
    {
        title: "Startup Spark",
        subtitle: "The Aesthetic Entry",
        price: "₹11,999",
        category: "Basic Presence",
        bestFor: "Small businesses & portfolios needing a simple online card.",
        features: [
            "1 Year Free Hosting",
            "2-3 Pages Website",
            "Mobile Responsive Design",
            "Contact Form",
            "Social Media Links"
        ],
        icon: Rocket,
        popular: false,
        color: "blue"
    },
    {
        title: "Business Pro",
        subtitle: "The Growth Engine",
        price: "₹20,999",
        category: "Professional Website",
        bestFor: "Companies needing a complete multi-page website.",
        features: [
            "Everything in Startup Spark",
            "Up to 5 Pages",
            "Premium Animations",
            "Basic SEO Setup",
            "Fast Loading Speed",
            "Image Gallery"
        ],
        icon: Zap,
        popular: true,
        color: "purple"
    },
    {
        title: "Growth System",
        subtitle: "The Smart Backend",
        price: "₹29,999",
        category: "Dynamic Application",
        bestFor: "Businesses needing user logins and data management.",
        features: [
            "Custom Database",
            "Admin Dashboard",
            "User Login System",
            "Payment Integration",
            "Product/Service Management",
            "Search & Filter"
        ],
        icon: Database,
        popular: true,
        color: "indigo"
    },
    {
        title: "Enterprise Logic",
        subtitle: "The Full Stack Master",
        price: "₹39,999",
        category: "Full Stack Solution",
        bestFor: "Large scale operations needing automation and complex logic.",
        features: [
            "Billing & Receipt Engine",
            "Payment Integration",
            "Role-Based Admin Access",
            "REST API Integration",
            "Real-time Data Visualization",
            "Daily Automated Backups"
        ],
        icon: ShieldCheck,
        popular: false,
        color: "pink"
    },
    {
        title: "Ultimate Scale",
        subtitle: "The Custom Ecosystem",
        price: "₹54,999",
        category: "Enterprise Solution",
        bestFor: "Complex platforms with AI, mobile apps, and high scalability.",
        features: [
            "Everything in Enterprise",
            "Payment Integration",
            "Advanced AI Chatbot",
            "Mobile Web App (Android/iOS)",
            "AI/ML Model Integration",
            "Dedicated DevOps Support"
        ],
        icon: Globe,
        popular: false,
        color: "cyan"
    }
];

const Packages = () => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<{ title: string; price: string } | null>(null);

    const handleSelectPackage = (pkg: typeof packages[0]) => {
        setSelectedPackage(pkg);
        setIsPaymentModalOpen(true);
    };
    return (
        <section id="packages" className="pt-4 pb-8 px-2 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-sm font-semibold mb-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                        Venthra Solutions Pricing
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Growth Engine</span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                        Transparent pricing packages designed to scale with your ambition.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 max-w-7xl mx-auto items-stretch">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className="relative group h-full transition-all duration-300 hover:-translate-y-1"
                        >
                            {pkg.popular && (
                                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-blue-900 to-blue-800 text-white text-[9px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-lg z-30 whitespace-nowrap">
                                    Popular
                                </div>
                            )}

                            <div
                                className={`relative h-full flex flex-col p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-shadow duration-300 hover:shadow-2xl overflow-hidden min-h-[380px] sm:min-h-0 ${pkg.popular
                                    ? "bg-white text-slate-900 border-blue-900 shadow-xl"
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700"
                                    }`}
                            >
                                {/* Animated Background Curtain */}
                                <div className="absolute top-0 left-0 w-full h-0 bg-blue-950 group-hover:h-full transition-all duration-500 ease-in-out z-0" />

                                {/* Content Wrapper */}
                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Header - Compact */}
                                    <div className="mb-3 sm:mb-6 flex flex-col items-start px-0.5">
                                        <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white ${pkg.popular ? "bg-blue-100 text-blue-900" : "bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
                                            }`}>
                                            <pkg.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                                        </div>
                                        <h3 className={`text-sm sm:text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-white mb-0.5 ${pkg.popular ? "text-slate-900" : "text-slate-900 dark:text-white"}`}>
                                            {pkg.title}
                                        </h3>
                                        <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-tighter opacity-70 transition-colors duration-300 group-hover:text-slate-300 ${pkg.popular ? "text-blue-900" : "text-slate-500 dark:text-slate-400"
                                            }`}>
                                            {pkg.subtitle}
                                        </p>
                                    </div>

                                    {/* Price area */}
                                    <div className="mb-3 sm:mb-6 pb-2 sm:pb-4 border-b border-dashed border-slate-200 dark:border-slate-700/50 group-hover:border-slate-700">
                                        <div className="flex items-baseline gap-0.5">
                                            <span className={`text-lg sm:text-3xl font-black transition-colors duration-300 group-hover:text-white ${pkg.popular ? "text-slate-900" : "text-slate-900 dark:text-white"}`}>
                                                {pkg.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Features - All Visible but small */}
                                    <ul className="space-y-2 sm:space-y-2 mb-4 sm:mb-8 flex-grow">
                                        {pkg.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-1.5 sm:gap-3 text-[10px] sm:text-sm">
                                                <div className={`w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 rounded-full mt-1 flex-shrink-0 transition-colors duration-300 group-hover:bg-blue-400 ${pkg.popular ? "bg-blue-900" : "bg-blue-600 dark:bg-blue-400"
                                                    }`} />
                                                <span className={`transition-colors duration-300 group-hover:text-slate-200 ${pkg.popular ? "text-slate-700" : "text-slate-600 dark:text-slate-300"} line-clamp-2 leading-tight`}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Footer Info & Small Button */}
                                    <div className="mt-auto space-y-3">
                                        <p className={`text-[9px] sm:text-xs leading-none italic opacity-80 text-center transition-colors duration-300 group-hover:text-slate-400 ${pkg.popular ? "text-slate-600" : "text-slate-500 dark:text-slate-400"}`}>
                                            {pkg.bestFor.split(' ').slice(0, 6).join(' ')}...
                                        </p>
                                        <Button className={`w-full py-2 sm:py-3.5 h-auto rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black transition-all ${pkg.popular
                                            ? "bg-slate-900 hover:bg-black text-white shadow-lg border-none hover:scale-[1.02]"
                                            : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 group-hover:bg-white group-hover:text-slate-900"
                                            }`}
                                            onClick={() => handleSelectPackage(pkg)}
                                        >
                                            CLICK TO BUY
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-8 text-center">
                    <p className="inline-flex flex-col sm:flex-row items-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            Need a Mobile App?
                        </span>
                        <span className="text-slate-900 dark:text-white font-bold text-lg">
                            Add Play Store App for just +₹6,000
                        </span>
                    </p>
                </div>

                <PaymentModal
                    open={isPaymentModalOpen}
                    onOpenChange={setIsPaymentModalOpen}
                    pkg={selectedPackage}
                />
            </div>
        </section>
    );
};

export default Packages;
