import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ADMIN CONTEXT - DIEGETIC AUTHENTICATION SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Manages [COMMAND] level clearance authentication for the V.A.N.G.U.A.R.D. system.
 * 
 * AUTHENTICATION FLOW:
 * --------------------
 * 1. Users start with [AUXILIARY] clearance (read-only access)
 * 2. Entering the correct 4-digit code elevates to [COMMAND] clearance
 * 3. [COMMAND] clearance grants access to:
 *    - Admin Panel (/admin route)
 *    - Content creation/editing (pilots, deployments, glossary)
 *    - Classified glossary entries
 *    - Visual indicators (yellow VANGUARD logo, COMMAND badge)
 * 
 * CURRENT ADMIN CODE: 3825
 * 
 * PERSISTENCE:
 * ------------
 * - Auth state stored in localStorage as 'vanguard_admin_auth'
 * - Persists across page reloads and browser sessions
 * - Cleared on logout or manual localStorage clear
 * 
 * SECURITY NOTE:
 * --------------
 * This is a DIEGETIC in-universe authentication for a TTRPG dashboard.
 * NOT intended for production security or protecting sensitive data.
 * The code is client-side only and easily discoverable.
 * Perfect for game immersion, not for real security.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface AdminContextType {
  isAdmin: boolean;
  login: (code: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_CODE = "3825"; // 4-digit authorization code

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const savedAdminStatus = localStorage.getItem("vanguard_admin_auth");
    if (savedAdminStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  const login = (code: string): boolean => {
    if (code === ADMIN_CODE) {
      setIsAdmin(true);
      localStorage.setItem("vanguard_admin_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("vanguard_admin_auth");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}