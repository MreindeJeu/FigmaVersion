# ⚡ V.A.N.G.U.A.R.D. - QUICK START GUIDE

## 🚀 Get Running in 2 Minutes

### Option 1: Session-Only Mode (Figma Make Mode)
```bash
npm install
npm run dev
```
Open http://localhost:5173 - Done! 

*Changes won't persist on reload, but perfect for testing.*

---

### Option 2: Full Persistence (Visual Studio Mode)
```bash
# Terminal 1
npm run server

# Terminal 2  
npm run dev
```
Open http://localhost:5173 - Done!

*All changes now saved to ./data/*.json files.*

---

## 🔑 Admin Access

**Code:** `3825`

1. Enter in sidebar "AUTHORIZATION" field
2. VANGUARD logo turns yellow
3. Click yellow logo → Admin Panel
4. Create/edit/delete content

---

## 📁 What Gets Saved (Backend Mode)

```
./data/
├── pilots.json       ← Pilot roster
├── deployments.json  ← Missions
└── glossary.json     ← Lore entries
```

---

## 🎯 Key Features

- ✅ Retro CRT terminal aesthetic
- ✅ Terminal boot sequence (shows once)
- ✅ Full CRUD for pilots/deployments/glossary
- ✅ Admin authentication (code: 3825)
- ✅ Classified content access control
- ✅ Persistent system uptime
- ✅ Collapsible sidebar
- ✅ Dynamic news ticker

---

## 🛠️ Useful Commands

```bash
npm run dev         # Start frontend
npm run server      # Start backend
npm run init-data   # Reset data files
npm run list-data   # View all data
npm run backup      # Backup data files
```

---

## 🔍 Troubleshooting

**"📡 Backend not available" in console?**
→ Backend server not running. Run `npm run server`

**Boot sequence not showing?**
→ Clear localStorage: `localStorage.clear()` in console

**Admin login not working?**
→ Code is `3825` (numbers only)

**Changes not persisting?**
→ Make sure backend server is running (`npm run server`)

---

## 📚 Full Documentation

See `PROJECT_DOCUMENTATION.md` for complete details.

---

**Admin Code: 3825**

Ready to deploy! 🚀
