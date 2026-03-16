import { RouterProvider } from 'react-router';
import { router } from './routes';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * V.A.N.G.U.A.R.D. SYSTEM - MAIN APPLICATION ENTRY POINT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Volitional Asset Network for Guided Union Auxiliary Reserve Deployment
 * 
 * A diegetic dashboard website for Lancer TTRPG campaigns featuring:
 * - Retro CRT terminal aesthetic with phosphor green text and scan lines
 * - Dual-mode operation (session-only in Figma Make, file-based in VS Code)
 * - Diegetic [AUXILIARY]/[COMMAND] clearance authentication
 * - Full CRUD for pilots, deployments, and glossary entries
 * - Immersive terminal boot sequence
 * - Persistent system uptime tracking
 * - Classified content access control
 * 
 * ADMIN ACCESS CODE: 3825
 * 
 * PROJECT STRUCTURE:
 * ------------------
 * /src/app/
 *   ├── App.tsx              ← Entry point (this file)
 *   ├── routes.tsx           ← React Router configuration with providers
 *   ├── context/             ← State management
 *   │   ├── AdminContext.tsx ← Authentication (COMMAND clearance)
 *   │   └── DataContext.tsx  ← Backend API integration (PRIMARY ATTACHMENT POINT)
 *   ├── components/          ← Reusable UI components
 *   │   ├── InitScreen.tsx   ← Boot sequence animation
 *   │   └── Sidebar.tsx      ← Navigation with collapsible functionality
 *   ├── data/                ← Mock data and initial content
 *   │   ├── mockData.ts      ← Pilots & deployments initial data
 *   │   └── glossaryData.ts  ← Glossary entries initial data
 *   └── [pages]/             ← Route pages (Dashboard, Pilots, Admin, etc.)
 * 
 * BACKEND INTEGRATION (VS Code Mode):
 * ------------------------------------
 * - Backend server: server.js (Node.js + Express)
 * - Data storage: ./data/*.json files
 * - API proxy: Vite proxies /api → http://localhost:3001/api
 * - Start server: npm run server
 * 
 * See DataContext.tsx for complete API documentation.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

export default function App() {
  return <RouterProvider router={router} />;
}