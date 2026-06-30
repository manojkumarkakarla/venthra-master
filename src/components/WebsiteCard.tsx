import { WebsiteType } from "@/data/websiteTypes";
import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WebsiteCardProps {
  website: WebsiteType;
  index: number;
  onSelect: (website: WebsiteType) => void;
  className?: string;
}

const WebsiteCard = ({ website, index, onSelect, className }: WebsiteCardProps) => {
  return (
    <article
      onClick={() => onSelect(website)}
      className={cn(
        "group relative flex flex-col h-full bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden cursor-pointer p-4 sm:p-5 hover:bg-slate-800/80 hover:shadow-lg transition-colors duration-300",
        className
      )}
    >
      {/* Floating Framed Image Showcase */}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-slate-950 shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-slate-800/50 z-10">
        <img
          src={website.image}
          alt={website.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="eager"
          decoding="async"
        />

        {/* Category Badge overlay on image */}
        <div className="hidden sm:block absolute top-3 right-3 sm:left-3 sm:right-auto">
          <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full text-teal-300 bg-slate-950/80 backdrop-blur-md border border-teal-500/30 shadow-lg">
            {website.category}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-grow relative z-10">

        {/* Header: Title and Icon */}
        <div className="flex items-center justify-between mb-0 sm:mb-3">
          <h3 className="font-['Georgia'] text-sm sm:text-xl font-bold text-slate-100 group-hover:text-teal-400 transition-colors leading-tight line-clamp-2">
            {website.title}
          </h3>
          <div className="hidden sm:block p-2 rounded-xl bg-slate-800/60 group-hover:bg-teal-500/10 text-slate-400 group-hover:text-teal-400 transition-colors shrink-0">
            <website.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Description */}
        <p className="hidden sm:block text-slate-400 text-xs font-light leading-relaxed mb-4 line-clamp-2 pr-4">
          {website.description}
        </p>

        {/* Key Features */}
        <div className="hidden sm:block space-y-2 mb-5">
          {website.keyFeatures.slice(0, 2).map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3px]" />
              </div>
              <span className="text-xs text-slate-300 font-light line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>

        {/* Footer: Action Link */}
        <div className="hidden sm:flex pt-4 border-t border-slate-800/60 justify-end mt-auto">
          <div className="text-slate-500 group-hover:text-teal-400 transition-colors">
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default WebsiteCard;
