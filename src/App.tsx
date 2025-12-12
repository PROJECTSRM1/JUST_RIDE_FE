import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Landing from './components/Landing';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function AppContent() {
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const { logout } = useApp();

  return (
    <div className="min-h-screen">
      {view === 'landing' ? (
        <Landing onEnterDashboard={() => setView('auth')} />
      ) : view === 'auth' ? (
        <Auth onAuthSuccess={() => setView('dashboard')} />
      ) : (
        <Dashboard onBackToLanding={() => {
          logout();
          setView('landing');
        }} />
      )}
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
