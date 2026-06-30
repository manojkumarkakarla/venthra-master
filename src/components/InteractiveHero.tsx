import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import trustIcon from '@/assets/trust_icon.png';
import honestyIcon from '@/assets/honesty_icon.png';
import disciplineIcon from '@/assets/discipline_icon.png';
import punctualityIcon from '@/assets/punctuality_icon.png';
import qualityIcon from '@/assets/quality_icon.png';
import vtsLogo from '@/assets/VTS_NEW_LOGO.png';


gsap.registerPlugin(ScrollTrigger);

const InteractiveHero = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !logoRef.current || !orbitRef.current) return;

        const ctx = gsap.context(() => {
            // Floating animation for center logo
            gsap.to(logoRef.current, {
                y: -15,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });

            // Entry animation on scroll
            gsap.from(orbitRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    once: true // Only animate once to save scroll performance
                },
                scale: 0.5,
                opacity: 0,
                duration: 1.5,
                ease: "back.out(1.7)",
                force3D: true // Force GPU acceleration
            });

            // Icon entry animations from left and right
            iconsRef.current.forEach((icon, index) => {
                if (!icon) return;

                const fromLeft = index % 2 === 0;

                // Immediate fade in without movement for speed
                gsap.from(icon, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        once: true
                    },
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.5, // Faster duration
                    delay: index * 0.1, // Reduced delay
                    ease: "power2.out",
                    force3D: true // Force GPU acceleration
                });
            });

            // Continuous orbit rotation
            gsap.to(orbitRef.current, {
                rotation: 360,
                duration: 40,
                repeat: -1,
                ease: "none",
                force3D: true
            });

            // Counter-rotate the icons to keep them upright
            iconsRef.current.forEach((icon) => {
                if (!icon) return;
                gsap.to(icon, {
                    rotation: -360,
                    duration: 40,
                    repeat: -1,
                    ease: "none",
                    force3D: true
                });
            });

            // Mouse Move Parallax Effect - Disabled for smoother scrolling
            /*
            const handleMouseMove = (e: MouseEvent) => {
                if (!bgRef.current) return;
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;

                const xPos = (clientX / innerWidth - 0.5) * 50;
                const yPos = (clientY / innerHeight - 0.5) * 50;

                gsap.to(bgRef.current, {
                    x: xPos,
                    y: yPos,
                    duration: 1,
                    ease: "power2.out"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
            */


        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const webApps = [
        { name: 'Trust', icon: <img src={trustIcon} alt="Trust" className="w-full h-full object-cover rounded-2xl border-2 border-white" />, color: 'from-blue-400 to-indigo-500 shadow-indigo-500/20' },
        { name: 'Honesty', icon: <img src={honestyIcon} alt="Honesty" className="w-full h-full object-cover rounded-2xl border-2 border-white" />, color: 'from-teal-400 to-emerald-500 shadow-emerald-500/20' },
        { name: 'Discipline', icon: <img src={disciplineIcon} alt="Discipline" className="w-full h-full object-cover rounded-2xl border-2 border-white" />, color: 'from-purple-400 to-fuchsia-500 shadow-purple-500/20' }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-16 sm:py-20 md:py-24"
        >
            {/* Dark Slate Animated Blobs Removed for Performance */}
            <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform">
            </div>

            {/* Subtler Star field background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_20%_30%,#94a3b8,transparent),radial-gradient(1px_1px_at_60%_70%,#94a3b8,transparent)]" />
            </div>

            {/* Grid pattern overlay - Dark Gray instead of Purple */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Heavy Dark Overlay */}
            <div className="absolute inset-0 bg-black/90 z-0" />

            {/* Main content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center">
                    {/* Heading */}
                    <div className="relative text-center space-y-6 px-4 mb-16 sm:mb-20 z-10 animate-fade-up">
                        <h2 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-['Georgia'] font-bold text-white leading-[1.1] tracking-tight">
                            Empowering Your <br className="hidden sm:block" />
                            <span className="inline-block mt-2 sm:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">
                                Digital Ecosystem
                            </span>
                        </h2>
                        <p className="relative text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed mt-6">
                            Crafting seamless, high-performance web experiences with cutting-edge technologies.
                        </p>
                    </div>

                    {/* Orbit container */}
                    <div className="relative w-[85vw] sm:w-full max-w-[650px] aspect-square flex items-center justify-center mb-12 sm:mb-16">
                        {/* Background Orbit Rings */}
                        <div className="absolute inset-4 sm:inset-8 rounded-full border border-slate-700/30" />
                        <div className="absolute inset-12 sm:inset-20 rounded-full border border-slate-700/50 border-dashed" />
                        <div className="absolute inset-24 sm:inset-36 rounded-full border border-slate-800/40" />

                        <div ref={orbitRef} className="absolute inset-0 will-change-transform">

                            {/* Orbiting web app icons */}
                            {webApps.map((app, index) => {
                                const angle = (index * (360 / webApps.length)) - 90; // Evenly spaced starting from top
                                const radius = 45; // percentage
                                const x = Math.cos((angle * Math.PI) / 180) * radius;
                                const y = Math.sin((angle * Math.PI) / 180) * radius;

                                return (
                                    <div
                                        key={app.name}
                                        className="absolute"
                                        style={{
                                            left: `calc(50% + ${x}%)`,
                                            top: `calc(50% + ${y}%)`,
                                            transform: 'translate(-50%, -50%)'
                                        }}
                                    >
                                        <div ref={(el) => (iconsRef.current[index] = el)} className="will-change-transform">
                                            <div className={`
                                                  relative group w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24
                                                  rounded-2xl bg-gradient-to-br ${app.color}
                                                  flex items-center justify-center
                                                  transition-all duration-300
                                                  hover:scale-110
                                                  cursor-pointer
                                                  border border-white/10
                                                `}>
                                                {/* Icon */}
                                                <span className="flex items-center justify-center text-white w-full h-full">
                                                    {app.icon}
                                                </span>

                                                {/* Text Label */}
                                                <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-300 pointer-events-none">
                                                    <div className="bg-slate-900/80 border border-white/10 text-white px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold whitespace-nowrap shadow-sm">
                                                        {app.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Center VTS Logo Hub */}
                        <div
                            ref={logoRef}
                            className="relative z-20 group cursor-pointer"
                        >
                            {/* Middle rings */}
                            <div className="absolute inset-0 -m-4 sm:-m-8 rounded-full border border-teal-500/30" />
                            <div className="absolute inset-0 -m-2 sm:-m-4 rounded-full border-2 border-dashed border-blue-500/30" />

                            {/* Logo container */}
                            <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-white border-4 border-teal-500/30 transition-all duration-700 flex items-center justify-center overflow-hidden">
                                {/* VTS Image Logo */}
                                <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
                                    <img
                                        src={vtsLogo}
                                        alt="Venthra Solutions Logo"
                                        className="w-full h-full object-contain scale-110 group-hover:scale-[1.2] transition-transform duration-500"
                                    />
                                </div>
                            </div>

                            {/* Static outer particles */}
                            <div className="absolute inset-0 -m-6">
                                <div className="absolute top-0 left-1/2 w-3 h-3 bg-teal-400 rounded-full" />
                                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full" />
                                <div className="absolute top-1/2 left-0 w-2 h-2 bg-cyan-400 rounded-full" />
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            {/* Bottom gradient fade for smooth transition to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
        </section >
    );
};

export default InteractiveHero;
