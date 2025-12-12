import { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";

import Header from "./components/Header";

import Landing from "./components/Landing";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";

import SelfDriveSection from "./components/services/SelfDriveSection";
import TicketsSection from "./components/services/TicketsSection";
import MoversSection from "./components/services/MoversSection";
import ToursSection from "./components/services/ToursSection";

function AppContent() {
  const [view, setView] = useState<
    | "landing"
    | "auth"
    | "dashboard"
    | "selfdrive"
    | "tickets"
    | "packers"
    | "tourist"
    | "tempo"
  >("landing");

  const { logout } = useApp();

  const showHeader = view !== "dashboard" && view !== "auth";

  return (
    <div className="min-h-screen bg-gray-50">

      {showHeader && (
        <Header
          onLogin={() => setView("auth")}
          onRegister={() => setView("auth")}
          onHome={() => setView("landing")}
          onSelfDrive={() => setView("selfdrive")}
          onTickets={() => setView("tickets")}
          onPackers={() => setView("packers")}
          onTourist={() => setView("tourist")}
          onTempo={() => setView("tempo")}
        />
      )}

     
      <div
        className={`${showHeader ? "pt-[88px]" : "pt-0"} max-w-7xl mx-auto px-6 pb-10`}
      >
        {view === "landing" && (
          <Landing
            onEnterDashboard={() => setView("auth")}
            onOpenSelfDrive={() => setView("selfdrive")}
          />
        )}

        {view === "auth" && <Auth onAuthSuccess={() => setView("dashboard")} />}

        {view === "dashboard" && (
          <Dashboard
            onBackToLanding={() => {
              logout();
              setView("landing");
            }}
          />
        )}

        {view === "selfdrive" && <SelfDriveSection />}
        {view === "tickets" && <TicketsSection />}
        {view === "packers" && <MoversSection />}
        {view === "tourist" && <ToursSection />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
