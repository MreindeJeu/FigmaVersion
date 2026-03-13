import { locations } from "../data/mockData";
import { useData } from "../context/DataContext";
import { useAdmin } from "../context/AdminContext";
import { Users, MapPin, FileText, AlertTriangle, Activity, Zap, Shield, Radio, Rocket, Book } from "lucide-react";
import { Link } from "react-router";
import { BackToTop } from "./BackToTop";
import { NewsFeed } from "./NewsFeed";
import { useState, useEffect } from "react";

export function Dashboard() {
  const { pilots, deployments } = useData();
  const { isAdmin } = useAdmin();
  
  // Filter out classified deployments for non-admin users
  const visibleDeployments = isAdmin ? deployments : deployments.filter(d => d.status !== "CLASSIFIED");
  
  const activePilots = pilots.filter(p => p.status === "ACTIVE" || p.status === "STANDBY").length;
  const recruitingDeployments = visibleDeployments.filter(d => d.status === "RECRUITING").length;
  const criticalTheaters = locations.filter(l => l.status === "CRITICAL" || l.status === "CONTESTED").length;
  const totalMissions = visibleDeployments.reduce((acc, d) => acc + d.signedUpPilots.length, 0);

  // System uptime counter - persistent across navigation
  const [uptime, setUptime] = useState(() => {
    // Get or set the start time in localStorage
    const startTimeKey = 'vanguard_system_start_time';
    let startTime = localStorage.getItem(startTimeKey);
    
    if (!startTime) {
      startTime = Date.now().toString();
      localStorage.setItem(startTimeKey, startTime);
    }
    
    // Calculate initial uptime in seconds
    return Math.floor((Date.now() - parseInt(startTime)) / 1000);
  });
  
  // Omninode latency with realistic fluctuation
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const startTimeKey = 'vanguard_system_start_time';
    const startTime = parseInt(localStorage.getItem(startTimeKey) || Date.now().toString());
    
    // Update uptime every second based on actual elapsed time
    const uptimeInterval = setInterval(() => {
      setUptime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    // Update latency every second with realistic fluctuation
    const latencyInterval = setInterval(() => {
      setLatency(prev => {
        // Gradual change: +/- 0-5ms randomly, but weighted to stay in 2-34 range
        const change = (Math.random() - 0.5) * 10; // -5 to +5
        let newLatency = prev + change;
        
        // Clamp to realistic range with soft boundaries
        if (newLatency < 2) newLatency = 2 + Math.random() * 3;
        if (newLatency > 34) newLatency = 28 + Math.random() * 6;
        
        // Occasionally spike slightly higher (5% chance)
        if (Math.random() < 0.05) {
          newLatency = Math.min(240, newLatency + Math.random() * 30);
        }
        
        return Math.round(newLatency);
      });
    }, 1000);

    return () => {
      clearInterval(uptimeInterval);
      clearInterval(latencyInterval);
    };
  }, []);

  // Format uptime as HH:MM:SS
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Generate dynamic activity log based on actual data
  const generateActivityLog = () => {
    const activities = [];
    
    // Add recent deployments (sorted by start date)
    const recentDeployments = [...deployments]
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      .slice(0, 3);
    
    recentDeployments.forEach(dep => {
      const depDate = new Date(dep.startDate);
      const timestamp = `${depDate.toISOString().split('T')[0]} ${depDate.toLocaleTimeString('en-US', { hour12: false })}`;
      activities.push({
        timestamp,
        message: `OPERATION ${dep.codename} posted to deployment board`,
        date: depDate
      });
    });

    // Add recent pilots (sorted by join date)
    const recentPilots = [...pilots]
      .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
      .slice(0, 2);
    
    recentPilots.forEach(pilot => {
      const pilotDate = new Date(pilot.joinDate);
      const timestamp = `${pilotDate.toISOString().split('T')[0]} ${pilotDate.toLocaleTimeString('en-US', { hour12: false })}`;
      activities.push({
        timestamp,
        message: `New pilot ${pilot.callsign} registered to V.A.N.G.U.A.R.D. network`,
        date: pilotDate
      });
    });

    // Sort all activities by date (most recent first) and return top 5
    return activities
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
  };

  const activityLog = generateActivityLog();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-mono">
      {/* Terminal Header */}
      <div className="mb-6 sm:mb-8 border-2 border-green-500/30 bg-green-500/5 p-3 sm:p-4">
        <div className="text-xs text-green-600/70 mb-2">// ACCESSING MISSION CONTROL TERMINAL</div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-green-500 tracking-wider drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
              ▶ MISSION CONTROL
            </h1>
            <p className="text-green-600/80 text-xs mt-2 tracking-wide">
              Union Auxiliary Reserve Status // {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="text-left sm:text-right text-xs space-y-1">
            <div className="text-green-600/70">SYSTEM UPTIME: {formatUptime(uptime)}</div>
            <div className="text-green-600/70">OMNINODE LATENCY: {latency} ms</div>
            <div className="flex items-center gap-2 sm:justify-end">
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
                {visibleDeployments.filter(d => d.status === "RECRUITING").slice(0, 4).map(dep => (
                  <div key={dep.id} className="border-l-2 border-green-500/50 pl-3 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-green-500 font-bold">{dep.codename}</span>
                      <span className="text-green-600/70">{dep.theater}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-green-950 border border-green-500/30">
                        <div 
                          className="h-full bg-green-500/50" 
                          style={{ width: `${(dep.signedUpPilots.length / dep.requiredPilots) * 100}%` }}
                        />
                      </div>
                      <span className="text-green-600/70 text-[10px] w-16">{dep.signedUpPilots.length}/{dep.requiredPilots}</span>
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
              {visibleDeployments
                .filter(d => d.status === "RECRUITING" && (d.threat === "HIGH" || d.threat === "CRITICAL"))
                .sort((a, b) => {
                  // Sort by threat level first (CRITICAL before HIGH), then by date
                  const threatOrder = { CRITICAL: 0, HIGH: 1 };
                  const threatDiff = threatOrder[a.threat as keyof typeof threatOrder] - threatOrder[b.threat as keyof typeof threatOrder];
                  if (threatDiff !== 0) return threatDiff;
                  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
                })
                .map(deployment => (
                  <div key={deployment.id} className="p-4 hover:bg-yellow-500/10 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-yellow-500 animate-pulse">⚠</span>
                          <div className="font-bold text-yellow-400 tracking-wider drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                            {deployment.codename}
                          </div>
                          <span className={`text-xs px-2 py-1 border font-bold ${
                            deployment.threat === "CRITICAL" 
                              ? "border-red-500/50 bg-red-500/10 text-red-400" 
                              : "border-orange-500/50 bg-orange-500/10 text-orange-400"
                          }`}>
                            {deployment.threat}
                          </span>
                        </div>
                        <div className="text-xs text-green-600/80 mb-1">
                          THEATER: {deployment.theater} // TYPE: {deployment.type}
                        </div>
                        <div className="text-xs text-green-600/70">
                          REQUIRED: {deployment.requiredPilots - deployment.signedUpPilots.length} additional pilots // START: {new Date(deployment.startDate).toLocaleDateString()}
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
                ))
              }
              {visibleDeployments.filter(d => d.status === "RECRUITING" && (d.threat === "HIGH" || d.threat === "CRITICAL")).length === 0 && (
                <div className="p-4 text-center text-xs text-green-600/70">
                  // NO PRIORITY ALERTS AT THIS TIME
                </div>
              )}
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
              {activityLog.map((activity, index) => (
                <div 
                  key={index} 
                  className={`p-3 hover:bg-green-500/10 transition-colors ${
                    index < activityLog.length - 1 ? 'border-b-2 border-green-500/20' : ''
                  }`}
                >
                  <span className="text-green-600/70">[{activity.timestamp}]</span>
                  <span className="text-green-500 mx-2">//</span>
                  <span className="text-green-400">{activity.message}</span>
                </div>
              ))}
              {activityLog.length === 0 && (
                <div className="p-3 text-center text-xs text-green-600/70">
                  // NO RECENT ACTIVITY
                </div>
              )}
            </div>
          </div>

          {/* News Feed */}
          <NewsFeed />
        </div>
      </div>

      <BackToTop />
    </div>
  );
}