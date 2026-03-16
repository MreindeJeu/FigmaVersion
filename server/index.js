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
const LOCATIONS_DIR = path.join(DATA_DIR, 'locations');

// Ensure directories exist
async function ensureDirectories() {
  await fs.mkdir(PILOTS_DIR, { recursive: true });
  await fs.mkdir(DEPLOYMENTS_DIR, { recursive: true });
  await fs.mkdir(GLOSSARY_DIR, { recursive: true });
  await fs.mkdir(LOCATIONS_DIR, { recursive: true });
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

// POST signup for deployment
app.post('/api/deployments/:id/signup', async (req, res) => {
  try {
    const deploymentId = req.params.id;
    const signup = req.body;
    
    // Read current deployment
    const filepath = path.join(DEPLOYMENTS_DIR, `${deploymentId}.json`);
    const content = await fs.readFile(filepath, 'utf-8');
    const deployment = JSON.parse(content);
    
    // Add player signup with timestamp
    if (!deployment.playerSignups) {
      deployment.playerSignups = [];
    }
    
    deployment.playerSignups.push({
      ...signup,
      signup_timestamp: new Date().toISOString()
    });
    
    // Update signedUpPilots for backwards compatibility
    if (!deployment.signedUpPilots.includes(signup.pilot_id)) {
      deployment.signedUpPilots.push(signup.pilot_id);
      deployment.currentSignups = deployment.signedUpPilots.length;
    }
    
    // Save updated deployment
    await writeFile(DEPLOYMENTS_DIR, deploymentId, deployment);
    
    res.json(deployment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE signup from deployment
app.delete('/api/deployments/:id/signup/:pilotId', async (req, res) => {
  try {
    const { id: deploymentId, pilotId } = req.params;
    
    // Read current deployment
    const filepath = path.join(DEPLOYMENTS_DIR, `${deploymentId}.json`);
    const content = await fs.readFile(filepath, 'utf-8');
    const deployment = JSON.parse(content);
    
    // Remove player signup
    if (deployment.playerSignups) {
      deployment.playerSignups = deployment.playerSignups.filter(
        signup => signup.pilot_id !== pilotId
      );
    }
    
    // Update signedUpPilots for backwards compatibility
    deployment.signedUpPilots = deployment.signedUpPilots.filter(id => id !== pilotId);
    deployment.currentSignups = deployment.signedUpPilots.length;
    
    // Save updated deployment
    await writeFile(DEPLOYMENTS_DIR, deploymentId, deployment);
    
    res.json(deployment);
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

// GET all locations
app.get('/api/locations', async (req, res) => {
  try {
    const locations = await readAllFiles(LOCATIONS_DIR);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new location
app.post('/api/locations', async (req, res) => {
  try {
    const location = req.body;
    await writeFile(LOCATIONS_DIR, location.id, location);
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update location
app.put('/api/locations/:id', async (req, res) => {
  try {
    const location = req.body;
    await writeFile(LOCATIONS_DIR, req.params.id, location);
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE location
app.delete('/api/locations/:id', async (req, res) => {
  try {
    await deleteFile(LOCATIONS_DIR, req.params.id);
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