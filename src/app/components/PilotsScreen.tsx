import { useState } from "react";
import { useData } from "../context/DataContext";
import type { Pilot } from "../data/mockData";
import { User, Calendar, Award, Activity, Users, Zap, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { BackToTop } from "./BackToTop";

export function PilotsScreen() {
  const { pilots } = useData();
  const [selectedPilot, setSelectedPilot] = useState<Pilot | null>(null);
  const navigate = useNavigate();

  const getStatusColor = (status: Pilot["status"]) => {
    switch (status) {
      case "ACTIVE": return "text-green-500 border-green-500/50 bg-green-500/10";
      case "STANDBY": return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";
      case "DEPLOYED": return "text-blue-500 border-blue-500/50 bg-blue-500/10";
      case "UNAVAILABLE": return "text-red-500 border-red-500/50 bg-red-500/10";
      default: return "text-green-600/50 border-green-500/30 bg-green-500/5";
    }
  };

  const handlePilotClick = (pilot: Pilot) => {
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
                      {pilot.mech.frame} // {pilot.mech.class} // LICENSE {pilot.license}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-green-400 font-bold">{pilot.missions}</div>
                  <div className="text-xs text-green-600/70">missions</div>
                  <div className="text-xs text-green-700/70 mt-1">{pilot.mech.designation}</div>
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
                  <div className="text-green-400 font-bold">{selectedPilot.license}</div>
                </div>

                <div className="border-l-2 border-green-500/30 pl-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-3 h-3 text-green-600/70" />
                    <div className="text-xs text-green-600/70">JOIN DATE</div>
                  </div>
                  <div className="text-green-400">{new Date(selectedPilot.joinDate).toLocaleDateString()}</div>
                </div>

                <div className="border-l-2 border-green-500/30 pl-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-3 h-3 text-green-600/70" />
                    <div className="text-xs text-green-600/70">MISSIONS COMPLETED</div>
                  </div>
                  <div className="text-green-400 font-bold">{selectedPilot.missions}</div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-green-500/20 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-3 h-3 text-green-600/70" />
                  <div className="text-xs text-green-600/70">MECH ASSIGNMENT</div>
                </div>
                <div className="border-2 border-green-500/30 bg-green-500/5 p-3">
                  <div className="font-bold mb-1 text-lg text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">
                    {selectedPilot.mech.frame}
                  </div>
                  <div className="text-sm text-green-600/70 mb-1">CLASS: {selectedPilot.mech.class}</div>
                  <div className="text-xs text-green-600/60">DESIGNATION: {selectedPilot.mech.designation}</div>
                </div>
              </div>

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

      <BackToTop />
    </div>
  );
}