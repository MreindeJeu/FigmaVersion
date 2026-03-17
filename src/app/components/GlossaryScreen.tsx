import { useState, useRef, useEffect } from "react";
import { useData } from "../context/DataContext";
import { useAdmin } from "../context/AdminContext";
import type { GlossaryEntry } from "../data/glossaryData";
import { Book, Search, Shield, Lock, Globe, Grid3x3, List, Filter, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { BackToTop } from "./BackToTop";
import { toast } from "sonner";

type SortMode = "alphabetical" | "category" | "classification";

export function GlossaryScreen() {
  const { glossaryEntries, isLoading, backendAvailable } = useData();
  const { isAdmin } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedClassification, setSelectedClassification] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortMode, setSortMode] = useState<SortMode>("alphabetical");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ["ALL", "TECHNOLOGY", "ORGANIZATION", "CULTURE", "GEOGRAPHY", "MILITARY", "SCIENCE"];
  const classifications = ["ALL", "PUBLIC", "RESTRICTED", "CLASSIFIED"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setFilterMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredEntries = glossaryEntries.filter(entry => {
    const matchesSearch = entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || entry.category === selectedCategory;
    const matchesClassification = selectedClassification === "ALL" || entry.classification === selectedClassification;
    return matchesSearch && matchesCategory && matchesClassification;
  }).sort((a, b) => {
    switch (sortMode) {
      case "alphabetical":
        return a.term.localeCompare(b.term);
      case "category":
        return a.category.localeCompare(b.category) || a.term.localeCompare(b.term);
      case "classification":
        return a.classification.localeCompare(b.classification) || a.term.localeCompare(b.term);
    }
  });

  const getClassificationIcon = (classification: GlossaryEntry["classification"]) => {
    switch (classification) {
      case "PUBLIC":
        return <Globe className="w-3 h-3" />;
      case "RESTRICTED":
        return <Shield className="w-3 h-3" />;
      case "CLASSIFIED":
        return <Lock className="w-3 h-3" />;
    }
  };

  const getClassificationColor = (classification: GlossaryEntry["classification"]) => {
    switch (classification) {
      case "PUBLIC":
        return "text-green-500 border-green-500/50 bg-green-500/10";
      case "RESTRICTED":
        return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";
      case "CLASSIFIED":
        return "text-red-500 border-red-500/50 bg-red-500/10";
    }
  };

  const getCategoryColor = (category: GlossaryEntry["category"]) => {
    switch (category) {
      case "TECHNOLOGY":
        return "text-cyan-400 border-cyan-500/50";
      case "ORGANIZATION":
        return "text-purple-400 border-purple-500/50";
      case "CULTURE":
        return "text-pink-400 border-pink-500/50";
      case "GEOGRAPHY":
        return "text-blue-400 border-blue-500/50";
      case "MILITARY":
        return "text-red-400 border-red-500/50";
      case "SCIENCE":
        return "text-yellow-400 border-yellow-500/50";
    }
  };

  return (
    <div className="min-h-screen p-8 font-mono">
      {/* Terminal Header */}
      <div className="mb-8 border-2 border-green-500/30 bg-green-500/5 p-4">
        <div className="text-xs text-green-600/70 mb-2">// ACCESSING UNION KNOWLEDGE DATABASE</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Book className="w-6 h-6 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <h1 className="text-3xl font-bold text-green-500 tracking-wider drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
              ▶ GLOSSARY
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-green-600/70">
              {filteredEntries.length} OF {glossaryEntries.length} ENTRIES
            </div>
            {/* Compact View Toggle */}
            <div className="flex items-center gap-1 border-2 border-green-500/30 bg-green-500/5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-all ${
                  viewMode === "grid"
                    ? "bg-green-500/20 text-green-400"
                    : "text-green-600/70 hover:bg-green-500/10 hover:text-green-400"
                }`}
                title="Grid View"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-all ${
                  viewMode === "list"
                    ? "bg-green-500/20 text-green-400"
                    : "text-green-600/70 hover:bg-green-500/10 hover:text-green-400"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="border-2 border-green-500/30 bg-green-500/5 p-12 flex flex-col items-center justify-center">
          <div className="text-green-500 mb-4 animate-pulse">
            <Book className="w-16 h-16" />
          </div>
          <div className="text-green-400 text-lg mb-2">LOADING GLOSSARY DATABASE...</div>
          <div className="text-xs text-green-600/70">▶ ▶ ▶</div>
        </div>
      ) : glossaryEntries.length === 0 ? (
        /* Empty State */
        <div className="border-2 border-green-500/30 bg-green-500/5 p-12 flex flex-col items-center justify-center">
          <div className="text-green-600/30 mb-4">
            <Book className="w-16 h-16" />
          </div>
          <div className="text-green-400 text-lg mb-2">NO GLOSSARY ENTRIES</div>
          <div className="text-sm text-green-600/70 text-center">
            No entries in the knowledge database.
          </div>
        </div>
      ) : (
        <>
          {/* Search and Filter Controls */}
          <div className="mb-6 flex gap-3">
            {/* Search Bar */}
            <div className="flex-1 border-2 border-green-500/30 bg-green-500/5">
              <div className="flex items-center gap-3 p-3">
                <Search className="w-4 h-4 text-green-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="SEARCH TERMS..."
                  className="flex-1 bg-transparent text-green-400 placeholder-green-600/50 outline-none font-mono text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-xs text-green-600/70 hover:text-green-400 transition-colors"
                  >
                    [CLEAR]
                  </button>
                )}
              </div>
            </div>

            {/* Filter & Sort Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                className={`h-full px-4 border-2 transition-all font-bold text-sm tracking-wider flex items-center gap-2 ${
                  filterMenuOpen
                    ? "border-green-500 bg-green-500/20 text-green-400"
                    : "border-green-500/30 bg-green-500/5 text-green-400 hover:bg-green-500/10 hover:border-green-500/50"
                }`}
              >
                <Filter className="w-4 h-4" />
                FILTERS & SORT
                <ChevronDown className={`w-4 h-4 transition-transform ${filterMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {filterMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 border-2 border-green-500/50 bg-black/95 backdrop-blur-sm z-50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <div className="p-4 space-y-4">
                    {/* Sort Section */}
                    <div>
                      <div className="text-xs text-green-600/70 mb-2 flex items-center gap-2">
                        <span>▶</span>
                        SORT BY:
                      </div>
                      <div className="space-y-1">
                        {[
                          { value: "alphabetical", label: "ALPHABETICAL" },
                          { value: "category", label: "CATEGORY" },
                          { value: "classification", label: "CLASSIFICATION" }
                        ].map(option => (
                          <button
                            key={option.value}
                            onClick={() => setSortMode(option.value as SortMode)}
                            className={`w-full text-left px-3 py-2 border text-xs font-bold tracking-wider transition-all ${
                              sortMode === option.value
                                ? "border-green-500 bg-green-500/20 text-green-400"
                                : "border-green-500/30 bg-green-500/5 text-green-600/70 hover:bg-green-500/10 hover:text-green-400"
                            }`}
                          >
                            {sortMode === option.value && <span className="mr-2">•</span>}
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter Section */}
                    <div className="border-t border-green-500/20 pt-4">
                      <div className="text-xs text-green-600/70 mb-2 flex items-center gap-2">
                        <span>▶</span>
                        FILTER BY CATEGORY:
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {categories.map(category => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-2 py-1.5 border text-[10px] font-bold tracking-wider transition-all ${
                              selectedCategory === category
                                ? "border-green-500 bg-green-500/20 text-green-400"
                                : "border-green-500/30 bg-green-500/5 text-green-600/70 hover:bg-green-500/10 hover:text-green-400"
                            }`}
                          >
                            {selectedCategory === category && <span className="mr-1">•</span>}
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Classification Filter Section */}
                    <div className="border-t border-green-500/20 pt-4">
                      <div className="text-xs text-green-600/70 mb-2 flex items-center gap-2">
                        <span>▶</span>
                        FILTER BY CLEARANCE:
                      </div>
                      <div className="space-y-1">
                        {classifications.map(classification => (
                          <button
                            key={classification}
                            onClick={() => setSelectedClassification(classification)}
                            className={`w-full text-left px-3 py-2 border text-xs font-bold tracking-wider transition-all flex items-center gap-2 ${
                              selectedClassification === classification
                                ? "border-green-500 bg-green-500/20 text-green-400"
                                : "border-green-500/30 bg-green-500/5 text-green-600/70 hover:bg-green-500/10 hover:text-green-400"
                            }`}
                          >
                            {selectedClassification === classification && <span>•</span>}
                            {classification !== "ALL" && getClassificationIcon(classification as GlossaryEntry["classification"])}
                            {classification}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Reset Button */}
                    <div className="border-t border-green-500/20 pt-4">
                      <button
                        onClick={() => {
                          setSelectedCategory("ALL");
                          setSelectedClassification("ALL");
                          setSortMode("alphabetical");
                        }}
                        className="w-full px-3 py-2 border-2 border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20 hover:border-yellow-500 transition-all text-xs font-bold text-yellow-400"
                      >
                        RESET ALL FILTERS
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Glossary Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEntries.map(entry => (
                <Link
                  key={entry.id}
                  to={`/glossary/${entry.id}`}
                  className="border-2 border-green-500/30 bg-green-500/5 p-4 hover:bg-green-500/10 hover:border-green-500/50 transition-all group hover-glow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-500 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">▶</span>
                    <h3 className="text-lg font-bold text-green-400 tracking-wider group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">
                      {entry.term}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 border font-bold tracking-wider ${getCategoryColor(entry.category)}`}>
                      {entry.category}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 border font-bold tracking-wider flex items-center gap-1 ${getClassificationColor(entry.classification)}`}>
                      {getClassificationIcon(entry.classification)}
                      {entry.classification}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredEntries.map(entry => (
                <Link
                  key={entry.id}
                  to={`/glossary/${entry.id}`}
                  className="block border-2 border-green-500/30 bg-green-500/5 p-3 hover:bg-green-500/10 hover:border-green-500/50 transition-all group hover-glow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">▶</span>
                      <h3 className="text-base font-bold text-green-400 tracking-wider group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">
                        {entry.term}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 border font-bold tracking-wider ${getCategoryColor(entry.category)}`}>
                        {entry.category}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 border font-bold tracking-wider flex items-center gap-1 ${getClassificationColor(entry.classification)}`}>
                        {getClassificationIcon(entry.classification)}
                        {entry.classification}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      <BackToTop />
    </div>
  );
}