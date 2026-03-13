import { ReactNode } from "react";
import { useAdmin } from "../context/AdminContext";
import { ShieldAlert, Lock } from "lucide-react";

interface ClassifiedGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClassifiedGuard({ children, fallback }: ClassifiedGuardProps) {
  const { isAdmin } = useAdmin();

  if (isAdmin) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="min-h-screen bg-black p-8 font-mono flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* CRT Effects */}
        <div className="fixed inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none z-50" />
        
        {/* Access Denied Message */}
        <div className="border-4 border-red-500/50 bg-black/90 p-8 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse relative">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            {/* Warning Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <ShieldAlert className="w-24 h-24 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                <Lock className="w-10 h-10 text-red-500 absolute bottom-0 right-0 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
              </div>
            </div>

            {/* Main Message */}
            <div className="text-center space-y-4">
              <div className="text-3xl font-bold text-red-500 tracking-widest drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">
                ACCESS DENIED
              </div>
              
              <div className="border-t-2 border-b-2 border-red-500/30 py-4 space-y-2">
                <div className="text-sm text-red-400/80">
                  // AUTHORIZATION LEVEL: <span className="text-green-500">[AUXILIARY]</span>
                </div>
                <div className="text-sm text-red-400/80">
                  // REQUIRED LEVEL: <span className="text-yellow-500">[COMMAND]</span> OR HIGHER
                </div>
              </div>

              <div className="text-xs text-red-500/60 leading-relaxed">
                The requested resource is classified under Union Administrative<br />
                Protocol Section 7.4.2 and requires elevated clearance credentials.<br />
                Unauthorized access attempts are logged and monitored.
              </div>

              <div className="pt-4 text-[10px] text-red-700/50 font-mono">
                ERROR CODE: 0x4C43_CLEARANCE_INSUFFICIENT<br />
                TIMESTAMP: {new Date().toISOString()}<br />
                OMNINODE_ID: VNG-{Math.random().toString(36).substring(2, 9).toUpperCase()}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-red-500/30 pt-4">
              <div className="text-center text-[10px] text-red-600/50 tracking-wider">
                [ UNION ADMINISTRATIVE NETWORK - SECURITY PROTOCOL ACTIVE ]
              </div>
            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="mt-6 text-center text-xs text-green-700/50">
          // Access the authorization terminal in the sidebar to elevate clearance
        </div>
      </div>
    </div>
  );
}
