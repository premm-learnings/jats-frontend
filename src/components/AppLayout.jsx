import Navbar from "./Navbar";

/*
  AppLayout:
  ----------
  Wraps all authenticated pages.
  Navbar stays fixed.
*/
export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {children}
      </main>
      
    </div>
  );
}