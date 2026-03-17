# 🚀 Setup Guide - V.A.N.G.U.A.R.D.

## First Time Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Initialize Data Files
This creates your `/data` folder with sample content:
```bash
npm run init-data
```

You should see:
```
🔄 Initializing data directories...

📝 Creating pilot files...
  ✅ P001.json - NOMAD
  ✅ P002.json - WRAITH
  ✅ P003.json - HAMMER

📝 Creating deployment files...
  ✅ D001.json - OPERATION BASILISK
  ✅ D002.json - OPERATION GUARDIAN
  ✅ D003.json - OPERATION NIGHTFALL

📝 Creating glossary files...
  ✅ term-1.json - COMP/CON
  ✅ term-2.json - LANCER
  ...

✨ Data initialization complete!
```

### Step 3: Start the Backend Server
```bash
npm run server
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  🟢 V.A.N.G.U.A.R.D. DATA SERVER ONLINE                   ║
║                                                            ║
║  Port: 3001                                                ║
║  Data: /path/to/your/project/data                         ║
║                                                            ║
║  Watching for file changes...                             ║
║  • Add/Remove JSON files to update data in real-time      ║
║  • Edit files directly or use admin panel                 ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### Step 4: Open the App
In Figma Make, click the preview button. Your V.A.N.G.U.A.R.D. dashboard should load!

## 🎮 Using the System

### Method 1: Admin Panel (Web Interface)
1. Navigate to `/admin` in the app
2. Click "NEW DEPLOYMENT", "NEW PILOT", or "NEW GLOSSARY ENTRY"
3. Fill out the terminal-styled form
4. Click "CREATE" - the data is automatically saved to a JSON file

### Method 2: Direct File Editing

#### Add a New Pilot
1. Copy `/templates/pilot-template.json`
2. Rename to `/data/pilots/P004.json`
3. Edit the file with your pilot's info
4. Refresh the app - your pilot appears!

#### Add a New Deployment
1. Copy `/templates/deployment-template.json`
2. Rename to `/data/deployments/D004.json`
3. Edit with your mission details
4. Refresh the app

#### Add a Glossary Entry
1. Copy `/templates/glossary-template.json`
2. Rename to `/data/glossary/my-term.json`
3. Edit with your term's definition
4. Refresh the app

### Method 3: Drag & Drop
1. Make sure the server is running (`npm run server`)
2. Create a new `.json` file anywhere
3. Drag it into `/data/pilots`, `/data/deployments`, or `/data/glossary`
4. Watch the server console - you'll see: `📁 [add] data/pilots/P005.json`
5. Refresh the app

## 📋 Helpful Commands

| Command | What It Does |
|---------|--------------|
| `npm run init-data` | Create initial data files (only run once) |
| `npm run server` | Start the backend server |
| `npm run list-data` | Show all current data in terminal |
| `npm run build` | Build the frontend for production |

## 🗂️ Folder Structure

```
your-project/
├── data/                    # ← Your campaign data (edit these!)
│   ├── pilots/
│   │   ├── P001.json
│   │   ├── P002.json
│   │   └── ...
│   ├── deployments/
│   │   ├── D001.json
│   │   └── ...
│   └── glossary/
│       ├── term-1.json
│       └── ...
├── templates/               # ← Copy these to create new entries
│   ├── pilot-template.json
│   ├── deployment-template.json
│   └── glossary-template.json
├── server/                  # ← Backend code (don't edit unless customizing)
│   ├── index.js
│   ├── initData.js
│   └── listData.js
└── src/                     # ← Frontend React code
    └── ...
```

## 🔧 Workflow Example

**Scenario: Preparing for a game session**

1. **Create a new mission file:**
   ```bash
   cp templates/deployment-template.json data/deployments/D004.json
   ```

2. **Edit it in VS Code:**
   ```json
   {
     "id": "D004",
     "codename": "OPERATION CRIMSON DAWN",
     "theater": "Blanca System",
     "type": "EXTRACTION",
     "status": "RECRUITING",
     "briefing": "Rescue captured Union scientists from a pirate stronghold...",
     "requiredPilots": 3,
     "currentSignups": 0,
     "signedUpPilots": [],
     "startDate": "5016-04-20",
     "threat": "HIGH",
     "tags": ["RESCUE", "STEALTH", "HAZARD_PAY"]
   }
   ```

3. **Save the file** - the server detects it automatically

4. **Refresh the app** - players can now see and sign up for the mission!

5. **During the game** - players sign up via the web interface

6. **After the game** - update pilot files:
   ```json
   {
     "missions": 13  // was 12, now 13
   }
   ```

## 🐛 Troubleshooting

**Problem: Server won't start**
- Solution: Make sure port 3001 isn't already in use

**Problem: App shows empty data**
- Solution: Make sure the server is running (`npm run server`)
- Solution: Check that `/data` folder exists (run `npm run init-data`)

**Problem: Changes not appearing**
- Solution: Refresh the app page
- Solution: Check the server console for file change notifications

**Problem: Can't edit JSON files**
- Solution: Make sure the server has write permissions
- Solution: Check file permissions on `/data` folder

## 💾 Backing Up Your Campaign

Your entire campaign is just files! To backup:

```bash
# Copy the data folder
cp -r data/ data-backup-2026-03-12/

# Or use git
git add data/
git commit -m "Session 5 - Operation Crimson Dawn complete"
```

## 🌐 Deploying to Your Website

See README.md for full deployment instructions, but basically:

1. Upload `/data` folder to your server
2. Deploy backend (`server/index.js`) to Node.js hosting
3. Update API URL in frontend
4. Deploy frontend to static hosting

---

**Ready to roll!** Start with `npm run init-data` then `npm run server`.

*// UNION ADMINISTRATIVE AUTHORIZATION: LL-CLEARANCE REQUIRED*