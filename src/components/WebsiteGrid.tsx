import { useState, useMemo } from "react";
import { websiteTypes, Category, WebsiteType } from "@/data/websiteTypes";
import WebsiteCard from "./WebsiteCard";
import CategoryFilter from "./CategoryFilter";
import WebsiteDetail from "./WebsiteDetail";
interface WebsiteGridProps {
  searchQuery: string;
}

const WebsiteGrid = ({ searchQuery }: WebsiteGridProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedWebsite, setSelectedWebsite] = useState<WebsiteType | null>(null);

  const filteredWebsites = useMemo(() => {
    return websiteTypes.filter((website) => {
      const matchesCategory = activeCategory === "All" || website.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        website.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        website.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        website.popularTools.some((tool) =>
          tool.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="categories" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative w-full overflow-hidden bg-slate-950">
      {/* Deep Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 z-0" />

      {/* Soft Background Glow Blobs for Dark Theme */}
      <div className="absolute top-1/4 left-[-10%] w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-teal-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-[-10%] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Background Grid Pattern - Dark */}
      <div className="absolute inset-0 pattern-grid opacity-[0.03] pointer-events-none z-0" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-4">
            <span className="text-teal-400 text-xs font-bold tracking-[0.25em] uppercase bg-teal-500/10 px-4 py-1.5 rounded-full border border-teal-500/20 shadow-sm">
              Our Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Georgia'] font-bold text-white mb-4 sm:mb-6 px-4 tracking-tight">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">Digital Solutions</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto px-4 leading-relaxed font-light">
            Find the perfect website category for your project. Each type comes with
            bespoke features, high-performance optimizations, and clean architecture.
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Responsive Grid - 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="min-h-[400px]">
            {filteredWebsites.length > 0 ? (
                <div 
                key={activeCategory + searchQuery} 
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr"
              >
                {filteredWebsites.map((website, index) => (
                  <div key={website.id}>
                    <WebsiteCard
                      website={website}
                      index={index}
                      onSelect={setSelectedWebsite}
                      className=""
                    />
                  </div>
                ))}
                </div>
            ) : (
              <div 
                key="empty"
                className="text-center py-16"
              >
                <p className="text-lg text-slate-400">
                  No website types found matching your criteria.
                </p>
              </div>
            )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedWebsite && (
        <WebsiteDetail
          website={selectedWebsite}
          onClose={() => setSelectedWebsite(null)}
        />
      )}
    </section>
  );
};

export default WebsiteGrid;
