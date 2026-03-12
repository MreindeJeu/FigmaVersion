import { NavLink, useLocation } from "react-router";
import { LayoutDashboard, Users, Target, MapPin, Settings, Book } from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "OVERVIEW", icon: LayoutDashboard, prefix: "01" },
  { path: "/pilots", label: "PILOTS", icon: Users, prefix: "02" },
  { path: "/deployments", label: "DEPLOYMENTS", icon: Target, prefix: "03" },
  { path: "/locations", label: "THEATERS", icon: MapPin, prefix: "04" },
  { path: "/glossary", label: "GLOSSARY", icon: Book, prefix: "05" },
  { path: "/admin", label: "ADMIN", icon: Settings, prefix: "06" },
];

// Simple VANGUARD Logo SVG
function VanguardLogo() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Hexagon */}
      <path 
        d="M40 5 L65 20 L65 50 L40 65 L15 50 L15 20 Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
        className="text-green-500"
      />
      
      {/* Inner Hexagon */}
      <path 
        d="M40 15 L57 25 L57 45 L40 55 L23 45 L23 25 Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        fill="none"
        className="text-green-500/50"
      />
      
      {/* V Shape */}
      <path 
        d="M30 25 L40 45 L50 25" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-green-500"
      />
      
      {/* Crosshair/Target lines */}
      <line x1="40" y1="5" x2="40" y2="15" stroke="currentColor" strokeWidth="1" className="text-green-500/50" />
      <line x1="40" y1="55" x2="40" y2="65" stroke="currentColor" strokeWidth="1" className="text-green-500/50" />
      <line x1="15" y1="20" x2="23" y2="25" stroke="currentColor" strokeWidth="1" className="text-green-500/50" />
      <line x1="65" y1="20" x2="57" y2="25" stroke="currentColor" strokeWidth="1" className="text-green-500/50" />
      
      {/* Corner accents */}
      <circle cx="40" cy="35" r="2" fill="currentColor" className="text-green-500" />
    </svg>
  );
}

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-72 h-screen bg-black border-r-2 border-green-500/30 flex flex-col fixed left-0 top-0 font-mono relative overflow-hidden">
      {/* CRT effect */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none z-10" />
      
      {/* Logo/Header */}
      <div className="p-6 border-b-2 border-green-500/30 relative">
        <div className="mb-3 flex flex-col items-center">
          <div className="text-sm text-green-500/60 mb-3 text-center">// UNION NETWORK TERMINAL</div>
          
          {/* Logo */}
          <div className="mb-3 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
            <VanguardLogo />
          </div>
          
          {/* V.A.N.G.U.A.R.D. Title */}
          <div className="text-xl font-bold tracking-widest text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] mb-2">
            V.A.N.G.U.A.R.D.
          </div>
          
          <div className="text-[9px] text-green-600/70 leading-tight tracking-wide text-center">
            Volitional Asset Network for<br />
            Guided Union Auxiliary<br />
            Reserve Deployment
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-green-500/60">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          <span>UPLINK: ACTIVE</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <div className="text-[10px] text-green-600/50 mb-3 tracking-wider">// NAVIGATION</div>
        {navItems.map(({ path, label, icon: Icon, prefix }) => {
          const isActive = location.pathname === path;
          
          return (
            <NavLink
              key={path}
              to={path}
              className={`
                group flex items-center gap-3 px-3 py-3 transition-all relative
                ${isActive 
                  ? 'bg-green-500/10 text-green-400 border-l-2 border-green-500' 
                  : 'text-green-600/70 hover:text-green-500 hover:bg-green-500/5 border-l-2 border-transparent'
                }
              `}
            >
              <span className="text-xs text-green-700/50 w-6">{prefix}</span>
              <Icon className={`w-4 h-4 ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]' : ''}`} />
              <span className={`text-sm tracking-wider flex-1 ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]' : ''}`}>
                {label}
              </span>
              {isActive && (
                <span className="text-green-500 animate-pulse">▶</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Status */}
      <div className="p-4 border-t-2 border-green-500/30 space-y-3">
        <div className="text-[10px] text-green-600/50 tracking-wider">// SYSTEM STATUS</div>
        <div className="space-y-2 text-[10px]">
          <div className="flex items-center justify-between">
            <span className="text-green-700/70">OMNINODE</span>
            <span className="text-green-500 font-bold">[CONNECTED]</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-700/70">CLEARANCE</span>
            <span className="text-green-500 font-bold">[AUXILIARY]</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-700/70">ENCRYPTION</span>
            <span className="text-green-500 font-bold">[AES-256]</span>
          </div>
        </div>
        <div className="pt-2 border-t border-green-500/20 text-[9px] text-green-700/50 font-mono">
          SESSION: {new Date().toISOString().slice(0, 10)}
        </div>
      </div>
    </div>
  );
}