import { useState, useRef, MouseEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustedBy from "@/components/TrustedBy";
import { ExternalLink, Rocket, Gem, Sparkles, Zap, ChevronLeft, ChevronRight, Globe, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import Project Images
import egm1 from "@/assets/egm-1.png";
import egm2 from "@/assets/egm-2.png";
import egm3 from "@/assets/egm-3.png";
import vali1 from "@/assets/vali-1.png";
import vali2 from "@/assets/vali-2.png";
import vali3 from "@/assets/vali-3.png";
import sri1 from "@/assets/srikrishna-1.png";
import sri2 from "@/assets/srikrishna-2.png";
import sri3 from "@/assets/srikrishna-3.png";
import sid1 from "@/assets/siddharth-4.jpg";
import sid2 from "@/assets/siddharth-3.jpg";
import sid3 from "@/assets/siddhath-2.jpg";
import sid4 from "@/assets/sidhharth-1.jpeg";

import ssln1 from "@/assets/ssln-new-1.png";
import ssln2 from "@/assets/ssln-new-2.png";
import ssln3 from "@/assets/ssln-new-3.png";

import alisher1 from "@/assets/alisher1.png";
import alisher2 from "@/assets/alisher2.png";
import alisher3 from "@/assets/alisher3.png";
// New Premium ProjectGallery Component
const ProjectGallery = ({ images, alt, imageFit = "cover" }: { images: string[], alt: string, imageFit?: "cover" | "contain" }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    return (
        <div className="group w-full perspective-1000">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-white/40 dark:border-slate-700/50 transition-all duration-300 ease-out transform-style-3d cursor-pointer"
                onClick={nextImage}
            >
                {/* 3D Floating Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/30 dark:from-white/5 dark:to-white/10 z-20 pointer-events-none rounded-[2rem]" />

                {/* Browser Header */}
                <div className="relative z-30 flex items-center gap-2 px-6 py-4 bg-white/50 dark:bg-slate-950/50 border-b border-white/20 dark:border-slate-800/50 backdrop-blur-xl">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-400/90 shadow-sm" />
                        <div className="w-3 h-3 rounded-full bg-amber-400/90 shadow-sm" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400/90 shadow-sm" />
                    </div>
                    <div className="mx-auto flex items-center justify-center gap-2 px-4 py-1.5 bg-black/5 dark:bg-black/20 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide w-1/2 min-w-[150px]">
                        <Globe className="w-3 h-3" />
                        <span className="truncate">{alt.toLowerCase().replace(/\s+/g, '')}.com</span>
                    </div>
                </div>

                {/* Image Display */}
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-black">
                    <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${alt} Screenshot ${idx + 1}`}
                                className={`absolute inset-0 w-full h-full object-${imageFit} object-top transition-all [transition-duration:1500ms] [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] ${idx === currentIndex ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-sm pointer-events-none'}`}
                            />
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 pointer-events-none">
                        <button
                            onClick={prevImage}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-xl text-slate-900 dark:text-white pointer-events-auto hover:bg-white dark:hover:bg-slate-800 hover:scale-110 transition-all border border-slate-200/50 dark:border-slate-700/50"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-xl text-slate-900 dark:text-white pointer-events-auto hover:bg-white dark:hover:bg-slate-800 hover:scale-110 transition-all border border-slate-200/50 dark:border-slate-700/50"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Pagination Lines */}
            <div className="flex justify-center gap-2 mt-6 px-4">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                        className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-gradient-to-r from-blue-500 to-cyan-500 w-12 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-300 dark:bg-slate-700 w-4 hover:bg-slate-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

// Project Data
const projects = [
    {
        id: "01",
        title: "Sri Krishna",
        subtitle: "Luxury Jewelry Collections",
        category: "Premium E-Commerce",
        description: "A storefront that shines as bright as the jewels themselves. Crafted with the texture of luxury, our design reflects the royal heritage of the collections in every pixel. Engineered for absolute speed so every customer feels like royalty.",
        tech: ["React", "Firebase", "Lenis", "PWA"],
        highlights: ["Speedy and No Lag Architecture", "Mobile-first receipt generation", "Royal Rupee (₹) Presentation"],
        link: "https://srikrishnacollections.com",
        images: [sri1, sri2, sri3],
        imageFit: "cover" as const,
        theme: "amber"
    },
    {
        id: "02",
        title: "Alisher Digital Academy",
        subtitle: "Digital Learning Platform",
        category: "Education / Coaching",
        description: "Empowering students with a modern, high-performance educational platform. Designed to provide seamless access to courses, resources, and live sessions with absolute clarity, speed, and reliability.",
        tech: ["React", "Tailwind CSS", "Vercel", "PWA"],
        highlights: ["Intuitive Course Navigation", "Lightning-Fast Resource Access", "Mobile-Optimized Learning"],
        link: "https://alisherdigitalacademy.vercel.app",
        images: [alisher1, alisher2, alisher3],
        imageFit: "cover" as const,
        theme: "indigo"
    },
    {
        id: "03",
        title: "Siddharth Hussain",
        subtitle: "Influencer Portfolio",
        category: "Personal Brand",
        description: "A high-performance personal brand website featuring 'Frozen Portal' 3D effects, sticky card stacking, and ultra-smooth Lenis scrolling. Designed to capture the dynamic energy of a top-tier influencer.",
        tech: ["React", "GSAP", "Lenis", "Vercel"],
        highlights: ["3D 'Frozen Portal' Effects", "Sticky Card Stacking", "Ultra-smooth Parallax"],
        link: "https://siddharthhussain.vercel.app",
        images: [sid3, sid4, sid1, sid2],
        imageFit: "contain" as const,
        theme: "blue"
    },
    {
        id: "04",
        title: "El Shaddai Grace",
        subtitle: "Divine Digital Sanctuary",
        category: "Religious / Ministry",
        description: "A digital gateway that offers peace and accessibility. Designed with a minimalist 'Apple-style' aesthetic—deep blues and clean whites creating an atmosphere of trust and grace. Our 'One-Tap Access' ensures that every member, regardless of age, can find hope and community.",
        tech: ["Next.js", "Vercel", "Tailwind CSS", "PWA"],
        highlights: ["Global Edge Deployment", "Jio-Optimized Mobile App", "Zero-Lag Media Streaming"],
        link: "https://www.egmtrust.in/",
        images: [egm1, egm2, egm3],
        imageFit: "cover" as const,
        theme: "emerald"
    },
    {
        id: "05",
        title: "SSLN Cloth Store",
        subtitle: "Full-Stack E-Commerce",
        category: "Retail / Fashion",
        description: "A modern, high-performance platform for a trusted retail brand established in 2012. Digitally transforming a traditional storefront into a seamless online shopping experience with a robust custom admin panel.",
        tech: ["React", "Firebase", "Tailwind CSS", "Vercel"],
        highlights: ["Dynamic Product Catalog", "Secure checkout experience", "Custom Admin Panel"],
        link: "https://sslnclothstore.online",
        images: [ssln1, ssln2, ssln3],
        imageFit: "cover" as const,
        theme: "rose"
    },
    {
        id: "06",
        title: "Vali Hotel",
        subtitle: "Catering & Authentic Pickles",
        category: "Food & Beverage",
        description: "Digitizing the taste of home. It's not just a menu; it's an invitation to experience heritage online. We built a bridge between tradition and modern convenience, ensuring every local taste is just one soulful click away.",
        tech: ["React", "PWA", "Vercel", "WhatsApp API"],
        highlights: ["Full menu dynamic display", "Seamless WhatsApp ordering", "Real-time Instagram feed"],
        link: "https://valihotel.vercel.app",
        images: [vali1, vali2, vali3],
        imageFit: "cover" as const,
        theme: "amber"
    }
];

const getThemeColors = (theme: string) => {
    switch (theme) {
        case "indigo": return { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500", border: "border-indigo-200 dark:border-indigo-800", pill: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" };
        case "blue": return { text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500", border: "border-blue-200 dark:border-blue-800", pill: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" };
        case "amber": return { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500", border: "border-amber-200 dark:border-amber-800", pill: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" };
        case "emerald": return { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-200 dark:border-emerald-800", pill: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" };
        case "rose": return { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500", border: "border-rose-200 dark:border-rose-800", pill: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300" };
        default: return { text: "text-slate-600 dark:text-slate-400", bg: "bg-slate-500", border: "border-slate-200 dark:border-slate-800", pill: "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300" };
    }
};

const OurWorkPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-blue-500/30 relative">
            {/* Global Animated Background for the Page */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Massive slow-moving atmospheric orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400/20 dark:bg-blue-600/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-[blob_15s_infinite_alternate]" />
                <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-400/20 dark:bg-cyan-600/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-[blob_18s_infinite_alternate_reverse]" />
                <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-purple-400/20 dark:bg-purple-600/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-[blob_20s_infinite_alternate]" />

                {/* Animated Moving Grid */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
                    style={{
                        backgroundImage: 'linear-gradient(to right, #8882 1px, transparent 1px), linear-gradient(to bottom, #8882 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                    }}
                />
            </div>

            <div className="relative z-10">
                <Navbar />

                <main className="pb-32">
                    {/* Immersive Hero Section */}
                    <section className="relative min-h-[70vh] flex items-center justify-center pt-24">
                        <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-lg mb-8 animate-fade-up">
                                <span className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">Venthra Portfolio</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.1] mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
                                Our <br className="md:hidden" />
                                <span className="relative inline-block">
                                    <span className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-600/20 blur-2xl rounded-full" />
                                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600">Masterpieces</span>
                                </span>
                            </h1>

                            <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-up" style={{ animationDelay: '200ms' }}>
                                We don't just write code; we build digital foundations. Discover how we've transformed visions into high-performance realities.
                            </p>
                        </div>
                    </section>

                    {/* Sticky Stacking Projects Layout */}
                    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
                        <div className="space-y-12 sm:space-y-24">
                            {projects.map((project, index) => {
                                const colors = getThemeColors(project.theme);
                                const stickyTop = `calc(6rem + ${index * 2}rem)`;

                                // Alternate layout logic
                                const isEven = index % 2 !== 0;
                                const gridCols = isEven ? "lg:grid-cols-[1.2fr,1fr]" : "lg:grid-cols-[1fr,1.2fr]";
                                const contentOrder = isEven ? "order-2 lg:order-2" : "order-2 lg:order-1";
                                const visualOrder = isEven ? "order-1 lg:order-1" : "order-1 lg:order-2";
                                const numberPosition = isEven ? "-right-4 sm:-right-10" : "-left-4 sm:-left-10";

                                return (
                                    <div
                                        key={project.id}
                                        className="sticky z-10 w-full rounded-[2.5rem] sm:rounded-[3rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border border-white dark:border-slate-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700"
                                        style={{ top: stickyTop }}
                                    >
                                        {/* (Giant Background Number and Top Border Glow removed) */}

                                        <div className={`grid ${gridCols} gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12 relative z-10 items-center`}>

                                            {/* Content Side */}
                                            <div className={`flex flex-col justify-center ${contentOrder} space-y-6`}>
                                                <div className="space-y-3">
                                                    <div className={`inline-flex items-center gap-2 ${colors.text} font-bold tracking-widest uppercase text-[10px] sm:text-xs`}>
                                                        <span className="opacity-50">{project.id}</span>
                                                        <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                                                        <span>{project.category}</span>
                                                    </div>
                                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                                                        {project.title}
                                                    </h2>
                                                    <h3 className={`text-lg sm:text-xl font-semibold ${colors.text} opacity-80`}>
                                                        {project.subtitle}
                                                    </h3>
                                                </div>

                                                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                                                    {project.description}
                                                </p>

                                                {/* Tech Stack */}
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech.map((tech) => (
                                                        <span key={tech} className={`px-3 py-1 text-[10px] sm:text-xs font-bold ${colors.pill} rounded-full border ${colors.border}`}>
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Highlights */}
                                                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                                                    <ul className="grid gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                                                        {project.highlights.map((text, i) => (
                                                            <li key={i} className="flex items-center gap-3">
                                                                <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} shadow-[0_0_8px_currentColor]`} />
                                                                {text}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="pt-2">
                                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={`group relative flex items-center justify-center w-max uppercase tracking-wider overflow-hidden rounded-full bg-white dark:bg-slate-900 border-2 ${colors.border} ${colors.text} hover:border-transparent dark:hover:border-transparent px-8 h-12 sm:h-14 text-sm sm:text-base font-bold shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
                                                        <span className={`absolute inset-0 w-full h-full ${colors.bg} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0`} />
                                                        <span className="relative z-10 transition-colors duration-300 group-hover:text-white">View Project</span>
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Visual Side */}
                                            <div className={`relative ${visualOrder}`}>
                                                {/* Glow behind gallery */}
                                                <div className={`absolute inset-0 ${colors.bg} opacity-10 blur-[100px] rounded-full mix-blend-screen`} />
                                                <ProjectGallery
                                                    images={project.images}
                                                    alt={project.title}
                                                    imageFit={project.imageFit}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </main>

                <TrustedBy />
                <Footer />
            </div>
        </div>
    );
};

export default OurWorkPage;
