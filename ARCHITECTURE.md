# 🏗️ System Architecture

## Visual Overview

```
┌──────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                        │
│                                                              │
│  ┌────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │  Browser   │  │  Admin Panel │  │  Text Editor       │  │
│  │  (Players) │  │  (GM/Admin)  │  │  (Direct Editing)  │  │
│  └─────┬──────┘  └──────┬───────┘  └─────────┬──────────┘  │
│        │                │                     │             │
└────────┼────────────────┼─────────────────────┼─────────────┘
         │                │                     │
         │ View/Sign Up   │ Create/Edit/Delete  │ Edit Files
         ↓                ↓                     ↓
┌──────────────────────────────────────────────────────────────┐
│                     REACT FRONTEND                           │
│                   (Vite Dev Server)                          │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   DataContext                        │  │
│  │  • Manages state (pilots, deployments, glossary)    │  │
│  │  • Fetches data on load                             │  │
│  │  • Sends updates to backend                         │  │
│  │  • Provides data to all components                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Components:                                                 │
│  • Dashboard        • DeploymentsScreen                     │
│  • PilotsScreen     • GlossaryScreen                        │
│  • AdminPanel       • Detail Screens                        │
│                                                              │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │ (GET/POST/PUT/DELETE)
                         ↓
┌──────────────────────────────────────────────────────────────┐
│                    EXPRESS BACKEND                           │
│                  (Node.js Server)                            │
│                    Port: 3001                                │
│                                                              │
│  API Routes:                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │ GET /pilots  │  │ GET /deploy  │  │ GET /glossary   │  │
│  │ POST /pilots │  │ POST /deploy │  │ POST /glossary  │  │
│  │ PUT /pilots  │  │ PUT /deploy  │  │ PUT /glossary   │  │
│  │ DELETE /...  │  │ DELETE /...  │  │ DELETE /...     │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               File Operations                        │  │
│  │  • readAllFiles() - Read directory                  │  │
│  │  • writeFile() - Write JSON file                    │  │
│  │  • deleteFile() - Delete file                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               Chokidar Watcher                       │  │
│  │  • Watches /data folder                             │  │
│  │  • Logs file changes                                │  │
│  │  • Detects add/change/delete events                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ File I/O
                         │ (fs.readFile, fs.writeFile, fs.unlink)
                         ↓
┌──────────────────────────────────────────────────────────────┐
│                      FILE SYSTEM                             │
│                                                              │
│  /data                                                       │
│  ├── pilots/                                                 │
│  │   ├── P001.json ← { id, callsign, name, mech, ... }     │
│  │   ├── P002.json                                          │
│  │   └── P003.json                                          │
│  │                                                           │
│  ├── deployments/                                            │
│  │   ├── D001.json ← { id, codename, briefing, ... }       │
│  │   ├── D002.json                                          │
│  │   └── D003.json                                          │
│  │                                                           │
│  └── glossary/                                               │
│      ├── term-1.json ← { id, term, definition, ... }       │
│      └── term-2.json                                         │
│                                                              │
│  Each file = One data entry (pilot/deployment/term)         │
│  Format: JSON (human-readable)                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### 📖 Reading Data (App Startup)

```
1. User opens app
   ↓
2. React app loads, DataContext runs useEffect()
   ↓
3. DataContext → fetch('/api/pilots')
   ↓
4. Express receives GET /api/pilots
   ↓
5. Backend calls readAllFiles('data/pilots')
   ↓
6. Node.js reads all .json files in /data/pilots/
   ↓
7. Backend returns JSON array: [pilot1, pilot2, pilot3]
   ↓
8. DataContext updates state: setPilots(data)
   ↓
9. React re-renders with new data
   ↓
10. User sees pilot roster!
```

### ✏️ Creating Data (Admin Panel)

```
1. Admin fills form, clicks "CREATE"
   ↓
2. Component calls addPilot(newPilot)
   ↓
3. DataContext.addPilot():
   a. setPilots([...pilots, newPilot])  // Update UI immediately
   b. fetch('/api/pilots', POST, newPilot)  // Save to backend
   ↓
4. Express receives POST /api/pilots
   ↓
5. Backend calls writeFile('data/pilots', 'P004', newPilot)
   ↓
6. Node.js writes /data/pilots/P004.json
   ↓
7. Chokidar detects new file
   ↓
8. Console logs: "➕ [14:30:00] ADD: P004.json"
   ↓
9. Backend responds 200 OK
   ↓
10. UI already updated (step 3a), user sees new pilot instantly!
```

### 🖊️ Editing Files Directly

```
1. User opens /data/pilots/P001.json in VS Code
   ↓
2. User changes "missions": 12 → "missions": 13
   ↓
3. User saves file (Ctrl+S)
   ↓
4. Chokidar detects file change
   ↓
5. Console logs: "✏️ [14:45:00] CHANGE: P001.json"
   ↓
6. User refreshes browser
   ↓
7. DataContext re-fetches data (useEffect runs again)
   ↓
8. Backend reads updated file
   ↓
9. Frontend displays new mission count!
```

### 📁 Drag & Drop Files

```
1. User creates new file: P999.json on desktop
   ↓
2. User drags file into /data/pilots/ folder
   ↓
3. Operating system writes file
   ↓
4. Chokidar detects new file
   ↓
5. Console logs: "➕ [15:00:00] ADD: P999.json"
   ↓
6. User refreshes browser
   ↓
7. Backend reads new file
   ↓
8. New pilot appears in roster!
```

## Component Hierarchy

```
App (RouterProvider)
└── Root
    ├── NavBar
    ├── Sidebar
    └── Routes
        ├── / → Dashboard
        │       ├── Quick Stats
        │       ├── Recent Deployments
        │       └── Active Pilots
        │
        ├── /deployments → DeploymentsScreen
        │                  ├── Filter/Search
        │                  └── Deployment Cards
        │
        ├── /deployments/:id → DeploymentDetailScreen
        │                      ├── Mission Briefing
        │                      ├── Signed Up Pilots
        │                      └── Signup Dialog
        │
        ├── /pilots → PilotsScreen
        │             ├── Filter/Search
        │             └── Pilot Cards
        │
        ├── /pilots/:id → PilotDetailScreen
        │                 └── Pilot Stats & Bio
        │
        ├── /glossary → GlossaryScreen
        │               ├── Category Filter
        │               └── Glossary List
        │
        ├── /glossary/:id → GlossaryDetailScreen
        │                   └── Term Definition
        │
        └── /admin → AdminPanel
                     ├── DeploymentModal
                     ├── PilotModal
                     └── GlossaryModal
```

## Technology Stack

```
┌─────────────────────────────────────────────┐
│             FRONTEND STACK                  │
├─────────────────────────────────────────────┤
│ React 18        - UI Framework              │
│ TypeScript      - Type Safety               │
│ Tailwind CSS v4 - Styling                   │
│ React Router    - Navigation                │
│ React Context   - State Management          │
│ Vite            - Build Tool                │
│ Lucide Icons    - Icon Library              │
│ Sonner          - Toast Notifications       │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│             BACKEND STACK                   │
├─────────────────────────────────────────────┤
│ Node.js 20+     - Runtime                   │
│ Express 5       - Web Framework             │
│ fs/promises     - File Operations           │
│ Chokidar        - File Watching             │
│ CORS            - Cross-Origin Support      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│             DATA LAYER                      │
├─────────────────────────────────────────────┤
│ JSON Files      - Data Storage              │
│ File System     - Database (no SQL needed)  │
│ Git             - Version Control (optional)│
└─────────────────────────────────────────────┘
```

## File Organization

```
project-root/
│
├── src/                          # Frontend code
│   ├── app/
│   │   ├── components/           # React components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── AdminPanel.tsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── DataContext.tsx   # ⭐ State management
│   │   ├── data/
│   │   │   ├── mockData.ts       # Fallback data
│   │   │   └── glossaryData.ts
│   │   └── routes.tsx            # Route configuration
│   └── styles/                   # CSS files
│       └── theme.css             # CRT aesthetic
│
├── server/                       # Backend code
│   ├── index.js                  # ⭐ Express server
│   ├── initData.js               # Data initialization
│   ├── listData.js               # View data script
│   └── backup.js                 # Backup script
│
├── data/                         # ⭐ YOUR CAMPAIGN DATA
│   ├── pilots/
│   │   └── *.json
│   ├── deployments/
│   │   └── *.json
│   └── glossary/
│       └── *.json
│
├── templates/                    # Copy these to create new entries
│   ├── pilot-template.json
│   ├── deployment-template.json
│   └── glossary-template.json
│
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite configuration
│
└── Documentation:
    ├── START-HERE.md             # Start here!
    ├── QUICKSTART.md             # 3-step setup
    ├── SETUP.md                  # Detailed setup
    ├── HOW-IT-WORKS.md           # Technical details
    ├── ARCHITECTURE.md           # This file
    └── README.md                 # Feature guide
```

## Request/Response Cycle

### Example: Signing Up for a Deployment

```javascript
// 1. USER CLICKS "VOLUNTEER" BUTTON
onClick={() => setSignupDialogOpen(true)}

// 2. USER SELECTS PILOT & CLICKS "CONFIRM"
const handleSignUp = () => {
  // 3. CALL CONTEXT METHOD
  updateDeployment(deploymentId, {
    signedUpPilots: [...existingPilots, newPilotId],
    currentSignups: currentSignups + 1
  });
}

// 4. CONTEXT UPDATES STATE (OPTIMISTIC)
setDeployments(prev => prev.map(d => 
  d.id === id ? { ...d, ...updates } : d
));

// 5. CONTEXT SENDS TO BACKEND
await fetch('/api/deployments/D001', {
  method: 'PUT',
  body: JSON.stringify(updatedDeployment)
});

// 6. EXPRESS RECEIVES REQUEST
app.put('/api/deployments/:id', async (req, res) => {
  const deployment = req.body;
  
  // 7. WRITE TO FILE
  await writeFile(DEPLOYMENTS_DIR, req.params.id, deployment);
  
  // 8. CHOKIDAR DETECTS CHANGE
  // Console: "✏️ [14:30:15] CHANGE: D001.json"
  
  // 9. RESPOND SUCCESS
  res.json(deployment);
});

// 10. UI ALREADY UPDATED (step 4)
// User sees instant feedback!
```

---

This architecture gives you:
- ✅ **Simplicity** - No database setup
- ✅ **Flexibility** - Edit via UI or files
- ✅ **Transparency** - Everything is readable JSON
- ✅ **Portability** - Just copy the /data folder
- ✅ **Version Control** - Git-friendly structure
