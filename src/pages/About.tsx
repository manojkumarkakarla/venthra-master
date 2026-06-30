import { useEffect, useRef } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustedBy from "@/components/TrustedBy";
import profilePhoto from "@/assets/profile-photo.png";
import vtsLogo from "@/assets/VTS_NEW_LOGO.png";
import { ArrowRight, ShoppingBag, Terminal, Layout, ExternalLink, Code2, Database, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroSectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline();

      tl.from(".profile-photo", {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      })
        .from(".hero-text", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        }, "-=0.5")
        .from(".stat-card", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }, "-=0.3");

    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      {/* 1. NEW HERO SECTION: Dark Navy Theme */}
      <section
        ref={heroSectionRef}
        className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-28 pb-20 px-4 bg-[#0a192f]"
      >
        {/* Background Gradients (Subtle on Dark) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000" />
          {/* Scanlines / Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        </div>

        <div className="max-w-5xl mx-auto text-center z-10">
          {/* Profile Photo - Responsive Sizing */}
          <div className="relative mx-auto mb-6 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 profile-photo p-1.5 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-[0_0_40px_rgba(59,130,246,0.3)] md:shadow-[0_0_50px_rgba(59,130,246,0.5)]">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white">
              <img
                src={profilePhoto}
                alt="Kakarla Charan Kumar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Founder Designation */}
          <div className="mb-8 animate-fade-up hero-text">
            <p className="text-blue-200 font-medium tracking-[0.2em] text-[10px] sm:text-sm uppercase mb-1">Founder of</p>
            <p className="text-white font-brand-wide font-bold text-sm sm:text-lg tracking-[0.2em] bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent uppercase">Venthra Solutions</p>
          </div>

          {/* Title & Name */}
          <div className="hero-text px-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold italic tracking-wide mb-6 bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent animate-fade-up drop-shadow-sm whitespace-nowrap">
              Kakarla Charan Kumar
            </h1>
            {/* Special Title Badge - Responsive padding/text */}
            <div className="inline-block relative group mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative px-5 py-2.5 sm:px-8 sm:py-3 bg-[#0a192f] rounded-full leading-none flex items-center shadow-2xl border border-blue-500/30 backdrop-blur-xl">
                <Terminal className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mr-2 md:mr-3" />
                <span className="font-mono font-bold text-blue-100 tracking-[0.15em] sm:tracking-widest text-[10px] sm:text-xs md:text-lg">FULL STACK DEVELOPER</span>
              </div>
            </div>
          </div>

          {/* About Me / Bio */}
          <div className="hero-text max-w-3xl mx-auto px-2 sm:px-6">
            <p className="text-sm sm:text-lg md:text-2xl text-blue-100/80 leading-relaxed sm:leading-loose font-light">
              I build accessible, <span className="text-white font-semibold">pixel-perfect</span>, and performant web experiences.
              Passionate about merging <span className="text-blue-400 font-bold">clean code</span> with <span className="text-cyan-400 font-bold">premium design</span> to create digital solutions that stand out.
            </p>
          </div>

          {/* Quick Stats / Tech Tags */}
          <div className="hero-text mt-8 flex flex-wrap justify-center gap-2 sm:gap-4 px-4">
            {["React.js", "Node.js", "TypeScript", "Next.js", "Tailwind CSS", "GSAP"].map((tech) => (
              <span key={tech} className="px-3 py-1.5 sm:px-5 sm:py-2.5 bg-blue-900/40 backdrop-blur-sm border border-blue-500/20 rounded-xl text-blue-200 font-medium text-[10px] sm:text-sm hover:bg-blue-500/20 hover:text-white hover:border-blue-400/50 transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* 1.5. MY STORY SECTION (Personal Connection) */}
      <section className="py-16 md:py-24 px-4 bg-white relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-classic">
              Our Story
            </h2>
            <div className="w-16 md:w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-5 md:space-y-8 text-sm md:text-lg text-slate-600 leading-relaxed text-left">
            <p>
              <span className="text-4xl font-serif text-blue-900 float-left mr-2 mt-[-8px]">F</span>
              rom the vibrant streets of <span className="font-bold text-slate-800">Bethamcherla</span> to the vast digital world, my journey has been driven by one simple observation: our local businesses have incredible potential, but they often struggle to reach customers beyond our town. <span className="italic text-blue-700 font-medium">"Manam edagalante, manam kanipinchali"</span> (To grow, we must be seen).
            </p>

            <p>
              I am a tech enthusiast obsessed with building <span className="font-bold text-slate-800">speedy</span> and <span className="font-bold text-slate-800">lag-free</span> websites. Why? Because I believe every business, no matter how small, deserves a premium digital presence that rivals the biggest brands. A slow website is a missed opportunity, and I refuse to let that happen to my clients.
            </p>

            <div className="bg-blue-50 p-6 md:p-8 rounded-2xl border-l-4 border-blue-500 my-8">
              <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-2">My Mission</h3>
              <p className="italic text-blue-800/80 text-sm md:text-lg">
                It isn't just to write code, but to <span className="font-bold">turn local visions into digital realities</span>. I want to bridge the gap between local craftsmanship and global visibility.
              </p>
            </div>

            <p>
              At Venthra Solutions, I bring more than just technical skills; I bring the values of hard work and community pride that Bethamcherla instilled in me. When you work with me, you’re not just getting a developer; you’re getting a partner who cares about your success as much as you do.
            </p>
          </div>
        </div>
      </section >

      <TrustedBy />
      <Footer />
    </div >
  );
};

export default About;
