import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { useData } from "../context/DataContext";
import { useAdmin } from "../context/AdminContext";
import type { Deployment } from "../data/mockData";
import { ArrowLeft, MapPin, Users, Calendar, Tag, CheckCircle, Target, AlertTriangle, FileText, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Breadcrumb } from "./Breadcrumb";
import { BackToTop } from "./BackToTop";
import { toast } from "sonner";
import { ClassifiedGuard } from "./ClassifiedGuard";

export function DeploymentDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deployments, pilots, updateDeployment } = useData();
  const { isAdmin } = useAdmin();
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [selectedPilotId, setSelectedPilotId] = useState("");

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

  const availablePilots = pilots.filter(p => p.status === "ACTIVE" || p.status === "STANDBY");
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Basic Info */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="text-xs text-green-600/70 mb-4">// OPERATION DETAILS</div>
            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3 h-3 text-green-600/70" />
                  <div className="text-xs text-green-600/70">THEATER OF OPERATIONS</div>
                </div>
                <div className="text-green-400 font-bold">{deployment.theater}</div>
              </div>

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="w-3 h-3 text-green-600/70" />
                  <div className="text-xs text-green-600/70">OPERATION TYPE</div>
                </div>
                <div className="text-green-400 font-bold">{deployment.type}</div>
              </div>

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3 h-3 text-green-600/70" />
                  <div className="text-xs text-green-600/70">START DATE</div>
                </div>
                <div className="text-green-400">{new Date(deployment.startDate).toLocaleDateString()}</div>
              </div>

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-3 h-3 text-green-600/70" />
                  <div className="text-xs text-green-600/70">OPERATION ID</div>
                </div>
                <div className="text-green-400 font-mono">{deployment.id}</div>
              </div>
            </div>
          </div>

          {/* Personnel Status */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// PERSONNEL STATUS</div>
            </div>
            <div className="space-y-4">
              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="text-xs text-green-600/70 mb-1">REQUIRED PILOTS</div>
                <div className="text-green-400 font-bold text-2xl">{deployment.requiredPilots}</div>
              </div>

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="text-xs text-green-600/70 mb-1">CURRENT SIGNUPS</div>
                <div className="text-green-400 font-bold text-2xl">{currentSignups}</div>
              </div>

              <div className="border-l-2 border-green-500/30 pl-3">
                <div className="text-xs text-green-600/70 mb-1">SPOTS REMAINING</div>
                <div className={`font-bold text-2xl ${spotsRemaining > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {spotsRemaining}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="pt-2">
                <div className="text-xs text-green-600/70 mb-2">READINESS</div>
                <div className="h-3 bg-green-950 border-2 border-green-500/30">
                  <div 
                    className="h-full bg-green-500/50 transition-all" 
                    style={{ width: `${(currentSignups / deployment.requiredPilots) * 100}%` }}
                  />
                </div>
                <div className="text-[10px] text-green-600/70 mt-1 text-right">
                  {Math.round((currentSignups / deployment.requiredPilots) * 100)}% STAFFED
                </div>
              </div>
            </div>

            {deployment.status === "RECRUITING" && spotsRemaining > 0 && (
              <button
                onClick={() => setSignupDialogOpen(true)}
                className="w-full mt-4 px-4 py-3 border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500 transition-all text-sm font-bold text-green-400 tracking-wider"
              >
                VOLUNTEER FOR DEPLOYMENT ▶
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mission Briefing */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// MISSION BRIEFING</div>
            </div>
            <div className="text-sm text-green-400 leading-relaxed border-l-2 border-green-500/30 pl-4">
              {deployment.briefing}
            </div>
          </div>

          {/* Tags */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="text-xs text-green-600/70 mb-4">// OPERATION TAGS</div>
            <div className="flex flex-wrap gap-2">
              {deployment.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-2 border-2 border-green-500/50 bg-green-500/10 text-green-400 text-sm font-bold tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Signed Up Pilots */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div className="text-xs text-green-600/70">// ASSIGNED PERSONNEL</div>
            </div>
            {signedUpPilots.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {signedUpPilots.map(pilotId => {
                  const pilot = pilots.find(p => p.id === pilotId);
                  return pilot ? (
                    <div 
                      key={pilotId} 
                      className="border-2 border-green-500/50 bg-green-500/10 p-3"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <div className="text-green-400 font-bold">{pilot.callsign}</div>
                      </div>
                      <div className="text-xs text-green-600/70">{pilot.name}</div>
                      <div className="text-xs text-green-600/70 mt-1">
                        {pilot.mech.frame} // {pilot.license}
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <div className="text-sm text-green-600/50 italic border-l-2 border-green-500/20 pl-4">
                // NO PILOTS ASSIGNED
              </div>
            )}
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
                          <div>
                            <div className="font-bold text-green-400 flex items-center gap-2">
                              {pilot.callsign}
                              {alreadySignedUp && <CheckCircle className="w-3 h-3 text-green-600" />}
                            </div>
                            <div className="text-xs text-green-600/70">
                              {pilot.mech.frame} // {pilot.mech.class} // {pilot.missions} missions
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
                className="flex-1 border-2 border-green-500/30 text-green-600 bg-transparent hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/50 font-mono"
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