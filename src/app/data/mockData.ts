export interface Pilot {
  id: string;
  callsign: string;
  name: string;
  license: string;
  status: "ACTIVE" | "STANDBY" | "DEPLOYED" | "UNAVAILABLE";
  mech: {
    frame: string;
    class: string;
    designation: string;
  };
  missions: number;
  joinDate: string;
  biography?: string;
  imageUrl?: string;
  age?: number;
  origin?: string;
  specialization?: string[];
}

export interface Deployment {
  id: string;
  codename: string;
  theater: string;
  type: "COMBAT" | "RECON" | "SUPPORT" | "EXTRACTION" | "DEFENSE";
  status: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "CLASSIFIED";
  briefing: string;
  requiredPilots: number;
  currentSignups: number;
  signedUpPilots: string[]; // pilot IDs
  startDate: string;
  threat: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  tags: string[];
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

export const pilots: Pilot[] = [
  {
    id: "P001",
    callsign: "NOMAD",
    name: "Alex Chen",
    license: "LL-4",
    status: "ACTIVE",
    mech: {
      frame: "BLACKBEARD",
      class: "STRIKER",
      designation: "BB-NC-01"
    },
    missions: 12,
    joinDate: "2024-01-15",
    biography: "Former Union Navy pilot who transferred to auxiliary reserve after completing their standard service tour. Alex specializes in close-quarters combat and is known for aggressive tactical maneuvering. Their Blackbeard frame has been modified for enhanced melee capabilities. Holds commendations for three successful extraction operations in hostile territory. Grew up on a frontier colony and joined the military to protect outer rim settlements from corporate encroachment.",
    age: 35,
    origin: "Eos Frontier Territory",
    specialization: ["Close Quarters Combat", "Tactical Assault", "Extraction Operations"]
  },
  {
    id: "P002",
    callsign: "CIPHER",
    name: "Jordan Martinez",
    license: "LL-3",
    status: "STANDBY",
    mech: {
      frame: "MONARCH",
      class: "CONTROLLER",
      designation: "MN-DC-02"
    },
    missions: 8,
    joinDate: "2024-03-22",
    biography: "A technical specialist with advanced training in electronic warfare and battlefield coordination. Jordan's background in computer science and NHP systems made them a natural fit for the Monarch frame. They excel at battlefield control, using a combination of drone coordination and electronic countermeasures to support their lance. Previously worked as a civilian tech consultant before volunteering for Union auxiliary service after witnessing corporate overreach firsthand.",
    age: 30,
    origin: "Dinh Station Research Complex",
    specialization: ["Electronic Warfare", "Drone Coordination", "NHP Interface", "Tactical Networks"]
  },
  {
    id: "P003",
    callsign: "ANVIL",
    name: "Sam Parker",
    license: "LL-5",
    status: "DEPLOYED",
    mech: {
      frame: "TORTUGA",
      class: "DEFENDER",
      designation: "TG-DF-03"
    },
    missions: 18,
    joinDate: "2023-11-08",
    biography: "Veteran defender with the highest license level in the current roster. Sam has seen action across multiple theaters and is respected as a steadfast protector. Their Tortuga frame serves as an immovable bulwark, often holding critical positions while allied forces complete objectives. Known for calm decision-making under fire and mentoring newer pilots. Currently deployed on Operation Iron Monsoon, defending critical infrastructure against NHP threats on Hercynia.",
    age: 40,
    origin: "Cradle Core Worlds",
    specialization: ["Defensive Tactics", "Infrastructure Protection", "Heavy Weapons", "Squad Leadership"]
  },
  {
    id: "P004",
    callsign: "OVERWATCH",
    name: "Riley Thompson",
    license: "LL-3",
    status: "ACTIVE",
    mech: {
      frame: "NELSON",
      class: "SUPPORT",
      designation: "NL-SP-04"
    },
    missions: 6,
    joinDate: "2024-06-11",
    biography: "Newest addition to the reserve roster, Riley brings medical expertise and support capabilities to any operation. Trained as both a combat medic and mech pilot, they pilot a Nelson frame configured for field repairs and tactical support. Quick-thinking and adaptable, Riley has already proven their worth in several high-stress situations. Joined V.A.N.G.U.A.R.D. to make a difference in protecting vulnerable populations across Union space.",
    age: 28,
    origin: "Union Medical Academy, Mars",
    specialization: ["Field Medicine", "Technical Repairs", "Support Systems", "Logistics"]
  }
];

export const deployments: Deployment[] = [
  {
    id: "D001",
    codename: "OPERATION SOLSTICE RAIN",
    theater: "Caliban System",
    type: "COMBAT",
    status: "RECRUITING",
    briefing: "Union peacekeeping forces are deploying to the Caliban system to investigate reports of unauthorized corporate military activity. Initial reconnaissance suggests presence of heavy mechanized units. Mission parameters include reconnaissance, civilian protection, and potential engagement with hostile forces. This is an official Union Auxiliary operation sanctioned under Article 8 protocols.",
    requiredPilots: 4,
    currentSignups: 0,
    signedUpPilots: [],
    startDate: "2026-03-26",
    threat: "HIGH",
    tags: ["FIRST_CONTACT", "COMBAT_EXPECTED", "OFFICIAL_MODULE"]
  },
  {
    id: "D002",
    codename: "OPERATION IRON MONSOON",
    theater: "Hercynia",
    type: "DEFENSE",
    status: "IN_PROGRESS",
    briefing: "Ongoing defensive operation against hostile NHP incursion. Critical infrastructure protection required. Current team deployed, additional reserves on standby.",
    requiredPilots: 6,
    currentSignups: 6,
    signedUpPilots: ["P003"],
    startDate: "2026-02-14",
    threat: "CRITICAL",
    tags: ["NHP_THREAT", "INFRASTRUCTURE", "ONGOING"]
  },
  {
    id: "D003",
    codename: "OPERATION GREY GARDEN",
    theater: "Dinh Station",
    type: "RECON",
    status: "RECRUITING",
    briefing: "Investigate distress signals from agricultural station. Reports indicate possible equipment malfunction or sabotage. Low combat probability but bring defensive loadouts as precaution.",
    requiredPilots: 3,
    currentSignups: 1,
    signedUpPilots: ["P002"],
    startDate: "2026-04-02",
    threat: "LOW",
    tags: ["INVESTIGATION", "CIVILIAN", "SPACE_STATION"]
  }
];

export const locations: Location[] = [
  {
    id: "L001",
    name: "Caliban",
    system: "Caliban System",
    status: "CONTESTED",
    population: "~2.3M",
    governance: "Union Administrative Territory",
    activeDeployments: 1
  },
  {
    id: "L002",
    name: "Hercynia",
    system: "Hercynia System",
    status: "CRITICAL",
    population: "~850K",
    governance: "Independent Colony",
    activeDeployments: 1
  },
  {
    id: "L003",
    name: "Dinh Station",
    system: "Serpentine Cluster",
    status: "STABLE",
    population: "~45K",
    governance: "Union Economic Zone",
    activeDeployments: 1
  }
];