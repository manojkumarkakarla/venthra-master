import { useState, useEffect, lazy, Suspense } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import vtsLogo from "@/assets/VTS_NEW_LOGO.png";
import { cn } from "@/lib/utils";

const ProjectInquiryModal = lazy(() => import("./ProjectInquiryModal"));

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scroll effect after 50px as requested
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },

    { label: "About", href: "/about" },
    { label: "Our Work", href: "/our-work" },
  ];

  // Determine styles based on page and scroll state
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";

  let textColorClass = "text-blue-100";
  let logoColorClass = "bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent";
  let navBgClass = "bg-gradient-to-b from-black/30 to-transparent";

  // Shared gradient button style matching Hero section
  const gradientButtonClass = "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-[0_4px_15px_rgba(20,184,166,0.3)] hover:shadow-[0_8px_25px_rgba(20,184,166,0.5)] hover:scale-105 transition-all duration-300 border-none font-bold";
  const buttonClass = gradientButtonClass;

  if (isScrolled) {
    textColorClass = "text-slate-900 hover:text-teal-600";
    logoColorClass = "bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent drop-shadow-sm";
    navBgClass = "bg-white shadow-md border-b border-slate-100";
    // buttonClass remains gradient
  } else if (isHomePage) {
    // Home page uses a light color on the hero section for clear visibility
    textColorClass = "text-slate-800 font-bold tracking-[0.1em] hover:text-teal-600 transition-colors";
    logoColorClass = "bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent drop-shadow-sm";
    navBgClass = "bg-white shadow-sm border-b border-slate-200 transition-all duration-500";
    // buttonClass remains gradient
  } else if (isAboutPage) {
    // About page has a dark hero always
    textColorClass = "text-white hover:text-teal-400";
    logoColorClass = "bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent";
    navBgClass = "bg-gradient-to-b from-black/50 to-transparent";
    // buttonClass remains gradient
  } else {
    // Default for other pages (Privacy, Terms, etc.) which usually have light backgrounds
    textColorClass = "text-slate-900 hover:text-teal-600";
    logoColorClass = "bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent drop-shadow-sm";
    navBgClass = "bg-white/95 border-b border-slate-200";
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[9999] transition-all duration-400 ease-in-out",
        navBgClass
      )}
    >
      <Suspense fallback={null}>
        <ProjectInquiryModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </Suspense>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-[0_4px_10px_rgba(20,184,166,0.2)] ring-2 ring-teal-500/20">
              <img
                src={vtsLogo}
                alt="VTS Logo"
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
            {/* Heading Visibility: Color Change on Scroll */}
            <span
              className={cn(
                "hidden sm:block font-brand-wide font-bold text-sm lg:text-base tracking-[0.05em] transition-colors duration-400 uppercase",
                logoColorClass
              )}
            >
              Venthra Solutions
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
            {navLinks.map((link) => {
              const isInternal = link.href.startsWith("/");
              const isAnchor = link.href.includes("#");

              const linkClass = cn(
                "text-xs font-bold uppercase tracking-widest transition-all duration-300 relative hover:text-cyan-400 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]",
                textColorClass
              );

              return (
                <div key={link.label}>
                  {isInternal && !isAnchor ? (
                    <Link
                      to={link.href}
                      className={linkClass}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className={linkClass}
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => setIsModalOpen(true)}
              className={cn(
                "rounded-full px-6 transition-all duration-400 font-medium",
                buttonClass
              )}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button - Forced Visibility & Hitbox */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMobileMenuOpen(true);
            }}
            className={cn(
              "md:hidden p-3 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 shadow-lg",
              "z-[99999] relative", // Maximum priority
              isScrolled
                ? "bg-slate-900 text-white"
                : "bg-white/95 text-slate-900 border border-slate-200 shadow-sm"
            )}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6 stroke-[2.5px]" />
          </button>
        </div>
      </div>

      {/* Global Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-[100dvh] z-[999999] md:hidden bg-slate-950/98 flex flex-col items-center justify-center p-6"
          >
            {/* Close Button - Top Right */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90"
              aria-label="Close Menu"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Centered Navigation Content */}
            <div className="w-full max-w-sm flex flex-col items-center space-y-8">
              <div className="text-center mb-4">
                <span className="text-cyan-400 font-brand-wide font-bold text-xs uppercase tracking-[0.5em] opacity-80">Navigate</span>
                <div className="h-px w-12 bg-cyan-400/30 mx-auto mt-2" />
              </div>

              <div className="flex flex-col items-center space-y-6 w-full">
                {navLinks.map((link, idx) => {
                  const isInternal = link.href.startsWith("/");
                  const isAnchor = link.href.includes("#");
                  const handleClick = () => setIsMobileMenuOpen(false);

                  const linkContent = (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="text-2xl sm:text-3xl font-bold text-white hover:text-cyan-400 transition-colors uppercase tracking-widest text-center"
                    >
                      {link.label}
                    </motion.div>
                  );

                  if (isInternal && !isAnchor) {
                    return (
                      <Link
                        key={link.label}
                        to={link.href}
                        className="py-2"
                        onClick={handleClick}
                      >
                        {linkContent}
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="py-2"
                      onClick={handleClick}
                    >
                      {linkContent}
                    </a>
                  );
                })}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full pt-8 flex justify-center"
                >
                  <Button
                    className={cn("w-3/4 max-w-[200px] py-3 rounded-lg text-sm font-bold shadow-md uppercase tracking-wider bg-white text-slate-900 border border-slate-200", "")}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsModalOpen(true);
                    }}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>

              {/* Branding Footer */}
              <div className="pt-12 text-center opacity-40">
                <p className="text-[10px] text-white uppercase tracking-[0.4em] font-medium italic">Venthra Solutions</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav >
  );
};

export default Navbar;
