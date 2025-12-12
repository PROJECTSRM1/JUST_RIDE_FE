import { useState } from 'react';
import SidebarNew from './SidebarNew';
import MyDashboard from './MyDashboard';
import SelfDriveSection from './services/SelfDriveSection';
import ToursSection from './services/ToursSection';
import TicketsSection from './services/TicketsSection';
import OtherServices from './services/OtherServices';
import MoversSection from './services/MoversSection';
import PlannerSection from './services/PlannerSection';
import WeddingSection from './services/WeddingSection';
import { useApp } from '../context/AppContext';

interface DashboardProps {
  onBackToLanding: () => void;
}

export default function Dashboard({ onBackToLanding }: DashboardProps) {
  const [activeService, setActiveService] = useState<string | null>('dashboard');
  const { sidebarOpen } = useApp();

  const handleLogout = () => {
    onBackToLanding();
  };

  return (
    <div className={`transition-all duration-300 ${sidebarOpen ? "pr-6" : "pr-2"}`}>
      <SidebarNew
        activeService={activeService}
        onServiceSelect={setActiveService}
        onLogout={handleLogout}
      />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
        <div className="p-8">
          {activeService === 'dashboard' && <MyDashboard />}
          {activeService === 'self-drive' && <SelfDriveSection />}
          {activeService === 'tours' && <ToursSection />}
          {activeService === 'tickets' && <TicketsSection />}
          {activeService === 'movers' && <MoversSection/>}
          {activeService === 'planner' && <PlannerSection />}
          {activeService === 'wedding' && <WeddingSection />}
        </div>
      </main>
    </div>
  );
}
