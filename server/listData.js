import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

async function listDataFiles() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║           V.A.N.G.U.A.R.D. DATA INVENTORY                  ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  try {
    // List Pilots
    console.log('🧑‍✈️  PILOTS:');
    const pilotFiles = await fs.readdir(path.join(DATA_DIR, 'pilots'));
    const pilots = await Promise.all(
      pilotFiles
        .filter(f => f.endsWith('.json'))
        .map(async f => {
          const content = await fs.readFile(path.join(DATA_DIR, 'pilots', f), 'utf-8');
          return JSON.parse(content);
        })
    );
    pilots.forEach(p => {
      console.log(`  • ${p.id} - ${p.callsign} (${p.status}) - ${p.mech.frame}`);
    });

    // List Deployments
    console.log('\n🎯 DEPLOYMENTS:');
    const deploymentFiles = await fs.readdir(path.join(DATA_DIR, 'deployments'));
    const deployments = await Promise.all(
      deploymentFiles
        .filter(f => f.endsWith('.json'))
        .map(async f => {
          const content = await fs.readFile(path.join(DATA_DIR, 'deployments', f), 'utf-8');
          return JSON.parse(content);
        })
    );
    deployments.forEach(d => {
      console.log(`  • ${d.id} - ${d.codename} (${d.status}) - ${d.currentSignups}/${d.requiredPilots} pilots`);
    });

    // List Glossary
    console.log('\n📖 GLOSSARY ENTRIES:');
    const glossaryFiles = await fs.readdir(path.join(DATA_DIR, 'glossary'));
    const glossary = await Promise.all(
      glossaryFiles
        .filter(f => f.endsWith('.json'))
        .map(async f => {
          const content = await fs.readFile(path.join(DATA_DIR, 'glossary', f), 'utf-8');
          return JSON.parse(content);
        })
    );
    glossary.forEach(e => {
      console.log(`  • ${e.id} - ${e.term} (${e.category})`);
    });

    console.log(`\n📁 Data Location: ${DATA_DIR}`);
    console.log(`\nTotal: ${pilots.length} pilots, ${deployments.length} deployments, ${glossary.length} glossary entries\n`);

  } catch (error) {
    console.error('❌ Error reading data:', error.message);
    console.log('\n💡 Tip: Run "npm run init-data" to create the data folder first.\n');
  }
}

listDataFiles();
