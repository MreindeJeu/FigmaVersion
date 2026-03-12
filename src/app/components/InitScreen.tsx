import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

interface BootLine {
  text: string;
  progress?: boolean;
  progressSteps?: string[];
}

const bootSequence: BootLine[] = [
  { text: "> INITIALIZING V.A.N.G.U.A.R.D. SYSTEM..." },
  { text: "> Volitional Asset Network for Guided Union Auxiliary Reserve Deployment" },
  { text: "" },
  { text: "> LOADING CORE MODULES..." },
  { 
    text: "  [____________________] 0% // auth.module.v4.2.1",
    progress: true,
    progressSteps: [
      "  [____________________] 0% // auth.module.v4.2.1",
      "  [█___________________] 5% // auth.module.v4.2.1",
      "  [███_________________] 15% // auth.module.v4.2.1",
      "  [██████______________] 30% // auth.module.v4.2.1",
      "  [██████████__________] 50% // auth.module.v4.2.1",
      "  [██████████████______] 70% // auth.module.v4.2.1",
      "  [█████████████████___] 85% // auth.module.v4.2.1",
      "  [███████████████████_] 95% // auth.module.v4.2.1",
      "  [████████████████████] 100% // auth.module.v4.2.1"
    ]
  },
  { 
    text: "  [____________________] 0% // deploy.db.v3.8.5",
    progress: true,
    progressSteps: [
      "  [____________________] 0% // deploy.db.v3.8.5",
      "  [█___________________] 5% // deploy.db.v3.8.5",
      "  [███_________________] 15% // deploy.db.v3.8.5",
      "  [██████______________] 30% // deploy.db.v3.8.5",
      "  [██████████__________] 50% // deploy.db.v3.8.5",
      "  [██████████████______] 70% // deploy.db.v3.8.5",
      "  [█████████████████___] 85% // deploy.db.v3.8.5",
      "  [███████████████████_] 95% // deploy.db.v3.8.5",
      "  [████████████████████] 100% // deploy.db.v3.8.5"
    ]
  },
  { 
    text: "  [____________________] 0% // pilot.reg.v2.1.9",
    progress: true,
    progressSteps: [
      "  [____________________] 0% // pilot.reg.v2.1.9",
      "  [█___________________] 5% // pilot.reg.v2.1.9",
      "  [███_________________] 15% // pilot.reg.v2.1.9",
      "  [██████______________] 30% // pilot.reg.v2.1.9",
      "  [██████████__________] 50% // pilot.reg.v2.1.9",
      "  [██████████████______] 70% // pilot.reg.v2.1.9",
      "  [█████████████████___] 85% // pilot.reg.v2.1.9",
      "  [███████████████████_] 95% // pilot.reg.v2.1.9",
      "  [████████████████████] 100% // pilot.reg.v2.1.9"
    ]
  },
  { 
    text: "  [____________________] 0% // theater.intel.v5.0.2",
    progress: true,
    progressSteps: [
      "  [____________________] 0% // theater.intel.v5.0.2",
      "  [█___________________] 5% // theater.intel.v5.0.2",
      "  [███_________________] 15% // theater.intel.v5.0.2",
      "  [██████______________] 30% // theater.intel.v5.0.2",
      "  [██████████__________] 50% // theater.intel.v5.0.2",
      "  [██████████████______] 70% // theater.intel.v5.0.2",
      "  [█████████████████___] 85% // theater.intel.v5.0.2",
      "  [███████████████████_] 95% // theater.intel.v5.0.2",
      "  [████████████████████] 100% // theater.intel.v5.0.2"
    ]
  },
  { 
    text: "  [____________________] 0% // comms.secure.v4.4.0",
    progress: true,
    progressSteps: [
      "  [____________________] 0% // comms.secure.v4.4.0",
      "  [█___________________] 5% // comms.secure.v4.4.0",
      "  [███_________________] 15% // comms.secure.v4.4.0",
      "  [██████______________] 30% // comms.secure.v4.4.0",
      "  [██████████__________] 50% // comms.secure.v4.4.0",
      "  [██████████████______] 70% // comms.secure.v4.4.0",
      "  [█████████████████___] 85% // comms.secure.v4.4.0",
      "  [███████████████████_] 95% // comms.secure.v4.4.0",
      "  [████████████████████] 100% // comms.secure.v4.4.0"
    ]
  },
  { text: "" },
  { text: "> ESTABLISHING OMNINODE CONNECTION..." },
  { text: "  >> 192.168.UNION.NODE :: PING [OK]" },
  { text: "  >> HANDSHAKE COMPLETE" },
  { text: "  >> ENCRYPTION: AES-256-GCM" },
  { text: "" },
  { text: "> VERIFYING UNION CREDENTIALS..." },
  { text: "  >> CLEARANCE LEVEL: AUXILIARY" },
  { text: "  >> ACCESS GRANTED" },
  { text: "" },
  { text: "╔════════════════════════════════════════╗" },
  { text: "║  SYSTEM READY // OMNINODE CONNECTED   ║" },
  { text: "╚════════════════════════════════════════╝" },
  { text: "" },
  { text: ">> Press any key to continue..." }
];

export function InitScreen() {
  const [stage, setStage] = useState<"init" | "boot" | "complete">("init");
  const [bootLines, setBootLines] = useState<string[]>([]);
  const navigate = useNavigate();
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setStage("boot");
    }, 1000);

    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (stage === "boot") {
      let currentLineIndex = 0;
      let currentProgressStep = 0;

      const processNextLine = () => {
        if (currentLineIndex >= bootSequence.length) {
          setStage("complete");
          return;
        }

        const line = bootSequence[currentLineIndex];

        if (line.progress && line.progressSteps) {
          // Add initial progress line
          setBootLines(prev => [...prev, line.progressSteps![0]]);
          
          // Animate progress
          currentProgressStep = 0;
          const progressInterval = setInterval(() => {
            currentProgressStep++;
            if (currentProgressStep < line.progressSteps!.length) {
              setBootLines(prev => {
                const newLines = [...prev];
                newLines[newLines.length - 1] = line.progressSteps![currentProgressStep];
                return newLines;
              });
            } else {
              clearInterval(progressInterval);
              currentLineIndex++;
              const timeout = setTimeout(processNextLine, 150);
              timeoutsRef.current.push(timeout);
            }
          }, 50);
          intervalsRef.current.push(progressInterval);
        } else {
          // Regular line
          setBootLines(prev => [...prev, line.text]);
          currentLineIndex++;
          const timeout = setTimeout(processNextLine, 100);
          timeoutsRef.current.push(timeout);
        }
      };

      processNextLine();

      return () => {
        timeoutsRef.current.forEach(clearTimeout);
        intervalsRef.current.forEach(clearInterval);
      };
    }
  }, [stage]);

  const skipToEnd = () => {
    if (stage === "boot") {
      // Clear all timers
      timeoutsRef.current.forEach(clearTimeout);
      intervalsRef.current.forEach(clearInterval);
      timeoutsRef.current = [];
      intervalsRef.current = [];

      // Show all lines with progress bars at 100%
      const allLines = bootSequence.map(line => {
        if (line.progress && line.progressSteps) {
          return line.progressSteps[line.progressSteps.length - 1];
        }
        return line.text;
      });
      
      setBootLines(allLines);
      setStage("complete");
    } else if (stage === "complete") {
      navigate("/dashboard");
    }
  };

  if (stage === "init") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* CRT Screen effect */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none animate-pulse" />
        
        <div className="text-center space-y-8 relative">
          <div className="relative inline-block">
            <div className="absolute inset-0 blur-2xl bg-green-500/50 animate-pulse" />
            <div className="relative">
              <div className="text-6xl font-bold font-mono tracking-[0.3em] text-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                V.A.N.G.U.A.R.D.
              </div>
              <div className="text-xs font-mono tracking-widest text-green-600/80 mt-3">
                // UNION AUXILIARY NETWORK TERMINAL
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 font-mono text-green-500">
            <span className="animate-pulse">█</span>
            <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>█</span>
            <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>█</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen p-8 cursor-pointer bg-black relative overflow-hidden"
      onClick={skipToEnd}
      onKeyDown={skipToEnd}
      tabIndex={0}
    >
      {/* CRT effects */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/3 to-transparent pointer-events-none animate-pulse z-10" />
      
      <div className="max-w-5xl mx-auto font-mono relative">
        <div className="space-y-0.5">
          {bootLines.map((line, idx) => {
            const isProgress = line && line.includes('█');
            const isHeader = line && line.startsWith('>');
            const isSubItem = line && line.startsWith('  >>');
            const isBox = line && (line.includes('╔') || line.includes('║') || line.includes('╚'));
            const isContinue = line && line.startsWith('>>');
            
            return (
              <div 
                key={idx}
                className={`transition-all duration-100 ${
                  isProgress ? 'text-green-400' :
                  isHeader ? 'text-green-500 font-bold' : 
                  isSubItem ? 'text-green-600/90 text-sm' :
                  isBox ? 'text-green-500 text-center' :
                  isContinue ? 'text-green-400 animate-pulse' :
                  'text-green-700/70'
                } ${idx === bootLines.length - 1 && !isContinue ? 'drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]' : ''}`}
                style={{
                  textShadow: isHeader || isProgress ? '0 0 10px rgba(34, 197, 94, 0.5)' : 'none'
                }}
              >
                {line || '\u00A0'}
              </div>
            );
          })}
        </div>
        {stage === "complete" && (
          <div className="mt-8 flex items-center gap-3 text-green-400 animate-pulse">
            <span className="text-2xl">▶</span>
            <span className="text-sm tracking-wider drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">CLICK TO ACCESS TERMINAL</span>
          </div>
        )}
      </div>
    </div>
  );
}
