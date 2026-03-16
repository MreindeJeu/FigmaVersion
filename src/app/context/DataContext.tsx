import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { pilots as initialPilots, deployments as initialDeployments, locations as initialLocations } from "../data/mockData";
import { glossaryEntries as initialGlossary } from "../data/glossaryData";
import type { CompconPilot, Deployment, Location } from "../data/mockData";
import type { GlossaryEntry } from "../data/glossaryData";
import * as api from "../services/api";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DATA CONTEXT - BACKEND INTEGRATION LAYER
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This is the PRIMARY BACKEND ATTACHMENT POINT for the V.A.N.G.U.A.R.D. system.
 * 
 * DUAL MODE OPERATION:
 * ---------------------
 * 1. FIGMA MAKE MODE (Session-Only):
 *    - Uses in-memory state with initial data from mockData.ts & glossaryData.ts
 *    - Changes persist during the session but reset on page reload
 *    - No backend server required
 * 
 * 2. VISUAL STUDIO MODE (File-Based Persistence):
 *    - Connects to Node.js backend server running on port 3001
 *    - API proxied through Vite to '/api' endpoints
 *    - Data persisted to individual JSON files in ./data/ subdirectories:
 *      • ./data/pilots/ - One JSON file per pilot (e.g., P001.json)
 *      • ./data/deployments/ - One JSON file per deployment (e.g., D001.json)
 *      • ./data/glossary/ - One JSON file per glossary entry
 *      • ./data/locations/ - One JSON file per location
 *    - Files can be edited directly or through the admin panel
 *    - Backend watches for file changes in real-time
 * 
 * All data access now goes through the centralized API service layer
 * in /src/app/services/api.ts for clean separation of concerns.
 * 
 * BACKEND API ENDPOINTS:
 * ----------------------
 * See /src/app/services/api.ts for complete API documentation
 * 
 * BACKEND SERVER SETUP:
 * ---------------------
 * To enable file-based persistence in Visual Studio:
 * 1. Run: npm run server
 * 2. Backend starts on http://localhost:3001
 * 3. Frontend proxy redirects /api → http://localhost:3001/api
 * 
 * The system gracefully falls back to session-only mode if backend unavailable.
 * 
 * ══════════════════════════════════════════════════════════════════════════
 */

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  date: string;
  type: "normal" | "union" | "breaking";
}

interface DataContextType {
  pilots: CompconPilot[];
  deployments: Deployment[];
  glossaryEntries: GlossaryEntry[];
  locations: Location[];
  newsItems: NewsItem[];
  isLoading: boolean;
  addPilot: (pilot: CompconPilot) => void;
  updatePilot: (id: string, pilot: Partial<CompconPilot>) => void;
  deletePilot: (id: string) => void;
  addDeployment: (deployment: Deployment) => void;
  updateDeployment: (id: string, deployment: Partial<Deployment>) => void;
  deleteDeployment: (id: string) => void;
  addGlossaryEntry: (entry: GlossaryEntry) => void;
  updateGlossaryEntry: (id: string, entry: Partial<GlossaryEntry>) => void;
  deleteGlossaryEntry: (id: string) => void;
  addLocation: (location: Location) => void;
  updateLocation: (id: string, location: Partial<Location>) => void;
  deleteLocation: (id: string) => void;
  setNewsItems: React.Dispatch<React.SetStateAction<NewsItem[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [pilots, setPilots] = useState<CompconPilot[]>(initialPilots);
  const [deployments, setDeployments] = useState<Deployment[]>(initialDeployments);
  const [glossaryEntries, setGlossaryEntries] = useState<GlossaryEntry[]>(initialGlossary);
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data from backend
  useEffect(() => {
    async function fetchData() {
      try {
        // Use centralized API service layer
        const [pilotsData, deploymentsData, glossaryData, locationsData] = await Promise.all([
          api.fetchPilots().catch(() => null),
          api.fetchDeployments().catch(() => null),
          api.fetchGlossary().catch(() => null),
          api.fetchLocations().catch(() => null),
        ]);

        let dataLoaded = false;

        if (pilotsData) {
          setPilots(pilotsData);
          dataLoaded = true;
        }

        if (deploymentsData) {
          setDeployments(deploymentsData);
          dataLoaded = true;
        }

        if (glossaryData) {
          setGlossaryEntries(glossaryData);
          dataLoaded = true;
        }

        if (locationsData) {
          setLocations(locationsData);
          dataLoaded = true;
        }

        if (!dataLoaded) {
          console.log('📡 Backend not available - using local data (run "npm run server" to enable file-based storage)');
        }

        setIsLoading(false);
      } catch (error) {
        console.log('📡 Backend not available - using local data (run "npm run server" to enable file-based storage)');
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const addPilot = async (pilot: CompconPilot) => {
    setPilots(prev => [...prev, pilot]);
    
    try {
      await api.createPilot(pilot);
    } catch (error) {
      console.error('Failed to save pilot to backend:', error);
    }
  };

  const updatePilot = async (id: string, updatedPilot: Partial<CompconPilot>) => {
    setPilots(prev => prev.map(p => p.id === id ? { ...p, ...updatedPilot } : p));
    
    try {
      const fullPilot = pilots.find(p => p.id === id);
      if (fullPilot) {
        await api.updatePilot(id, { ...fullPilot, ...updatedPilot });
      }
    } catch (error) {
      console.error('Failed to update pilot in backend:', error);
    }
  };

  const deletePilot = async (id: string) => {
    setPilots(prev => prev.filter(p => p.id !== id));
    
    // Also remove the pilot from all deployment signups
    setDeployments(prev => prev.map(deployment => {
      if (deployment.signedUpPilots.includes(id)) {
        const updatedSignedUpPilots = deployment.signedUpPilots.filter(pilotId => pilotId !== id);
        return {
          ...deployment,
          signedUpPilots: updatedSignedUpPilots,
          currentSignups: updatedSignedUpPilots.length
        };
      }
      return deployment;
    }));
    
    try {
      await api.deletePilot(id);
      
      // Update all affected deployments on the backend
      const affectedDeployments = deployments.filter(d => d.signedUpPilots.includes(id));
      for (const deployment of affectedDeployments) {
        const updatedSignedUpPilots = deployment.signedUpPilots.filter(pilotId => pilotId !== id);
        await api.updateDeployment(deployment.id, {
          ...deployment,
          signedUpPilots: updatedSignedUpPilots,
          currentSignups: updatedSignedUpPilots.length
        });
      }
    } catch (error) {
      console.error('Failed to delete pilot from backend:', error);
    }
  };

  const addDeployment = async (deployment: Deployment) => {
    setDeployments(prev => [...prev, deployment]);
    
    try {
      await api.createDeployment(deployment);
    } catch (error) {
      console.error('Failed to save deployment to backend:', error);
    }
  };

  const updateDeployment = async (id: string, updatedDeployment: Partial<Deployment>) => {
    setDeployments(prev => prev.map(d => d.id === id ? { ...d, ...updatedDeployment } : d));
    
    try {
      const fullDeployment = deployments.find(d => d.id === id);
      if (fullDeployment) {
        await api.updateDeployment(id, { ...fullDeployment, ...updatedDeployment });
      }
    } catch (error) {
      console.error('Failed to update deployment in backend:', error);
    }
  };

  const deleteDeployment = async (id: string) => {
    setDeployments(prev => prev.filter(d => d.id !== id));
    
    try {
      await api.deleteDeployment(id);
    } catch (error) {
      console.error('Failed to delete deployment from backend:', error);
    }
  };

  const addGlossaryEntry = async (entry: GlossaryEntry) => {
    setGlossaryEntries(prev => [...prev, entry]);
    
    try {
      await api.createGlossaryEntry(entry);
    } catch (error) {
      console.error('Failed to save glossary entry to backend:', error);
    }
  };

  const updateGlossaryEntry = async (id: string, updatedEntry: Partial<GlossaryEntry>) => {
    setGlossaryEntries(prev => prev.map(e => e.id === id ? { ...e, ...updatedEntry } : e));
    
    try {
      const fullEntry = glossaryEntries.find(e => e.id === id);
      if (fullEntry) {
        await api.updateGlossaryEntry(id, { ...fullEntry, ...updatedEntry });
      }
    } catch (error) {
      console.error('Failed to update glossary entry in backend:', error);
    }
  };

  const deleteGlossaryEntry = async (id: string) => {
    setGlossaryEntries(prev => prev.filter(e => e.id !== id));
    
    try {
      await api.deleteGlossaryEntry(id);
    } catch (error) {
      console.error('Failed to delete glossary entry from backend:', error);
    }
  };

  const addLocation = async (location: Location) => {
    setLocations(prev => [...prev, location]);
    
    try {
      await api.createLocation(location);
    } catch (error) {
      console.error('Failed to save location to backend:', error);
    }
  };

  const updateLocation = async (id: string, updatedLocation: Partial<Location>) => {
    setLocations(prev => prev.map(l => l.id === id ? { ...l, ...updatedLocation } : l));
    
    try {
      const fullLocation = locations.find(l => l.id === id);
      if (fullLocation) {
        await api.updateLocation(id, { ...fullLocation, ...updatedLocation });
      }
    } catch (error) {
      console.error('Failed to update location in backend:', error);
    }
  };

  const deleteLocation = async (id: string) => {
    setLocations(prev => prev.filter(l => l.id !== id));
    
    try {
      await api.deleteLocation(id);
    } catch (error) {
      console.error('Failed to delete location from backend:', error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        pilots,
        deployments,
        glossaryEntries,
        locations,
        newsItems,
        isLoading,
        addPilot,
        updatePilot,
        deletePilot,
        addDeployment,
        updateDeployment,
        deleteDeployment,
        addGlossaryEntry,
        updateGlossaryEntry,
        deleteGlossaryEntry,
        addLocation,
        updateLocation,
        deleteLocation,
        setNewsItems
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}