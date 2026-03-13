import { useState, useRef, useEffect } from "react";
import { Lock, AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const CORRECT_PIN = "3825";

interface PinLockProps {
  onUnlock: () => void;
}

export function PinLock({ onUnlock }: PinLockProps) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    // Focus first input on mount
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;
    
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    
    // Clear error state when typing
    setError(false);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Check if all 4 digits are entered (on the last box)
    if (index === 3 && value) {
      const enteredPin = newPin.join("");
      
      // CRITICAL: Blur the focused input immediately to prevent focus styles from overriding error styles
      inputRefs[3].current?.blur();
      
      if (enteredPin === CORRECT_PIN) {
        // Correct PIN - brief delay for effect
        setTimeout(() => {
          onUnlock();
        }, 200);
      } else {
        // Wrong PIN - set error state immediately
        setError(true);
        setAttempts(prev => prev + 1);
        // Then clear after delay
        setTimeout(() => {
          setPin(["", "", "", ""]);
          setError(false);
          inputRefs[0].current?.focus();
        }, 1000);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d{4}$/.test(pastedData)) {
      const newPin = pastedData.split("");
      setPin(newPin);
      setError(false);
      
      // Blur to prevent focus styles
      inputRefs[3].current?.blur();
      
      // Check immediately
      if (pastedData === CORRECT_PIN) {
        setTimeout(() => {
          onUnlock();
        }, 200);
      } else {
        setError(true);
        setAttempts(prev => prev + 1);
        setTimeout(() => {
          setPin(["", "", "", ""]);
          setError(false);
          inputRefs[0].current?.focus();
        }, 1000);
      }
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 sm:p-8 font-mono relative overflow-hidden">
      {/* CRT Screen effects */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none z-10" />
      
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 z-30 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 border-2 border-green-500/30 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/50 text-green-500 transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
        <span className="text-xs sm:text-sm tracking-wider">RETURN</span>
      </button>
      
      <div className="relative z-20 w-full max-w-md">
        {/* ASCII Art Lock - Simplified to avoid encoding issues */}
        <div className="hidden sm:block text-center mb-8 text-green-500/30 text-xs leading-tight">
          <pre>{`
    +----------------------+
    |   +-------------+    |
    |   | ########### |    |
    |   | #         # |    |
    |   | #         # |    |
    |   | ########### |    |
    |       #######         |
    |       #######         |
    +----------------------+
          `}</pre>
        </div>

        {/* Header */}
        <div className="border-2 border-yellow-500/40 bg-yellow-500/5 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]" />
            <h1 className="text-xl sm:text-2xl font-bold text-yellow-500 tracking-wider drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]">
              RESTRICTED ACCESS
            </h1>
          </div>
          <div className="text-center text-xs text-yellow-600/70 tracking-wider">
            // ADMINISTRATOR CLEARANCE REQUIRED
          </div>
        </div>

        {/* PIN Entry */}
        <div className="border-2 border-green-500/30 bg-green-500/5 p-4 sm:p-8">
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-green-500 text-sm mb-2 tracking-wider">
              &gt; ENTER AUTHORIZATION CODE
            </div>
            <div className="text-xs text-green-600/50">
              // 4-DIGIT PIN REQUIRED
            </div>
          </div>

          {/* PIN Input Boxes */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            {pin.map((digit, index) => (
              <div key={index} className="relative">
                <input
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-16 sm:w-16 sm:h-20 text-center text-2xl sm:text-3xl font-bold bg-black border-2 text-transparent focus:outline-none transition-all caret-green-400 ${
                    error 
                      ? 'border-red-500' 
                      : 'border-green-500/50 focus:border-green-400 focus:shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                  }`}
                  style={{
                    caretColor: error ? '#ef4444' : '#4ade80',
                  }}
                />
                {/* Display bullet overlay */}
                {digit && (
                  <div 
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none text-2xl sm:text-3xl font-bold ${
                      error ? 'text-red-500' : 'text-green-400'
                    } ${!error ? 'drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]' : ''}`}
                    style={{
                      textShadow: !error ? '0 0 10px rgba(34, 197, 94, 0.8)' : 'none',
                    }}
                  >
                    ●
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Fixed height container for messages - prevents layout shift */}
          <div className="h-10 flex items-center justify-center">
            {/* Error Message */}
            {error && (
              <div className="flex items-center justify-center gap-2 text-red-500 text-xs sm:text-sm animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                <span>ACCESS DENIED // INVALID CODE</span>
              </div>
            )}

            {/* Attempt Counter */}
            {attempts > 0 && !error && (
              <div className="text-center text-xs text-green-600/50">
                Failed attempts: {attempts}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-green-500/20">
            <div className="text-xs text-green-600/50 text-center space-y-1">
              <div>&gt; Type or paste your 4-digit authorization code</div>
              <div className="hidden sm:block">&gt; Contact system administrator for access</div>
            </div>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="mt-4 sm:mt-6 text-center text-xs text-green-700/50">
          <div>V.A.N.G.U.A.R.D. SECURITY PROTOCOL v2.4.1</div>
          <div className="mt-1 hidden sm:block">// UNAUTHORIZED ACCESS IS PROHIBITED</div>
        </div>
      </div>
    </div>
  );
}
