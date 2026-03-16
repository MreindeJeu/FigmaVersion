import { useParams, useNavigate } from "react-router";
import { Link } from "react-router";
import { useData } from "../context/DataContext";
import { ArrowLeft, User, Calendar, Award, Activity, MapPin, Zap, Shield, FileText, Cpu, Target, Heart, Flame, Wrench, Book } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { BackToTop } from "./BackToTop";
import { getFrameName, getSkillName, getTalentName, MECH_SKILL_NAMES, stripHtml } from "../data/compconTypes";

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
      case "Active": return "text-green-500 border-green-500/50 bg-green-500/10";
      case "Standby": return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";
      case "Deployed": return "text-blue-500 border-blue-500/50 bg-blue-500/10";
      case "Unavailable": return "text-red-500 border-red-500/50 bg-red-500/10";
      default: return "text-green-600/50 border-green-500/30 bg-green-500/5";
    }
  };

  const pilotDeployments = deployments.filter(d => d.signedUpPilots.includes(pilot.id));
  const biography = stripHtml(pilot.history || pilot.text_appearance || "No biography on file.");

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
            {pilot.status.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Photo and Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Pilot Photo */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="text-xs text-green-600/70 mb-3">// PERSONNEL PHOTO</div>
            {pilot.cloud_portrait ? (
              <div className="aspect-square border-2 border-green-500/30 overflow-hidden relative">
                <img 
                  src={pilot.cloud_portrait} 
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

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="text-xs text-green-600/70 mb-1">BACKGROUND</div>
                <div className="text-green-400">{pilot.background}</div>
              </div>

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3 h-3 text-green-600/70" />
                  <div className="text-xs text-green-600/70">PILOT ID</div>
                </div>
                <div className="text-green-400 font-mono text-xs break-all">{pilot.id}</div>
              </div>
            </div>
          </div>

          {/* Combat Stats */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// COMBAT STATISTICS</div>
            </div>
            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-3 h-3 text-green-600/70" />
                  <div className="text-xs text-green-600/70">HP</div>
                </div>
                <div className="text-green-400 font-bold">{pilot.current_hp} / {pilot.current_hp}</div>
              </div>

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="text-xs text-green-600/70 mb-1">KILLS</div>
                <div className="text-green-400 font-bold text-lg">{pilot.combat_history.kills}</div>
              </div>

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="text-xs text-green-600/70 mb-1">TOTAL DAMAGE DEALT</div>
                <div className="text-green-400">{pilot.combat_history.damage}</div>
              </div>
            </div>
          </div>

          {/* License & Level */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// CERTIFICATIONS</div>
            </div>
            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="text-xs text-green-600/70 mb-1">LICENSE LEVEL</div>
                <div className="text-green-400 font-bold text-2xl">LL-{pilot.level}</div>
              </div>

              {pilot.licenses.length > 0 && (
                <div className="border-l-2 border-green-500/30 pl-3">
                  <div className="text-xs text-green-600/70 mb-2">FRAME LICENSES</div>
                  {pilot.licenses.map(license => (
                    <div key={license.id} className="text-green-400 text-xs mb-1">
                      {license.id.replace('mf_', '').toUpperCase()} (Rank {license.rank})
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Biography */}
          {biography && biography.length > 0 && (
            <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Book className="w-4 h-4 text-green-500" />
                <div className="text-xs text-green-600/70">// PERSONNEL BIOGRAPHY</div>
              </div>
              <div className="text-sm text-green-400 leading-relaxed whitespace-pre-wrap">
                {biography}
              </div>
            </div>
          )}

          {/* Skills */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// PILOT SKILLS</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {pilot.skills.map(skill => (
                <div key={skill.id} className="border-2 border-green-500/30 bg-green-500/5 p-3">
                  <div className="text-xs text-green-600/70 mb-1">{getSkillName(skill.id)}</div>
                  <div className="flex gap-1">
                    {Array.from({ length: skill.rank }).map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-green-500 border border-green-400" />
                    ))}
                    {Array.from({ length: 6 - skill.rank }).map((_, i) => (
                      <div key={i} className="w-3 h-3 border border-green-500/30" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Talents */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// PILOT TALENTS</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {pilot.talents.map(talent => (
                <div key={talent.id} className="border-2 border-green-500/30 bg-green-500/5 p-3">
                  <div className="text-sm font-bold text-green-400 mb-1">{getTalentName(talent.id)}</div>
                  <div className="text-xs text-green-600/70">RANK {talent.rank}/3</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mech Skills (HASE) */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// MECH SKILLS (HASE)</div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {pilot.mechSkills.map((value, index) => (
                <div key={index} className="border-2 border-green-500/30 bg-green-500/5 p-3 text-center">
                  <div className="text-xs text-green-600/70 mb-2">{MECH_SKILL_NAMES[index]}</div>
                  <div className="text-2xl font-bold text-green-400">+{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mechs */}
          <div className="border-2 border-cyan-500/50 bg-cyan-500/5 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <div className="text-sm font-bold text-cyan-400 tracking-wider">// REGISTERED MECH CHASSIS ({pilot.mechs.length})</div>
            </div>
            
            <div className="space-y-4">
              {pilot.mechs.map((mech) => (
                <Link
                  key={mech.id}
                  to={`/pilots/${pilot.id}/mechs/${mech.id}`}
                  className="block border-2 border-cyan-500/30 bg-cyan-500/5 p-4 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xl font-bold text-cyan-300 mb-1 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] transition-all">
                        {mech.name}
                      </div>
                      <div className="text-sm text-cyan-600/70">{getFrameName(mech.frame)}</div>
                    </div>
                    <div className="text-cyan-400 text-2xl group-hover:translate-x-1 transition-transform">▶</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3 text-xs">
                    <div className="border-l-2 border-cyan-500/30 pl-2">
                      <div className="text-cyan-600/70">HP</div>
                      <div className="text-cyan-300 font-bold">{mech.current_hp}</div>
                    </div>
                    <div className="border-l-2 border-cyan-500/30 pl-2">
                      <div className="text-cyan-600/70">STRUCTURE</div>
                      <div className="text-cyan-300 font-bold">{mech.current_structure}</div>
                    </div>
                    <div className="border-l-2 border-cyan-500/30 pl-2">
                      <div className="text-cyan-600/70">HEAT</div>
                      <div className="text-cyan-300 font-bold">{mech.current_heat}</div>
                    </div>
                    <div className="border-l-2 border-cyan-500/30 pl-2">
                      <div className="text-cyan-600/70">STRESS</div>
                      <div className="text-cyan-300 font-bold">{mech.current_stress}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Current Deployments */}
          {pilotDeployments.length > 0 && (
            <div className="border-2 border-blue-500/30 bg-blue-500/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-blue-400" />
                <div className="text-xs text-blue-400/70">// CURRENT DEPLOYMENTS</div>
              </div>
              <div className="space-y-3">
                {pilotDeployments.map(deployment => (
                  <Link
                    key={deployment.id}
                    to={`/deployments/${deployment.id}`}
                    className="block border-2 border-blue-500/30 bg-blue-500/5 p-3 hover:bg-blue-500/10 transition-all text-sm"
                  >
                    <div className="font-bold text-blue-300">{deployment.codename}</div>
                    <div className="text-xs text-blue-400/70 mt-1">{deployment.theater}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
