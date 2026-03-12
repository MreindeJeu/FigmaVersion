import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Toaster } from "sonner";

export default function Root() {
  return (
    <div className="flex min-h-screen bg-black relative overflow-hidden">
      {/* CRT Screen effects */}
      <div className="fixed inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none z-50" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-green-500/3 to-transparent pointer-events-none animate-pulse z-40" />
      
      <Sidebar />
      <div className="flex-1 ml-72">
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
  );
}