import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useData } from "../context/DataContext";
import { User, Calendar, Award, Activity, FileText, Zap, Cpu, Users } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { BackToTop } from "./BackToTop";
import type { CompconPilot } from "../data/mockData";
import { getFrameName, MECH_SKILL_NAMES } from "../data/compconTypes";

export function PilotsScreen() {
  const { pilots, isLoading, backendAvailable } = useData();
  const [selectedPilot, setSelectedPilot] = useState<CompconPilot | null>(null);
  const navigate = useNavigate();

  const getStatusColor = (status: CompconPilot["status"]) => {
    switch (status) {
      case "ACTIVE": return "text-green-500 border-green-500/50 bg-green-500/10";
      case "STANDBY": return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";
      case "DEPLOYED": return "text-blue-500 border-blue-500/50 bg-blue-500/10";
      case "UNAVAILABLE": return "text-red-500 border-red-500/50 bg-red-500/10";
      default: return "text-green-600/50 border-green-500/30 bg-green-500/5";
    }
  };

  const handlePilotClick = (pilot: CompconPilot) => {
    // On mobile, navigate directly to pilot detail page
    if (window.innerWidth < 1024) {
      navigate(`/pilots/${pilot.id}`);
    } else {
      // On desktop, show in sidebar
      setSelectedPilot(pilot);
    }
  };

  return (
    <div className="min-h-screen p-8 font-mono">
      {/* Terminal Header */}
      <div className="mb-8 border-2 border-green-500/30 bg-green-500/5 p-4">
        <div className="text-xs text-green-600/70 mb-2">// ACCESSING PILOT REGISTRY</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <h1 className="text-3xl font-bold text-green-500 tracking-wider drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
              ▶ PILOT ROSTER
            </h1>
          </div>
          <div className="text-xs text-green-600/70">
            {pilots.length} CERTIFIED LANCERS
          </div>
        </div>
      </div>

      {/* Backend Status Banner */}
      {!backendAvailable && !isLoading && (
        <div className="mb-6 border-2 border-yellow-500/30 bg-yellow-500/5 p-4">
          <div className="text-sm text-yellow-400 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>Backend connection unavailable. Running in local data mode.</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="border-2 border-green-500/30 bg-green-500/5 p-12 flex flex-col items-center justify-center">
          <div className="text-green-500 mb-4 animate-pulse">
            <Users className="w-16 h-16" />
          </div>
          <div className="text-green-400 text-lg mb-2">LOADING PILOT REGISTRY...</div>
          <div className="text-xs text-green-600/70">▶ ▶ ▶</div>
        </div>
      ) : pilots.length === 0 ? (
        /* Empty State */
        <div className="border-2 border-green-500/30 bg-green-500/5 p-12 flex flex-col items-center justify-center">
          <div className="text-green-600/30 mb-4">
            <Users className="w-16 h-16" />
          </div>
          <div className="text-green-400 text-lg mb-2">NO PILOTS REGISTERED</div>
          <div className="text-sm text-green-600/70 text-center">
            No pilots registered in the system.<br />
            Import COMP/CON pilot files from the Admin Panel.
          </div>
        </div>
      ) : (
        /* Loaded State */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Pilot List */}
          <div className="lg:col-span-2 border-2 border-green-500/30 bg-green-500/5 divide-y-2 divide-green-500/20">
            {pilots.map(pilot => (
              <div
                key={pilot.id}
                onClick={() => handlePilotClick(pilot)}
                className={`p-4 cursor-pointer hover:bg-green-500/10 transition-all hover-glow ${
                  selectedPilot?.id === pilot.id ? "bg-green-500/15 border-l-4 border-green-500" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 flex items-start gap-3">
                    {/* Status Indicator Pulse */}
                    <div className="flex flex-col items-center gap-1 mt-1">
                      {pilot.status === "ACTIVE" && (
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                      )}
                      {pilot.status === "STANDBY" && (
                        <span className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                      )}
                      {pilot.status === "DEPLOYED" && (
                        <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      )}
                      {pilot.status === "UNAVAILABLE" && (
                        <span className="w-3 h-3 bg-red-500 rounded-full" />
                      )}
                      <span className="text-green-500">
                        {selectedPilot?.id === pilot.id ? '▶' : '□'}
                      </span>
                    </div>

                    {/* Pilot Portrait */}
                    <div className="w-24 h-24 border border-green-500/30 bg-black/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {(pilot.cloud_portrait || pilot.portrait) ? (
                        <img 
                          src={pilot.cloud_portrait || pilot.portrait} 
                          alt={pilot.callsign}
                          className="w-full h-full object-cover opacity-80"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <User className="w-12 h-12 text-green-500/50" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-lg font-bold text-green-400 tracking-wider drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">
                          {pilot.callsign}
                        </div>
                        <div className={`text-xs px-2 py-1 border font-bold tracking-wider ${getStatusColor(pilot.status)}`}>
                          {pilot.status}
                        </div>
                      </div>
                      <div className="text-sm text-green-600/70 mb-1">{pilot.name}</div>
                      <div className="text-xs text-green-600/60">
                        {pilot.mechs.length > 0 ? getFrameName(pilot.mechs[0].frame) : 'NO MECH'} // LEVEL {pilot.level} // {pilot.background.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-green-400 font-bold">{pilot.mechs.length}</div>
                    <div className="text-xs text-green-600/70">{pilot.mechs.length === 1 ? 'mech' : 'mechs'}</div>
                    <div className="text-xs text-green-700/70 mt-1">LL-{pilot.level}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pilot Detail - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block lg:col-span-1">
            {selectedPilot ? (
              <div className="border-2 border-green-500/30 bg-green-500/5 p-6 sticky top-6">
                <div className="mb-6">
                  <div className="text-xs text-green-600/70 mb-2">// PILOT DETAILS:</div>
                  <div className="text-2xl font-bold text-green-500 mb-2 tracking-wider drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                    ▶ {selectedPilot.callsign}
                  </div>
                  <div className="text-sm text-green-600/70 mb-4">{selectedPilot.name}</div>
                  <div className={`inline-block px-3 py-1 border text-xs font-bold tracking-wider ${getStatusColor(selectedPilot.status)}`}>
                    {selectedPilot.status}
                  </div>
                </div>

                <div className="space-y-4 mb-6 text-sm">
                  <div className="border-l-2 border-green-500/30 pl-3">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-3 h-3 text-green-600/70" />
                      <div className="text-xs text-green-600/70">PILOT ID</div>
                    </div>
                    <div className="text-green-400 font-mono">{selectedPilot.id}</div>
                  </div>

                  <div className="border-l-2 border-green-500/30 pl-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-3 h-3 text-green-600/70" />
                      <div className="text-xs text-green-600/70">LICENSE LEVEL</div>
                    </div>
                    <div className="text-green-400 font-bold">LL-{selectedPilot.level}</div>
                  </div>

                  <div className="border-l-2 border-green-500/30 pl-3">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-3 h-3 text-green-600/70" />
                      <div className="text-xs text-green-600/70">BACKGROUND</div>
                    </div>
                    <div className="text-green-400">{selectedPilot.background}</div>
                  </div>

                  <div className="border-l-2 border-green-500/30 pl-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-3 h-3 text-green-600/70" />
                      <div className="text-xs text-green-600/70">COMBAT HISTORY</div>
                    </div>
                    <div className="text-green-400 font-bold">{selectedPilot.combat_history.kills} Kills / {selectedPilot.combat_history.missions || 0} Missions</div>
                  </div>
                </div>

                {selectedPilot.mechs.length > 0 && (
                  <div className="pt-4 border-t-2 border-green-500/20 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Cpu className="w-3 h-3 text-green-600/70" />
                      <div className="text-xs text-green-600/70">MECH ASSIGNMENTS ({selectedPilot.mechs.length})</div>
                    </div>
                    <div className="space-y-2">
                      {selectedPilot.mechs.map(mech => (
                        <div key={mech.id} className="border-2 border-cyan-500/30 bg-cyan-500/5 p-3">
                          <div className="font-bold mb-1 text-sm text-cyan-300">
                            {mech.name}
                          </div>
                          <div className="text-xs text-cyan-600/70">{getFrameName(mech.frame)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* View Full Profile Button */}
                <Link 
                  to={`/pilots/${selectedPilot.id}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500 transition-all text-sm font-bold text-green-400 tracking-wider"
                >
                  <FileText className="w-4 h-4" />
                  VIEW FULL PROFILE ▶
                </Link>
              </div>
            ) : (
              <div className="border-2 border-green-500/30 bg-green-500/5 p-6 h-full flex items-center justify-center">
                <div className="text-center">
                  <User className="w-16 h-16 mx-auto mb-3 text-green-600/30" />
                  <div className="text-sm text-green-600/70">Select a pilot to view details</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <BackToTop />
    </div>
  );
}