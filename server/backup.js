import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

async function backupData() {
  const timestamp = new Date().toISOString().split('T')[0];
  const backupFile = path.join(__dirname, `../backup-${timestamp}.json`);

  console.log('\n📦 Creating backup...\n');

  try {
    // Read all data
    const pilots = await readAllFiles(path.join(DATA_DIR, 'pilots'));
    const deployments = await readAllFiles(path.join(DATA_DIR, 'deployments'));
    const glossary = await readAllFiles(path.join(DATA_DIR, 'glossary'));

    const backup = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {
        pilots,
        deployments,
        glossary
      }
    };

    await fs.writeFile(backupFile, JSON.stringify(backup, null, 2));

    console.log(`✅ Backup created: ${backupFile}`);
    console.log(`\nBackup contains:`);
    console.log(`  • ${pilots.length} pilots`);
    console.log(`  • ${deployments.length} deployments`);
    console.log(`  • ${glossary.length} glossary entries`);
    console.log('\n💾 Save this file in a safe location!\n');

  } catch (error) {
    console.error('❌ Backup failed:', error.message);
  }
}

async function readAllFiles(directory) {
  const files = await fs.readdir(directory);
  const jsonFiles = files.filter(f => f.endsWith('.json'));
  
  const data = await Promise.all(
    jsonFiles.map(async (file) => {
      const content = await fs.readFile(path.join(directory, file), 'utf-8');
      return JSON.parse(content);
    })
  );
  
  return data;
}

backupData();
