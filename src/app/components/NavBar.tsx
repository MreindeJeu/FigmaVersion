import { Link, useLocation } from "react-router";
import { Home, Users, MapPin, FileText, Shield } from "lucide-react";

export function NavBar() {
  const location = useLocation();
  
  const navItems = [
    { path: "/dashboard", label: "DASHBOARD", icon: Home },
    { path: "/pilots", label: "PILOTS", icon: Users },
    { path: "/deployments", label: "DEPLOYMENTS", icon: FileText },
    { path: "/locations", label: "THEATERS", icon: MapPin },
    { path: "/admin", label: "ADMIN", icon: Shield },
  ];

  return (
    <nav className="border-b border-green-900/30 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 hover:text-green-300 transition-colors">
            <div className="w-8 h-8 border-2 border-green-500 flex items-center justify-center">
              <span className="text-xs font-bold">V</span>
            </div>
            <div>
              <div className="text-lg font-bold tracking-wider">V.A.N.G.U.A.R.D.</div>
              <div className="text-[10px] text-green-600 -mt-1">UNION AUXILIARY NETWORK</div>
            </div>
          </Link>
          
          <div className="flex gap-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  location.pathname === path
                    ? "text-green-400 border-b-2 border-green-400"
                    : "text-green-600 hover:text-green-400"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
