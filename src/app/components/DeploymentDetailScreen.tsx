import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { useData } from "../context/DataContext";
import { useAdmin } from "../context/AdminContext";
import type { Deployment } from "../data/mockData";
import { ArrowLeft, MapPin, Users, Calendar, Tag, CheckCircle, Target, AlertTriangle, FileText, Shield, User, ChevronDown, ChevronUp, Image } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Breadcrumb } from "./Breadcrumb";
import { BackToTop } from "./BackToTop";
import { toast } from "sonner";
import { ClassifiedGuard } from "./ClassifiedGuard";
import { getFrameName } from "../data/compconTypes";

export function DeploymentDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deployments, pilots, updateDeployment } = useData();
  const { isAdmin } = useAdmin();
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [selectedPilotId, setSelectedPilotId] = useState("");
  const [additionalImagesExpanded, setAdditionalImagesExpanded] = useState(false);

  const deployment = deployments.find(d => d.id === id);

  if (!deployment) {
    return (
      <div className="min-h-screen p-8 font-mono flex items-center justify-center">
        <div className="border-2 border-red-500/30 bg-red-500/5 p-12 text-center max-w-2xl">
          <div className="text-red-500 text-6xl mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">
            ⚠ ERROR
          </div>
          <div className="text-2xl font-bold text-red-400 mb-4 tracking-wider">
            NO DEPLOYMENT DATA FOUND
          </div>
          <div className="text-sm text-red-600/70 mb-6">
            // DEPLOYMENT ID "{id}" NOT FOUND IN DATABASE
          </div>
          <button
            onClick={() => navigate("/deployments")}
            className="px-6 py-3 border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500 transition-all text-sm font-bold text-green-400 tracking-wider"
          >
            ← RETURN TO DEPLOYMENT BOARD
          </button>
        </div>
      </div>
    );
  }

  // Check if deployment is classified and user doesn't have clearance
  if (deployment.status === "CLASSIFIED" && !isAdmin) {
    return <ClassifiedGuard />;
  }

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
      case "COMPLETED": return "text-green-600/50 border-green-500/30 bg-green-500/5";
      case "CLASSIFIED": return "text-purple-400 border-purple-500/50 bg-purple-500/10";
      default: return "text-green-600/50 border-green-500/30 bg-green-500/5";
    }
  };

  const availablePilots = pilots.filter(p => p.status.toUpperCase() === "ACTIVE" || p.status.toUpperCase() === "STANDBY");
  const signedUpPilots = deployment.signedUpPilots;
  const currentSignups = signedUpPilots.length;
  const spotsRemaining = deployment.requiredPilots - currentSignups;

  const handleSignUp = () => {
    if (!selectedPilotId) return;

    const pilot = pilots.find(p => p.id === selectedPilotId);
    if (!pilot) return;

    // Check if pilot is already signed up
    if (deployment.signedUpPilots.includes(selectedPilotId)) {
      toast.error("Pilot already signed up for this deployment");
      return;
    }

    // Update the deployment with the new pilot
    updateDeployment(deployment.id, {
      signedUpPilots: [...deployment.signedUpPilots, selectedPilotId],
      currentSignups: deployment.currentSignups + 1
    });

    toast.success(`${pilot.callsign} signed up for ${deployment.codename}`, {
      description: "// Deployment coordinator notified"
    });

    setSignupDialogOpen(false);
    setSelectedPilotId("");
  };

  return (
    <div className="min-h-screen p-8 font-mono">
      {/* Back Button */}
      <button
        onClick={() => navigate("/deployments")}
        className="mb-6 flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
        <span className="text-sm tracking-wider">RETURN TO DEPLOYMENT BOARD</span>
      </button>

      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: "DEPLOYMENTS", path: "/deployments" },
        { label: deployment.codename }
      ]} />

      {/* Terminal Header */}
      <div className="mb-8 border-2 border-green-500/30 bg-green-500/5 p-4">
        <div className="text-xs text-green-600/70 mb-2">// ACCESSING DEPLOYMENT FILE</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <h1 className="text-3xl font-bold text-green-500 tracking-wider drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
              ▶ {deployment.codename}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 border text-xs font-bold tracking-wider ${getStatusColor(deployment.status)}`}>
              {deployment.status.replace("_", " ")}
            </div>
            <div className={`px-3 py-1 border text-xs font-bold tracking-wider ${getThreatColor(deployment.threat)}`}>
              THREAT: {deployment.threat}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 max-w-[1800px] mx-auto">
        {/* Left Column - Image and Personnel */}
        <div className="xl:col-span-2 space-y-6">
          {/* Main Image with embedded stats */}
          {deployment.mainImage && (
            <div className="border-2 border-green-500/30 bg-green-500/5 overflow-hidden relative">
              <div className="aspect-square bg-black/50 overflow-hidden relative group">
                <img 
                  src={deployment.mainImage} 
                  alt={deployment.codename}
                  className="w-full h-full object-cover"
                />
                {/* Overlay info bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/90 border-t-2 border-green-500/30 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Image className="w-3 h-3 text-green-500" />
                    <div className="text-[10px] text-green-600/70 uppercase tracking-wider">Theater of Operations</div>
                  </div>
                  <div className="text-xs text-green-400 font-bold">{deployment.theater}</div>
                </div>
              </div>
              
              {/* Embedded metadata strip */}
              <div className="border-t-2 border-green-500/20 bg-green-500/10 p-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="border-l-2 border-green-500/30 pl-2">
                    <div className="text-[10px] text-green-600/70">TYPE</div>
                    <div className="text-green-400 font-bold">{deployment.type}</div>
                  </div>
                  <div className="border-l-2 border-green-500/30 pl-2">
                    <div className="text-[10px] text-green-600/70">START</div>
                    <div className="text-green-400 font-bold">{new Date(deployment.startDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Personnel Status - Compact Design */}
          <div className="border-2 border-green-500/30 bg-green-500/5 overflow-hidden">
            <div className="flex items-center gap-2 p-3 border-b-2 border-green-500/20 bg-green-500/10">
              <Shield className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// PERSONNEL STATUS</div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center border border-green-500/20 bg-green-500/5 p-2">
                  <div className="text-green-400 font-bold text-xl">{deployment.requiredPilots}</div>
                  <div className="text-[10px] text-green-600/70 mt-1">REQUIRED</div>
                </div>
                <div className="text-center border border-green-500/20 bg-green-500/5 p-2">
                  <div className="text-green-400 font-bold text-xl">{currentSignups}</div>
                  <div className="text-[10px] text-green-600/70 mt-1">SIGNED UP</div>
                </div>
                <div className="text-center border border-green-500/20 bg-green-500/5 p-2">
                  <div className={`font-bold text-xl ${spotsRemaining > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {spotsRemaining}
                  </div>
                  <div className="text-[10px] text-green-600/70 mt-1">REMAINING</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-[10px] text-green-600/70 mb-1">
                  <span>READINESS</span>
                  <span>{Math.round((currentSignups / deployment.requiredPilots) * 100)}%</span>
                </div>
                <div className="h-2 bg-green-950 border border-green-500/30">
                  <div 
                    className="h-full bg-green-500/50 transition-all" 
                    style={{ width: `${(currentSignups / deployment.requiredPilots) * 100}%` }}
                  />
                </div>
              </div>

              {deployment.status === "RECRUITING" && spotsRemaining > 0 && (
                <button
                  onClick={() => setSignupDialogOpen(true)}
                  className="w-full px-3 py-2 border border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500 transition-all text-xs font-bold text-green-400 tracking-wider"
                >
                  VOLUNTEER ▶
                </button>
              )}
            </div>
          </div>

          {/* Additional Images - Compact */}
          {deployment.additionalImages && deployment.additionalImages.length > 0 && (
            <div className="border-2 border-green-500/30 bg-green-500/5 overflow-hidden">
              <button
                onClick={() => setAdditionalImagesExpanded(!additionalImagesExpanded)}
                className="w-full p-3 flex items-center justify-between hover:bg-green-500/10 transition-all border-b-2 border-green-500/20"
              >
                <div className="flex items-center gap-2">
                  <Image className="w-3 h-3 text-green-500" />
                  <div className="text-xs text-green-600/70">
                    ATTACHED IMAGES ({deployment.additionalImages.length})
                  </div>
                </div>
                {additionalImagesExpanded ? (
                  <ChevronUp className="w-3 h-3 text-green-500" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-green-500" />
                )}
              </button>
              
              {additionalImagesExpanded && (
                <div className="grid grid-cols-2 gap-2 p-2">
                  {deployment.additionalImages.map((image, index) => (
                    <div key={index} className="border border-green-500/30 bg-black/50 overflow-hidden">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${deployment.codename} - Additional ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-[10px] text-green-600/70 p-1 text-center bg-green-500/5 border-t border-green-500/20">
                        IMG {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Operation ID - Small Footer */}
          <div className="border border-green-500/20 bg-green-500/5 p-2 text-center">
            <div className="text-[10px] text-green-600/70 mb-1">OPERATION ID</div>
            <div className="text-xs text-green-400 font-mono">{deployment.id}</div>
          </div>
        </div>

        {/* Right Column - Mission Details */}
        <div className="xl:col-span-3 space-y-4">
          {/* Mission Briefing */}
          <div className="border-2 border-green-500/30 bg-green-500/5 overflow-hidden">
            <div className="flex items-center gap-2 p-3 border-b-2 border-green-500/20 bg-green-500/10">
              <FileText className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// MISSION BRIEFING</div>
            </div>
            <div className="p-4 text-sm text-green-400 leading-relaxed">
              {deployment.briefing}
            </div>
          </div>

          {/* Combined ROE and Support Panel */}
          <div className="border-2 border-green-500/30 bg-green-500/5 overflow-hidden">
            {deployment.rulesOfEngagement && (
              <div className="border-b-2 border-green-500/20">
                <div className="flex items-center gap-2 p-3 border-b border-yellow-500/20 bg-yellow-500/5">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <div className="text-xs text-yellow-600/70">// RULES OF ENGAGEMENT</div>
                </div>
                <div className="p-4 text-sm text-yellow-400 leading-relaxed bg-yellow-500/5">
                  {deployment.rulesOfEngagement}
                </div>
              </div>
            )}

            {deployment.unionSupport && (
              <div>
                <div className="flex items-center gap-2 p-3 border-b border-blue-500/20 bg-blue-500/5">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <div className="text-xs text-blue-600/70">// UNION SUPPORT</div>
                </div>
                <div className="p-4 text-sm text-blue-400 leading-relaxed bg-blue-500/5">
                  {deployment.unionSupport}
                </div>
              </div>
            )}
          </div>

          {/* Threat Assessment - Prominent */}
          {deployment.threatAssessment && (
            <div className="border-2 border-red-500/30 bg-red-500/5 overflow-hidden">
              <div className="flex items-center gap-2 p-3 border-b-2 border-red-500/20 bg-red-500/10">
                <Target className="w-4 h-4 text-red-500" />
                <div className="text-xs text-red-600/70">// THREAT ASSESSMENT</div>
              </div>
              <div className="p-4 text-sm text-red-400 leading-relaxed">
                {deployment.threatAssessment}
              </div>
            </div>
          )}

          {/* Assigned Personnel - Compact Grid */}
          <div className="border-2 border-green-500/30 bg-green-500/5 overflow-hidden">
            <div className="flex items-center gap-2 p-3 border-b-2 border-green-500/20 bg-green-500/10">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// ASSIGNED PERSONNEL ({signedUpPilots.length}/{deployment.requiredPilots})</div>
            </div>
            <div className="p-3">
              {signedUpPilots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {signedUpPilots.map(pilotId => {
                    const pilot = pilots.find(p => p.id === pilotId);
                    return pilot ? (
                      <div 
                        key={pilotId} 
                        onClick={() => navigate(`/pilots/${pilotId}`)}
                        className="border border-green-500/30 bg-green-500/10 p-3 cursor-pointer hover:bg-green-500/20 hover:border-green-500 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          <div className="text-green-400 font-bold text-sm group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] truncate">
                            {pilot.callsign}
                          </div>
                        </div>
                        <div className="text-[10px] text-green-600/70 space-y-0.5">
                          <div className="truncate">{pilot.name}</div>
                          <div>
                            {pilot.mechs.length > 0 ? getFrameName(pilot.mechs[0].frame) : 'NO MECH'}
                          </div>
                          <div className="flex items-center gap-2">
                            <span>LL-{pilot.level}</span>
                            <span>//</span>
                            <span>{pilot.combat_history.kills} KIA</span>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <div className="text-sm text-green-600/50 italic p-2 text-center">
                  // NO PILOTS ASSIGNED
                </div>
              )}
            </div>
          </div>

          {/* Tags - Compact */}
          <div className="border border-green-500/20 bg-green-500/5 p-3">
            <div className="text-[10px] text-green-600/70 mb-2">// TAGS</div>
            <div className="flex flex-wrap gap-1.5">
              {deployment.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-2 py-1 border border-green-500/30 bg-green-500/10 text-green-400 text-[10px] font-bold tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sign-Up Dialog */}
      <Dialog open={signupDialogOpen} onOpenChange={setSignupDialogOpen}>
        <DialogContent className="bg-black border-2 border-green-500/50 text-green-400 max-w-2xl font-mono">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-500 tracking-wider drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">
              // VOLUNTEER FOR DEPLOYMENT
            </DialogTitle>
            <DialogDescription className="text-green-600/70 text-xs">
              Select a pilot to sign up for this mission
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="border-2 border-green-500/30 bg-green-500/5 p-4">
              <div className="text-xs text-green-600/70 mb-2">// OPERATION DETAILS:</div>
              <div className="text-lg font-bold text-green-400 mb-1 flex items-center gap-2">
                <span>▶</span>
                {deployment.codename}
              </div>
              <div className="text-xs text-green-600/70">{deployment.theater} // {deployment.type}</div>
            </div>

            <div className="border-t-2 border-green-500/20 pt-4">
              <label className="block text-xs mb-3 text-green-600/70">// SELECT PILOT:</label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {availablePilots.map(pilot => {
                  const alreadySignedUp = signedUpPilots.includes(pilot.id);
                  
                  return (
                    <div
                      key={pilot.id}
                      onClick={() => !alreadySignedUp && setSelectedPilotId(pilot.id)}
                      className={`p-3 border-2 transition-all ${
                        alreadySignedUp
                          ? "border-green-500/10 bg-green-500/5 opacity-40 cursor-not-allowed"
                          : selectedPilotId === pilot.id
                          ? "border-green-500 bg-green-500/20 cursor-pointer"
                          : "border-green-500/30 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/50 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`text-lg ${selectedPilotId === pilot.id ? 'text-green-400' : 'text-green-600/50'}`}>
                            {alreadySignedUp ? '✓' : selectedPilotId === pilot.id ? '▶' : '□'}
                          </span>
                          
                          {/* Pilot Portrait */}
                          <div className="w-10 h-10 border border-green-500/30 bg-black/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {(pilot.cloud_portrait || pilot.portrait) ? (
                              <img 
                                src={pilot.cloud_portrait || pilot.portrait} 
                                alt={pilot.callsign}
                                className="w-full h-full object-cover opacity-80"
                                onError={(e) => {
                                  // Replace with icon on error
                                  const parent = e.currentTarget.parentElement;
                                  if (parent) {
                                    e.currentTarget.style.display = 'none';
                                  }
                                }}
                              />
                            ) : (
                              <User className="w-5 h-5 text-green-500/50" />
                            )}
                          </div>
                          
                          <div>
                            <div className="font-bold text-green-400 flex items-center gap-2">
                              {pilot.callsign}
                              {alreadySignedUp && <CheckCircle className="w-3 h-3 text-green-600" />}
                            </div>
                            <div className="text-xs text-green-600/70">
                              {pilot.mechs.length > 0 ? getFrameName(pilot.mechs[0].frame) : 'NO MECH'} // LL-{pilot.level} // {pilot.combat_history.kills} kills
                            </div>
                          </div>
                        </div>
                        {alreadySignedUp && (
                          <span className="text-xs text-green-600 tracking-wider">[SIGNED UP]</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t-2 border-green-500/20">
              <Button
                onClick={() => setSignupDialogOpen(false)}
                variant="outline"
                className="flex-1 border-2 border-green-500/30 text-green-600 bg-transparent hover:bg-green-500/10 hover:text-green-400 hover:border-green-500 transition-all font-mono"
              >
                CANCEL
              </Button>
              <Button
                onClick={handleSignUp}
                disabled={!selectedPilotId}
                className="flex-1 border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500 text-green-400 disabled:opacity-30 disabled:cursor-not-allowed font-bold tracking-wider font-mono"
              >
                CONFIRM ▶
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BackToTop />
    </div>
  );
}