import { useParams, useNavigate } from "react-router";
import { useData } from "../context/DataContext";
import { ArrowLeft, User, Calendar, Award, Activity, MapPin, Zap, Shield, FileText } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { BackToTop } from "./BackToTop";

export function PilotDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pilots, deployments } = useData();

  const pilot = pilots.find(p => p.id === id);

  if (!pilot) {
    return (
      <div className="min-h-screen p-8 font-mono flex items-center justify-center">
        <div className="border-2 border-red-500/30 bg-red-500/5 p-12 text-center max-w-2xl">
          <div className="text-red-500 text-6xl mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">
            ⚠ ERROR
          </div>
          <div className="text-2xl font-bold text-red-400 mb-4 tracking-wider">
            NO PILOT DATA FOUND
          </div>
          <div className="text-sm text-red-600/70 mb-6">
            // PILOT ID "{id}" NOT FOUND IN REGISTRY
          </div>
          <button
            onClick={() => navigate("/pilots")}
            className="px-6 py-3 border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500 transition-all text-sm font-bold text-green-400 tracking-wider"
          >
            ← RETURN TO ROSTER
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE": return "text-green-500 border-green-500/50 bg-green-500/10";
      case "STANDBY": return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";
      case "DEPLOYED": return "text-blue-500 border-blue-500/50 bg-blue-500/10";
      case "UNAVAILABLE": return "text-red-500 border-red-500/50 bg-red-500/10";
      default: return "text-green-600/50 border-green-500/30 bg-green-500/5";
    }
  };

  const pilotDeployments = deployments.filter(d => d.signedUpPilots.includes(pilot.id));

  return (
    <div className="min-h-screen p-8 font-mono">
      {/* Back Button */}
      <button
        onClick={() => navigate("/pilots")}
        className="mb-6 flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
        <span className="text-sm tracking-wider">RETURN TO ROSTER</span>
      </button>

      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: "PILOTS", path: "/pilots" },
        { label: pilot.callsign }
      ]} />

      {/* Terminal Header */}
      <div className="mb-8 border-2 border-green-500/30 bg-green-500/5 p-4">
        <div className="text-xs text-green-600/70 mb-2">// ACCESSING PILOT PERSONNEL FILE</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <h1 className="text-3xl font-bold text-green-500 tracking-wider drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
              ▶ PILOT FILE: {pilot.callsign}
            </h1>
          </div>
          <div className={`px-3 py-1 border text-xs font-bold tracking-wider ${getStatusColor(pilot.status)}`}>
            {pilot.status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Photo and Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Pilot Photo */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="text-xs text-green-600/70 mb-3">// PERSONNEL PHOTO</div>
            {pilot.imageUrl ? (
              <div className="aspect-square border-2 border-green-500/30 overflow-hidden relative">
                <img 
                  src={pilot.imageUrl} 
                  alt={pilot.callsign}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 bg-green-500/5 flex items-center justify-center border-2 border-green-500/30 border-dashed">
                  <div className="text-center">
                    <User className="w-16 h-16 mx-auto mb-3 text-green-600/30" />
                    <div className="text-xs text-green-600/70">NO IMAGE DATA</div>
                    <div className="text-[10px] text-green-700/50 mt-1">FILE NOT FOUND</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-green-500/5 flex items-center justify-center border-2 border-green-500/30 border-dashed">
                <div className="text-center">
                  <User className="w-16 h-16 mx-auto mb-3 text-green-600/30" />
                  <div className="text-xs text-green-600/70">NO IMAGE DATA</div>
                  <div className="text-[10px] text-green-700/50 mt-1">FILE NOT FOUND</div>
                </div>
              </div>
            )}
          </div>

          {/* Basic Info Card */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="text-xs text-green-600/70 mb-4">// BASIC INFORMATION</div>
            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="text-xs text-green-600/70 mb-1">CALLSIGN</div>
                <div className="text-green-400 font-bold text-lg drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">
                  {pilot.callsign}
                </div>
              </div>

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="text-xs text-green-600/70 mb-1">LEGAL NAME</div>
                <div className="text-green-400">{pilot.name}</div>
              </div>

              {pilot.age && (
                <div className="border-l-2 border-green-500/30 pl-3">
                  <div className="text-xs text-green-600/70 mb-1">AGE</div>
                  <div className="text-green-400">{pilot.age} years</div>
                </div>
              )}

              {pilot.origin && (
                <div className="border-l-2 border-green-500/30 pl-3">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-3 h-3 text-green-600/70" />
                    <div className="text-xs text-green-600/70">ORIGIN</div>
                  </div>
                  <div className="text-green-400">{pilot.origin}</div>
                </div>
              )}

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3 h-3 text-green-600/70" />
                  <div className="text-xs text-green-600/70">PILOT ID</div>
                </div>
                <div className="text-green-400 font-mono">{pilot.id}</div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// CERTIFICATIONS</div>
            </div>
            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-3 h-3 text-green-600/70" />
                  <div className="text-xs text-green-600/70">LICENSE LEVEL</div>
                </div>
                <div className="text-green-400 font-bold text-lg">{pilot.license}</div>
              </div>

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3 h-3 text-green-600/70" />
                  <div className="text-xs text-green-600/70">JOIN DATE</div>
                </div>
                <div className="text-green-400">{new Date(pilot.joinDate).toLocaleDateString()}</div>
              </div>

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-3 h-3 text-green-600/70" />
                  <div className="text-xs text-green-600/70">MISSIONS COMPLETED</div>
                </div>
                <div className="text-green-400 font-bold text-lg">{pilot.missions}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Biography */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// PERSONNEL BIOGRAPHY</div>
            </div>
            {pilot.biography ? (
              <div className="text-sm text-green-400 leading-relaxed border-l-2 border-green-500/30 pl-4">
                {pilot.biography}
              </div>
            ) : (
              <div className="text-sm text-green-600/50 italic border-l-2 border-green-500/20 pl-4">
                // NO BIOGRAPHY DATA ON FILE
              </div>
            )}
          </div>

          {/* Specializations */}
          {pilot.specialization && pilot.specialization.length > 0 && (
            <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
              <div className="text-xs text-green-600/70 mb-4">// SPECIALIZATIONS</div>
              <div className="flex flex-wrap gap-2">
                {pilot.specialization.map(spec => (
                  <span 
                    key={spec} 
                    className="px-3 py-2 border-2 border-green-500/50 bg-green-500/10 text-green-400 text-sm font-bold tracking-wider"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mech Assignment */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// MECH ASSIGNMENT</div>
            </div>
            <div className="space-y-4">
              <div className="border-l-2 border-green-500/30 pl-4">
                <div className="text-xs text-green-600/70 mb-2">FRAME</div>
                <div className="text-2xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                  {pilot.mech.frame}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border-l-2 border-green-500/30 pl-4">
                  <div className="text-xs text-green-600/70 mb-1">CLASS</div>
                  <div className="text-green-400 font-bold">{pilot.mech.class}</div>
                </div>
                <div className="border-l-2 border-green-500/30 pl-4">
                  <div className="text-xs text-green-600/70 mb-1">DESIGNATION</div>
                  <div className="text-green-400 font-mono text-sm">{pilot.mech.designation}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Deployments */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="text-xs text-green-600/70 mb-4">// DEPLOYMENT HISTORY</div>
            {pilotDeployments.length > 0 ? (
              <div className="space-y-3">
                {pilotDeployments.map(deployment => (
                  <div key={deployment.id} className="border-l-2 border-green-500/50 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-green-400">{deployment.codename}</div>
                      <span className="text-xs px-2 py-1 border border-green-500/30 bg-green-500/5 text-green-400">
                        {deployment.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="text-xs text-green-600/70">
                      {deployment.theater} // {deployment.type} // {new Date(deployment.startDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-green-600/50 italic border-l-2 border-green-500/20 pl-4">
                // NO ACTIVE DEPLOYMENTS
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Terminal prompt */}
      <div className="mt-6 flex items-center gap-2 text-green-500/50 text-xs">
        <span>$</span>
        <span className="animate-pulse">_</span>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}