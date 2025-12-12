import { createContext, useContext, useState, ReactNode } from 'react';
import { Booking, Notification } from '../types';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  bookings: Booking[];
  notifications: Notification[];
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  login: (email: string, password: string, name: string) => void;
  register: (name: string, email: string, phone: string, password: string) => void;
  logout: () => void;
  addBooking: (booking: Booking) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markNotificationAsRead: (id: string) => void;
  cancelBooking: (bookingId: string) => void;
  completeBooking: (bookingId: string) => void;
  getBookingsByService: (serviceType: string) => Booking[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const login = (email: string, password: string, name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone: ''
    };
    setUser(newUser);
    addNotification({
      type: 'confirmation',
      title: 'Welcome!',
      message: `Welcome back, ${name}! Ready to book your next adventure?`,
      timestamp: new Date(),
      read: false
    });
  };

  const register = (name: string, email: string, phone: string, password: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone
    };
    setUser(newUser);
    addNotification({
      type: 'confirmation',
      title: 'Account Created!',
      message: `Welcome to JustRide, ${name}! Your account is ready to use.`,
      timestamp: new Date(),
      read: false
    });
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
    setNotifications([]);
  };

  const addBooking = (booking: Booking) => {
    setBookings([...bookings, booking]);
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
    };
    setNotifications([newNotification, ...notifications]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(
      bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      )
    );
  };

  const completeBooking = (bookingId: string) => {
    setBookings(
      bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'completed' as const } : b
      )
    );
    addNotification({
      type: 'completion',
      title: 'Booking Completed!',
      message: 'Your booking has been marked as completed. Thank you for using JustRide!',
      timestamp: new Date(),
      read: false,
      bookingId
    });
  };

  const getBookingsByService = (serviceType: string) => {
    return bookings.filter((b) => b.serviceType === serviceType);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        bookings,
        notifications,
        sidebarOpen,
        setSidebarOpen,
        login,
        register,
        logout,
        addBooking,
        addNotification,
        markNotificationAsRead,
        cancelBooking,
        completeBooking,
        getBookingsByService,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
