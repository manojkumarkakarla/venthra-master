import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, Cpu, Code2, Database, Shield, LayoutTemplate, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spline from '@splinetool/react-spline';

// Lazy load modal
const ProjectInquiryModal = lazy(() => import("./ProjectInquiryModal"));

interface HeroProps {
    onSearch: (query: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <section className="relative min-h-[100dvh] w-full flex flex-col overflow-hidden bg-white selection:bg-teal-500/30">
            <Suspense fallback={null}>
                <ProjectInquiryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
            </Suspense>

            {/* --- Background Textures & Symbols --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Subtle Dot Grid */}
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `radial-gradient(circle at center, #94a3b8 2px, transparent 2px)`,
                        backgroundSize: '32px 32px'
                    }}
                />

                {/* Ambient Soft Pastel Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-100/40 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-100/40 blur-[120px] pointer-events-none" />

                {/* Floating Tech Symbols (Subtle Watermarks) */}
                <div className="absolute top-[15%] left-[5%] text-slate-300/80 rotate-12 animate-pulse">
                    <Code2 className="w-16 h-16 sm:w-24 sm:h-24" strokeWidth={1.5} />
                </div>
                <div className="absolute bottom-[20%] left-[10%] text-slate-300/80 -rotate-12">
                    <Database className="w-20 h-20 sm:w-32 sm:h-32" strokeWidth={1.5} />
                </div>
                <div className="absolute top-[20%] right-[10%] text-slate-300/80 rotate-45">
                    <LayoutTemplate className="w-12 h-12 sm:w-20 sm:h-20" strokeWidth={1.5} />
                </div>
                <div className="absolute bottom-[15%] right-[5%] text-slate-300/80 -rotate-45">
                    <Cpu className="w-16 h-16 sm:w-28 sm:h-28" strokeWidth={1.5} />
                </div>

            </div>

            {/* --- Mobile Top Text (Badge & Title) --- */}
            <div className="sm:hidden relative z-10 w-full px-6 pt-16 pb-12 flex flex-col items-center text-center pointer-events-none">
                <div className="mb-4">
                    <span className="inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 text-xs font-bold tracking-[0.25em] uppercase bg-slate-50 px-4 py-2 rounded-full border border-teal-100 shadow-sm">
                        <Shield className="w-4 h-4 text-teal-500" />
                        The Digital Architects
                    </span>
                </div>
                <h1 className="mb-0">
                    <span className="inline-block font-['Georgia'] font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-500 text-4xl tracking-tight leading-[1.05] drop-shadow-sm">
                        VENTHRA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 drop-shadow-sm">
                            SOLUTIONS
                        </span>
                    </span>
                </h1>
            </div>

            {/* --- Spline 3D Scene Background --- */}
            <div className="relative sm:absolute inset-0 z-0 flex flex-col flex-1 items-center justify-center pointer-events-none">


                {/* Spline Canvas - Position absolute to prevent the huge layout blowout from the scaled element */}
                <div className="absolute sm:relative top-[46%] sm:top-12 left-1/2 sm:left-0 -translate-x-[45%] sm:translate-x-0 -translate-y-1/2 sm:translate-y-8 lg:translate-x-1/4 xl:translate-x-[30%] w-[300vw] sm:w-full h-[150dvh] sm:h-full scale-[0.40] sm:scale-100 origin-center sm:origin-top opacity-90 transition-all duration-1000 ease-in-out z-0 pointer-events-auto flex items-center justify-center">
                    <Spline
                        scene="https://prod.spline.design/Nmx4Vyeze9wJ-9zm/scene.splinecode"
                        onLoad={() => setIsLoading(false)}
                    />
                    {/* Cover the Spline Watermark on mobile */}
                    <div className="absolute bottom-0 right-0 w-96 h-40 bg-white z-[99] lg:hidden pointer-events-none" />
                </div>

                {/* High Contrast Gradient Overlay to ensure text readability on the left (Desktop only now) */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent hidden lg:block pointer-events-none w-3/4" />
            </div>

            {/* --- Main Content --- */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-end lg:justify-center pointer-events-none pb-12 lg:pb-0 pt-4 sm:pt-28 lg:pt-0 sm:h-full sm:flex-1">
                <div className="max-w-2xl pointer-events-auto bg-transparent sm:bg-white/80 lg:bg-transparent backdrop-blur-none sm:backdrop-blur-xl lg:backdrop-blur-none px-2 sm:px-10 py-2 sm:py-10 rounded-[2rem] sm:rounded-[2.5rem] border-transparent sm:border sm:border-white lg:border-transparent shadow-none sm:shadow-[0_8px_30px_rgb(0,0,0,0.06)] lg:shadow-none mt-auto lg:mt-0 text-center sm:text-left">
                    {/* Badge */}
                    <div className="hidden sm:block mb-8 lg:mt-12 xl:mt-16">
                        <span className="inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase bg-slate-50 px-5 py-2 rounded-full border border-teal-100 shadow-sm">
                            <Shield className="w-4 h-4 text-teal-500" />
                            The Digital Architects
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="hidden sm:block mb-4 sm:mb-6">
                        <span className="inline-block font-['Georgia'] font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-500 text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05] drop-shadow-sm">
                            VENTHRA <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 drop-shadow-sm">
                                SOLUTIONS
                            </span>
                        </span>
                    </h1>

                    {/* Headline */}
                    <h2 className="hidden sm:block font-['Georgia'] text-lg sm:text-xl md:text-2xl text-slate-700 font-medium mb-3 sm:mb-6 leading-relaxed">
                        Building the digital future for <span className="text-teal-600 font-bold italic">real businesses</span>.
                    </h2>

                    {/* Subtext */}
                    <p className="text-xs sm:text-base text-slate-600 font-normal leading-relaxed mb-8 sm:mb-10 max-w-lg">
                        We engineer custom, high-performance websites and digital solutions tailored to help <strong className="text-slate-800 font-semibold">your business</strong> grow, scale, and succeed online.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-6 w-full sm:max-w-none">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="group w-full sm:w-auto h-12 sm:h-14 px-8 text-sm font-medium rounded-full bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-400 flex items-center justify-center gap-2"
                        >
                            Start Your Project
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="group w-full sm:w-auto h-12 sm:h-14 px-8 text-sm font-medium rounded-full bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-400 flex items-center justify-center gap-2"
                        >
                            <Link to="/our-work" className="w-full h-full flex items-center justify-center gap-2">
                                Explore Our Work
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Very subtle bottom border gradient to blend with the next section */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </section>
    );
};

export default Hero;
