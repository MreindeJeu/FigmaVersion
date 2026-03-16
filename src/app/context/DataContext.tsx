import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { pilots as initialPilots, deployments as initialDeployments, locations as initialLocations } from "../data/mockData";
import { glossaryEntries as initialGlossary } from "../data/glossaryData";
import type { CompconPilot, Deployment, Location } from "../data/mockData";
import type { GlossaryEntry } from "../data/glossaryData";

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
 *    - Data persisted to JSON files in ./data/ directory:
 *      • ./data/pilots.json
 *      • ./data/deployments.json  
 *      • ./data/glossary.json
 *      • ./data/locations.json
 * 
 * BACKEND API ENDPOINTS:
 * ----------------------
 * GET    /api/pilots           - Fetch all pilots
 * POST   /api/pilots           - Create new pilot
 * PUT    /api/pilots/:id       - Update existing pilot
 * DELETE /api/pilots/:id       - Delete pilot
 * 
 * GET    /api/deployments      - Fetch all deployments
 * POST   /api/deployments      - Create new deployment
 * PUT    /api/deployments/:id  - Update existing deployment
 * DELETE /api/deployments/:id  - Delete deployment
 * 
 * GET    /api/glossary         - Fetch all glossary entries
 * POST   /api/glossary         - Create new glossary entry
 * PUT    /api/glossary/:id     - Update existing glossary entry
 * DELETE /api/glossary/:id     - Delete glossary entry
 * 
 * GET    /api/locations        - Fetch all locations
 * POST   /api/locations        - Create new location
 * PUT    /api/locations/:id    - Update existing location
 * DELETE /api/locations/:id    - Delete location
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

// Use relative path so it works with Vite proxy
const API_URL = '/api';

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
        // Check if backend is available by trying to fetch with a timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000);

        const [pilotsRes, deploymentsRes, glossaryRes, locationsRes] = await Promise.all([
          fetch(`${API_URL}/pilots`, { signal: controller.signal }).catch(() => null),
          fetch(`${API_URL}/deployments`, { signal: controller.signal }).catch(() => null),
          fetch(`${API_URL}/glossary`, { signal: controller.signal }).catch(() => null),
          fetch(`${API_URL}/locations`, { signal: controller.signal }).catch(() => null)
        ]);

        clearTimeout(timeoutId);

        let dataLoaded = false;

        if (pilotsRes?.ok) {
          const pilotsData = await pilotsRes.json();
          setPilots(pilotsData);
          dataLoaded = true;
        }

        if (deploymentsRes?.ok) {
          const deploymentsData = await deploymentsRes.json();
          setDeployments(deploymentsData);
          dataLoaded = true;
        }

        if (glossaryRes?.ok) {
          const glossaryData = await glossaryRes.json();
          setGlossaryEntries(glossaryData);
          dataLoaded = true;
        }

        if (locationsRes?.ok) {
          const locationsData = await locationsRes.json();
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
      await fetch(`${API_URL}/pilots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pilot)
      });
    } catch (error) {
      console.error('Failed to save pilot to backend:', error);
    }
  };

  const updatePilot = async (id: string, updatedPilot: Partial<CompconPilot>) => {
    setPilots(prev => prev.map(p => p.id === id ? { ...p, ...updatedPilot } : p));
    
    try {
      const fullPilot = pilots.find(p => p.id === id);
      if (fullPilot) {
        await fetch(`${API_URL}/pilots/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...fullPilot, ...updatedPilot })
        });
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
      await fetch(`${API_URL}/pilots/${id}`, {
        method: 'DELETE'
      });
      
      // Update all affected deployments on the backend
      const affectedDeployments = deployments.filter(d => d.signedUpPilots.includes(id));
      for (const deployment of affectedDeployments) {
        const updatedSignedUpPilots = deployment.signedUpPilots.filter(pilotId => pilotId !== id);
        await fetch(`${API_URL}/deployments/${deployment.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...deployment,
            signedUpPilots: updatedSignedUpPilots,
            currentSignups: updatedSignedUpPilots.length
          })
        });
      }
    } catch (error) {
      console.error('Failed to delete pilot from backend:', error);
    }
  };

  const addDeployment = async (deployment: Deployment) => {
    setDeployments(prev => [...prev, deployment]);
    
    try {
      await fetch(`${API_URL}/deployments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deployment)
      });
    } catch (error) {
      console.error('Failed to save deployment to backend:', error);
    }
  };

  const updateDeployment = async (id: string, updatedDeployment: Partial<Deployment>) => {
    setDeployments(prev => prev.map(d => d.id === id ? { ...d, ...updatedDeployment } : d));
    
    try {
      const fullDeployment = deployments.find(d => d.id === id);
      if (fullDeployment) {
        await fetch(`${API_URL}/deployments/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...fullDeployment, ...updatedDeployment })
        });
      }
    } catch (error) {
      console.error('Failed to update deployment in backend:', error);
    }
  };

  const deleteDeployment = async (id: string) => {
    setDeployments(prev => prev.filter(d => d.id !== id));
    
    try {
      await fetch(`${API_URL}/deployments/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Failed to delete deployment from backend:', error);
    }
  };

  const addGlossaryEntry = async (entry: GlossaryEntry) => {
    setGlossaryEntries(prev => [...prev, entry]);
    
    try {
      await fetch(`${API_URL}/glossary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
    } catch (error) {
      console.error('Failed to save glossary entry to backend:', error);
    }
  };

  const updateGlossaryEntry = async (id: string, updatedEntry: Partial<GlossaryEntry>) => {
    setGlossaryEntries(prev => prev.map(e => e.id === id ? { ...e, ...updatedEntry } : e));
    
    try {
      const fullEntry = glossaryEntries.find(e => e.id === id);
      if (fullEntry) {
        await fetch(`${API_URL}/glossary/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...fullEntry, ...updatedEntry })
        });
      }
    } catch (error) {
      console.error('Failed to update glossary entry in backend:', error);
    }
  };

  const deleteGlossaryEntry = async (id: string) => {
    setGlossaryEntries(prev => prev.filter(e => e.id !== id));
    
    try {
      await fetch(`${API_URL}/glossary/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Failed to delete glossary entry from backend:', error);
    }
  };

  const addLocation = async (location: Location) => {
    setLocations(prev => [...prev, location]);
    
    try {
      await fetch(`${API_URL}/locations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(location)
      });
    } catch (error) {
      console.error('Failed to save location to backend:', error);
    }
  };

  const updateLocation = async (id: string, updatedLocation: Partial<Location>) => {
    setLocations(prev => prev.map(l => l.id === id ? { ...l, ...updatedLocation } : l));
    
    try {
      const fullLocation = locations.find(l => l.id === id);
      if (fullLocation) {
        await fetch(`${API_URL}/locations/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...fullLocation, ...updatedLocation })
        });
      }
    } catch (error) {
      console.error('Failed to update location in backend:', error);
    }
  };

  const deleteLocation = async (id: string) => {
    setLocations(prev => prev.filter(l => l.id !== id));
    
    try {
      await fetch(`${API_URL}/locations/${id}`, {
        method: 'DELETE'
      });
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