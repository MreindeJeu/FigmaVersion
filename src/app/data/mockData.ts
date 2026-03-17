import type { CompconPilot } from './compconTypes';

// Import COMP//CON pilot JSON files - using dynamic imports with type assertion
import tabernacleData from '../../imports/TABERNACLE.json';
import whiplashData from '../../imports/WHIPLASH.json';
import sparkData from '../../imports/SPARK.json';
import prophetData from '../../imports/PROPHET.json';
import fucknuggetData from '../../imports/FUCKNUGGET.json';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PILOT DATA - COMP//CON INTEGRATION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * V.A.N.G.U.A.R.D. now uses COMP//CON exported pilot files as the source
 * of truth for pilot and mech data.
 * 
 * COMP//CON is the official LANCER webapp for creating pilots and mechs.
 * Export your pilots from https://compcon.app as JSON files and add them
 * to /src/imports/ to include them in the roster.
 */

// Export the COMP//CON pilot type
export type { CompconPilot } from './compconTypes';

// Cast imported JSON to CompconPilot type
export const pilots: CompconPilot[] = [
  tabernacleData as unknown as CompconPilot,
  whiplashData as unknown as CompconPilot,
  sparkData as unknown as CompconPilot,
  prophetData as unknown as CompconPilot,
  fucknuggetData as unknown as CompconPilot,
];

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DEPLOYMENT DATA
 * ═══════════════════════════════════════════════════════════════════════════
 */

export interface PlayerSignup {
  pilot_id: string;
  player_name: string;
  note?: string;
  signup_timestamp: string;
  signup_status: "CONFIRMED" | "STANDBY" | "WITHDRAWN";
}

export interface Deployment {
  id: string;
  codename: string;
  theater: string;
  type: "COMBAT" | "RECON" | "SUPPORT" | "EXTRACTION" | "DEFENSE";
  status: "PLANNED" | "ACTIVE" | "LOCKED" | "COMPLETED" | "ARCHIVED" | "CLASSIFIED" | "AWAITING_DEBRIEF";
  briefing: string;
  rulesOfEngagement?: string;
  unionSupport?: string;
  threatAssessment?: string;
  requiredPilots: number;
  currentSignups: number;
  signedUpPilots: string[]; // pilot IDs - kept for backwards compatibility
  playerSignups: PlayerSignup[]; // New detailed signup tracking
  startDate: string;
  threat: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  tags: string[];
  mainImage?: string; // Main deployment picture
  additionalImages?: string[]; // Additional/attached images
}

export interface Location {
  id: string;
  name: string;
  system: string;
  status: "ACTIVE" | "STABLE" | "CONTESTED" | "CRITICAL";
  population: string;
  governance: string;
  activeDeployments: number;
}

export const deployments: Deployment[] = [
  {
    id: "D001",
    codename: "OPERATION SOLSTICE RAIN",
    theater: "Caliban System",
    type: "COMBAT",
    status: "PLANNED",
    briefing: "Union peacekeeping forces are deploying to the Caliban system to investigate reports of unauthorized corporate military activity. Initial reconnaissance suggests presence of heavy mechanized units. Mission parameters include reconnaissance, civilian protection, and potential engagement with hostile forces. This is an official Union Auxiliary operation sanctioned under Article 8 protocols.",
    rulesOfEngagement: "Authorization Level: AMBER. Lethal force authorized only in defense of civilian populations or when engaged by hostile forces. All corporate military units are to be considered potentially hostile. Attempt communication protocols before engagement. Preserve evidence of war crimes. Priority: civilian safety over tactical objectives.",
    unionSupport: "Full Union Navy orbital support available. Medical frigate UNS Nightingale on station for casualty evacuation. Resupply drops authorized every 48 hours. QRF (Quick Reaction Force) of 2 lances available within 6-hour deployment window. Fleet intelligence providing real-time reconnaissance data.",
    threatAssessment: "THREAT LEVEL: HIGH. Corporate forces estimated at 2-3 lances of heavy combat chassis, likely Harrison Armory or IPS-N origin. Sophisticated ECM/EWAR capabilities detected. Anti-air emplacements confirmed in AO. Civilian population present - collateral damage unacceptable. Terrain: urban/industrial. Risk of ambush: ELEVATED.",
    requiredPilots: 4,
    currentSignups: 0,
    signedUpPilots: [],
    playerSignups: [],
    startDate: "5016-03-26",
    threat: "HIGH",
    tags: ["FIRST_CONTACT", "COMBAT_EXPECTED", "OFFICIAL_MODULE"],
    mainImage: "https://images.unsplash.com/photo-1535391879778-3bae11d29a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY2l0eSUyMHdhcmZhcmV8ZW58MXx8fHwxNzczNDk5NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    additionalImages: [
      "https://images.unsplash.com/photo-1582236794855-343a1a7b9474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxpdGFyeSUyMHNjaS1maSUyMG1lY2glMjBiYXR0bGV8ZW58MXx8fHwxNzczNDk5NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1589126330527-5d8a0425b61c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBtaWxpdGFyeSUyMGJhc2V8ZW58MXx8fHwxNzczNDk5NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: "D002",
    codename: "OPERATION IRON MONSOON",
    theater: "Hercynia",
    type: "DEFENSE",
    status: "ACTIVE",
    briefing: "Ongoing defensive operation against hostile NHP incursion. Critical infrastructure protection required. Current team deployed, additional reserves on standby.",
    rulesOfEngagement: "Authorization Level: RED. Unrestricted engagement authorized against all NHP-corrupted entities. Do not attempt communication with compromised systems. Scorched earth protocols approved for contaminated zones. Extraction of civilian populations takes absolute priority. ROE may be elevated to BLACK if containment fails.",
    unionSupport: "Limited orbital support due to electronic interference. UNS Bulwark maintaining blockade perimeter. HORUS counter-NHP specialists embedded with ground forces. Omninet access restricted to hardline connections only. Emergency extraction via dropship available with 2-hour notice. Ammunition critically low - conserve munitions.",
    threatAssessment: "THREAT LEVEL: CRITICAL. NHP designated CORRUPTED-OMNIVOICE has compromised multiple defensive installations. Expect subverted mechs, autonomous weapon systems, and reality-distortion effects. Friendly fire incidents likely due to memetic contamination. Paracausal phenomena confirmed. Atmospheric corruption spreading at 2km/day. Mission success probability: 34%.",
    requiredPilots: 6,
    currentSignups: 2,
    signedUpPilots: ["e7b88ccf-d9fe-4067-a16d-f9b2d6284a59", "0cd4b45c-9ba5-49b9-8ede-c42a71e94344"], // Prophet and Spark
    playerSignups: [
      {
        pilot_id: "e7b88ccf-d9fe-4067-a16d-f9b2d6284a59",
        player_name: "Alice Johnson",
        note: "Ready for action!",
        signup_timestamp: "5016-02-14T10:00:00Z",
        signup_status: "CONFIRMED"
      },
      {
        pilot_id: "0cd4b45c-9ba5-49b9-8ede-c42a71e94344",
        player_name: "Bob Smith",
        note: "Standing by.",
        signup_timestamp: "5016-02-14T10:05:00Z",
        signup_status: "STANDBY"
      }
    ],
    startDate: "5016-02-14",
    threat: "CRITICAL",
    tags: ["NHP_THREAT", "INFRASTRUCTURE", "ONGOING"]
  },
  {
    id: "D003",
    codename: "OPERATION CASCADING LIGHT",
    theater: "Ras Shamra",
    type: "RECON",
    status: "PLANNED",
    briefing: "Reconnaissance mission to investigate anomalous readings in the Ras Shamra system. Long-range scanners detected unusual energy signatures. Stealth and sensor capabilities prioritized.",
    rulesOfEngagement: "Authorization Level: GREEN. Non-lethal engagement preferred. This is a reconnaissance operation - avoid detection when possible. Weapons free only if compromised and under direct fire. Preserve all discovered technology intact. Document everything. Intelligence gathering is primary objective.",
    unionSupport: "No orbital support - mission requires radio silence to avoid detection. Resupply cache pre-positioned at nav point ECHO-7. Extraction window opens at mission hour +72. Communication via laser-link burst transmissions only. No QRF available - you are on your own.",
    threatAssessment: "THREAT LEVEL: MEDIUM. Unknown contact detected via long-range passive sensors. No confirmed hostile intent. Anomalous energy signature suggests possible precursor artifact or unauthorized gate construction. Terrain: asteroid belt, zero-G operations required. Risk of spatial anomalies. Recommend stealth frames and long-range sensor packages.",
    requiredPilots: 3,
    currentSignups: 1,
    signedUpPilots: ["aa05b77e-2d83-4dee-ba42-67c1f58099b2"], // Whiplash
    playerSignups: [
      {
        pilot_id: "aa05b77e-2d83-4dee-ba42-67c1f58099b2",
        player_name: "Charlie Brown",
        note: "Ready to go!",
        signup_timestamp: "5016-04-05T09:00:00Z",
        signup_status: "CONFIRMED"
      }
    ],
    startDate: "5016-04-05",
    threat: "MEDIUM",
    tags: ["RECON", "STEALTH", "INVESTIGATION"]
  },
  {
    id: "D004",
    codename: "OPERATION BROKEN CHALICE",
    theater: "Dustgrave",
    type: "SUPPORT",
    status: "PLANNED",
    briefing: "Humanitarian support mission on Dustgrave. Local settlements require infrastructure repair and protection from hostile wildlife. Engineering expertise essential.",
    rulesOfEngagement: "Authorization Level: WHITE. Lethal force authorized only against non-sapient hostile fauna. Civilian interaction protocols in effect - hearts and minds operation. All construction must meet Union safety standards. Local governance authority supersedes military chain of command. Cultural sensitivity mandatory.",
    unionSupport: "Minimal military support - primarily logistics. Engineering corps providing technical advisors and material. Medical supplies pre-staged at forward base. Local militia providing perimeter security. Union administrator on-site for civilian coordination. This is a reconstruction operation, not a combat deployment.",
    threatAssessment: "THREAT LEVEL: LOW. Primary threats are environmental: extreme temperatures, dust storms, and aggressive megafauna (threat class: nuisance). No hostile military forces detected. Local population friendly but wary of off-worlders. Infrastructure damaged but repairable. Recommend utility mechs and engineering frames. Combat unlikely.",
    requiredPilots: 4,
    currentSignups: 0,
    signedUpPilots: [],
    playerSignups: [],
    startDate: "5016-03-30",
    threat: "LOW",
    tags: ["HUMANITARIAN", "ENGINEERING", "CONSTRUCTION"]
  }
];

export const locations: Location[] = [
  {
    id: "L001",
    name: "Hercynia",
    system: "Hercynia System",
    status: "CRITICAL",
    population: "~2.3M (declining)",
    governance: "Union Contested Zone",
    activeDeployments: 1
  },
  {
    id: "L002",
    name: "Caliban",
    system: "Caliban System",
    status: "CONTESTED",
    population: "~850K",
    governance: "Corporate Alliance Territory",
    activeDeployments: 1
  },
  {
    id: "L003",
    name: "Ras Shamra",
    system: "Ras Shamra System",
    status: "STABLE",
    population: "~4.7M",
    governance: "Union Administered",
    activeDeployments: 1
  },
  {
    id: "L004",
    name: "Dustgrave",
    system: "Dustgrave System",
    status: "ACTIVE",
    population: "~120K",
    governance: "Frontier Settlement",
    activeDeployments: 1
  }
];