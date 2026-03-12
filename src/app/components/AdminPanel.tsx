import { useState } from "react";
import { useData } from "../context/DataContext";
import { Shield, Users, FileText, TrendingUp, Calendar, Database, Terminal, X, Plus, Edit, Trash2, Book } from "lucide-react";
import type { Pilot, Deployment } from "../data/mockData";
import type { GlossaryEntry } from "../data/glossaryData";
import { toast } from "sonner";

type ModalType = "deployment" | "pilot" | "glossary" | null;

export function AdminPanel() {
  const { pilots, deployments, glossaryEntries, addPilot, addDeployment, addGlossaryEntry, deletePilot, deleteDeployment } = useData();
  const [modalOpen, setModalOpen] = useState<ModalType>(null);

  return (
    <div className="min-h-screen p-8 font-mono">
      {/* Terminal Header */}
      <div className="mb-8 border-2 border-yellow-500/30 bg-yellow-500/5 p-4">
        <div className="text-xs text-green-600/70 mb-2">// ACCESSING ADMIN CONTROL PANEL // RESTRICTED</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]" />
            <h1 className="text-3xl font-bold text-yellow-500 tracking-wider drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]">
              ▶ ADMIN CONTROL
            </h1>
          </div>
          <div className="text-xs text-yellow-600/70">
            CLEARANCE: ADMINISTRATOR
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="border-2 border-green-500/30 bg-green-500/5 p-5">
          <div className="text-xs text-green-600/70 mb-2 tracking-wider">// TOTAL PILOTS</div>
          <div className="text-4xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">{pilots.length}</div>
        </div>
        <div className="border-2 border-green-500/30 bg-green-500/5 p-5">
          <div className="text-xs text-green-600/70 mb-2 tracking-wider">// ACTIVE DEPLOYMENTS</div>
          <div className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]">
            {deployments.filter(d => d.status !== "COMPLETED").length}
          </div>
        </div>
        <div className="border-2 border-green-500/30 bg-green-500/5 p-5">
          <div className="text-xs text-green-600/70 mb-2 tracking-wider">// RECRUITING NOW</div>
          <div className="text-4xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]">
            {deployments.filter(d => d.status === "RECRUITING").length}
          </div>
        </div>
        <div className="border-2 border-green-500/30 bg-green-500/5 p-5">
          <div className="text-xs text-green-600/70 mb-2 tracking-wider">// GLOSSARY ENTRIES</div>
          <div className="text-4xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">
            {glossaryEntries.length}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <h2 className="text-sm font-bold text-green-500 tracking-wider">// QUICK ACTIONS</h2>
          <div className="flex-1 h-px bg-green-500/30" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setModalOpen("deployment")}
            className="p-5 border-2 border-green-500/30 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/50 transition-all text-left group"
          >
            <FileText className="w-5 h-5 mb-3 text-green-500 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <div className="font-bold mb-1 text-green-400">Create New Deployment</div>
            <div className="text-xs text-green-600/70">Post a new mission to the board</div>
          </button>
          <button 
            onClick={() => setModalOpen("pilot")}
            className="p-5 border-2 border-green-500/30 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/50 transition-all text-left group"
          >
            <Users className="w-5 h-5 mb-3 text-green-500 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <div className="font-bold mb-1 text-green-400">Manage Pilots</div>
            <div className="text-xs text-green-600/70">Add or edit pilot records</div>
          </button>
          <button 
            onClick={() => setModalOpen("glossary")}
            className="p-5 border-2 border-green-500/30 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/50 transition-all text-left group"
          >
            <Book className="w-5 h-5 mb-3 text-green-500 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <div className="font-bold mb-1 text-green-400">Add Glossary Entry</div>
            <div className="text-xs text-green-600/70">Expand the Union knowledge base</div>
          </button>
        </div>
      </div>

      {/* Campaign Overview */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-4 h-4 text-green-500" />
          <h2 className="text-sm font-bold text-green-500 tracking-wider">// CAMPAIGN OVERVIEW</h2>
          <div className="flex-1 h-px bg-green-500/30" />
        </div>
        <div className="border-2 border-green-500/30 bg-green-500/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-b-2 border-green-500/20">
                <tr className="text-left">
                  <th className="p-3 text-green-600/70 tracking-wider">OPERATION</th>
                  <th className="p-3 text-green-600/70 tracking-wider">STATUS</th>
                  <th className="p-3 text-green-600/70 tracking-wider">THEATER</th>
                  <th className="p-3 text-green-600/70 tracking-wider">SIGNUPS</th>
                  <th className="p-3 text-green-600/70 tracking-wider">START DATE</th>
                  <th className="p-3 text-green-600/70 tracking-wider">THREAT</th>
                  <th className="p-3 text-green-600/70 tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-green-500/10">
                {deployments.map(deployment => (
                  <tr key={deployment.id} className="hover:bg-green-500/10 transition-colors">
                    <td className="p-3 font-bold text-green-400">{deployment.codename}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 border border-green-500/30 bg-green-500/5 text-green-400 text-[10px]">
                        {deployment.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-3 text-green-600/70">{deployment.theater}</td>
                    <td className="p-3 text-green-400">
                      <span className="font-bold">{deployment.currentSignups}</span>/{deployment.requiredPilots}
                    </td>
                    <td className="p-3 text-green-600/70">
                      {new Date(deployment.startDate).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 border font-bold text-[10px] ${
                        deployment.threat === "CRITICAL" ? "border-red-500/50 text-red-400 bg-red-500/10" :
                        deployment.threat === "HIGH" ? "border-orange-500/50 text-orange-400 bg-orange-500/10" :
                        deployment.threat === "MEDIUM" ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10" :
                        "border-green-500/50 text-green-400 bg-green-500/10"
                      }`}>
                        {deployment.threat}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          if (confirm(`Delete deployment "${deployment.codename}"?`)) {
                            deleteDeployment(deployment.id);
                            toast.success(`Deleted ${deployment.codename}`);
                          }
                        }}
                        className="p-1 border border-red-500/30 bg-red-500/5 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pilot Management */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-green-500" />
          <h2 className="text-sm font-bold text-green-500 tracking-wider">// PILOT ROSTER</h2>
          <div className="flex-1 h-px bg-green-500/30" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pilots.map(pilot => (
            <div key={pilot.id} className="border-2 border-green-500/30 bg-green-500/5 p-4 hover:bg-green-500/10 hover:border-green-500/50 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-green-400 mb-1">{pilot.callsign}</div>
                  <div className="text-xs text-green-600/70">{pilot.name}</div>
                  <div className="text-[10px] text-green-700/70">{pilot.license}</div>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Delete pilot "${pilot.callsign}"?`)) {
                      deletePilot(pilot.id);
                      toast.success(`Removed ${pilot.callsign} from roster`);
                    }
                  }}
                  className="p-1 border border-red-500/30 bg-red-500/5 hover:bg-red-500/20 hover:border-red-500/50 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3 h-3 text-red-400" />
                </button>
              </div>
              <div className="text-[10px] space-y-1">
                <div className={`px-2 py-1 border inline-block ${
                  pilot.status === "ACTIVE" ? "border-green-500/50 text-green-400 bg-green-500/10" :
                  pilot.status === "DEPLOYED" ? "border-blue-500/50 text-blue-400 bg-blue-500/10" :
                  pilot.status === "STANDBY" ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10" :
                  "border-red-500/50 text-red-400 bg-red-500/10"
                }`}>
                  {pilot.status}
                </div>
                <div className="text-green-600/70">
                  {pilot.mech.frame} • {pilot.missions} missions
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal prompt */}
      <div className="mt-6 flex items-center gap-2 text-green-500/50 text-xs">
        <span>$</span>
        <span className="animate-pulse">_</span>
      </div>

      {/* Modals */}
      {modalOpen === "deployment" && <DeploymentModal onClose={() => setModalOpen(null)} />}
      {modalOpen === "pilot" && <PilotModal onClose={() => setModalOpen(null)} />}
      {modalOpen === "glossary" && <GlossaryModal onClose={() => setModalOpen(null)} />}
    </div>
  );
}

// Deployment Creation Modal
function DeploymentModal({ onClose }: { onClose: () => void }) {
  const { addDeployment, deployments } = useData();
  const [formData, setFormData] = useState({
    codename: "",
    theater: "",
    type: "COMBAT" as Deployment["type"],
    status: "RECRUITING" as Deployment["status"],
    briefing: "",
    requiredPilots: "4",
    startDate: "",
    threat: "MEDIUM" as Deployment["threat"],
    tags: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDeployment: Deployment = {
      id: `D${String(deployments.length + 1).padStart(3, '0')}`,
      codename: formData.codename,
      theater: formData.theater,
      type: formData.type,
      status: formData.status,
      briefing: formData.briefing,
      requiredPilots: parseInt(formData.requiredPilots),
      currentSignups: 0,
      signedUpPilots: [],
      startDate: formData.startDate,
      threat: formData.threat,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    addDeployment(newDeployment);
    toast.success(`Created deployment: ${newDeployment.codename}`);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking directly on the backdrop, not on child elements
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
      onMouseDown={handleBackdropClick}
    >
      <div className="border-2 border-green-500/50 bg-black/95 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs text-green-600/70 mb-1">// NEW DEPLOYMENT</div>
            <h2 className="text-2xl font-bold text-green-400 tracking-wider">CREATE MISSION</h2>
          </div>
          <button onClick={onClose} className="p-2 border border-red-500/30 bg-red-500/5 hover:bg-red-500/20 transition-all">
            <X className="w-5 h-5 text-red-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-green-600/70 mb-2">OPERATION CODENAME *</label>
            <input
              type="text"
              required
              value={formData.codename}
              onChange={(e) => setFormData({ ...formData, codename: e.target.value.toUpperCase() })}
              className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50"
              placeholder="OPERATION THUNDERHEAD"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-green-600/70 mb-2">THEATER *</label>
              <input
                type="text"
                required
                value={formData.theater}
                onChange={(e) => setFormData({ ...formData, theater: e.target.value })}
                className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50"
                placeholder="Caliban System"
              />
            </div>

            <div>
              <label className="block text-xs text-green-600/70 mb-2">MISSION TYPE *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Deployment["type"] })}
                className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 outline-none font-mono focus:border-green-500/50"
              >
                <option value="COMBAT">COMBAT</option>
                <option value="RECON">RECON</option>
                <option value="SUPPORT">SUPPORT</option>
                <option value="EXTRACTION">EXTRACTION</option>
                <option value="DEFENSE">DEFENSE</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-green-600/70 mb-2">MISSION BRIEFING *</label>
            <textarea
              required
              value={formData.briefing}
              onChange={(e) => setFormData({ ...formData, briefing: e.target.value })}
              className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50 min-h-[100px]"
              placeholder="Describe mission parameters, objectives, and expected conditions..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-green-600/70 mb-2">PILOTS NEEDED *</label>
              <input
                type="number"
                required
                min="1"
                max="12"
                value={formData.requiredPilots}
                onChange={(e) => setFormData({ ...formData, requiredPilots: e.target.value })}
                className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 outline-none font-mono focus:border-green-500/50"
              />
            </div>

            <div>
              <label className="block text-xs text-green-600/70 mb-2">THREAT LEVEL *</label>
              <select
                value={formData.threat}
                onChange={(e) => setFormData({ ...formData, threat: e.target.value as Deployment["threat"] })}
                className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 outline-none font-mono focus:border-green-500/50"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-green-600/70 mb-2">START DATE *</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 outline-none font-mono focus:border-green-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-green-600/70 mb-2">TAGS (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50"
              placeholder="COMBAT_EXPECTED, OFFICIAL_MODULE, HIGH_RISK"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 p-3 border-2 border-green-500 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-bold tracking-wider transition-all"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              CREATE DEPLOYMENT
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 p-3 border-2 border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold tracking-wider transition-all"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Pilot Creation Modal
function PilotModal({ onClose }: { onClose: () => void }) {
  const { addPilot, pilots } = useData();
  const [formData, setFormData] = useState({
    callsign: "",
    name: "",
    license: "LL-0",
    status: "ACTIVE" as Pilot["status"],
    mechFrame: "",
    mechClass: "",
    mechDesignation: "",
    age: "",
    origin: "",
    specialization: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPilot: Pilot = {
      id: `P${String(pilots.length + 1).padStart(3, '0')}`,
      callsign: formData.callsign,
      name: formData.name,
      license: formData.license,
      status: formData.status,
      mech: {
        frame: formData.mechFrame,
        class: formData.mechClass,
        designation: formData.mechDesignation
      },
      missions: 0,
      joinDate: new Date().toISOString().split('T')[0],
      age: formData.age ? parseInt(formData.age) : undefined,
      origin: formData.origin || undefined,
      specialization: formData.specialization ? formData.specialization.split(',').map(s => s.trim()).filter(Boolean) : undefined
    };

    addPilot(newPilot);
    toast.success(`Added pilot: ${newPilot.callsign}`);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking directly on the backdrop, not on child elements
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
      onMouseDown={handleBackdropClick}
    >
      <div className="border-2 border-green-500/50 bg-black/95 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs text-green-600/70 mb-1">// NEW PILOT REGISTRATION</div>
            <h2 className="text-2xl font-bold text-green-400 tracking-wider">ADD PILOT</h2>
          </div>
          <button onClick={onClose} className="p-2 border border-red-500/30 bg-red-500/5 hover:bg-red-500/20 transition-all">
            <X className="w-5 h-5 text-red-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-green-600/70 mb-2">CALLSIGN *</label>
              <input
                type="text"
                required
                value={formData.callsign}
                onChange={(e) => setFormData({ ...formData, callsign: e.target.value.toUpperCase() })}
                className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50"
                placeholder="RAVEN"
              />
            </div>

            <div>
              <label className="block text-xs text-green-600/70 mb-2">FULL NAME *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50"
                placeholder="Jane Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-green-600/70 mb-2">LICENSE LEVEL *</label>
              <select
                value={formData.license}
                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 outline-none font-mono focus:border-green-500/50"
              >
                <option value="LL-0">LL-0</option>
                <option value="LL-1">LL-1</option>
                <option value="LL-2">LL-2</option>
                <option value="LL-3">LL-3</option>
                <option value="LL-4">LL-4</option>
                <option value="LL-5">LL-5</option>
                <option value="LL-6">LL-6</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-green-600/70 mb-2">STATUS *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Pilot["status"] })}
                className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 outline-none font-mono focus:border-green-500/50"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="STANDBY">STANDBY</option>
                <option value="DEPLOYED">DEPLOYED</option>
                <option value="UNAVAILABLE">UNAVAILABLE</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-green-600/70 mb-2">AGE</label>
              <input
                type="number"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 outline-none font-mono focus:border-green-500/50"
                placeholder="30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-green-600/70 mb-2">ORIGIN</label>
            <input
              type="text"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50"
              placeholder="Mars Colony, Sol System"
            />
          </div>

          <div className="border-t-2 border-green-500/20 pt-4">
            <div className="text-xs text-green-600/70 mb-3">// MECH CONFIGURATION</div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-green-600/70 mb-2">FRAME *</label>
                <input
                  type="text"
                  required
                  value={formData.mechFrame}
                  onChange={(e) => setFormData({ ...formData, mechFrame: e.target.value.toUpperCase() })}
                  className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50"
                  placeholder="EVEREST"
                />
              </div>

              <div>
                <label className="block text-xs text-green-600/70 mb-2">CLASS *</label>
                <input
                  type="text"
                  required
                  value={formData.mechClass}
                  onChange={(e) => setFormData({ ...formData, mechClass: e.target.value.toUpperCase() })}
                  className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50"
                  placeholder="STRIKER"
                />
              </div>

              <div>
                <label className="block text-xs text-green-600/70 mb-2">DESIGNATION *</label>
                <input
                  type="text"
                  required
                  value={formData.mechDesignation}
                  onChange={(e) => setFormData({ ...formData, mechDesignation: e.target.value.toUpperCase() })}
                  className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50"
                  placeholder="EV-01"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs text-green-600/70 mb-2">SPECIALIZATIONS (comma-separated)</label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50"
              placeholder="Close Combat, Recon, Electronic Warfare"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 p-3 border-2 border-green-500 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-bold tracking-wider transition-all"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              ADD PILOT
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 p-3 border-2 border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold tracking-wider transition-all"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Glossary Entry Modal
function GlossaryModal({ onClose }: { onClose: () => void }) {
  const { addGlossaryEntry, glossaryEntries } = useData();
  const [formData, setFormData] = useState({
    term: "",
    definition: "",
    category: "TECHNOLOGY" as GlossaryEntry["category"],
    classification: "PUBLIC" as GlossaryEntry["classification"]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: GlossaryEntry = {
      id: `term-${glossaryEntries.length + 1}`,
      term: formData.term,
      definition: formData.definition,
      category: formData.category,
      classification: formData.classification,
      relatedTerms: []
    };

    addGlossaryEntry(newEntry);
    toast.success(`Added glossary entry: ${newEntry.term}`);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking directly on the backdrop, not on child elements
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
      onMouseDown={handleBackdropClick}
    >
      <div className="border-2 border-green-500/50 bg-black/95 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs text-green-600/70 mb-1">// KNOWLEDGE BASE EXPANSION</div>
            <h2 className="text-2xl font-bold text-green-400 tracking-wider">ADD GLOSSARY ENTRY</h2>
          </div>
          <button onClick={onClose} className="p-2 border border-red-500/30 bg-red-500/5 hover:bg-red-500/20 transition-all">
            <X className="w-5 h-5 text-red-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-green-600/70 mb-2">TERM *</label>
            <input
              type="text"
              required
              value={formData.term}
              onChange={(e) => setFormData({ ...formData, term: e.target.value })}
              className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50"
              placeholder="NHP (Non-Human Person)"
            />
          </div>

          <div>
            <label className="block text-xs text-green-600/70 mb-2">DEFINITION *</label>
            <textarea
              required
              value={formData.definition}
              onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
              className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 placeholder-green-600/50 outline-none font-mono focus:border-green-500/50 min-h-[120px]"
              placeholder="Define the term and provide context relevant to the LANCER universe..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-green-600/70 mb-2">CATEGORY *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as GlossaryEntry["category"] })}
                className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 outline-none font-mono focus:border-green-500/50"
              >
                <option value="TECHNOLOGY">TECHNOLOGY</option>
                <option value="ORGANIZATION">ORGANIZATION</option>
                <option value="CULTURE">CULTURE</option>
                <option value="GEOGRAPHY">GEOGRAPHY</option>
                <option value="MILITARY">MILITARY</option>
                <option value="SCIENCE">SCIENCE</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-green-600/70 mb-2">CLASSIFICATION *</label>
              <select
                value={formData.classification}
                onChange={(e) => setFormData({ ...formData, classification: e.target.value as GlossaryEntry["classification"] })}
                className="w-full p-3 border-2 border-green-500/30 bg-green-500/5 text-green-400 outline-none font-mono focus:border-green-500/50"
              >
                <option value="PUBLIC">PUBLIC</option>
                <option value="RESTRICTED">RESTRICTED</option>
                <option value="CLASSIFIED">CLASSIFIED</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 p-3 border-2 border-green-500 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-bold tracking-wider transition-all"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              ADD ENTRY
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 p-3 border-2 border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold tracking-wider transition-all"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}