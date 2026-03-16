/**
 * ═══════════════════════════════════════════════════════════════════════════
 * COMP//CON TYPE DEFINITIONS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * TypeScript interfaces for COMP//CON exported pilot JSON files.
 * These types match the structure of pilots exported from the official
 * LANCER webapp COMP//CON (https://compcon.app)
 */

export interface CompconPilot {
  id: string;
  level: number;
  callsign: string;
  name: string;
  player_name: string;
  status: string;
  dead: boolean;
  text_appearance: string;
  notes: string;
  history: string;
  quirks: string[];
  current_hp: number;
  background: string;
  resistances: any[];
  mechs: CompconMech[];
  skills: CompconSkill[];
  talents: CompconTalent[];
  mechSkills: number[]; // [hull, agility, systems, engineering]
  counter_data: any[];
  custom_counters: any[];
  core_bonuses: any[];
  licenses: CompconLicense[];
  reserves: any[];
  orgs: any[];
  combat_history: CompconCombatHistory;
  state: any;
  cloud_portrait: string;
  portrait: string;
  loadout: CompconPilotLoadout;
  xp: number;
  stress: number;
  maxStress: number;
  isBroken: boolean;
  burdens: any[];
  bondPowers: any[];
  powerSelections: number;
  bondAnswers: string[];
  minorIdeal: string;
  clocks: any[];
  group: string;
  sort_index: number;
  lastModified: string;
  isDeleted: boolean;
  expireTime: string;
  deleteTime: string;
  lastUpdate_cloud: string;
  lastSync: string;
  shareCode?: string;
  shareCodeExpiry?: string;
  cc_ver: string;
  special_equipment: any;
  brews: any[];
  bondId: string;
}

export interface CompconMech {
  id: string;
  name: string;
  notes: string;
  gm_note: string;
  frame: string;
  active: boolean;
  current_structure: number;
  current_move: number;
  boost: number;
  current_hp: number;
  overshield: number;
  current_stress: number;
  current_heat: number;
  current_repairs: number;
  current_overcharge: number;
  current_core_energy: number;
  statuses: any[];
  conditions: any[];
  resistances: any[];
  reactions: any[];
  burn: number;
  destroyed: boolean;
  defeat: string;
  activations: number;
  meltdown_imminent: boolean;
  reactor_destroyed: boolean;
  core_active: boolean;
  loadouts: CompconMechLoadout[];
  active_loadout_index: number;
  counter_data: any[];
  custom_counters: any[];
  cloud_portrait: string;
  portrait: string;
  lastModified: string;
  isDeleted: boolean;
  expireTime: string;
  deleteTime: string;
  cc_ver: string;
}

export interface CompconMechLoadout {
  id: string;
  name: string;
  systems: CompconSystem[];
  integratedSystems: any[];
  mounts: CompconMount[];
  integratedMounts: CompconIntegratedMount[];
  improved_armament: any;
  superheavy_mounting: any;
  integratedWeapon: any;
  extraMounts: any[];
  extraIntegratedMounts: any[];
}

export interface CompconSystem {
  id: string;
  uses: number;
  destroyed: boolean;
  cascading: boolean;
  flavorName: string;
  flavorDescription: string;
}

export interface CompconMount {
  mount_type: string;
  lock: boolean;
  slots: CompconMountSlot[];
  extra: CompconMountSlot[];
  bonus_effects: any[];
  modifiable: boolean;
}

export interface CompconIntegratedMount {
  weapon: CompconWeapon;
}

export interface CompconMountSlot {
  size: string;
  weapon: CompconWeapon | null;
}

export interface CompconWeapon {
  id: string;
  destroyed: boolean;
  cascading: boolean;
  loaded: boolean;
  mod: any;
  flavorName: string;
  flavorDescription: string;
  customDamageType: any;
  maxUseOverride: number;
  uses: number;
  selectedProfile: number;
}

export interface CompconSkill {
  id: string;
  rank: number;
}

export interface CompconTalent {
  id: string;
  rank: number;
}

export interface CompconLicense {
  id: string;
  rank: number;
}

export interface CompconCombatHistory {
  moves: number;
  kills: number;
  damage: number;
  hp_damage: number;
  structure_damage: number;
  overshield: number;
  heat_damage: number;
  reactor_damage: number;
  overcharge_uses: number;
  core_uses: number;
}

export interface CompconPilotLoadout {
  id: string;
  name: string;
  armor: CompconPilotGear[];
  weapons: CompconPilotGear[];
  gear: CompconPilotGear[];
  extendedWeapons: (CompconPilotGear | null)[];
  extendedGear: (CompconPilotGear | null)[];
}

export interface CompconPilotGear {
  id: string;
  destroyed: boolean;
  uses: number;
  cascading: boolean;
  flavorName: string;
  flavorDescription: string;
  customDamageType: any;
}

/**
 * Helper function to get human-readable frame name from COMP//CON frame ID
 */
export function getFrameName(frameId: string): string {
  const frameMap: Record<string, string> = {
    'mf_standard_pattern_i_everest': 'EVEREST',
    'mf_blackbeard': 'BLACKBEARD',
    'mf_monarch': 'MONARCH',
    'mf_tortuga': 'TORTUGA',
    'mf_nelson': 'NELSON',
    'mf_lancaster': 'LANCASTER',
    // Add more as needed
  };
  return frameMap[frameId] || frameId.replace('mf_', '').replace(/_/g, ' ').toUpperCase();
}

/**
 * Helper function to get human-readable skill name from COMP//CON skill ID
 */
export function getSkillName(skillId: string): string {
  return skillId.replace('sk_', '').replace(/_/g, ' ').toUpperCase();
}

/**
 * Helper function to get human-readable talent name from COMP//CON talent ID
 */
export function getTalentName(talentId: string): string {
  return talentId.replace('t_', '').replace(/_/g, ' ').toUpperCase();
}

/**
 * Helper function to get human-readable weapon name from COMP//CON weapon ID
 */
export function getWeaponName(weaponId: string): string {
  return weaponId.replace('mw_', '').replace(/_/g, ' ').toUpperCase();
}

/**
 * Helper function to get human-readable system name from COMP//CON system ID
 */
export function getSystemName(systemId: string): string {
  return systemId.replace('ms_', '').replace(/_/g, ' ').toUpperCase();
}

/**
 * Helper to get mech skill names
 */
export const MECH_SKILL_NAMES = ['HULL', 'AGILITY', 'SYSTEMS', 'ENGINEERING'];

/**
 * Helper to strip HTML tags from history/notes fields
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}
