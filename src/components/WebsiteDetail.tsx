import { WebsiteType } from "@/data/websiteTypes";
import { X, Check, Users, Lightbulb, Wrench } from "lucide-react";
import { useEffect } from "react";

interface WebsiteDetailProps {
  website: WebsiteType;
  onClose: () => void;
}

const WebsiteDetail = ({ website, onClose }: WebsiteDetailProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    // Toggle requested no-scroll class on body for DOM inspector visibility
    document.body.classList.add('no-scroll');

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove('no-scroll');
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
      data-lenis-prevent
      onClick={onClose}
    >
      <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 py-10">
        <div
          className="relative w-full max-w-4xl bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-elevated animate-scale-in pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fixed Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[110] p-2.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xl transition-all border border-white/20 shadow-xl group active:scale-90"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Container */}
          <div className="flex-1 pb-10">
            {/* Image Header */}
            <div className="relative h-56 sm:h-72 w-full flex-shrink-0 overflow-hidden rounded-t-[2.5rem]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img
                src={website.image}
                alt={website.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-8 left-8 z-20">
                <span className="px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full bg-blue-500 text-white backdrop-blur-sm mb-3 inline-block">
                  {website.category}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                  {website.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {website.description}
              </p>

              <div className="flex flex-wrap gap-2.5 mb-10">
                {website.popularTools.map((tool) => (
                  <span
                    key={tool}
                    className="px-5 py-2.5 text-sm font-bold rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-8 rounded-[2rem] bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 group hover:border-blue-300 transition-colors duration-500">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Purpose</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{website.purpose}</p>
                </div>

                <div className="p-8 rounded-[2rem] bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/50 group hover:border-purple-300 transition-colors duration-500">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Best For</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {website.bestFor.map((audience) => (
                      <span
                        key={audience}
                        className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shadow-sm"
                      >
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-8 sm:p-10 rounded-[2.5rem] bg-slate-900 dark:bg-slate-900/50 border border-slate-800 text-white relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] group-hover:bg-blue-600/20 transition-all duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Wrench className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold">Key Features</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {website.keyFeatures.map((feature) => (
                      <div key={feature} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group/item">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-blue-400" />
                        </div>
                        <span className="text-slate-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetail;
