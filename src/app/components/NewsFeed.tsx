import { useState, useEffect } from "react";
import { Newspaper } from "lucide-react";
import { useNavigate } from "react-router";
import { useData, type NewsItem } from "../context/DataContext";

// All available news headlines
const NEWS_POOL = {
  normal: [
    { headline: "Harrison Armory Faces Sanctions Following Illegal Weapons Tests in Neutral Space", source: "GALACTIC UNION TRIBUNE" },
    { headline: "HORUS Collective Continues Pattern Recognition Research Despite Controversy", source: "TECH OBSERVER" },
    { headline: "IPS-N Announces Next Generation \"Raleigh\" Frame with Enhanced Mobility Systems", source: "MECH DEVELOPMENT WEEKLY" },
    { headline: "Colonial Administration Reports Successful Terraforming Milestone on New Prosperity", source: "FRONTIER CHRONICLE" },
    { headline: "Smith-Shimano Corpro Unveils Luxury Mech Line for Private Security Markets", source: "CORP WATCH" },
    { headline: "Pirate Activity Increases Along Diasporan Trade Routes, Merchants Seek Protection", source: "TRADE NETWORKS TODAY" },
    { headline: "Karrakin Trade Baronies Sign Economic Partnership with Rim Colonies", source: "ECONOMIC DIGEST" },
    { headline: "New Paternova NHP Development Sparks Ethical Debate in Scientific Community", source: "SCIENCE & ETHICS QUARTERLY" },
    { headline: "Mercenary Company \"Dust Devils\" Completes Successful Colonial Defense Contract", source: "MERC MARKETPLACE" },
    { headline: "Blinkspace Gate Malfunction Delays Traffic in Argo System for 72 Hours", source: "TRANSIT AUTHORITY NEWS" },
    { headline: "Independent Pilots Report Strange Readings Near Ungoverned Space Boundaries", source: "FREELANCER'S GAZETTE" },
    { headline: "Mech Combat Tournament on Creighton Station Draws Record Viewership", source: "ARENA SPORTS NETWORK" },
    { headline: "Long Rim Mining Consortium Discovers Rare Element Deposits on Asteroid Belt", source: "MINING INDUSTRY REPORT" },
    { headline: "Technophile Movement Gains Traction Among Youth in Core Worlds", source: "CULTURAL TRENDS" },
    { headline: "Former Harrison Armory Exec Defects, Shares Internal Documents with Union", source: "UNION INTELLIGENCE BULLETIN" },
    { headline: "Interstellar Medical Corps Responds to Outbreak on Remote Agricultural World", source: "HEALTH & WELFARE NEWS" },
    { headline: "Landmark Legal Case Challenges NHP Rights Across Multiple Jurisdictions", source: "LEGAL OBSERVER" },
    { headline: "Veteran Lancers Establish Training Academy for Auxiliary Reserve Pilots", source: "PILOT PROFESSIONAL" },
    { headline: "Orbital Habitat Construction Boom Continues in Developed Systems", source: "INFRASTRUCTURE TODAY" },
    { headline: "Black Market Mech Parts Ring Dismantled by Union Investigators", source: "CRIME & JUSTICE WEEKLY" },
  ],
  union: [
    { headline: "Dr. Elena Vasquez Receives Union Achievement Award for Agricultural Innovation", source: "UNION COMMUNITY BULLETIN" },
    { headline: "Local Charity Drive on Cradle Raises 2 Million Credits for Orphaned Children", source: "UNION COMMUNITY BULLETIN" },
    { headline: "Amateur Gardening Club on Station Telos Wins Interstellar Horticulture Competition", source: "UNION COMMUNITY BULLETIN" },
    { headline: "Union Administrative Services Updates Filing Procedures for Colonial Permits", source: "UNION ADMINISTRATIVE GAZETTE" },
    { headline: "Student Orchestra from Enceladus Conservatory Performs at Union Day Celebration", source: "UNION CULTURAL AFFAIRS" },
    { headline: "Union Science Directorate Publishes Breakthrough Climate Restoration Methodology", source: "UNION SCIENTIFIC JOURNAL" },
    { headline: "Union Educational Exchange Program Celebrates 10,000th Graduate", source: "UNION COMMUNITY BULLETIN" },
    { headline: "Union Peacekeeping Forces Receive Humanitarian Award for Disaster Relief", source: "UNION ADMINISTRATIVE GAZETTE" },
    { headline: "Union Infrastructure Initiative Completes 500th Blinkspace Gate Installation", source: "UNION ENGINEERING CORPS" },
    { headline: "Union Cultural Heritage Committee Announces New Museum on Cradle", source: "UNION CULTURAL AFFAIRS" },
  ],
  breaking: [
    { headline: "BREAKING: Unidentified Mech Squadron Engages Harrison Armory Forces in Disputed Zone", source: "EMERGENCY BROADCAST SYSTEM" },
    { headline: "BREAKING: Union Fleet Mobilizes Following Distress Signals from Frontier Colony", source: "EMERGENCY BROADCAST SYSTEM" },
    { headline: "BREAKING: Major Blinkspace Anomaly Detected Near Populated Star System", source: "EMERGENCY BROADCAST SYSTEM" },
    { headline: "BREAKING: SecComm Raises Threat Level Following Intelligence on Pirate Armada", source: "EMERGENCY BROADCAST SYSTEM" },
    { headline: "BREAKING: Critical Infrastructure Failure on Core World Sparks Evacuation Orders", source: "EMERGENCY BROADCAST SYSTEM" },
    { headline: "BREAKING: Massive Solar Flare Threatens Communications in Three Star Systems", source: "EMERGENCY BROADCAST SYSTEM" },
    { headline: "BREAKING: Unknown Vessels Detected Entering Prohibited Quarantine Zone", source: "EMERGENCY BROADCAST SYSTEM" },
    { headline: "BREAKING: Terrorist Attack on Union Diplomatic Station Claims Multiple Casualties", source: "EMERGENCY BROADCAST SYSTEM" },
    { headline: "BREAKING: Rogue AI Incident Triggers Lockdown on Industrial Manufacturing World", source: "EMERGENCY BROADCAST SYSTEM" },
    { headline: "BREAKING: First Contact Event Reported in Deep Space Exploration Sector", source: "EMERGENCY BROADCAST SYSTEM" },
  ],
};

function getRandomDate() {
  const today = new Date(5016, 2, 13); // March 13, 5016u
  const daysAgo = Math.floor(Math.random() * 7);
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

function getRandomInterval() {
  return Math.floor(Math.random() * (60000 - 15000 + 1)) + 15000; // 15-60 seconds in ms
}

export function NewsFeed() {
  const [fadeOutId, setFadeOutId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { newsItems, setNewsItems } = useData();

  // Initialize news feed with 5 items only if empty
  useEffect(() => {
    if (newsItems.length > 0) return; // Already initialized
    
    const initialNews: NewsItem[] = [];
    const usedHeadlines = new Set<string>();
    
    // Add 1 breaking news
    const breakingItem = NEWS_POOL.breaking[Math.floor(Math.random() * NEWS_POOL.breaking.length)];
    initialNews.push({
      id: `breaking-${Date.now()}`,
      ...breakingItem,
      date: getRandomDate(),
      type: "breaking",
    });
    usedHeadlines.add(breakingItem.headline);
    
    // Add 1 union news
    let unionItem;
    do {
      unionItem = NEWS_POOL.union[Math.floor(Math.random() * NEWS_POOL.union.length)];
    } while (usedHeadlines.has(unionItem.headline));
    initialNews.push({
      id: `union-${Date.now()}`,
      ...unionItem,
      date: getRandomDate(),
      type: "union",
    });
    usedHeadlines.add(unionItem.headline);
    
    // Add 3 normal news
    for (let i = 0; i < 3; i++) {
      let normalItem;
      do {
        normalItem = NEWS_POOL.normal[Math.floor(Math.random() * NEWS_POOL.normal.length)];
      } while (usedHeadlines.has(normalItem.headline));
      
      initialNews.push({
        id: `normal-${Date.now()}-${i}`,
        ...normalItem,
        date: getRandomDate(),
        type: "normal",
      });
      usedHeadlines.add(normalItem.headline);
    }
    
    setNewsItems(initialNews);
  }, [newsItems.length, setNewsItems]);

  // Dynamic news ticker
  useEffect(() => {
    const addNewItem = () => {
      // Determine what type of news to add based on current feed composition
      const breakingCount = newsItems.filter(item => item.type === "breaking").length;
      const unionCount = newsItems.filter(item => item.type === "union").length;
      const normalCount = newsItems.filter(item => item.type === "normal").length;
      
      // Get currently displayed headlines to avoid duplicates
      const currentHeadlines = new Set(newsItems.map(item => item.headline));
      
      let newType: "normal" | "union" | "breaking";
      const rand = Math.random();
      
      // Logic to maintain constraints
      if (breakingCount >= 1 && unionCount >= 2) {
        newType = "normal";
      } else if (breakingCount >= 1 && rand < 0.7) {
        newType = unionCount >= 2 ? "normal" : rand < 0.5 ? "normal" : "union";
      } else if (unionCount >= 2) {
        newType = breakingCount >= 1 ? "normal" : rand < 0.8 ? "normal" : "breaking";
      } else {
        // Random selection with weights
        if (rand < 0.65) {
          newType = "normal";
        } else if (rand < 0.85) {
          newType = unionCount >= 2 ? "normal" : "union";
        } else {
          newType = breakingCount >= 1 ? (unionCount >= 2 ? "normal" : "union") : "breaking";
        }
      }
      
      // Select random item from chosen type, ensuring no duplicates
      const pool = NEWS_POOL[newType];
      let selectedItem;
      let attempts = 0;
      const maxAttempts = 50; // Prevent infinite loops
      
      do {
        selectedItem = pool[Math.floor(Math.random() * pool.length)];
        attempts++;
        // If we've tried too many times, just pick any item not in current feed
        if (attempts >= maxAttempts) {
          const availableItems = pool.filter(item => !currentHeadlines.has(item.headline));
          if (availableItems.length > 0) {
            selectedItem = availableItems[0];
            break;
          } else {
            // If all items are in current feed, just use a random one (edge case)
            selectedItem = pool[Math.floor(Math.random() * pool.length)];
            break;
          }
        }
      } while (currentHeadlines.has(selectedItem.headline));
      
      const newItem: NewsItem = {
        id: `${newType}-${Date.now()}`,
        ...selectedItem,
        date: getRandomDate(),
        type: newType,
      };
      
      // Find oldest item to remove
      const oldestItem = newsItems[newsItems.length - 1];
      
      // Fade out oldest
      setFadeOutId(oldestItem.id);
      
      // After fade animation, update the list
      setTimeout(() => {
        setNewsItems(prev => [newItem, ...prev.slice(0, -1)]);
        setFadeOutId(null);
      }, 500);
    };

    const interval = setInterval(addNewItem, getRandomInterval());
    
    return () => clearInterval(interval);
  }, [newsItems, setNewsItems]);

  const getItemStyle = (type: NewsItem["type"]) => {
    switch (type) {
      case "breaking":
        return { color: "text-red-500", bullet: "█" };
      case "union":
        return { color: "text-blue-400", bullet: "▪" };
      default:
        return { color: "text-green-500", bullet: "▪" };
    }
  };

  const getTypeLabel = (type: NewsItem["type"]) => {
    switch (type) {
      case "breaking":
        return "[BREAKING] ";
      case "union":
        return "[UNION] ";
      default:
        return "";
    }
  };

  const handleNewsClick = (item: NewsItem) => {
    // Navigate to detailed news story view
    navigate(`/news/${encodeURIComponent(item.headline)}`, { 
      state: { newsItem: item },
      replace: false 
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Newspaper className="w-4 h-4 text-green-500" />
        <h2 className="text-sm font-bold text-green-500 tracking-wider">// UNION NEWS FEED</h2>
        <div className="flex-1 h-px bg-green-500/30" />
      </div>
      
      <div className="border-2 border-green-500/30 bg-green-500/5 font-mono text-xs overflow-hidden">
        {newsItems.map((item, index) => {
          const style = getItemStyle(item.type);
          const isFadingOut = fadeOutId === item.id;
          const isNew = index === 0 && !isFadingOut;
          
          return (
            <div
              key={item.id}
              className={`block min-h-[4.5rem] ${index < newsItems.length - 1 ? 'border-b-2 border-green-500/20' : ''} hover:bg-green-500/10 transition-all duration-500 cursor-pointer ${isFadingOut ? 'opacity-0 h-0 overflow-hidden p-0' : 'opacity-100 p-3'}`}
              onClick={() => handleNewsClick(item)}
            >
              <div className="flex items-start gap-3">
                <span className={`${style.color} ${isNew ? 'animate-pulse' : ''}`}>{style.bullet}</span>
                <div className="flex-1">
                  <div className="text-green-400 mb-1 hover:text-green-300 transition-colors">
                    {item.type === "breaking" && <span className="text-red-500 font-bold animate-pulse">[BREAKING] </span>}
                    {item.type === "union" && <span className="text-blue-400">[UNION] </span>}
                    {item.headline}
                  </div>
                  <span className="text-green-600/70 text-[10px]">{item.source} // {item.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}