import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import { InitScreen } from "./components/InitScreen";
import { Dashboard } from "./components/Dashboard";
import { PilotsScreen } from "./components/PilotsScreen";
import { PilotDetailScreen } from "./components/PilotDetailScreen";
import { MechDetailScreen } from "./components/MechDetailScreen";
import { DeploymentsScreen } from "./components/DeploymentsScreen";
import { DeploymentDetailScreen } from "./components/DeploymentDetailScreen";
import { LocationsScreen } from "./components/LocationsScreen";
import { AdminPanel } from "./components/AdminPanel";
import { GlossaryScreen } from "./components/GlossaryScreen";
import { GlossaryDetailScreen } from "./components/GlossaryDetailScreen";
import { NewsStory } from "./components/NewsStory";
import { DataProvider } from "./context/DataContext";
import { AdminProvider } from "./context/AdminContext";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ROUTING CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * React Router configuration for the V.A.N.G.U.A.R.D. system.
 * 
 * ROUTE STRUCTURE:
 * ----------------
 * /                        → InitScreen (boot sequence, shows once)
 * /dashboard               → Main overview with stats and news ticker
 * /pilots                  → Pilot roster list
 * /pilots/:id              → Individual pilot details
 * /deployments             → Mission deployment list
 * /deployments/:id         → Individual deployment details
 * /locations               → Theater of operations (coming soon)
 * /glossary                → Lore entries and terminology
 * /glossary/:id            → Individual glossary entry (with access control)
 * /admin                   → Admin panel (requires [COMMAND] clearance)
 * /news/:headline          → Individual news story details
 * 
 * ACCESS CONTROL:
 * ---------------
 * - Most routes: [AUXILIARY] clearance (public)
 * - /admin: [COMMAND] clearance required (code: 3825)
 * - Classified glossary entries: visible but redirect to access denied
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Wrapper component to provide context to all routes
function RootWithProviders() {
  return (
    <AdminProvider>
      <DataProvider>
        <Root />
      </DataProvider>
    </AdminProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootWithProviders,
    children: [
      { index: true, Component: InitScreen },
      { path: "dashboard", Component: Dashboard },
      { path: "pilots", Component: PilotsScreen },
      { path: "pilots/:id", Component: PilotDetailScreen },
      { path: "pilots/:pilotId/mechs/:mechId", Component: MechDetailScreen },
      { path: "deployments", Component: DeploymentsScreen },
      { path: "deployments/:id", Component: DeploymentDetailScreen },
      { path: "locations", Component: LocationsScreen },
      { path: "admin", Component: AdminPanel },
      { path: "glossary", Component: GlossaryScreen },
      { path: "glossary/:id", Component: GlossaryDetailScreen },
      { path: "news/:headline", Component: NewsStory },
    ],
  },
]);