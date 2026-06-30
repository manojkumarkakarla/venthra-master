import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";

const faqs = [
    {
        question: "What services does Venthra Solutions provide?",
        answer: "We specialize in creating premium, high-performance websites for various industries including Hospitality, Real Estate, Healthcare, Education, and more. We offer end-to-end solutions from design to deployment."
    },
    {
        question: "How long does it take to build a website?",
        answer: "Most of our standard projects are completed within 2-4 weeks. Larger, more complex custom applications may take 6-8 weeks depending on the specific requirements and features."
    },
    {
        question: "Do you provide hosting and domain names?",
        answer: "Yes! All our packages include 1 year of free hosting and a domain name. We handle all the technical setup so you can focus on your business."
    },
    {
        question: "Will my website look good on mobile devices?",
        answer: "Absolutely. We follow a mobile-first approach, ensuring your website is fully responsive and looks stunning on phones, tablets, laptops, and desktops."
    },
    {
        question: "Can I update the website content myself?",
        answer: "Yes, we can integrate a Content Management System (CMS) that allows you to easily update text, images, and other content without needing any technical skills."
    },
    {
        question: "Do you offer support after the website is launched?",
        answer: "Yes, we offer ongoing support and maintenance packages to keep your website secure, up-to-date, and running smoothly."
    }
];

const FAQ = () => {
    return (
        <section id="faq" className="relative py-24 sm:py-32 overflow-hidden bg-[#f8fafc] dark:bg-slate-950">
            {/* Dynamic Animated Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">

                
                {/* Micro Grid */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="container mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 sm:mb-20">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                        Frequently Asked <br className="hidden sm:block" />
                        <span className="relative inline-block mt-2">
                            <span className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-blue-600/20 blur-xl rounded-full animate-pulse" />
                            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600">Questions</span>
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Everything you need to know about our services, process, and how we bring your vision to life.
                    </p>
                </div>

                {/* FAQ Cards */}
                <div className="relative">
                    {/* Decorative side element */}
                    <div className="hidden lg:block absolute -left-12 top-10 w-24 h-24 bg-gradient-to-br from-teal-400 to-blue-500 rounded-3xl -rotate-12 blur-2xl opacity-20 animate-pulse" />
                    
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="group border border-slate-200/60 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 rounded-2xl px-6 sm:px-8 py-2 shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_-10px_rgba(20,184,166,0.15)] transition-all duration-300 data-[state=open]:bg-white dark:data-[state=open]:bg-slate-900 data-[state=open]:shadow-lg data-[state=open]:border-teal-200/80 dark:data-[state=open]:border-teal-900/50"
                            >
                                <AccordionTrigger className="hover:no-underline py-4 sm:py-5 text-left transition-all">
                                    <div className="flex items-center gap-4 text-left w-full pr-4">
                                        <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center shrink-0 group-data-[state=open]:bg-gradient-to-r group-data-[state=open]:from-teal-400 group-data-[state=open]:to-blue-500 group-data-[state=open]:text-white text-teal-600 dark:text-teal-400 transition-all duration-300">
                                            <span className="font-bold text-sm">{index + 1}</span>
                                        </div>
                                        <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug group-data-[state=open]:text-teal-600 dark:group-data-[state=open]:text-teal-400 transition-colors">
                                            {faq.question}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed text-base pb-6 pl-12 pr-4">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
