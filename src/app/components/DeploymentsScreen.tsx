import { useData } from "../context/DataContext";
import { useAdmin } from "../context/AdminContext";
import type { Deployment } from "../data/mockData";
import { MapPin, Users, Calendar, Target, FileText, AlertTriangle, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router";
import { BackToTop } from "./BackToTop";

export function DeploymentsScreen() {
  const { deployments } = useData();
  const { isAdmin } = useAdmin();

  // Filter out completed deployments and CLASSIFIED (unless admin), then sort by status
  const sortedDeployments = [...deployments]
    .filter(d => d.status !== "COMPLETED" && (isAdmin || d.status !== "CLASSIFIED"))
    .sort((a, b) => {
      const statusOrder: Record<string, number> = {
        'RECRUITING': 1,
        'IN_PROGRESS': 2,
        'CLASSIFIED': 3
      };
      
      const orderA = statusOrder[a.status] || 999;
      const orderB = statusOrder[b.status] || 999;
      
      return orderA - orderB;
    });

  const getThreatColor = (threat: Deployment["threat"]) => {
    switch (threat) {
      case "LOW": return "text-green-400 border-green-500/50 bg-green-500/10";
      case "MEDIUM": return "text-yellow-400 border-yellow-500/50 bg-yellow-500/10";
      case "HIGH": return "text-orange-400 border-orange-500/50 bg-orange-500/10";
      case "CRITICAL": return "text-red-400 border-red-500/50 bg-red-500/10";
      default: return "text-green-600/50 border-green-500/30 bg-green-500/5";
    }
  };

  const getStatusColor = (status: Deployment["status"]) => {
    switch (status) {
      case "RECRUITING": return "text-green-400 border-green-500/50 bg-green-500/10";
      case "IN_PROGRESS": return "text-blue-400 border-blue-500/50 bg-blue-500/10";
      case "CLASSIFIED": return "text-purple-400 border-purple-500/50 bg-purple-500/10";
      default: return "text-green-600/50 border-green-500/30 bg-green-500/5";
    }
  };

  return (
    <div className="min-h-screen p-8 font-mono">
      {/* Terminal Header */}
      <div className="mb-8 border-2 border-green-500/30 bg-green-500/5 p-4">
        <div className="text-xs text-green-600/70 mb-2">// ACCESSING DEPLOYMENT DATABASE</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <h1 className="text-3xl font-bold text-green-500 tracking-wider drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
              ▶ DEPLOYMENT BOARD
            </h1>
          </div>
          <div className="text-xs text-green-600/70">
            {deployments.filter(d => d.status === "RECRUITING").length} ACTIVE OPERATIONS
          </div>
        </div>
      </div>

      {/* Deployments List */}
      <div className="space-y-4">
        {sortedDeployments.map(deployment => {
          const currentSignups = deployment.signedUpPilots.length;
          const spotsRemaining = deployment.requiredPilots - currentSignups;
          const isUrgent = deployment.threat === "CRITICAL" || deployment.threat === "HIGH";

          return (
            <Link
              key={deployment.id}
              to={`/deployments/${deployment.id}`}
              className={`block border-2 p-5 transition-all hover-glow relative ${
                deployment.threat === "CRITICAL"
                  ? "border-red-500/50 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/70"
                  : "border-green-500/30 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/50"
              }`}
            >
              {/* URGENT Badge for High/Critical Threats */}
              {isUrgent && (
                <div className="absolute -top-2 -right-2 px-3 py-1 border-2 border-red-500 bg-red-500/20 text-red-400 text-xs font-bold tracking-wider animate-pulse flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3" />
                  URGENT
                </div>
              )}

              {/* Header Row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4 flex-1">
                  {/* Deployment Image Thumbnail */}
                  {deployment.mainImage && (
                    <div className="w-40 h-40 border-2 border-green-500/30 bg-black/50 overflow-hidden flex-shrink-0">
                      <img 
                        src={deployment.mainImage} 
                        alt={deployment.codename}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      {deployment.threat === "CRITICAL" ? (
                        <span className="text-red-500 text-xl animate-pulse">⚠</span>
                      ) : (
                        <span className="text-green-500 text-xl">▶</span>
                      )}
                      <h3 className="text-xl font-bold text-green-400 tracking-wider drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                        {deployment.codename}
                      </h3>
                      <span className={`text-xs px-2 py-1 border font-bold tracking-wider ${getStatusColor(deployment.status)}`}>
                        {deployment.status.replace("_", " ")}
                      </span>
                      <span className={`text-xs px-2 py-1 border font-bold tracking-wider ${getThreatColor(deployment.threat)}`}>
                        {deployment.threat}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-green-600/70 mb-3 flex-wrap">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{deployment.theater}</span>
                      </div>
                      <span>//</span>
                      <span>{deployment.type}</span>
                      <span>//</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(deployment.startDate).toLocaleDateString()}</span>
                      </div>
                      <span>//</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span className={`font-bold ${spotsRemaining > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {currentSignups}/{deployment.requiredPilots}
                        </span>
                      </div>
                    </div>

                    {/* Brief Preview */}
                    <div className="text-sm text-green-500/70 border-l-2 border-green-500/20 pl-3">
                      {deployment.briefing.substring(0, 200)}...
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  {deployment.status === "RECRUITING" && spotsRemaining > 0 && (
                    <span className="px-3 py-1 border border-yellow-500/50 bg-yellow-500/10 text-yellow-400 text-xs font-bold">
                      {spotsRemaining} SPOTS
                    </span>
                  )}
                  <FileText className="w-5 h-5 text-green-500/50" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <BackToTop />
    </div>
  );
}