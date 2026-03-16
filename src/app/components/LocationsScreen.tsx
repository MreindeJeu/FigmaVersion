import { useData } from "../context/DataContext";
import { MapPin, Users, Building, Activity, Globe } from "lucide-react";
import { BackToTop } from "../components/BackToTop";

export function LocationsScreen() {
  const { deployments, locations } = useData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "STABLE": return "text-green-500 border-green-500/50 bg-green-500/10";
      case "ACTIVE": return "text-blue-500 border-blue-500/50 bg-blue-500/10";
      case "CONTESTED": return "text-orange-500 border-orange-500/50 bg-orange-500/10";
      case "CRITICAL": return "text-red-500 border-red-500/50 bg-red-500/10";
      default: return "text-green-600/50 border-green-500/30 bg-green-500/5";
    }
  };

  return (
    <div className="min-h-screen p-8 font-mono">
      {/* Terminal Header */}
      <div className="mb-8 border-2 border-green-500/30 bg-green-500/5 p-4">
        <div className="text-xs text-green-600/70 mb-2">// ACCESSING THEATER INTELLIGENCE DATABASE</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <h1 className="text-3xl font-bold text-green-500 tracking-wider drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
              ▶ OPERATION THEATERS
            </h1>
          </div>
          <div className="text-xs text-green-600/70">
            {locations.length} ACTIVE ZONES
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {locations.map(location => {
          const activeOps = deployments.filter(d => d.theater === location.name);
          
          return (
            <div
              key={location.id}
              className="border-2 border-green-500/30 bg-green-500/5 p-6 hover:bg-green-500/10 hover:border-green-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-green-500">▶</span>
                    <h3 className="text-xl font-bold text-green-400 tracking-wider drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                      {location.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 border font-bold tracking-wider ${getStatusColor(location.status)}`}>
                      {location.status}
                    </span>
                  </div>
                  <div className="text-sm text-green-600/70 mb-4">{location.system}</div>
                </div>
                <MapPin className="w-6 h-6 text-green-600/70" />
              </div>

              <div className="space-y-3 mb-4 text-sm">
                <div className="border-l-2 border-green-500/30 pl-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-3 h-3 text-green-600/70" />
                    <span className="text-xs text-green-600/70">POPULATION</span>
                  </div>
                  <div className="text-green-400">{location.population}</div>
                </div>

                <div className="border-l-2 border-green-500/30 pl-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Building className="w-3 h-3 text-green-600/70" />
                    <span className="text-xs text-green-600/70">GOVERNANCE</span>
                  </div>
                  <div className="text-green-400">{location.governance}</div>
                </div>

                <div className="border-l-2 border-green-500/30 pl-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-3 h-3 text-green-600/70" />
                    <span className="text-xs text-green-600/70">ACTIVE DEPLOYMENTS</span>
                  </div>
                  <div className="text-green-400 font-bold">{location.activeDeployments}</div>
                </div>
              </div>

              {activeOps.length > 0 && (
                <div className="pt-4 border-t-2 border-green-500/20">
                  <div className="text-xs text-green-600/70 mb-2">// ACTIVE OPERATIONS:</div>
                  <div className="space-y-2">
                    {activeOps.map(op => (
                      <div key={op.id} className="flex items-center justify-between text-sm border-l-2 border-green-500/30 pl-3">
                        <span className="text-green-400">{op.codename}</span>
                        <span className="text-xs text-green-600/70">[{op.status.replace("_", " ")}]</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <BackToTop />
    </div>
  );
}