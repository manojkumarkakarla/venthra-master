import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import WebsiteGrid from "@/components/WebsiteGrid";

import InteractiveHero from "@/components/InteractiveHero";
import PlayStoreShowcase from "@/components/PlayStoreShowcase";
import Examples from "@/components/Examples";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero onSearch={handleSearch} />
        <TrustedBy />
        <WebsiteGrid searchQuery={searchQuery} />
        <Examples />
        <InteractiveHero />
        <PlayStoreShowcase />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


