import { locations } from "../data/mockData";
import { useData } from "../context/DataContext";
import { Users, MapPin, FileText, AlertTriangle, Activity, Zap, Shield, Radio, Newspaper, Rocket, Book } from "lucide-react";
import { Link } from "react-router";
import { BackToTop } from "./BackToTop";

export function Dashboard() {
  const { pilots, deployments } = useData();
  const activePilots = pilots.filter(p => p.status === "ACTIVE" || p.status === "STANDBY").length;
  const recruitingDeployments = deployments.filter(d => d.status === "RECRUITING").length;
  const criticalTheaters = locations.filter(l => l.status === "CRITICAL" || l.status === "CONTESTED").length;
  const totalMissions = deployments.reduce((acc, d) => acc + d.currentSignups, 0);

  return (
    <div className="min-h-screen p-8 font-mono">
      {/* Terminal Header */}
      <div className="mb-8 border-2 border-green-500/30 bg-green-500/5 p-4">
        <div className="text-xs text-green-600/70 mb-2">// ACCESSING MISSION CONTROL TERMINAL</div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-500 tracking-wider drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
              ▶ MISSION CONTROL
            </h1>
            <p className="text-green-600/80 text-xs mt-2 tracking-wide">
              Union Auxiliary Reserve Status // {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="text-right text-xs space-y-1">
            <div className="text-green-600/70">SYSTEM TIME: {new Date().toLocaleTimeString()}</div>
            <div className="text-green-600/70">UPLINK: STABLE</div>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              <span className="text-green-500 font-bold">ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-4 space-y-6">
          {/* System Overview Stats */}
          <div>
            <div className="text-xs text-green-600/70 mb-3">// SYSTEM OVERVIEW</div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <Link to="/pilots" className="border-2 border-green-500/30 bg-green-500/5 p-5 hover:bg-green-500/10 hover:border-green-500/50 transition-all group hover-glow">
                <div className="flex items-start justify-between mb-3">
                  <Users className="w-6 h-6 text-green-500 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                  <div className="text-xs text-green-600/70">[01]</div>
                </div>
                <div className="text-3xl font-bold text-green-400 mb-2 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">{activePilots}</div>
                <div className="text-xs text-green-600/80 tracking-wider">AVAILABLE PILOTS</div>
                <div className="text-[10px] text-green-700/70 mt-1">{pilots.length} total registered</div>
              </Link>

              <Link to="/deployments" className="border-2 border-green-500/30 bg-green-500/5 p-5 hover:bg-green-500/10 hover:border-green-500/50 transition-all group hover-glow">
                <div className="flex items-start justify-between mb-3">
                  <FileText className="w-6 h-6 text-yellow-500 group-hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]" />
                  <div className="text-xs text-green-600/70">[02]</div>
                </div>
                <div className="text-3xl font-bold text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]">{recruitingDeployments}</div>
                <div className="text-xs text-green-600/80 tracking-wider">OPEN DEPLOYMENTS</div>
                <div className="text-[10px] text-green-700/70 mt-1">{deployments.length} total operations</div>
              </Link>

              <Link to="/locations" className="border-2 border-green-500/30 bg-green-500/5 p-5 hover:bg-green-500/10 hover:border-green-500/50 transition-all group hover-glow">
                <div className="flex items-start justify-between mb-3">
                  <MapPin className="w-6 h-6 text-red-500 group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
                  <div className="text-xs text-green-600/70">[03]</div>
                </div>
                <div className="text-3xl font-bold text-red-400 mb-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">{criticalTheaters}</div>
                <div className="text-xs text-green-600/80 tracking-wider">PRIORITY THEATERS</div>
                <div className="text-[10px] text-green-700/70 mt-1">{locations.length} active zones</div>
              </Link>

              <div className="border-2 border-green-500/30 bg-green-500/5 p-5">
                <div className="flex items-start justify-between mb-3">
                  <Activity className="w-6 h-6 text-green-500" />
                  <div className="text-xs text-green-600/70">[04]</div>
                </div>
                <div className="text-3xl font-bold text-green-400 mb-2 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">{totalMissions}</div>
                <div className="text-xs text-green-600/80 tracking-wider">MISSION SIGNUPS</div>
                <div className="text-[10px] text-green-700/70 mt-1">across all operations</div>
              </div>
            </div>
          </div>

          {/* Detailed Status Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Network Status */}
            <div className="border-2 border-green-500/30 bg-green-500/5 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Radio className="w-4 h-4 text-green-500" />
                <h2 className="text-sm font-bold text-green-500 tracking-wider">// NETWORK STATUS</h2>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-green-500/20 pb-2">
                  <span className="text-green-600/70">OMNINODE UPLINK</span>
                  <span className="text-green-500 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    CONNECTED
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-green-500/20 pb-2">
                  <span className="text-green-600/70">PILOT REGISTRY</span>
                  <span className="text-green-500 font-bold">SYNCED</span>
                </div>
                <div className="flex items-center justify-between border-b border-green-500/20 pb-2">
                  <span className="text-green-600/70">DEPLOYMENT DB</span>
                  <span className="text-green-500 font-bold">ONLINE</span>
                </div>
                <div className="flex items-center justify-between border-b border-green-500/20 pb-2">
                  <span className="text-green-600/70">THEATER INTEL</span>
                  <span className="text-green-500 font-bold">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600/70">ENCRYPTION</span>
                  <span className="text-green-500 font-bold">AES-256-GCM</span>
                </div>
              </div>
            </div>

            {/* Resource Allocation */}
            <div className="border-2 border-green-500/30 bg-green-500/5 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-green-500" />
                <h2 className="text-sm font-bold text-green-500 tracking-wider">// RESOURCE ALLOCATION</h2>
              </div>
              <div className="space-y-3">
                {deployments.filter(d => d.status === "RECRUITING").slice(0, 4).map(dep => (
                  <div key={dep.id} className="border-l-2 border-green-500/50 pl-3 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-green-500 font-bold">{dep.codename}</span>
                      <span className="text-green-600/70">{dep.theater}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-green-950 border border-green-500/30">
                        <div 
                          className="h-full bg-green-500/50" 
                          style={{ width: `${(dep.currentSignups / dep.requiredPilots) * 100}%` }}
                        />
                      </div>
                      <span className="text-green-600/70 text-[10px] w-16">{dep.currentSignups}/{dep.requiredPilots}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Priority Alerts */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-yellow-500 animate-pulse" />
              <h2 className="text-sm font-bold text-green-500 tracking-wider">// PRIORITY ALERTS</h2>
              <div className="flex-1 h-px bg-green-500/30" />
            </div>
            
            <div className="border-2 border-yellow-500/30 bg-yellow-500/5 divide-y-2 divide-yellow-500/20">
              {deployments
                .filter(d => d.status === "RECRUITING" && d.threat === "HIGH")
                .map(deployment => (
                  <div key={deployment.id} className="p-4 hover:bg-yellow-500/10 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-yellow-500 animate-pulse">⚠</span>
                          <div className="font-bold text-yellow-400 tracking-wider drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                            {deployment.codename}
                          </div>
                          <span className="text-xs px-2 py-1 border border-red-500/50 bg-red-500/10 text-red-400 font-bold">
                            {deployment.threat}
                          </span>
                        </div>
                        <div className="text-xs text-green-600/80 mb-1">
                          THEATER: {deployment.theater} // TYPE: {deployment.type}
                        </div>
                        <div className="text-xs text-green-600/70">
                          REQUIRED: {deployment.requiredPilots - deployment.currentSignups} additional pilots // START: {new Date(deployment.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      <Link 
                        to="/deployments"
                        className="px-4 py-2 border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500 transition-all text-xs font-bold text-green-400 tracking-wider"
                      >
                        REVIEW ▶
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-green-500" />
              <h2 className="text-sm font-bold text-green-500 tracking-wider">// RECENT ACTIVITY</h2>
              <div className="flex-1 h-px bg-green-500/30" />
            </div>
            
            <div className="border-2 border-green-500/30 bg-green-500/5 font-mono text-xs">
              <div className="p-3 border-b-2 border-green-500/20 hover:bg-green-500/10 transition-colors">
                <span className="text-green-600/70">[2026-03-12 14:23:17]</span>
                <span className="text-green-500 mx-2">//</span>
                <span className="text-green-400">OPERATION SOLSTICE RAIN posted to deployment board</span>
              </div>
              <div className="p-3 border-b-2 border-green-500/20 hover:bg-green-500/10 transition-colors">
                <span className="text-green-600/70">[2026-03-11 09:15:42]</span>
                <span className="text-green-500 mx-2">//</span>
                <span className="text-green-400">Pilot CIPHER signed up for OPERATION GREY GARDEN</span>
              </div>
              <div className="p-3 border-b-2 border-green-500/20 hover:bg-green-500/10 transition-colors">
                <span className="text-green-600/70">[2026-03-10 16:44:09]</span>
                <span className="text-green-500 mx-2">//</span>
                <span className="text-green-400">OPERATION IRON MONSOON deployment commenced</span>
              </div>
              <div className="p-3 hover:bg-green-500/10 transition-colors">
                <span className="text-green-600/70">[2026-03-09 11:02:33]</span>
                <span className="text-green-500 mx-2">//</span>
                <span className="text-green-400">New pilot OVERWATCH registered to V.A.N.G.U.A.R.D. network</span>
              </div>
            </div>
          </div>

          {/* News Feed */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Newspaper className="w-4 h-4 text-green-500" />
              <h2 className="text-sm font-bold text-green-500 tracking-wider">// UNION NEWS FEED</h2>
              <div className="flex-1 h-px bg-green-500/30" />
            </div>
            
            <div className="border-2 border-green-500/30 bg-green-500/5 font-mono text-xs">
              <div className="p-3 border-b-2 border-green-500/20 hover:bg-green-500/10 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-green-500">▪</span>
                  <div className="flex-1">
                    <div className="text-green-400 mb-1">Union Central Committee Approves New Humanitarian Aid Package for Rim Worlds</div>
                    <span className="text-green-600/70 text-[10px]">UNION PRESS SERVICE // 2026-03-12</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b-2 border-green-500/20 hover:bg-green-500/10 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500">▪</span>
                  <div className="flex-1">
                    <div className="text-green-400 mb-1">Harrison Armory Faces Sanctions Following Illegal Weapons Tests in Neutral Space</div>
                    <span className="text-green-600/70 text-[10px]">GALACTIC UNION TRIBUNE // 2026-03-11</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b-2 border-green-500/20 hover:bg-green-500/10 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-green-500">▪</span>
                  <div className="flex-1">
                    <div className="text-green-400 mb-1">HORUS Collective Continues Pattern Recognition Research Despite Controversy</div>
                    <span className="text-green-600/70 text-[10px]">TECH OBSERVER // 2026-03-10</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b-2 border-green-500/20 hover:bg-green-500/10 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-blue-500">▪</span>
                  <div className="flex-1">
                    <div className="text-green-400 mb-1">IPS-N Announces Next Generation "Raleigh" Frame with Enhanced Mobility Systems</div>
                    <span className="text-green-600/70 text-[10px]">MECH DEVELOPMENT WEEKLY // 2026-03-09</span>
                  </div>
                </div>
              </div>
              <div className="p-3 hover:bg-green-500/10 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-green-500">▪</span>
                  <div className="flex-1">
                    <div className="text-green-400 mb-1">Colonial Administration Reports Successful Terraforming Milestone on New Prosperity</div>
                    <span className="text-green-600/70 text-[10px]">FRONTIER CHRONICLE // 2026-03-08</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal prompt at bottom */}
      <div className="mt-6 flex items-center gap-2 text-green-500/50 text-xs">
        <span>$</span>
        <span className="animate-pulse">_</span>
      </div>
      <BackToTop />
    </div>
  );
}