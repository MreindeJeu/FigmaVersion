import { useParams, useNavigate, Link } from "react-router";
import { useData } from "../context/DataContext";
import { useAdmin } from "../context/AdminContext";
import type { GlossaryEntry } from "../data/glossaryData";
import { ArrowLeft, Book, Shield, Lock, Globe, ExternalLink } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { BackToTop } from "./BackToTop";
import { ClassifiedGuard } from "./ClassifiedGuard";

export function GlossaryDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { glossaryEntries } = useData();
  const { isAdmin } = useAdmin();
  const entry = glossaryEntries.find(e => e.id === id);

  if (!entry) {
    return (
      <div className="min-h-screen p-8 font-mono flex items-center justify-center">
        <div className="border-2 border-red-500/30 bg-red-500/5 p-12 text-center max-w-2xl">
          <div className="text-red-500 text-6xl mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">
            ⚠ ERROR
          </div>
          <div className="text-2xl font-bold text-red-400 mb-4 tracking-wider">
            ENTRY NOT FOUND
          </div>
          <div className="text-sm text-red-600/70 mb-6">
            // GLOSSARY ENTRY "{id}" DOES NOT EXIST IN DATABASE
          </div>
          <button
            onClick={() => navigate("/glossary")}
            className="px-6 py-3 border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500 transition-all text-sm font-bold text-green-400 tracking-wider"
          >
            ← RETURN TO GLOSSARY
          </button>
        </div>
      </div>
    );
  }

  // Check if entry is classified and user doesn't have clearance
  if (entry.classification === "CLASSIFIED" && !isAdmin) {
    return <ClassifiedGuard />;
  }

  const getClassificationIcon = (classification: GlossaryEntry["classification"]) => {
    switch (classification) {
      case "PUBLIC":
        return <Globe className="w-4 h-4" />;
      case "RESTRICTED":
        return <Shield className="w-4 h-4" />;
      case "CLASSIFIED":
        return <Lock className="w-4 h-4" />;
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
        return "text-cyan-400 border-cyan-500/50 bg-cyan-500/10";
      case "ORGANIZATION":
        return "text-purple-400 border-purple-500/50 bg-purple-500/10";
      case "CULTURE":
        return "text-pink-400 border-pink-500/50 bg-pink-500/10";
      case "GEOGRAPHY":
        return "text-blue-400 border-blue-500/50 bg-blue-500/10";
      case "MILITARY":
        return "text-red-400 border-red-500/50 bg-red-500/10";
      case "SCIENCE":
        return "text-yellow-400 border-yellow-500/50 bg-yellow-500/10";
    }
  };

  // Function to parse definition and create links to other glossary entries
  const parseDefinitionWithLinks = (definition: string) => {
    // Create a map of terms to their IDs, sorted by length (longest first)
    const termEntries = glossaryEntries
      .filter(e => e.id !== entry.id) // Exclude current entry
      .sort((a, b) => b.term.length - a.term.length); // Sort by length descending

    let processedDefinition = definition;
    const replacements: Array<{ start: number; end: number; termId: string; originalText: string }> = [];

    // Find all occurrences of glossary terms (case-insensitive)
    termEntries.forEach(glossaryEntry => {
      const regex = new RegExp(`\\b${glossaryEntry.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      let match;
      
      while ((match = regex.exec(definition)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        
        // Check if this position overlaps with an existing replacement
        const overlaps = replacements.some(r => 
          (start >= r.start && start < r.end) || (end > r.start && end <= r.end)
        );
        
        if (!overlaps) {
          replacements.push({
            start,
            end,
            termId: glossaryEntry.id,
            originalText: match[0]
          });
        }
      }
    });

    // Sort replacements by position (reverse order for easier splicing)
    replacements.sort((a, b) => b.start - a.start);

    // Build the JSX elements
    const elements: JSX.Element[] = [];
    let lastIndex = definition.length;

    replacements.forEach((replacement, idx) => {
      // Add text after this link
      if (lastIndex > replacement.end) {
        elements.unshift(
          <span key={`text-after-${idx}`}>
            {definition.substring(replacement.end, lastIndex)}
          </span>
        );
      }
      
      // Add the link
      elements.unshift(
        <Link
          key={`link-${idx}`}
          to={`/glossary/${replacement.termId}`}
          className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/50 hover:decoration-cyan-400 transition-colors inline-flex items-center gap-0.5 group"
        >
          {replacement.originalText}
          <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      );
      
      lastIndex = replacement.start;
    });

    // Add any remaining text at the beginning
    if (lastIndex > 0) {
      elements.unshift(
        <span key="text-start">
          {definition.substring(0, lastIndex)}
        </span>
      );
    }

    return elements.length > 0 ? elements : [<span key="full-text">{definition}</span>];
  };

  // Find related entries
  const relatedEntries = entry.relatedTerms
    ? glossaryEntries.filter(e => 
        entry.relatedTerms?.some(term => 
          e.term.toLowerCase() === term.toLowerCase()
        )
      )
    : [];

  return (
    <div className="min-h-screen p-8 font-mono">
      {/* Back Button */}
      <button
        onClick={() => navigate("/glossary")}
        className="mb-6 flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
        <span className="text-sm tracking-wider">RETURN TO GLOSSARY</span>
      </button>

      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: "GLOSSARY", path: "/glossary" },
        { label: entry.term.toUpperCase() }
      ]} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entry Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-500 text-2xl drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">▶</span>
              <h1 className="text-4xl font-bold text-green-400 tracking-wider drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                {entry.term}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 border font-bold tracking-wider ${getCategoryColor(entry.category)}`}>
                {entry.category}
              </span>
              <span className={`text-xs px-3 py-1 border font-bold tracking-wider flex items-center gap-2 ${getClassificationColor(entry.classification)}`}>
                {getClassificationIcon(entry.classification)}
                {entry.classification}
              </span>
            </div>
          </div>

          {/* Definition */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Book className="w-4 h-4 text-green-600/70" />
              <h2 className="text-sm font-bold text-green-600/70 tracking-wider">DEFINITION</h2>
            </div>
            <div className="text-green-400 leading-relaxed text-base">
              {parseDefinitionWithLinks(entry.definition)}
            </div>
          </div>

          {/* Classification Notice */}
          {entry.classification !== "PUBLIC" && (
            <div className={`border-2 p-4 ${
              entry.classification === "CLASSIFIED" 
                ? "border-red-500/50 bg-red-500/5" 
                : "border-yellow-500/50 bg-yellow-500/5"
            }`}>
              <div className="flex items-start gap-3">
                {getClassificationIcon(entry.classification)}
                <div>
                  <div className={`text-xs font-bold mb-1 ${
                    entry.classification === "CLASSIFIED" ? "text-red-400" : "text-yellow-400"
                  }`}>
                    {entry.classification} INFORMATION NOTICE
                  </div>
                  <div className={`text-xs ${
                    entry.classification === "CLASSIFIED" ? "text-red-600/70" : "text-yellow-600/70"
                  }`}>
                    {entry.classification === "CLASSIFIED" 
                      ? "This information is classified and restricted to authorized Union personnel with appropriate clearance levels. Unauthorized access or distribution is prohibited."
                      : "This information is restricted and may require appropriate clearance or authorization to access in full. Distribution is controlled."}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Related Terms */}
          {relatedEntries.length > 0 && (
            <div className="border-2 border-green-500/30 bg-green-500/5 p-4 sticky top-6">
              <h2 className="text-sm font-bold text-green-600/70 tracking-wider mb-4 flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                RELATED TERMS
              </h2>
              <div className="space-y-2">
                {relatedEntries.map(relatedEntry => (
                  <Link
                    key={relatedEntry.id}
                    to={`/glossary/${relatedEntry.id}`}
                    className="block border-2 border-green-500/20 bg-green-500/5 p-3 hover:bg-green-500/10 hover:border-green-500/40 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-green-500 text-sm group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">▶</span>
                      <span className="text-sm font-bold text-green-400 group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.4)]">
                        {relatedEntry.term}
                      </span>
                    </div>
                    <div className="text-[10px] text-green-600/70 pl-5">
                      {relatedEntry.category}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-4">
            <h2 className="text-sm font-bold text-green-600/70 tracking-wider mb-4">
              QUICK ACTIONS
            </h2>
            <div className="space-y-2">
              <Link
                to="/glossary"
                className="block w-full px-3 py-2 border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500 transition-all text-xs font-bold text-green-400 text-center"
              >
                VIEW ALL ENTRIES
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="block w-full px-3 py-2 border-2 border-green-500/30 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/50 transition-all text-xs font-bold text-green-400 text-center"
              >
                ← GO BACK
              </button>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
}