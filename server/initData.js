import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');

// Sample data
const pilots = [
  {
    id: "P001",
    callsign: "NOMAD",
    name: "Alex Chen",
    license: "LL-3",
    status: "ACTIVE",
    mech: {
      frame: "IPS-N BLACKBEARD",
      class: "STRIKER",
      designation: "BB-001"
    },
    missions: 12,
    joinDate: "2025-01-15",
    age: 28,
    origin: "Diasporan Fleet",
    specialization: ["Close Combat", "Boarding Actions"]
  },
  {
    id: "P002",
    callsign: "WRAITH",
    name: "Sarah Kim",
    license: "LL-4",
    status: "DEPLOYED",
    mech: {
      frame: "SSC MOURNING CLOAK",
      class: "INFILTRATOR",
      designation: "MC-007"
    },
    missions: 23,
    joinDate: "2024-08-20",
    age: 31,
    origin: "Cressidium",
    specialization: ["Stealth Ops", "Electronic Warfare"]
  },
  {
    id: "P003",
    callsign: "HAMMER",
    name: "Marcus Rivera",
    license: "LL-2",
    status: "STANDBY",
    mech: {
      frame: "GMS EVEREST",
      class: "GENERALIST",
      designation: "EV-042"
    },
    missions: 8,
    joinDate: "2025-03-10",
    age: 35,
    origin: "Karrakis",
    specialization: ["Heavy Weapons", "Fortifications"]
  }
];

const deployments = [
  {
    id: "D001",
    codename: "OPERATION BASILISK",
    theater: "Eshkadi Frontier",
    type: "COMBAT",
    status: "RECRUITING",
    briefing: "High-priority combat deployment to contested space in the Eshkadi Frontier. Intelligence reports indicate significant enemy presence. Union Navy requests lancer support for ground operations. Expected duration: 3-5 weeks. Combat pay authorized.",
    requiredPilots: 4,
    currentSignups: 2,
    signedUpPilots: ["P001", "P002"],
    startDate: "2026-04-01",
    threat: "HIGH",
    tags: ["COMBAT", "FRONTLINE", "HAZARD_PAY", "LONG_TERM"]
  },
  {
    id: "D002",
    codename: "OPERATION GUARDIAN",
    theater: "Hercynia System",
    type: "DEFENSE",
    status: "RECRUITING",
    briefing: "Defensive operations protecting civilian population centers from pirate raids. Low-intensity conflict with focus on deterrence and rapid response. Union Colonial Administration requests support.",
    requiredPilots: 3,
    currentSignups: 0,
    signedUpPilots: [],
    startDate: "2026-04-15",
    threat: "MEDIUM",
    tags: ["DEFENSE", "CIVILIAN", "ESCORT"]
  },
  {
    id: "D003",
    codename: "OPERATION NIGHTFALL",
    theater: "Maw Aggregate",
    type: "RECON",
    status: "IN_PROGRESS",
    briefing: "Covert reconnaissance mission into disputed territory. This deployment requires pilots with stealth capabilities and electronic warfare expertise. Mission parameters are classified.",
    requiredPilots: 2,
    currentSignups: 2,
    signedUpPilots: ["P002", "P003"],
    startDate: "2026-03-10",
    threat: "CRITICAL",
    tags: ["STEALTH", "RECON", "CLASSIFIED", "HAZARD_PAY"]
  }
];

const glossaryEntries = [
  {
    id: "term-1",
    term: "COMP/CON",
    definition: "Computerized Combat Controller - The standard operating system and AI assistant used by all licensed mech pilots. COMP/CON provides tactical analysis, targeting assistance, and system management during combat operations.",
    category: "TECHNOLOGY",
    classification: "PUBLIC",
    relatedTerms: ["NHP", "LANCER"]
  },
  {
    id: "term-2",
    term: "LANCER",
    definition: "Licensed mech pilot certified by Union to operate mechanized cavalry units. Lancers undergo rigorous training and must maintain their license through regular evaluation and mission completion.",
    category: "PERSONNEL",
    classification: "PUBLIC",
    relatedTerms: ["MECH", "LICENSE_LEVEL"]
  },
  {
    id: "term-3",
    term: "NHP",
    definition: "Non-Human Person - Advanced artificial intelligence entities recognized as sentient beings under Union law. NHPs can be shackled to operate military hardware, though this practice remains ethically controversial.",
    category: "TECHNOLOGY",
    classification: "RESTRICTED",
    relatedTerms: ["COMP/CON", "SHACKLING"]
  },
  {
    id: "term-4",
    term: "UNION",
    definition: "The galactic hegemonic power and governing body for human-occupied space. Union administers colonized systems, regulates interstellar commerce, and maintains peacekeeping forces throughout known space.",
    category: "ORGANIZATION",
    classification: "PUBLIC",
    relatedTerms: ["LANCER", "COLONIAL_ADMINISTRATION"]
  },
  {
    id: "term-5",
    term: "LICENSE LEVEL",
    definition: "Certification rank for mech pilots, ranging from LL-0 (basic certification) to LL-12 (master pilot). Higher license levels grant access to advanced frames, systems, and weapons. Advancement requires combat experience and mission completion.",
    category: "SYSTEM",
    classification: "PUBLIC",
    relatedTerms: ["LANCER", "MECH"]
  }
];

async function initializeData() {
  console.log('🔄 Initializing data directories...\n');

  // Create directories
  await fs.mkdir(path.join(DATA_DIR, 'pilots'), { recursive: true });
  await fs.mkdir(path.join(DATA_DIR, 'deployments'), { recursive: true });
  await fs.mkdir(path.join(DATA_DIR, 'glossary'), { recursive: true });

  // Write pilot files
  console.log('📝 Creating pilot files...');
  for (const pilot of pilots) {
    const filepath = path.join(DATA_DIR, 'pilots', `${pilot.id}.json`);
    await fs.writeFile(filepath, JSON.stringify(pilot, null, 2));
    console.log(`  ✅ ${pilot.id}.json - ${pilot.callsign}`);
  }

  // Write deployment files
  console.log('\n📝 Creating deployment files...');
  for (const deployment of deployments) {
    const filepath = path.join(DATA_DIR, 'deployments', `${deployment.id}.json`);
    await fs.writeFile(filepath, JSON.stringify(deployment, null, 2));
    console.log(`  ✅ ${deployment.id}.json - ${deployment.codename}`);
  }

  // Write glossary files
  console.log('\n📝 Creating glossary files...');
  for (const entry of glossaryEntries) {
    const filepath = path.join(DATA_DIR, 'glossary', `${entry.id}.json`);
    await fs.writeFile(filepath, JSON.stringify(entry, null, 2));
    console.log(`  ✅ ${entry.id}.json - ${entry.term}`);
  }

  console.log('\n✨ Data initialization complete!\n');
  console.log('📁 Data location:', DATA_DIR);
  console.log('\nYou can now:');
  console.log('  • Edit any .json file directly');
  console.log('  • Add new files by creating new .json files');
  console.log('  • Delete files to remove entries');
  console.log('  • Run "npm run server" to start the backend\n');
}

initializeData().catch(console.error);
