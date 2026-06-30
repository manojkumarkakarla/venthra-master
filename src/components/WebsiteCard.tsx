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
        "relative flex flex-col h-full bg-white border border-slate-200/80 shadow-sm rounded-3xl overflow-hidden cursor-pointer transition-colors duration-300",
        className
      )}
    >
      {/* Full Bleed Image Showcase at the Top */}
      <div className="relative w-full aspect-[16/10] overflow-hidden mb-5 bg-slate-100 border-b border-slate-200/50 z-10">
        <img
          src={website.image}
          alt={website.title}
          className="w-full h-full object-cover transition-transform duration-700"
          loading="eager"
          decoding="async"
        />

        {/* Category Badge overlay on image */}
        <div className="hidden sm:block absolute top-4 right-4 sm:left-4 sm:right-auto">
          <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full text-teal-800 bg-white/95 backdrop-blur-md border border-teal-500/30 shadow-sm">
            {website.category}
          </span>
        </div>
      </div>

      {/* Content Body - Paddings applied here instead of the whole card */}
      <div className="flex flex-col flex-grow relative z-10 px-4 sm:px-5 pb-4 sm:pb-5">

        {/* Header: Title and Icon */}
        <div className="flex items-center justify-between mb-0 sm:mb-3">
          <h3 className="font-['Georgia'] text-sm sm:text-xl font-bold text-slate-900 transition-colors leading-tight line-clamp-2">
            {website.title}
          </h3>
          <div className="hidden sm:block p-2 rounded-xl bg-slate-50 shadow-sm border border-slate-100 text-slate-600 transition-colors shrink-0">
            <website.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Description */}
        <p className="hidden sm:block text-slate-600 text-xs font-normal leading-relaxed mb-4 line-clamp-2 pr-4">
          {website.description}
        </p>

        {/* Key Features */}
        <div className="hidden sm:block space-y-2 mb-5">
          {website.keyFeatures.slice(0, 2).map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/20 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3px]" />
              </div>
              <span className="text-xs text-slate-900 font-medium line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>

        {/* Footer: Action Link */}
        <div className="hidden sm:flex pt-4 border-t border-slate-100 justify-end mt-auto">
          <div className="text-slate-400 transition-colors">
            <ArrowUpRight className="w-5 h-5 transition-transform" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default WebsiteCard;

