import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import { InitScreen } from "./components/InitScreen";
import { Dashboard } from "./components/Dashboard";
import { PilotsScreen } from "./components/PilotsScreen";
import { PilotDetailScreen } from "./components/PilotDetailScreen";
import { DeploymentsScreen } from "./components/DeploymentsScreen";
import { DeploymentDetailScreen } from "./components/DeploymentDetailScreen";
import { LocationsScreen } from "./components/LocationsScreen";
import { AdminPanel } from "./components/AdminPanel";
import { GlossaryScreen } from "./components/GlossaryScreen";
import { GlossaryDetailScreen } from "./components/GlossaryDetailScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: InitScreen },
      { path: "dashboard", Component: Dashboard },
      { path: "pilots", Component: PilotsScreen },
      { path: "pilots/:id", Component: PilotDetailScreen },
      { path: "deployments", Component: DeploymentsScreen },
      { path: "deployments/:id", Component: DeploymentDetailScreen },
      { path: "locations", Component: LocationsScreen },
      { path: "admin", Component: AdminPanel },
      { path: "glossary", Component: GlossaryScreen },
      { path: "glossary/:id", Component: GlossaryDetailScreen },
    ],
  },
]);