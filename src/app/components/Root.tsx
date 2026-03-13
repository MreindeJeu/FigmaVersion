import { Outlet, useLocation } from "react-router";
import { Sidebar } from "./Sidebar";
import { Toaster } from "sonner";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { DataProvider } from "../context/DataContext";
import { AdminProvider } from "../context/AdminContext";

export default function Root() {
  const location = useLocation();
  const showSidebar = location.pathname !== '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AdminProvider>
      <DataProvider>
        <div className="flex min-h-screen bg-black relative overflow-hidden">
          {/* CRT Screen effects */}
          <div className="fixed inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none z-50" />
          <div className="fixed inset-0 bg-gradient-to-b from-transparent via-green-500/3 to-transparent pointer-events-none animate-pulse z-40" />
          
          {/* Mobile Menu Button */}
          {showSidebar && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden fixed top-4 left-4 z-[100] p-3 border-2 border-green-500/50 bg-black/90 text-green-500 hover:bg-green-500/10 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}

          {/* Sidebar - Desktop always visible, Mobile overlay */}
          {showSidebar && (
            <>
              {/* Mobile Overlay */}
              {mobileMenuOpen && (
                <div
                  className="lg:hidden fixed inset-0 bg-black/80 z-[60]"
                  onClick={() => setMobileMenuOpen(false)}
                />
              )}
              
              {/* Sidebar */}
              <div className={`
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
                transition-transform duration-300 ease-in-out
                fixed lg:fixed lg:top-0 lg:left-0 lg:bottom-0
                z-[70]
                h-screen
              `}>
                <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
              </div>
            </>
          )}
          
          <div className={showSidebar ? "flex-1 lg:ml-72" : "flex-1"}>
            <Outlet />
          </div>
          <Toaster 
            position="top-right" 
            theme="dark"
            toastOptions={{
              style: {
                background: '#000',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                color: '#22c55e',
                fontFamily: 'monospace',
              },
            }}
          />
        </div>
      </DataProvider>
    </AdminProvider>
  );
}