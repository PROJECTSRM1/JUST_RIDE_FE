import { Car, Calendar, Plane, Package, Map, Heart, LayoutDashboard, Bell, LogOut, User, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

interface SidebarProps {
  activeService: string | null;
  onServiceSelect: (service: string | null) => void;
  onBackToLanding: () => void;
}

export default function Sidebar({ activeService, onServiceSelect, onBackToLanding }: SidebarProps) {
  const { notifications } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const services = [
    { id: 'dashboard', name: 'My Dashboard', icon: LayoutDashboard, color: 'text-blue-600' },
    { id: 'self-drive', name: 'Self-Drive Rentals', icon: Car, color: 'text-cyan-600' },
    { id: 'tours', name: 'Tour & Travels', icon: Calendar, color: 'text-purple-600' },
    { id: 'tickets', name: 'Ticket Booking', icon: Plane, color: 'text-orange-600' },
    { id: 'movers', name: 'Packers & Movers', icon: Package, color: 'text-green-600' },
    { id: 'planner', name: 'Tourist Planner', icon: Map, color: 'text-pink-600' },
    { id: 'wedding', name: 'Wedding Cars', icon: Heart, color: 'text-amber-600' },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 fixed left-0 top-0 flex flex-col shadow-2xl">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
            <Car className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold">JustRide</span>
        </div>
        <p className="text-xs text-gray-400">Your Travel Partner</p>
      </div>

      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Welcome</p>
            <p className="text-xs text-gray-300">Valued Customer</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
        {services.map((service) => {
          const Icon = service.icon;
          const isActive = activeService === service.id;
          return (
            <button
              key={service.id}
              onClick={() => onServiceSelect(service.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : service.color}`} />
                <span className="font-medium text-sm">{service.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700 space-y-3">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-colors"
          >
            <div className="relative">
              <Bell className="w-5 h-5 text-amber-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <span className="font-medium text-sm">Notifications</span>
          </button>

          {showNotifications && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">
                  No notifications yet
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors ${
                      !notif.read ? 'bg-gray-700/30' : ''
                    }`}
                  >
                    <p className="font-semibold text-sm text-white">{notif.title}</p>
                    <p className="text-xs text-gray-300 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(notif.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <button
          onClick={onBackToLanding}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 transition-colors font-medium text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
}
