# 🎯 START HERE - V.A.N.G.U.A.R.D. Setup

## 📍 Current Status

You're viewing this in **Figma Make** - the app works great here for prototyping!

**Note:** In Figma Make, data is session-only (resets on refresh). For persistent file storage, export to VS Code and run the backend server.

See [FIGMA-MAKE-VS-LOCAL.md](FIGMA-MAKE-VS-LOCAL.md) for details.

---

## ⚡ 3-Step Quick Start (Local Development)

### 1. Initialize Your Data
```bash
npm run init-data
```
Creates `/data` folder with sample pilots, deployments, and glossary.

### 2. Start the Server
```bash
npm run server
```
Starts backend on port 3001 and watches for file changes.

### 3. Open the App
Open your Figma Make preview - you're ready to go! 🚀

---

## 📚 What You Just Built

You now have a **file-based dashboard** where data is stored as JSON files that you can edit two ways:

### Method A: Admin Panel (Web UI)
1. Navigate to `/admin` in the app
2. Use terminal-styled forms to create/edit entries
3. Changes save automatically to JSON files

### Method B: Edit Files Directly
1. Open any file in `/data/pilots`, `/data/deployments`, or `/data/glossary`
2. Edit the JSON
3. Save and refresh the app

**Both methods work together!** Changes from one show up in the other.

---

## 📁 Your Data Folder Structure

```
/data
├── pilots/
│   ├── P001.json      ← Each pilot in its own file
│   ├── P002.json
│   └── P003.json
├── deployments/
│   ├── D001.json      ← Each mission in its own file
│   ├── D002.json
│   └── D003.json
└── glossary/
    ├── term-1.json    ← Each glossary entry in its own file
    └── term-2.json
```

---

## 🎮 Common Tasks

### Add a New Pilot
**Quick way:**
```bash
cp templates/pilot-template.json data/pilots/P999.json
# Edit P999.json, save, refresh app
```

**Or use the admin panel:** Go to `/admin` → "NEW PILOT"

### Add a New Mission
**Quick way:**
```bash
cp templates/deployment-template.json data/deployments/D999.json
# Edit D999.json, save, refresh app
```

**Or use the admin panel:** Go to `/admin` → "NEW DEPLOYMENT"

### View All Your Data
```bash
npm run list-data
```

### Backup Everything
```bash
npm run backup
```
Creates `backup-YYYY-MM-DD.json` with all your data.

---

## 🔍 Helpful Commands

| Command | What It Does |
|---------|--------------|
| `npm run init-data` | Create initial data (first time only) |
| `npm run server` | Start backend server ⭐ |
| `npm run list-data` | View all current data |
| `npm run backup` | Create timestamped backup |

---

## 📖 Documentation

- **QUICKSTART.md** - Fastest way to get running
- **SETUP.md** - Detailed setup instructions
- **HOW-IT-WORKS.md** - Technical architecture explanation
- **README.md** - Complete feature guide

---

## 💡 Tips

✅ **Keep the server running** while you work (`npm run server`)  
✅ **Refresh the app** after editing files directly  
✅ **Use templates** to create new entries quickly  
✅ **Git commit `/data`** folder to track campaign history  
✅ **Run backups** before major changes  

---

## 🎯 Typical Workflow for a Game Session

1. **Before session:** Create deployment files for available missions
2. **During session:** Players sign up via web interface
3. **After session:** Edit pilot files to update stats/mission counts
4. **Between sessions:** Add glossary entries, create new deployments

---

## 🚨 Troubleshooting

**App shows no data?**
- Make sure server is running (`npm run server`)
- Make sure `/data` folder exists (`npm run init-data`)

**Changes not appearing?**
- Refresh the browser
- Check server console for file change notifications

**Server won't start?**
- Check if port 3001 is already in use
- Make sure you ran `npm install`

---

## 🎉 You're Ready!

Your V.A.N.G.U.A.R.D. dashboard is now a fully functional file-based system. You can:

- ✅ Edit data through web UI or files
- ✅ Drag & drop files to add/remove entries
- ✅ Back up your campaign easily
- ✅ Track changes with Git
- ✅ Deploy to your own website later

**// UNION ADMINISTRATIVE NOTICE**  
*System operational. All pilots report to deployment board.*

---

**Next Steps:**
1. Customize the sample data with your own campaign info
2. Invite players to sign up for deployments
3. Start your Lancer campaign! 🤖

*Need help? Read SETUP.md or HOW-IT-WORKS.md*