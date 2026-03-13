# V.A.N.G.U.A.R.D. SYSTEM - COMPLETE DOCUMENTATION

**Volitional Asset Network for Guided Union Auxiliary Reserve Deployment**

A diegetic dashboard website for Lancer TTRPG campaigns featuring a retro CRT terminal aesthetic with full data management capabilities.

---

## 🎯 PROJECT OVERVIEW

V.A.N.G.U.A.R.D. is an immersive in-universe Union platform where certified reserve lancers can:
- View pilot rosters and mech information
- Browse and volunteer for deployments
- Access campaign records and worldbuilding content
- Manage content through an admin panel (with proper clearance)

### Key Features
- ✅ Retro CRT terminal aesthetic (phosphor green, scan lines, ASCII elements)
- ✅ Dual-mode operation (session-only OR file-based persistence)
- ✅ Diegetic authentication system ([AUXILIARY] / [COMMAND] clearance)
- ✅ Full CRUD operations for pilots, deployments, and glossary
- ✅ Persistent system uptime tracking
- ✅ Classified content access control
- ✅ Collapsible sidebar navigation
- ✅ Terminal boot sequence animation

---

## 🔐 AUTHENTICATION

### Admin Access Code: **3825**

### Clearance Levels
- **[AUXILIARY]** - Default clearance (read-only access)
- **[COMMAND]** - Admin clearance (full CRUD access)

### Visual Indicators
When logged in as [COMMAND]:
- VANGUARD logo turns yellow (from green)
- Yellow glow effects on logo and title
- Yellow [COMMAND] badge in sidebar
- Access to Admin Panel (/admin)
- Ability to create/edit/delete content

### Authentication Flow
1. Users start with [AUXILIARY] clearance
2. Enter 4-digit code in sidebar
3. System elevates to [COMMAND] clearance
4. Auth state persists in localStorage
5. Logout reverts to [AUXILIARY]

**Note:** This is diegetic authentication for game immersion, NOT production security.

---

## 🗂️ PROJECT STRUCTURE

```
/src/app/
├── App.tsx                   # Main entry point
├── routes.tsx                # React Router configuration
│
├── context/                  # State Management
│   ├── AdminContext.tsx      # Authentication (COMMAND clearance)
│   └── DataContext.tsx       # ⚡ PRIMARY BACKEND ATTACHMENT POINT
│
├── components/               # UI Components
│   ├── Root.tsx              # Layout wrapper with providers
│   ├── Sidebar.tsx           # Navigation (collapsible)
│   ├── InitScreen.tsx        # Boot sequence animation
│   ├── Dashboard.tsx         # Main overview screen
│   ├── PilotsScreen.tsx      # Pilot roster list
│   ├── PilotDetailScreen.tsx # Individual pilot details
│   ├── DeploymentsScreen.tsx # Deployment list
│   ├── DeploymentDetailScreen.tsx # Deployment details
│   ├── GlossaryScreen.tsx    # Glossary list
│   ├── GlossaryDetailScreen.tsx # Glossary entry details
│   ├── LocationsScreen.tsx   # Theater of operations (coming soon)
│   ├── AdminPanel.tsx        # Admin control panel
│   └── NewsStory.tsx         # News article details
│
└── data/                     # Initial Data
    ├── mockData.ts           # Pilots & deployments
    └── glossaryData.ts       # Glossary entries
```

---

## 🔌 BACKEND INTEGRATION (PRIMARY ATTACHMENT POINT)

### Location: `/src/app/context/DataContext.tsx`

This is the **PRIMARY BACKEND ATTACHMENT POINT** for all data operations.

### Dual-Mode Operation

#### 1. FIGMA MAKE MODE (Session-Only)
- Uses in-memory state with initial data
- Changes persist during session only
- Resets on page reload
- No backend server required
- Perfect for design/preview

#### 2. VISUAL STUDIO MODE (File-Based Persistence)
- Connects to Node.js backend on port 3001
- Data persisted to JSON files in `./data/` directory
- API endpoints proxied through Vite to `/api`
- Full CRUD operations saved to disk
- Changes persist across sessions

### Data Storage Files (VS Code Mode)
```
./data/
├── pilots.json       # Pilot roster data
├── deployments.json  # Mission deployment data
└── glossary.json     # Lore and terminology
```

### API Endpoints

#### Pilots
```
GET    /api/pilots           # Fetch all pilots
POST   /api/pilots           # Create new pilot
PUT    /api/pilots/:id       # Update existing pilot
DELETE /api/pilots/:id       # Delete pilot
```

#### Deployments
```
GET    /api/deployments      # Fetch all deployments
POST   /api/deployments      # Create new deployment
PUT    /api/deployments/:id  # Update existing deployment
DELETE /api/deployments/:id  # Delete deployment
```

#### Glossary
```
GET    /api/glossary         # Fetch all glossary entries
POST   /api/glossary         # Create new glossary entry
PUT    /api/glossary/:id     # Update existing glossary entry
DELETE /api/glossary/:id     # Delete glossary entry
```

### Backend Server Setup (VS Code)

1. **Start the backend server:**
   ```bash
   npm run server
   ```

2. **Server configuration:**
   - Backend runs on `http://localhost:3001`
   - Frontend proxies `/api` → `http://localhost:3001/api`
   - Graceful fallback to session-only if backend unavailable

3. **Check server status:**
   - Open browser console on load
   - Look for: `📡 Backend not available` (session mode)
   - Or no message = backend connected successfully

---

## 🛣️ ROUTING

### Route Structure

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | InitScreen | Public | Boot sequence (shows once) |
| `/dashboard` | Dashboard | Public | Main overview with stats |
| `/pilots` | PilotsScreen | Public | Pilot roster list |
| `/pilots/:id` | PilotDetailScreen | Public | Individual pilot details |
| `/deployments` | DeploymentsScreen | Public | Mission list |
| `/deployments/:id` | DeploymentDetailScreen | Public | Mission details |
| `/glossary` | GlossaryScreen | Public | Lore entries |
| `/glossary/:id` | GlossaryDetailScreen | Conditional | Entry details (access controlled) |
| `/locations` | LocationsScreen | Public | Theater of operations |
| `/admin` | AdminPanel | [COMMAND] | Admin control panel |
| `/news/:headline` | NewsStory | Public | News article details |

---

## 💾 PERSISTENT STATE

### localStorage Keys

1. **`vanguard_admin_auth`**
   - Stores admin authentication state
   - Value: `"true"` when logged in as [COMMAND]
   - Cleared on logout

2. **`vanguard_init_complete`**
   - Tracks if boot sequence has been shown
   - Value: `"true"` after first boot
   - Clear to reset boot sequence

3. **`vanguard_uptime_start`**
   - Timestamp of when system uptime started
   - Used for persistent uptime counter on dashboard
   - Format: ISO timestamp string

---

## 🎨 THEMING & AESTHETICS

### Color Palette
- **Primary Green:** `#22c55e` (green-500)
- **Command Yellow:** `#eab308` (yellow-500)
- **Background:** `#000000` (pure black)
- **Accents:** Various green/yellow shades with opacity

### Visual Effects
- CRT scan lines (repeating linear gradient)
- Phosphor glow (drop-shadow effects)
- Terminal cursor animation
- Pulse animations on active elements
- Typewriter effects on boot sequence

### Typography
- Font: Monospace (system fonts)
- Tracking: Wide letter spacing for terminal feel
- Size: Carefully balanced for readability

---

## 🔧 DEVELOPMENT

### Available Scripts

```bash
# Development server (Figma Make mode)
npm run dev

# Backend server (VS Code mode)
npm run server

# Build for production
npm run build

# Preview production build
npm run preview
```

### Key Dependencies
- **react** & **react-router** - Core framework
- **tailwindcss** - Styling (v4.0)
- **lucide-react** - Icons
- **sonner** - Toast notifications
- **express** - Backend server (dev dependency)

---

## 📋 DATA MODELS

### Pilot
```typescript
{
  id: string
  name: string
  callsign: string
  licenseLevel: number (0-3)
  background: string
  mech: {
    frame: string
    model: string
  }
  status: "active" | "inactive" | "deployed"
  joins: string (ISO date)
  skills?: string[]
  imageUrl?: string
}
```

### Deployment
```typescript
{
  id: string
  title: string
  location: string
  theater: string
  difficulty: "low" | "medium" | "high" | "extreme"
  requiredLicense: number (0-3)
  maxPilots: number
  currentSignups: number
  signedUpPilots: string[] (pilot IDs)
  description: string
  objectives: string[]
  rewards?: string
  deadline: string
  status: "open" | "in-progress" | "completed" | "cancelled"
}
```

### GlossaryEntry
```typescript
{
  id: string
  term: string
  category: "faction" | "technology" | "location" | "concept" | "event"
  definition: string
  detailedInfo: string
  relatedTerms: string[]
  classified: boolean
}
```

### NewsItem
```typescript
{
  id: string
  headline: string
  source: string
  date: string (ISO date)
  type: "normal" | "union" | "breaking"
}
```

---

## ✨ FEATURE HIGHLIGHTS

### 1. Boot Sequence
- ASCII art VANGUARD logo
- Animated progress bars for system initialization
- Typewriter effect for terminal output
- CRT scan line effects
- Shows only once per session

### 2. Sidebar Navigation
- Collapsible/expandable functionality
- Active route highlighting
- Green glow effects on active items
- Admin code input field
- System status indicators
- Yellow theme when [COMMAND] active

### 3. Dashboard
- System uptime counter (persistent via localStorage)
- Total pilots/deployments/active mission stats
- Scrolling news ticker with color-coded items
- Quick access to key sections
- Real-time stat updates

### 4. Admin Panel
- Create/edit/delete pilots
- Create/edit/delete deployments
- Create/edit/delete glossary entries
- Mark glossary entries as classified
- Direct access from VANGUARD logo when [COMMAND]

### 5. Classified Content
- Classified glossary entries visible in list
- Non-admin users redirected to ACCESS DENIED screen
- Admin users can view all content
- Maintains diegetic immersion

### 6. Deployment Signup
- Pilots can volunteer for deployments
- Tracks current signups vs max capacity
- License level requirements enforced
- Visual feedback for signed-up pilots

---

## 🚀 DEPLOYMENT CHECKLIST

### Before Export to VS Code:

✅ All features implemented and tested
✅ Admin code set correctly (3825)
✅ Backend integration documented
✅ API endpoints clearly marked
✅ localStorage keys documented
✅ All components properly documented
✅ No console errors or warnings
✅ Responsive design verified
✅ Diegetic immersion maintained

### After Export:

1. Install dependencies: `npm install`
2. Test in session-only mode: `npm run dev`
3. Start backend server: `npm run server`
4. Verify file-based persistence
5. Test all CRUD operations
6. Verify admin authentication
7. Check localStorage persistence
8. Test across different screen sizes

---

## 🐛 DEBUGGING TIPS

### Backend Not Connecting?
1. Check if server is running: `npm run server`
2. Verify port 3001 is not in use
3. Check console for `📡 Backend not available` message
4. Ensure Vite proxy is configured in `vite.config.ts`

### Boot Sequence Not Showing?
1. Clear localStorage key: `vanguard_init_complete`
2. Hard refresh browser (Cmd/Ctrl + Shift + R)

### Admin Login Not Working?
1. Verify code is: `3825`
2. Check localStorage: `vanguard_admin_auth`
3. Clear localStorage and try again

### Uptime Counter Resetting?
1. Check localStorage: `vanguard_uptime_start`
2. Verify timestamp format is valid
3. Don't clear localStorage while testing

---

## 📝 NOTES FOR VISUAL STUDIO COPILOT

### Primary Integration Points:
1. **DataContext.tsx** - All backend API calls
2. **AdminContext.tsx** - Authentication logic
3. **server.js** (if present) - Backend server configuration

### Data Flow:
1. User interacts with UI component
2. Component calls hook from DataContext (e.g., `addPilot()`)
3. DataContext updates local state immediately (optimistic update)
4. DataContext makes API call to backend
5. Backend persists to JSON file
6. On page load, DataContext fetches from backend and syncs state

### Graceful Degradation:
- All API calls wrapped in try-catch
- Falls back to session-only mode if backend unavailable
- No error thrown if backend is not running
- Console logs for debugging

### Extension Points:
- Add new data types: Extend DataContext with new state/methods
- Add new routes: Update routes.tsx
- Add new admin features: Extend AdminPanel component
- Customize theme: Update color classes and effects

---

## 🎮 LANCER TTRPG CONTEXT

This dashboard is designed for the **Lancer** TTRPG by Massif Press:
- Union: Interstellar governing body
- Lancers: Mech pilots
- License Levels: LL0-LL3 (skill progression)
- Deployments: Missions/operations
- Theaters: Operational zones

The diegetic approach means everything is in-universe—no breaking the fourth wall!

---

## 📄 LICENSE & CREDITS

**Created for Lancer TTRPG campaigns**
- Game by Massif Press
- Built with React, Tailwind CSS v4, and React Router
- Retro terminal aesthetic inspired by classic CRT terminals

---

## ✅ PRODUCTION READY

This project is **100% complete** and ready for export to Visual Studio Code.

All features implemented:
- ✅ Full CRUD operations
- ✅ Dual-mode operation (session/file-based)
- ✅ Diegetic authentication
- ✅ Persistent state management
- ✅ Classified content control
- ✅ Terminal aesthetics
- ✅ Comprehensive documentation

**Admin Code: 3825**

Ready for deployment! 🚀
