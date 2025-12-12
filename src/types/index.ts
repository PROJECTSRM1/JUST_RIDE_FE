export interface Booking {
  id: string;
  serviceType: 'self-drive' | 'tours' | 'tickets' | 'movers' | 'planner' | 'wedding';
  itemName: string;
  bookingDate: Date;
  details: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  agentName: string;
  agentPhone: string;
  pickupDate?: string;
  returnDate?: string;
  passengers?: number;
  location?: string;
}

export interface Notification {
  id: string;
  type: 'booking' | 'confirmation' | 'reminder' | 'completion';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  bookingId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookings: Booking[];
  notifications: Notification[];
}
