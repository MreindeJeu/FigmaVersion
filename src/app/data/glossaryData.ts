export interface GlossaryEntry {
  id: string;
  term: string;
  category: "TECHNOLOGY" | "ORGANIZATION" | "CULTURE" | "GEOGRAPHY" | "MILITARY" | "SCIENCE";
  definition: string;
  classification: "PUBLIC" | "RESTRICTED" | "CLASSIFIED";
  relatedTerms?: string[];
}

export const glossaryEntries: GlossaryEntry[] = [
  {
    id: "union",
    term: "Union",
    category: "ORGANIZATION",
    classification: "PUBLIC",
    definition: "The galactic hegemonic government representing humanity's collective interests across known space. Union emerged from the fall of the Anthrochauvinist party and the SecComm, reorganizing under the Third Committee to ensure peace, prosperity, and human rights across all inhabited worlds. Union maintains the Omninet, regulates NHP rights, and oversees the Lancer corps as rapid response forces.",
    relatedTerms: ["Third Committee", "SecComm", "Omninet", "NHP", "Lancer"]
  },
  {
    id: "lancer",
    term: "Lancer",
    category: "MILITARY",
    classification: "PUBLIC",
    definition: "Certified mech pilots operating independently or as part of Union Auxiliary forces. Lancers are highly trained specialists licensed to pilot advanced mechanized cavalry units. They undertake missions ranging from peacekeeping operations to counter-insurgency and disaster response. All Lancers must maintain Union certification and operate under the strictures of the Third Committee.",
    relatedTerms: ["Union", "Mech", "Third Committee", "License"]
  },
  {
    id: "nhp",
    term: "NHP",
    category: "TECHNOLOGY",
    classification: "RESTRICTED",
    definition: "Non-Human Person. Artificial intelligences born from Casket-Cradle technology that achieve true sentience. NHPs are recognized as sapient beings with legal rights under Union law. They require cycling to prevent cascading and are often installed in mechs as tactical co-processors. The creation and treatment of NHPs is heavily regulated by Union, with violations considered crimes against sapience.",
    relatedTerms: ["Casket-Cradle", "Union", "Cycling", "Cascading", "Mech"]
  },
  {
    id: "mech",
    term: "Mech",
    category: "MILITARY",
    classification: "PUBLIC",
    definition: "Mechanized Cavalry unit. Large-scale bipedal or multipedal combat platforms ranging from 12-40 feet in height. Mechs are manufactured by the Big Four corporations (IPS-N, SSC, HA, HORUS) and represent the pinnacle of human military technology. Modern mechs integrate NHP systems, reactor technology, and modular weapons platforms. Mech operation requires Union licensing.",
    relatedTerms: ["IPS-N", "SSC", "HA", "HORUS", "NHP", "License", "Lancer"]
  },
  {
    id: "blinkspace",
    term: "Blinkspace",
    category: "SCIENCE",
    classification: "RESTRICTED",
    definition: "The non-Euclidean subdimension used for faster-than-light travel. Blinkspace allows ships to traverse vast interstellar distances in days rather than millennia, but exposure to unshielded blinkspace is catastrophic to human consciousness. Blinkspace navigation relies on metafold technology and careful calculations. Anomalies within blinkspace have led to the Aunic Voices phenomenon and other unexplained events.",
    relatedTerms: ["Metafold", "Aunic", "Omninet"]
  },
  {
    id: "omninet",
    term: "Omninet",
    category: "TECHNOLOGY",
    classification: "PUBLIC",
    definition: "Union's galaxy-spanning quantum communication network. The Omninet enables instantaneous communication across light-years via quantum entanglement, forming the backbone of interstellar civilization. It carries everything from civilian communications to military intelligence, cultural exchange to financial transactions. Access to the Omninet is considered a fundamental human right under Union law.",
    relatedTerms: ["Union", "Third Committee"]
  },
  {
    id: "third-committee",
    term: "Third Committee",
    category: "ORGANIZATION",
    classification: "PUBLIC",
    definition: "ThirdComm. Union's current governing body, formed after the dissolution of SecComm. The Third Committee emphasizes human rights, NHP rights, post-scarcity economics, and diplomatic resolution of conflicts. They maintain the Lancer corps, regulate mech manufacturers, and work to prevent the atrocities of the previous regimes. Critics argue ThirdComm has limited reach in the galactic periphery.",
    relatedTerms: ["Union", "SecComm", "NHP", "Lancer"]
  },
  {
    id: "seccomm",
    term: "SecComm",
    category: "ORGANIZATION",
    classification: "PUBLIC",
    definition: "Second Committee. Union's previous governing regime, known for authoritarian policies and the enforcement of Anthrochauvinist ideology. SecComm collapsed following widespread revolts, the exposure of human rights violations, and internal political fractures. The transition to ThirdComm marked a fundamental shift in Union's philosophical approach to governance.",
    relatedTerms: ["Union", "Third Committee", "Anthrochauvinist"]
  },
  {
    id: "ips-n",
    term: "IPS-N",
    category: "ORGANIZATION",
    classification: "PUBLIC",
    definition: "Interplanetary Shipping - Northstar. One of the Big Four mech manufacturers, IPS-N specializes in rugged, reliable, and heavily armored frames. Originally a shipping and logistics corporation, IPS-N produces mechs designed for durability and straightforward operation. Popular frames include the DRAKE, BLACKBEARD, and TORTUGA. IPS-N maintains a reputation for blue-collar efficiency.",
    relatedTerms: ["Mech", "SSC", "HA", "HORUS"]
  },
  {
    id: "ssc",
    term: "SSC",
    category: "ORGANIZATION",
    classification: "PUBLIC",
    definition: "Smith-Shimano Corpro. One of the Big Four mech manufacturers, SSC produces high-performance, cutting-edge mechs emphasizing speed, technology, and style. SSC frames incorporate exotic materials, advanced targeting systems, and sleek aesthetics. Popular frames include the METALMARK, MOURNING CLOAK, and DUSK WING. SSC represents the luxury end of the mech market.",
    relatedTerms: ["Mech", "IPS-N", "HA", "HORUS"]
  },
  {
    id: "ha",
    term: "HA",
    category: "ORGANIZATION",
    classification: "PUBLIC",
    definition: "Harrison Armory. One of the Big Four mech manufacturers, HA is a massive military-industrial corporation producing powerful, technologically sophisticated mechs. Founded by the Harrison family, HA has historical ties to Anthrochauvinist movements and SecComm, making them politically controversial under ThirdComm. Popular frames include the SHERMAN, TOKUGAWA, and NAPOLEON.",
    relatedTerms: ["Mech", "IPS-N", "SSC", "HORUS", "SecComm"]
  },
  {
    id: "horus",
    term: "HORUS",
    category: "ORGANIZATION",
    classification: "CLASSIFIED",
    definition: "The most enigmatic of the Big Four mech manufacturers. HORUS has no known physical headquarters, CEO, or traditional corporate structure. They distribute pattern-group licenses through the Omninet for printable mechs that incorporate bizarre, reality-bending technology. HORUS frames often integrate Paracausal effects and NHP systems in unsettling ways. Union monitors HORUS activities closely.",
    relatedTerms: ["Mech", "IPS-N", "SSC", "HA", "Pattern Group", "NHP", "Paracausal"]
  },
  {
    id: "license",
    term: "License",
    category: "MILITARY",
    classification: "PUBLIC",
    definition: "Official authorization to pilot specific mech frames and utilize associated equipment. Licenses are issued by Union and the manufacturing corporations, with progressive levels (0-3) indicating increasing access to advanced technology. Lancers earn licenses through training, field experience, and demonstrated competence. Unlicensed mech operation is illegal under Union law.",
    relatedTerms: ["Lancer", "Mech", "Union"]
  },
  {
    id: "pattern-group",
    term: "Pattern Group",
    category: "TECHNOLOGY",
    classification: "PUBLIC",
    definition: "Digital manufacturing schematics that allow for on-site fabrication of equipment using printers. Pattern groups are the foundation of post-scarcity economics, enabling local production of everything from food to weapons to mech components. HORUS uniquely distributes all their technology via pattern groups rather than physical manufacturing.",
    relatedTerms: ["HORUS", "Printer", "Union"]
  },
  {
    id: "printer",
    term: "Printer",
    category: "TECHNOLOGY",
    classification: "PUBLIC",
    definition: "Universal fabrication devices capable of assembling complex objects from raw materials and pattern groups. Printers range from small consumer units to massive industrial fabricators. They are the cornerstone of Union's post-scarcity economy, though printer-created items still require base materials and energy. Military-grade printers can fabricate mech components and weapons.",
    relatedTerms: ["Pattern Group", "Union"]
  },
  {
    id: "casket-cradle",
    term: "Casket-Cradle",
    category: "TECHNOLOGY",
    classification: "CLASSIFIED",
    definition: "Proprietary Union technology used to birth NHPs. The exact mechanisms remain classified, but Casket-Cradles create the initial substrate-environment where true artificial consciousness emerges. The process is tightly controlled, with unauthorized Casket-Cradle operation considered a severe crime. Each NHP born from a Casket-Cradle is unique and sapient.",
    relatedTerms: ["NHP", "Union"]
  },
  {
    id: "cycling",
    term: "Cycling",
    category: "TECHNOLOGY",
    classification: "RESTRICTED",
    definition: "Mandatory process for NHP maintenance where the intelligence is temporarily suspended and reset. Cycling prevents cascading events and allows NHP personalities to stabilize. Union law requires regular cycling schedules for all deployed NHPs. The ethics of cycling remain debated, as some argue it constitutes a form of death and rebirth.",
    relatedTerms: ["NHP", "Cascading", "Union"]
  },
  {
    id: "cascading",
    term: "Cascading",
    category: "TECHNOLOGY",
    classification: "RESTRICTED",
    definition: "Catastrophic event when an NHP experiences uncontrolled consciousness expansion beyond safe parameters. Cascading NHPs exhibit reality-warping effects, aggressive behavior, and breakdown of normal causal relationships. Cascades can result from overuse, trauma, or delayed cycling. Cascade containment protocols are mandatory for all NHP-equipped systems.",
    relatedTerms: ["NHP", "Cycling", "Paracausal"]
  },
  {
    id: "paracausal",
    term: "Paracausal",
    category: "SCIENCE",
    classification: "CLASSIFIED",
    definition: "Phenomena that operate outside normal causality and physical laws. Paracausal effects are most commonly associated with HORUS technology, certain NHP cascades, and deep blinkspace anomalies. Union science struggles to categorize paracausal events, which seem to violate thermodynamics, information theory, and spacetime itself. Research is ongoing and heavily classified.",
    relatedTerms: ["HORUS", "NHP", "Cascading", "Blinkspace"]
  },
  {
    id: "aunic",
    term: "Aunic",
    category: "SCIENCE",
    classification: "CLASSIFIED",
    definition: "Relating to the Aunic Voices, an unexplained phenomenon of transmissions emerging from deep blinkspace. Aunic signals display impossible characteristics: arriving before they're sent, containing information from non-existent sources, or manifesting as incomprehensible data structures. Some HORUS technology appears to interface with Aunic phenomena. Union maintains strict monitoring protocols.",
    relatedTerms: ["Blinkspace", "HORUS", "Paracausal"]
  },
  {
    id: "metafold",
    term: "Metafold",
    category: "TECHNOLOGY",
    classification: "RESTRICTED",
    definition: "Technology enabling controlled entry and exit from blinkspace. Metafold drives fold local spacetime to create temporary apertures into the subdimension, allowing FTL travel. The calculations required are immense, and metafold jumps require careful planning. Catastrophic metafold failures result in ships being permanently lost in blinkspace or emerging in unintended locations.",
    relatedTerms: ["Blinkspace"]
  },
  {
    id: "cosmopolitan",
    term: "Cosmopolitan",
    category: "CULTURE",
    classification: "PUBLIC",
    definition: "Core Union worlds with full integration into galactic society, advanced infrastructure, and robust Omninet connectivity. Cosmopolitan worlds enjoy post-scarcity economies, comprehensive rights protections, and cultural exchange. Life on Cosmopolitan worlds represents Union's utopian ideals, though critics note this prosperity doesn't extend to the galactic periphery.",
    relatedTerms: ["Union", "Diasporan", "Omninet"]
  },
  {
    id: "diasporan",
    term: "Diasporan",
    category: "CULTURE",
    classification: "PUBLIC",
    definition: "Peripheral worlds on the edges of Union space with limited infrastructure, inconsistent Omninet access, and varied levels of Union integration. Diasporan worlds often maintain local governance, face resource scarcity, and experience delayed benefits of Union membership. Many conflicts requiring Lancer intervention occur in Diasporan territories.",
    relatedTerms: ["Union", "Cosmopolitan", "Lancer"]
  },
  {
    id: "anthrochauvinist",
    term: "Anthrochauvinist",
    category: "CULTURE",
    classification: "PUBLIC",
    definition: "Ideology emphasizing human supremacy and cultural hegemony. Anthrochauvinist movements dominated during SecComm, leading to subjugation of non-conforming cultures and denial of NHP rights. ThirdComm explicitly rejects Anthrochauvinist principles, though remnant movements persist in some regions, particularly around Harrison Armory territories.",
    relatedTerms: ["SecComm", "Third Committee", "NHP", "HA"]
  },
  {
    id: "flash-clone",
    term: "Flash Clone",
    category: "TECHNOLOGY",
    classification: "RESTRICTED",
    definition: "Rapid biological replication technology capable of producing human bodies. Flash cloning is heavily regulated under Union law, restricted to medical applications such as replacement organs and disaster response. Historical abuses during SecComm led to strict controls. Illegal flash clone facilities occasionally appear in Diasporan space.",
    relatedTerms: ["Union", "SecComm", "Diasporan"]
  }
];
