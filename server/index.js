import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Data directories
const DATA_DIR = path.join(__dirname, '../data');
const PILOTS_DIR = path.join(DATA_DIR, 'pilots');
const DEPLOYMENTS_DIR = path.join(DATA_DIR, 'deployments');
const GLOSSARY_DIR = path.join(DATA_DIR, 'glossary');

// Ensure directories exist
async function ensureDirectories() {
  await fs.mkdir(PILOTS_DIR, { recursive: true });
  await fs.mkdir(DEPLOYMENTS_DIR, { recursive: true });
  await fs.mkdir(GLOSSARY_DIR, { recursive: true });
}

// Read all JSON files from a directory
async function readAllFiles(directory) {
  try {
    const files = await fs.readdir(directory);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    const data = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await fs.readFile(path.join(directory, file), 'utf-8');
        return JSON.parse(content);
      })
    );
    
    return data;
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
}

// Write a single JSON file
async function writeFile(directory, id, data) {
  const filename = `${id}.json`;
  const filepath = path.join(directory, filename);
  await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

// Delete a file
async function deleteFile(directory, id) {
  const filename = `${id}.json`;
  const filepath = path.join(directory, filename);
  await fs.unlink(filepath);
}

// API Routes

// GET all pilots
app.get('/api/pilots', async (req, res) => {
  try {
    const pilots = await readAllFiles(PILOTS_DIR);
    res.json(pilots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new pilot
app.post('/api/pilots', async (req, res) => {
  try {
    const pilot = req.body;
    await writeFile(PILOTS_DIR, pilot.id, pilot);
    res.json(pilot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update pilot
app.put('/api/pilots/:id', async (req, res) => {
  try {
    const pilot = req.body;
    await writeFile(PILOTS_DIR, req.params.id, pilot);
    res.json(pilot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE pilot
app.delete('/api/pilots/:id', async (req, res) => {
  try {
    await deleteFile(PILOTS_DIR, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all deployments
app.get('/api/deployments', async (req, res) => {
  try {
    const deployments = await readAllFiles(DEPLOYMENTS_DIR);
    res.json(deployments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new deployment
app.post('/api/deployments', async (req, res) => {
  try {
    const deployment = req.body;
    await writeFile(DEPLOYMENTS_DIR, deployment.id, deployment);
    res.json(deployment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update deployment
app.put('/api/deployments/:id', async (req, res) => {
  try {
    const deployment = req.body;
    await writeFile(DEPLOYMENTS_DIR, req.params.id, deployment);
    res.json(deployment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE deployment
app.delete('/api/deployments/:id', async (req, res) => {
  try {
    await deleteFile(DEPLOYMENTS_DIR, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all glossary entries
app.get('/api/glossary', async (req, res) => {
  try {
    const glossary = await readAllFiles(GLOSSARY_DIR);
    res.json(glossary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new glossary entry
app.post('/api/glossary', async (req, res) => {
  try {
    const entry = req.body;
    await writeFile(GLOSSARY_DIR, entry.id, entry);
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update glossary entry
app.put('/api/glossary/:id', async (req, res) => {
  try {
    const entry = req.body;
    await writeFile(GLOSSARY_DIR, req.params.id, entry);
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE glossary entry
app.delete('/api/glossary/:id', async (req, res) => {
  try {
    await deleteFile(GLOSSARY_DIR, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// File watcher - logs when files are added/removed/changed
chokidar.watch(DATA_DIR, { 
  ignored: /(^|[\/\\])\../, 
  persistent: true 
}).on('all', (event, filePath) => {
  const timestamp = new Date().toLocaleTimeString();
  const fileName = path.basename(filePath);
  
  let emoji = '📝';
  if (event === 'add') emoji = '➕';
  if (event === 'unlink') emoji = '🗑️';
  if (event === 'change') emoji = '✏️';
  
  if (fileName.endsWith('.json')) {
    console.log(`${emoji} [${timestamp}] ${event.toUpperCase()}: ${fileName}`);
  }
});

// Start server
await ensureDirectories();

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  🟢 V.A.N.G.U.A.R.D. DATA SERVER ONLINE                   ║
║                                                            ║
║  Port: ${PORT}                                               ║
║  Data: ${DATA_DIR}                                    ║
║                                                            ║
║  Watching for file changes...                             ║
║  • Add/Remove JSON files to update data in real-time      ║
║  • Edit files directly or use admin panel                 ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});