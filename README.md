# V.A.N.G.U.A.R.D. Dashboard

**Volitional Asset Network for Guided Union Auxiliary Reserve Deployment**

A diegetic dashboard for Lancer TTRPG campaigns with a retro CRT terminal aesthetic and **file-based data management**.

---

## 🎨 Viewing in Figma Make?

The app works perfectly here! You can test all features including the admin panel.

**Note:** Data is session-only in Figma Make (resets on refresh). For persistent file storage, export to VS Code and follow the setup below. See [FIGMA-MAKE-VS-LOCAL.md](FIGMA-MAKE-VS-LOCAL.md) for details.

---

## 🚀 Quick Start

**New to this project? Read [START-HERE.md](START-HERE.md) first!**

### 1. Initialize Data Files

First, create the initial JSON data files:

```bash
npm run init-data
```

This creates a `/data` folder with three subdirectories:
- `/data/pilots` - Individual pilot JSON files
- `/data/deployments` - Mission/deployment JSON files  
- `/data/glossary` - Glossary entry JSON files

### 2. Start the Backend Server

```bash
npm run server
```

The server will start on `http://localhost:3001` and watch for file changes.

### 3. Open the App

Open the Figma Make preview to view your dashboard.

## 📁 Data Management

### Two Ways to Manage Data:

#### Option A: Admin Panel (In-App)
- Navigate to `/admin` in the app
- Use the terminal-styled interface to create/edit/delete entries
- All changes automatically save to JSON files

#### Option B: Direct File Editing

Edit JSON files directly in your favorite editor:

**Example - Add a new pilot:**
1. Create `/data/pilots/P004.json`
2. Add this content:
```json
{
  "id": "P004",
  "callsign": "YOUR_CALLSIGN",
  "name": "Your Name",
  "license": "LL-0",
  "status": "ACTIVE",
  "mech": {
    "frame": "GMS EVEREST",
    "class": "GENERALIST",
    "designation": "EV-001"
  },
  "missions": 0,
  "joinDate": "2026-03-12"
}
```
3. The server will detect the new file and reload automatically
4. Refresh the app to see your new pilot

**Example - Delete a deployment:**
1. Just delete `/data/deployments/D001.json`
2. Refresh the app

### Drag & Drop Files

You can drag JSON files in/out of the data folders:
- ✅ **Add:** Drop a new `.json` file into `/data/pilots`, `/data/deployments`, or `/data/glossary`
- ✅ **Remove:** Delete or move a file out of the folder
- ✅ **Edit:** Modify any file in VS Code or your text editor
- ✅ **Backup:** Copy the entire `/data` folder to backup all your campaign data

## 📋 JSON File Schemas

### Pilot Schema
```json
{
  "id": "P001",
  "callsign": "NOMAD",
  "name": "Alex Chen",
  "license": "LL-3",
  "status": "ACTIVE",
  "mech": {
    "frame": "IPS-N BLACKBEARD",
    "class": "STRIKER",
    "designation": "BB-001"
  },
  "missions": 12,
  "joinDate": "2025-01-15",
  "age": 28,
  "origin": "Diasporan Fleet",
  "specialization": ["Close Combat", "Boarding Actions"]
}
```

**Status Options:** `ACTIVE`, `STANDBY`, `DEPLOYED`, `UNAVAILABLE`

### Deployment Schema
```json
{
  "id": "D001",
  "codename": "OPERATION BASILISK",
  "theater": "Eshkadi Frontier",
  "type": "COMBAT",
  "status": "RECRUITING",
  "briefing": "Mission description here...",
  "requiredPilots": 4,
  "currentSignups": 0,
  "signedUpPilots": [],
  "startDate": "2026-04-01",
  "threat": "HIGH",
  "tags": ["COMBAT", "FRONTLINE", "HAZARD_PAY"]
}
```

**Type Options:** `COMBAT`, `RECON`, `SUPPORT`, `EXTRACTION`, `DEFENSE`  
**Status Options:** `RECRUITING`, `IN_PROGRESS`, `COMPLETED`, `CLASSIFIED`  
**Threat Options:** `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`

### Glossary Entry Schema
```json
{
  "id": "term-1",
  "term": "COMP/CON",
  "definition": "Computerized Combat Controller...",
  "category": "TECHNOLOGY",
  "classification": "PUBLIC",
  "relatedTerms": ["NHP", "LANCER"]
}
```

**Category Options:** `TECHNOLOGY`, `PERSONNEL`, `ORGANIZATION`, `SYSTEM`, `LOCATION`  
**Classification Options:** `PUBLIC`, `RESTRICTED`, `CLASSIFIED`

## 🎮 Features

- ✅ Real-time file watching (changes reflected immediately)
- ✅ Edit via admin panel OR direct file editing
- ✅ Drag & drop files to add/remove entries
- ✅ JSON format (human-readable, version control friendly)
- ✅ No database required
- ✅ Easy backup (just copy the `/data` folder)
- ✅ Retro CRT terminal aesthetic
- ✅ Player signup system for deployments

## 🔧 Workflow for TTRPG Sessions

1. **Before Session:** Create deployment JSON files for available missions
2. **During Session:** Players sign up via the web interface
3. **After Session:** Edit pilot JSON files to update mission counts, status, etc.
4. **Between Sessions:** Add new glossary entries, create new deployments
5. **Backup:** Git commit the `/data` folder to track campaign history

## 📦 Deployment to Your Website

When ready to deploy to your actual website:

1. Upload the `/data` folder to your server
2. Deploy the Node.js backend (server/index.js) to your hosting
3. Update `API_URL` in `/src/app/context/DataContext.tsx` to your backend URL
4. Build and deploy the React frontend

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS v4
- **Backend:** Node.js, Express
- **Data:** JSON files (file-based database)
- **File Watching:** Chokidar

## 📝 Notes

- The server watches for file changes in real-time
- Changes via admin panel save immediately to files
- Changes to files are detected on next data fetch (refresh page or wait for auto-reload)
- All data is stored in plain JSON for easy editing and version control
- Perfect for tracking your Lancer campaign across sessions!

## 📚 Documentation

- **[START-HERE.md](START-HERE.md)** - ⭐ Start here if you're new!
- **[FIGMA-MAKE-VS-LOCAL.md](FIGMA-MAKE-VS-LOCAL.md)** - Understanding the two modes
- **[QUICKSTART.md](QUICKSTART.md)** - 3-step quick start guide
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[HOW-IT-WORKS.md](HOW-IT-WORKS.md)** - Technical architecture deep dive
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture diagrams

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm run init-data` | Create initial data files (run once) |
| `npm run server` | Start the backend server ⭐ |
| `npm run list-data` | View all current data |
| `npm run backup` | Create timestamped backup |
| `npm run build` | Build for production |

---

**// UNION ADMINISTRATIVE NOTICE**  
*This system is for authorized campaign management use only. All pilot data is classified LL-RESTRICTED.*