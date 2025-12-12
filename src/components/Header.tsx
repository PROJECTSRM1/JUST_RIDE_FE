// import React from "react";
import { Car } from "lucide-react";

interface HeaderProps {
  onLogin: () => void;
  onRegister: () => void;

  onHome?: () => void;
  onSelfDrive?: () => void;
  onTickets?: () => void;
  onPackers?: () => void;
  onTourist?: () => void;
  onTempo?: () => void;
}

export default function Header({
  onLogin,
  onRegister,
  onHome,
  onSelfDrive,
  onTickets,
  onPackers,
  onTourist,
  onTempo,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO → GO HOME */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onHome}>
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-xl">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              JustRide
            </span>
            <div className="text-xs text-gray-500">All travel services, one platform</div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6 text-sm">

          <button onClick={onHome} className="hover:text-blue-600">
            Home
          </button>

          <button onClick={onSelfDrive} className="hover:text-blue-600">
            Self-Drive Rentals
          </button>

          <button onClick={onTickets} className="hover:text-blue-600">
            Ticket Booking
          </button>

          <button onClick={onPackers} className="hover:text-blue-600">
            Packers & Movers
          </button>

          <button onClick={onTourist} className="hover:text-blue-600">
            Tourist Planner
          </button>

          <button onClick={onTempo} className="hover:text-blue-600">
            Tempo Travels
          </button>
        </nav>

        {/* AUTH BUTTONS */}
        <div className="flex items-center gap-3">
          <button
            onClick={onLogin}
            className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
          >
            Login
          </button>
          <button
            onClick={onRegister}
            className="px-4 py-2 text-sm rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-[1.02] transition-transform"
          >
            Register
          </button>
        </div>

      </div>
    </header>
  );
}
