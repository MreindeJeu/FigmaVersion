# 🔧 How It Works - Technical Overview

## Architecture

```
┌─────────────────┐
│  React Frontend │  ← Your browser (Figma Make preview)
│   (Vite + React)│
└────────┬────────┘
         │ HTTP Requests (fetch API)
         ↓
┌─────────────────┐
│  Express Server │  ← Node.js backend (localhost:3001)
│   (server/*.js) │
└────────┬────────┘
         │ File I/O (fs module)
         ↓
┌─────────────────┐
│   JSON Files    │  ← Your campaign data (/data folder)
│  (File System)  │
└─────────────────┘
```

## Data Flow

### When You Start the App:

1. **Run `npm run server`**
   - Express server starts on port 3001
   - Chokidar starts watching `/data` folder for changes
   - Server prints: "🟢 V.A.N.G.U.A.R.D. DATA SERVER ONLINE"

2. **Open Figma Make Preview**
   - React app loads
   - `DataContext` runs `useEffect` on mount
   - Fetches data from backend:
     - `GET /api/pilots` → reads all `/data/pilots/*.json`
     - `GET /api/deployments` → reads all `/data/deployments/*.json`
     - `GET /api/glossary` → reads all `/data/glossary/*.json`
   - Updates React state with fetched data
   - App renders with your data!

### When You Create a Pilot in Admin Panel:

1. **Click "NEW PILOT" → Fill Form → Click "CREATE"**
2. Frontend calls `addPilot(newPilot)`
3. `DataContext.addPilot()`:
   - Updates React state immediately (optimistic update)
   - Sends `POST /api/pilots` with pilot data
4. Backend receives request:
   - Writes `/data/pilots/P004.json`
   - Responds with 200 OK
5. Chokidar detects new file:
   - Logs: `➕ [12:34:56] ADD: P004.json`
6. UI updates instantly (already updated from step 3)

### When You Edit a File Directly:

1. **Open `/data/pilots/P001.json` in VS Code**
2. **Change `"missions": 12` → `"missions": 13"`**
3. **Save file**
4. Chokidar detects change:
   - Logs: `✏️ [12:45:00] CHANGE: P001.json`
5. **Refresh the app in browser**
6. `DataContext` re-fetches data
7. Backend reads updated file
8. Frontend displays new mission count!

### When You Drag a File In:

1. **Create `P999.json` on desktop**
2. **Drag into `/data/pilots` folder**
3. Chokidar detects:
   - Logs: `➕ [13:00:00] ADD: P999.json`
4. **Refresh browser**
5. New pilot appears!

## File Structure

```
/data
├── pilots/
│   ├── P001.json          ← Each pilot is a separate file
│   ├── P002.json
│   └── P003.json
├── deployments/
│   ├── D001.json          ← Each deployment is a separate file
│   ├── D002.json
│   └── D003.json
└── glossary/
    ├── term-1.json        ← Each term is a separate file
    └── term-2.json
```

**Why separate files?**
- ✅ Easy to edit individual entries
- ✅ Easy to add/remove by dragging files
- ✅ Git-friendly (each change is a separate commit)
- ✅ Human-readable format
- ✅ No database setup required

## Key Technologies

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling (CRT aesthetic)
- **React Router** - Navigation
- **React Context** - State management
- **Vite** - Build tool & dev server

### Backend
- **Express 5** - Web server framework
- **Node.js (ESM)** - Runtime environment
- **Chokidar** - File watching
- **fs/promises** - File system operations
- **CORS** - Allow frontend to call backend

### Data Layer
- **JSON Files** - Plain text, human-editable
- **File System** - No database needed
- **REST API** - Standard HTTP methods (GET, POST, PUT, DELETE)

## API Endpoints

| Method | Endpoint | What It Does |
|--------|----------|--------------|
| `GET` | `/api/pilots` | Returns array of all pilots |
| `POST` | `/api/pilots` | Creates new pilot JSON file |
| `PUT` | `/api/pilots/:id` | Updates existing pilot file |
| `DELETE` | `/api/pilots/:id` | Deletes pilot file |
| `GET` | `/api/deployments` | Returns array of all deployments |
| `POST` | `/api/deployments` | Creates new deployment file |
| `PUT` | `/api/deployments/:id` | Updates deployment file |
| `DELETE` | `/api/deployments/:id` | Deletes deployment file |
| `GET` | `/api/glossary` | Returns array of all glossary entries |
| `POST` | `/api/glossary` | Creates new glossary file |
| `PUT` | `/api/glossary/:id` | Updates glossary file |
| `DELETE` | `/api/glossary/:id` | Deletes glossary file |

## State Management

```typescript
// DataContext manages all data
const DataContext = createContext<DataContextType>()

// Components use the hook
const { pilots, deployments, glossaryEntries, addPilot, ... } = useData()

// All CRUD operations go through context
addPilot(newPilot)        // Creates file + updates state
updatePilot(id, changes)  // Updates file + state
deletePilot(id)           // Deletes file + updates state
```

**Flow:**
1. User action (button click, form submit)
2. Component calls context method
3. Context updates React state (instant UI update)
4. Context calls backend API (persistent save)
5. Backend writes to JSON file
6. Chokidar logs the change

## Why This Architecture?

**✅ Advantages:**
- No database setup required
- Easy to backup (just copy `/data` folder)
- Version control friendly (Git can track each file)
- Human-readable data format
- Can edit in any text editor
- Drag & drop file management
- Perfect for small-scale TTRPG campaigns

**⚠️ Limitations:**
- Not suitable for 100+ simultaneous users
- No real-time sync (requires page refresh for external edits)
- No built-in authentication (everyone who can run the server is "admin")
- File system operations are slower than database queries

**When to upgrade to a database:**
- You have 50+ players
- You need real-time multi-user editing
- You need user authentication/authorization
- You're deploying publicly (not just local network)

## Deployment Options

### Local Network (Current Setup)
- Run `npm run server` on your computer
- Players connect to `http://your-ip:3001`
- Good for in-person sessions or small groups

### Production Deployment
1. **Backend:** Deploy to Node.js hosting (Heroku, Railway, Fly.io)
2. **Data:** Upload `/data` folder to server
3. **Frontend:** Build and deploy to static hosting (Vercel, Netlify)
4. **Database (Optional):** Migrate to Supabase/PostgreSQL for scale

## Scripts Explained

| Script | What It Does | When to Use |
|--------|--------------|-------------|
| `npm run init-data` | Creates `/data` folder with sample files | First time setup |
| `npm run server` | Starts backend server | Every time you work on the project |
| `npm run list-data` | Shows all current data in terminal | Check what's in your database |
| `npm run backup` | Creates timestamped backup file | Before major changes |
| `npm run build` | Builds frontend for production | When deploying |

## File Watching

Chokidar watches for these events:
- `add` - New file created
- `change` - Existing file modified
- `unlink` - File deleted

**Example console output:**
```
➕ [14:30:15] ADD: P005.json
✏️ [14:32:42] CHANGE: D001.json
🗑️ [14:35:19] UNLINK: P003.json
```

## Security Considerations

**Current State (Local Development):**
- ❌ No authentication
- ❌ No authorization
- ❌ Anyone on network can access
- ✅ Fine for trusted groups
- ✅ Fine for local/LAN use

**For Production:**
- Add JWT authentication
- Add role-based access control
- Use environment variables for secrets
- Add rate limiting
- Validate all inputs
- Use HTTPS

---

**That's the entire system!** Simple, transparent, and easy to understand. Perfect for your TTRPG campaign needs.
