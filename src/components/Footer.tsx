import { useState, lazy, Suspense } from "react";
import { Linkedin, Instagram, ArrowRight, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import vtsLogo from "@/assets/VTS_NEW_LOGO.png";

const ProjectInquiryModal = lazy(() => import("./ProjectInquiryModal"));

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const footerLinks = {
    resources: [

      { label: "Services", href: "/#categories" },
      { label: "FAQ", href: "/#faq" },
    ],
    company: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Inspiration", href: "/#examples" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/venthrasolutions", label: "Instagram", isInternal: false },
    { icon: Linkedin, href: "https://www.linkedin.com/company/venthrasolutions", label: "LinkedIn", isInternal: false },
    { icon: Youtube, href: "https://www.youtube.com/@ventharasolutions", label: "YouTube", isInternal: false },
  ];

  return (
    <>
      {/* Global CTA Section (Light Theme) */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 relative overflow-hidden border-t border-slate-200">
        <Suspense fallback={null}>
          <ProjectInquiryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </Suspense>
        
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/60 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/60 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-100 p-8 sm:p-12 md:p-20 relative overflow-hidden">
            {/* Subtle card internal decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-blue-500"></div>

            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold tracking-[0.1em] text-slate-700 shadow-sm uppercase">
                Let's build something amazing
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Georgia'] text-slate-900 tracking-tight leading-[1.15]">
                Ready to transform your digital presence?
              </h2>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Partner with Venthra Solutions to engineer custom, high-performance websites and digital solutions tailored to help your business grow.
              </p>
              
              <div className="pt-4 flex justify-center">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-[0_8px_20px_rgba(20,184,166,0.3)] hover:shadow-[0_8px_25px_rgba(20,184,166,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-slate-950 text-slate-300 overflow-hidden border-t border-slate-900">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Column (Left - Wider) */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-flex items-center gap-4 group">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-[0_0_20px_rgba(255,255,255,0.05)] ring-2 ring-white/10 group-hover:ring-white/20 transition-all duration-500">
                <img
                  src={vtsLogo}
                  alt="VTS Logo"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-brand-wide font-bold text-xl text-white tracking-[0.2em] uppercase">
                  Venthra Solutions
                </span>
                <span className="text-xs font-medium text-blue-300 tracking-widest uppercase">
                  Digital Excellence
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Elevating Brands through Premium Web Architecture. We engineer digital masterpieces that captivate audiences and drive measurable growth.
            </p>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const baseClasses = "w-10 h-10 rounded-full bg-slate-900/50 border border-slate-800 text-white flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-slate-950 hover:border-white hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]";

                return social.isInternal ? (
                  <Link
                    key={social.label}
                    to={social.href}
                    aria-label={social.label}
                    className={baseClasses}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                ) : (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={baseClasses}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns (Right) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2">

            {/* Resources */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
              <ul className="space-y-4">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") && !link.href.includes("#") ? (
                      <Link to={link.href} className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                        <span className="relative overflow-hidden">
                          {link.label}
                          <span className="absolute left-0 bottom-0 w-full h-px bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        </span>
                      </Link>
                    ) : (
                      <a href={link.href} className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                        <span className="relative overflow-hidden">
                          {link.label}
                          <span className="absolute left-0 bottom-0 w-full h-px bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        </span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Explore</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") && !link.href.includes("#") ? (
                      <Link to={link.href} className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                        <span className="relative overflow-hidden">
                          {link.label}
                          <span className="absolute left-0 bottom-0 w-full h-px bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        </span>
                      </Link>
                    ) : (
                      <a href={link.href} className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                        <span className="relative overflow-hidden">
                          {link.label}
                          <span className="absolute left-0 bottom-0 w-full h-px bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        </span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Legal</h4>
              <ul className="space-y-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                      <span className="relative overflow-hidden">
                        {link.label}
                        <span className="absolute left-0 bottom-0 w-full h-px bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-8" />

        {/* Bottom Bar */}
        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-center text-sm text-slate-500">
          <p>© {currentYear} Venthra Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
