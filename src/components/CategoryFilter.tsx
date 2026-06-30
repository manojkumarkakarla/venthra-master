import { categories, Category } from "@/data/websiteTypes";
import { motion } from "framer-motion";

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="w-full mb-6 sm:mb-8">
      <div className="flex items-center gap-2 overflow-x-auto px-4 pb-2 sm:justify-center sm:flex-wrap sm:overflow-visible scrollbar-hide snap-x">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`relative flex-shrink-0 snap-center px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
              activeCategory === category
                ? "text-white font-bold"
                : "bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700"
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-teal-600 rounded-full shadow-[0_4px_20px_rgba(20,184,166,0.4)] border border-teal-500 z-0"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
