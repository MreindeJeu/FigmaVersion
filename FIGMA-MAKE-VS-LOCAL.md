# 🖥️ Figma Make vs Local Development

## Two Operating Modes

Your V.A.N.G.U.A.R.D. dashboard supports **two modes** depending on where you're running it:

---

## 🎨 Mode 1: Figma Make (Current)

**Where:** Running in Figma Make preview  
**Backend:** ❌ Not available  
**Data Storage:** In-memory (React state)  
**File System:** ❌ Not accessible  

### What Works:
- ✅ Full UI/UX with retro CRT aesthetic
- ✅ All features work (admin panel, signups, etc.)
- ✅ Data persists during session
- ❌ Data resets when you refresh

### What You'll See:
```
📡 Backend not available - using local data
   (run "npm run server" to enable file-based storage)
```

This is **normal** in Figma Make! The app works perfectly, but changes won't persist to files.

---

## 💻 Mode 2: Local Development (Full Features)

**Where:** Running on your computer (VS Code)  
**Backend:** ✅ Node.js server running  
**Data Storage:** JSON files in `/data` folder  
**File System:** ✅ Fully accessible  

### What Works:
- ✅ Everything from Mode 1
- ✅ **Data persists to JSON files**
- ✅ Edit files directly in VS Code
- ✅ Drag & drop files to add/remove entries
- ✅ Changes sync between admin panel and files
- ✅ Git version control support

### How to Enable:

1. **Export your project** from Figma Make
2. **Open in VS Code** (or any code editor)
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Initialize data:**
   ```bash
   npm run init-data
   ```
5. **Start backend server:**
   ```bash
   npm run server
   ```
   You'll see:
   ```
   ╔════════════════════════════════════════════╗
   ║  🟢 V.A.N.G.U.A.R.D. DATA SERVER ONLINE   ║
   ╚════════════════════════════════════════════╝
   ```
6. **Start frontend** (in another terminal):
   ```bash
   npm run dev
   ```

Now you have **full file-based storage!**

---

## 🔄 Comparison

| Feature | Figma Make | Local Dev |
|---------|------------|-----------|
| **UI/UX** | ✅ Full | ✅ Full |
| **Admin Panel** | ✅ Works | ✅ Works |
| **Player Signups** | ✅ Works | ✅ Works |
| **Data Persistence** | ❌ Session only | ✅ **Files persist** |
| **Edit Files Directly** | ❌ No access | ✅ **Yes!** |
| **Drag & Drop Files** | ❌ No access | ✅ **Yes!** |
| **Git Version Control** | ❌ No | ✅ **Yes!** |
| **Backup System** | ❌ No | ✅ **Yes!** |
| **Deploy to Website** | ❌ Preview only | ✅ **Yes!** |

---

## 🎯 Recommended Workflow

### For Testing/Prototyping:
- ✅ **Use Figma Make** - Perfect for showing players the UI
- ✅ Test features and make design changes
- ✅ Share preview link with friends

### For Actual Campaign Use:
- ✅ **Export to VS Code** - Get full file-based storage
- ✅ Edit campaign data in JSON files
- ✅ Track campaign history with Git
- ✅ Deploy to your own website

---

## 📤 When to Export to Local

Export when you're ready to:
- 📝 **Actually run campaigns** with persistent data
- 🗂️ **Edit files directly** for quick updates
- 💾 **Backup your campaign** data
- 🌐 **Deploy to your website**
- 🔄 **Track changes with Git**

---

## 🚀 Quick Export Guide

1. **In Figma Make:** Click export/download
2. **Extract files** to a folder
3. **Open in VS Code**
4. **Run setup:**
   ```bash
   npm install
   npm run init-data
   npm run server
   ```
5. **You're live!** Edit `/data/*.json` files and watch changes appear

---

## 💡 Current Status

Right now you're in **Figma Make Mode**. Everything works great for prototyping!

When you see this in the console:
```
📡 Backend not available - using local data
```

It means you're in **session-only mode** (normal for Figma Make).

**No action needed** unless you want persistent file storage!

---

## ❓ FAQ

**Q: Why is data not saving?**  
A: In Figma Make, there's no file system access. Data saves to memory only. Export to local for persistence.

**Q: Can I use the admin panel in Figma Make?**  
A: Yes! It works perfectly. Changes just won't persist after refresh.

**Q: How do I get the file-based system working?**  
A: Export to VS Code and run `npm run server`. See [SETUP.md](SETUP.md) for details.

**Q: Will my players be able to sign up in Figma Make?**  
A: Yes, signups work! But they'll reset on refresh. Use local mode for real campaigns.

**Q: Can I deploy the Figma Make preview?**  
A: No, it's just a preview. Export to local, then deploy to your own hosting.

---

**TL;DR:**  
- 🎨 **Figma Make = Preview mode** (session-only data)  
- 💻 **Local Dev = Full mode** (file-based storage)  
- 🚀 **Export when ready** for real campaigns

Both modes have the same beautiful interface! The difference is just where data lives.
