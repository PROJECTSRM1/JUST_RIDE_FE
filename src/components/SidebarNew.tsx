import {
  Car,
  LayoutDashboard,
  Calendar,
  Plane,
  Package,
  Map,
  Heart,
  Bell,
  LogOut,
  User,
  ChevronRight,
  Menu,
  X,
  Phone,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { useState } from "react";
import { useApp } from "../context/AppContext";

interface SidebarProps {
  activeService: string | null;
  onServiceSelect: (service: string | null) => void;
  onLogout: () => void;
}

export default function SidebarNew({
  activeService,
  onServiceSelect,
  onLogout,
}: SidebarProps) {
  const {
    notifications,
    user,
    sidebarOpen,
    setSidebarOpen,
    markNotificationAsRead,
    bookings,
    completeBooking,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAgentContact, setShowAgentContact] = useState<string | null>(null);
  const [contactStep, setContactStep] = useState<"contact" | "confirm">(
    "contact"
  );

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingBookings = bookings.filter((b) => b.status === "confirmed");

  const services = [
    { id: "dashboard", name: "My Dashboard", icon: LayoutDashboard, color: "from-blue-500 to-cyan-500" },
    { id: "self-drive", name: "Self-Drive Rentals", icon: Car, color: "from-blue-500 to-cyan-500" },
    { id: "tours", name: "Tour & Travels", icon: Calendar, color: "from-blue-500 to-cyan-500" },
    { id: "tickets", name: "Ticket Booking", icon: Plane, color: "from-blue-500 to-cyan-500" },
    { id: "movers", name: "Packers & Movers", icon: Package, color: "from-blue-500 to-cyan-500" },
    { id: "planner", name: "Tourist Planner", icon: Map, color: "from-blue-500 to-cyan-500" },
    { id: "wedding", name: "Wedding Cars", icon: Heart, color: "from-blue-500 to-cyan-500" },
  ];

  return (
    <>
      {/* MAIN SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 z-[1000] h-full transition-all duration-300
        ${sidebarOpen ? "w-72" : "w-0"}`}
      >
        <div className="h-full bg-white border-r border-gray-200 shadow-xl rounded-r-2xl flex flex-col overflow-hidden">

          {/* BRAND */}
          <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-cyan-50 rounded-br-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl shadow-md">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">JustRide</p>
                  <p className="text-xs text-gray-500">Travel Partner</p>
                </div>
              </div>

              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* USER BLOCK */}
          <div className="p-4 border-b bg-gray-50 rounded-br-3xl">
            <div className="flex items-center space-x-3 p-3 bg-white border rounded-xl shadow-sm">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  {user?.name || "Traveler"}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-2">
            {services.map((service) => {
              const Icon = service.icon;
              const active = activeService === service.id;

              return (
                <button
                  key={service.id}
                  onClick={() => {
                    onServiceSelect(service.id);
                    setShowNotifications(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all
                  ${
                    active
                      ? `bg-gradient-to-r ${service.color} text-white shadow-md border-transparent`
                      : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        active ? "bg-white/20" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">{service.name}</span>
                  </div>

                  {active && <ChevronRight className="w-4 h-4" />}
                </button>
              );
            })}
          </nav>

          {/* FOOTER BLOCK */}
          <div className="p-4 border-t bg-gray-50 rounded-tr-3xl space-y-4">

            {/* Notifications */}
            {/* <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
              >
                <div className="relative">
                  <Bell className="w-5 h-5 text-amber-500" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>

                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-800">Notifications</p>
                  <p className="text-xs text-gray-500">{notifications.length} total</p>
                </div>
              </button>

              {showNotifications && (
                <div className="absolute bottom-full left-0 right-0 mb-3 bg-white shadow-xl border border-gray-200 rounded-xl max-h-80 overflow-y-auto z-50">
                  {notifications.length === 0 ? (
                    <p className="text-center p-4 text-gray-500 text-sm">
                      No notifications yet
                    </p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                          !notif.read ? "bg-blue-50/50" : ""
                        }`}
                        onClick={() => markNotificationAsRead(notif.id)}
                      >
                        <div className="flex space-x-2">
                          {notif.type === "booking" && (
                            <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                          )}
                          {notif.type === "completion" && (
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          )}

                          <div>
                            <p className="font-semibold text-gray-900 text-sm">
                              {notif.title}
                            </p>
                            <p className="text-xs text-gray-600">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notif.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div> */}

            {/* Logout */}
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 border border-red-300 text-red-600 hover:bg-red-100 hover:border-red-400 transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* BACKDROP */}
      

      {/* MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(true)}
        className={`fixed top-4 left-4 z-[1200] p-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition
          ${sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
}
