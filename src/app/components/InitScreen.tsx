import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * INIT SCREEN - TERMINAL BOOT SEQUENCE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Displays a retro terminal boot sequence on first load, creating immersion
 * for the V.A.N.G.U.A.R.D. system. Features:
 * 
 * - ASCII art VANGUARD logo
 * - Animated progress bars for system initialization
 * - Typewriter effect for terminal output
 * - CRT scan line effects
 * - Persistent localStorage flag to show only once per session
 * 
 * FLOW:
 * -----
 * 1. Check localStorage for 'vanguard_init_complete'
 * 2. If not found, display boot sequence
 * 3. Animate through boot lines with typewriter effect
 * 4. Show progress bars for database loading
 * 5. Mark complete in localStorage
 * 6. Navigate to /dashboard
 * 
 * To reset: Clear localStorage key 'vanguard_init_complete'
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface BootLine {
  text: string;
  progress?: boolean;
  progressSteps?: string[];
}

const bootSequence: BootLine[] = [
  { text: "██╗   ██╗ █████╗ ███╗   ██╗ ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗" },
  { text: "██║   ██║██╔══██╗████╗  ██║██╔════╝ ██║   ██║██╔══██╗██╔══██╗██╔══██╗" },
  { text: "██║   ██║███████║██╔██╗ ██║██║  ███╗██║   ██║███████║██████╔╝██║  ██║" },
  { text: "╚██╗ ██╔╝██╔══██║██║╚██╗██║██║   ██║██║   ██║██╔══██║██╔══██╗██║  ██║" },
  { text: " ╚████╔╝ ██║  ██║██║ ╚████║╚██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝" },
  { text: "" },
  { text: "                                                              ver. UNION-1.5.742" },
  { text: "" },
  { text: "VOLITIONAL ASSET NETWORK FOR GUIDED UNION AUXILIARY RESERVE DEPLOYMENT" },
  { text: "INITIALIZING V.A.N.G.U.A.R.D. SYSTEM..." },
  { text: "" },
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
      "  [█████████__________] 50% // pilot.reg.v2.1.9",
      "  [██████████████______] 70% // pilot.reg.v2.1.9",
      "  [█████████████████___] 85% // pilot.reg.v2.1.9",
      "  [███████████████████_] 95% // pilot.reg.v2.1.9",
      "  [████████████████████] 100% // pilot.reg.v2.1.9"
    ]
  },
  { 
    text: "  [____________________] 0% // mech.frame.v4.2.1",
    progress: true,
    progressSteps: [
      "  [____________________] 0% // mech.frame.v4.2.1",
      "  [█___________________] 5% // mech.frame.v4.2.1",
      "  [███_________________] 15% // mech.frame.v4.2.1",
      "  [██████______________] 30% // mech.frame.v4.2.1",
      "  [██████████__________] 50% // mech.frame.v4.2.1",
      "  [██████████████______] 70% // mech.frame.v4.2.1",
      "  [█████████████████___] 85% // mech.frame.v4.2.1",
      "  [███████████████████_] 95% // mech.frame.v4.2.1",
      "  [████████████████████] 100% // mech.frame.v4.2.1"
    ]
  },
  { text: "" },
  { text: "/boot/vanguard.sys :: init" },
  { text: "loading union_aux_kernel.vng" },
  { text: "mount /mnt/omninet/relay :: OK" },
  { text: "" },
  { text: "allocating tmem buffers [ops_cache]" },
  { text: "reading cfg /etc/vanguard/network.cfg" },
  { text: "reading cfg /etc/vanguard/deployment.tbl" },
  { text: "" },
  { text: "loading module :: pilot_registry.scan" },
  { text: "loading module :: deployment_manager.exec" },
  { text: "" },
  { text: "init omninet uplink /node/vanguard.beta" },
  { text: "routing /net/union/backbone" },
  { text: "node.alpha  [OK]" },
  { text: "node.beta   [OK]" },
  { text: "node.gamma  [OK]" },
  { text: "" },
  { text: "ESTABLISHING OMNINODE CONNECTION..." },
  { text: ">> 192.168.UNION.NODE :: PING [OK]" },
  { text: ">> HANDSHAKE COMPLETE" },
  { text: ">> ENCRYPTION: AES-256-GCM" },
  { text: "" },
  { text: "indexing operational datasets" },
  { text: "rebuilding command cache :: 0x7A1F" },
  { text: "latency :: 14ms" },
  { text: "" },
  { text: "> VERIFYING UNION CREDENTIALS..." },
  { text: ">> CLEARANCE LEVEL: AUXILIARY" },
  { text: ">> ACCESS GRANTED" },
  { text: "" },
  { text: "> initializing command interface_" },
  { text: "" },
  { text: "> awaiting user input_" }
];

export function InitScreen() {
  const [stage, setStage] = useState<"init" | "boot" | "complete">("init");
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [typingLine, setTypingLine] = useState<string>("");
  const [noiseChar, setNoiseChar] = useState<string>("");
  const navigate = useNavigate();
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Random noise characters for the typing effect
  const noiseChars = "!@#$%^&*()_+-=[]{}|;:,.<>?~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  const getRandomChar = () => noiseChars[Math.floor(Math.random() * noiseChars.length)];

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setStage("boot");
    }, 2000);

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
        
        // Check if this is part of the ASCII logo (first 5 lines) or version line (line 6)
        const isLogoLine = currentLineIndex < 5 || currentLineIndex === 6;

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
        } else if (isLogoLine) {
          // Logo lines appear instantly
          setBootLines(prev => [...prev, line.text]);
          currentLineIndex++;
          const timeout = setTimeout(processNextLine, 20); // Very brief pause between logo lines
          timeoutsRef.current.push(timeout);
        } else {
          // Regular line - typewriter effect with noise
          let charIndex = 0;
          const targetText = line.text;
          
          // Start with empty line
          setBootLines(prev => [...prev, ""]);
          const lineIndexInArray = currentLineIndex;
          
          const typeNextChar = () => {
            if (charIndex < targetText.length) {
              const currentChar = targetText[charIndex];
              
              // Show noise character briefly
              setNoiseChar(getRandomChar());
              setBootLines(prev => {
                const newLines = [...prev];
                newLines[newLines.length - 1] = targetText.substring(0, charIndex) + getRandomChar();
                return newLines;
              });
              
              // Then show real character after brief delay
              const charTimeout = setTimeout(() => {
                setBootLines(prev => {
                  const newLines = [...prev];
                  newLines[newLines.length - 1] = targetText.substring(0, charIndex + 1);
                  return newLines;
                });
                charIndex++;
                
                // Continue typing
                const nextCharTimeout = setTimeout(typeNextChar, 8); // Fast typing: 8ms per character
                timeoutsRef.current.push(nextCharTimeout);
              }, 3); // Show noise for 3ms
              
              timeoutsRef.current.push(charTimeout);
            } else {
              // Line complete, move to next
              currentLineIndex++;
              const timeout = setTimeout(processNextLine, 50); // Brief pause between lines
              timeoutsRef.current.push(timeout);
            }
          };
          
          typeNextChar();
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
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen p-4 cursor-pointer bg-black relative overflow-hidden"
      onClick={skipToEnd}
      onKeyDown={skipToEnd}
      tabIndex={0}
    >
      {/* CRT effects */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/3 to-transparent pointer-events-none animate-pulse z-10" />
      
      <div className="max-w-5xl mx-auto font-mono relative">
        <div className="space-y-0" style={{ 
          fontFamily: "'JetBrains Mono', 'IBM Plex Mono', 'Consolas', 'Courier New', monospace",
          overflow: 'hidden'
        }}>
          {bootLines.map((line, idx) => {
            const isProgress = line && line.includes('█');
            const isAsciiArt = line && (line.includes('╗') || line.includes('║') || line.includes('╝') || line.includes('╔') || line.includes('╚') || line.includes('═'));
            const isBox = line && (line.includes('╔═══') || line.includes('║  ') || line.includes('╚═══'));
            const isCapitalHeader = line && line === line.toUpperCase() && line.length > 20 && !line.includes('>>') && !line.includes('[');
            const isLastLine = idx === bootLines.length - 1 && stage === "complete";
            
            return (
              <pre 
                key={idx}
                className={`m-0 whitespace-pre ${
                  isAsciiArt ? 'ascii-art' : ''
                } ${
                  isProgress ? 'text-green-400' :
                  isAsciiArt && !isBox ? 'text-green-500' :
                  isBox ? 'text-green-500 text-center' :
                  isCapitalHeader ? 'text-green-500' :
                  'text-green-600/80'
                } ${isLastLine ? 'blinking-cursor' : ''}`}
                style={isAsciiArt ? {} : { 
                  letterSpacing: '0',
                  lineHeight: '1.1'
                }}
              >
                {line || ' '}
              </pre>
            );
          })}
        </div>
      </div>
    </div>
  );
}