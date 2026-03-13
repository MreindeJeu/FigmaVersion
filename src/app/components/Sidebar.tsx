import { NavLink, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, Users, Target, MapPin, Book, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { toast } from "sonner";

const navItems = [
  { path: "/dashboard", label: "OVERVIEW", icon: LayoutDashboard, prefix: "01" },
  { path: "/pilots", label: "PILOTS", icon: Users, prefix: "02" },
  { path: "/deployments", label: "DEPLOYMENTS", icon: Target, prefix: "03" },
  { path: "/locations", label: "THEATERS", icon: MapPin, prefix: "04" },
  { path: "/glossary", label: "GLOSSARY", icon: Book, prefix: "05" },
];

// Simple VANGUARD Logo SVG
function VanguardLogo({ isAdmin }: { isAdmin?: boolean }) {
  const colorClass = isAdmin ? "text-yellow-500" : "text-green-500";
  const colorClassSecondary = isAdmin ? "text-yellow-500/50" : "text-green-500/50";
  
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Hexagon */}
      <path 
        d="M40 5 L65 20 L65 50 L40 65 L15 50 L15 20 Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
        className={colorClass}
      />
      
      {/* Inner Hexagon */}
      <path 
        d="M40 15 L57 25 L57 45 L40 55 L23 45 L23 25 Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        fill="none"
        className={colorClassSecondary}
      />
      
      {/* V Shape */}
      <path 
        d="M30 25 L40 45 L50 25" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={colorClass}
      />
      
      {/* Crosshair/Target lines */}
      <line x1="40" y1="5" x2="40" y2="15" stroke="currentColor" strokeWidth="1" className={colorClassSecondary} />
      <line x1="40" y1="55" x2="40" y2="65" stroke="currentColor" strokeWidth="1" className={colorClassSecondary} />
      <line x1="15" y1="20" x2="23" y2="25" stroke="currentColor" strokeWidth="1" className={colorClassSecondary} />
      <line x1="65" y1="20" x2="57" y2="25" stroke="currentColor" strokeWidth="1" className={colorClassSecondary} />
      
      {/* Corner accents */}
      <circle cx="40" cy="35" r="2" fill="currentColor" className={colorClass} />
    </svg>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const { isAdmin, login, logout } = useAdmin();
  const [adminCode, setAdminCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(adminCode);
    if (success) {
      toast.success(">> CLEARANCE ELEVATED TO [COMMAND]");
      setAdminCode("");
      setCodeError(false);
    } else {
      setCodeError(true);
      toast.error(">> ACCESS DENIED: INVALID AUTHORIZATION CODE");
      setTimeout(() => setCodeError(false), 2000);
    }
  };

  const handleAdminLogout = () => {
    logout();
    toast(">> CLEARANCE REVERTED TO [AUXILIARY]");
    if (location.pathname === "/admin") {
      navigate("/dashboard");
    }
  };

  const handleLogoClick = () => {
    if (isAdmin) {
      navigate("/admin");
      onNavigate?.();
    } else {
      toast.error(">> ACCESS DENIED: ELEVATED CLEARANCE REQUIRED");
    }
  };

  return (
    <div className={`${isExpanded ? 'w-72' : 'w-20'} h-full bg-black border-r-2 border-green-500/30 flex flex-col font-mono relative overflow-hidden transition-all duration-300`}>
      {/* CRT effect */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none z-10" />
      
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-4 -right-3 z-20 w-6 h-6 border-2 border-green-500/50 bg-black hover:bg-green-500/10 text-green-500 flex items-center justify-center transition-all hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] group"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
        ) : (
          <ChevronRight className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
        )}
      </button>
      
      {/* Logo/Header */}
      <div className={`p-6 border-b-2 border-green-500/30 relative ${isExpanded ? '' : 'px-3'}`}>
        <button 
          onClick={handleLogoClick}
          className={`w-full mb-3 flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity group ${isExpanded ? '' : 'px-0'}`}
          aria-label="Access Admin Panel"
        >
          {isExpanded ? (
            <>
              <div className="text-sm text-green-500/60 mb-3 text-center group-hover:text-green-400 transition-colors">// UNION NETWORK TERMINAL</div>
              
              {/* Logo */}
              <div className={`mb-3 transition-all ${
                isAdmin 
                  ? 'drop-shadow-[0_0_15px_rgba(234,179,8,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(234,179,8,0.8)]'
                  : 'drop-shadow-[0_0_15px_rgba(34,197,94,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(34,197,94,0.8)]'
              }`}>
                <VanguardLogo isAdmin={isAdmin} />
              </div>
              
              {/* V.A.N.G.U.A.R.D. Title */}
              <div className={`text-xl font-bold tracking-widest mb-2 transition-all ${
                isAdmin
                  ? 'text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(234,179,8,0.8)]'
                  : 'text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]'
              }`}>
                V.A.N.G.U.A.R.D.
              </div>
              
              <div className="text-[9px] text-green-600/70 leading-tight tracking-wide text-center group-hover:text-green-500/80 transition-colors">
                Volitional Asset Network for<br />
                Guided Union Auxiliary<br />
                Reserve Deployment
              </div>
            </>
          ) : (
            <div className={`transition-all scale-50 ${
              isAdmin
                ? 'drop-shadow-[0_0_15px_rgba(234,179,8,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(234,179,8,0.8)]'
                : 'drop-shadow-[0_0_15px_rgba(34,197,94,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(34,197,94,0.8)]'
            }`}>
              <VanguardLogo isAdmin={isAdmin} />
            </div>
          )}
        </button>
        {isExpanded && (
          <div className="flex items-center gap-2 text-[10px] text-green-500/60">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span>UPLINK: ACTIVE</span>
          </div>
        )}
        {!isExpanded && (
          <div className="flex justify-center mt-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {isExpanded && <div className="text-[10px] text-green-600/50 mb-3 tracking-wider">// NAVIGATION</div>}
        {navItems.map(({ path, label, icon: Icon, prefix }) => {
          const isActive = location.pathname === path;
          
          return (
            <NavLink
              key={path}
              to={path}
              onClick={() => onNavigate?.()}
              className={`
                group flex items-center gap-3 py-3 transition-all relative
                ${isExpanded ? 'px-3' : 'px-2 justify-center'}
                ${isActive 
                  ? 'bg-green-500/10 text-green-400 border-l-2 border-green-500' 
                  : 'text-green-600/70 hover:text-green-500 hover:bg-green-500/5 border-l-2 border-transparent'
                }
              `}
              title={!isExpanded ? label : undefined}
            >
              {isExpanded && <span className="text-xs text-green-700/50 w-6">{prefix}</span>}
              <Icon className={`w-4 h-4 ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]' : ''} ${!isExpanded ? 'mx-auto' : ''}`} />
              {isExpanded && (
                <>
                  <span className={`text-sm tracking-wider flex-1 ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]' : ''}`}>
                    {label}
                  </span>
                  {isActive && (
                    <span className="text-green-500 animate-pulse">▶</span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Status */}
      <div className={`p-4 border-t-2 border-green-500/30 space-y-3 ${isExpanded ? '' : 'px-2'}`}>
        {isExpanded ? (
          <>
            {/* Admin Code Input or Logout Button */}
            {!isAdmin ? (
              <form onSubmit={handleAdminLogin} className="mb-3 pb-3 border-b border-green-500/20">
                <div className="text-[9px] text-green-600/50 tracking-wider mb-2">// AUTHORIZATION</div>
                <input
                  type="password"
                  maxLength={4}
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="CODE"
                  className={`w-full bg-black border-2 ${codeError ? 'border-red-500/50' : 'border-green-500/30'} text-green-500 font-mono text-xs px-2 py-1 tracking-widest placeholder:text-green-700/30 focus:outline-none focus:border-green-500/60 transition-colors`}
                />
              </form>
            ) : (
              <button
                onClick={handleAdminLogout}
                className="mb-3 pb-3 border-b border-green-500/20 w-full text-left group"
              >
                <div className="text-[9px] text-green-600/50 tracking-wider mb-2">// AUTHORIZATION</div>
                <div className="flex items-center gap-2 bg-green-500/10 border-2 border-green-500/30 px-2 py-1 hover:bg-green-500/20 hover:border-green-500/50 transition-all">
                  <LogOut className="w-3 h-3 text-red-500" />
                  <span className="text-xs text-red-500 font-bold tracking-wider">ADMIN LOGOUT</span>
                </div>
              </button>
            )}
            
            <div className="text-[10px] text-green-600/50 tracking-wider">// SYSTEM STATUS</div>
            <div className="space-y-2 text-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-green-700/70">OMNINODE</span>
                <span className="text-green-500 font-bold">[CONNECTED]</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-700/70">CLEARANCE</span>
                <span className={`font-bold ${isAdmin ? 'text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'text-green-500'}`}>
                  [{isAdmin ? 'COMMAND' : 'AUXILIARY'}]
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-700/70">ENCRYPTION</span>
                <span className="text-green-500 font-bold">[AES-256]</span>
              </div>
            </div>
            <div className="pt-2 border-t border-green-500/20 text-[9px] text-green-700/50 font-mono">
              SESSION: {new Date().toISOString().slice(0, 10)}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" title="System Online" />
            <div className={`w-2 h-2 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.6)] ${isAdmin ? 'bg-yellow-500' : 'bg-green-500'}`} title={isAdmin ? "Command Clearance" : "Auxiliary Clearance"} />
          </div>
        )}
      </div>
    </div>
  );
}