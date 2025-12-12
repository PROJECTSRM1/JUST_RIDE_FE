// 🆕 Updated & Polished Booking Modal – Matches Your New UI System

import { X, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
  itemName: string;
  itemDetails: string;
  price: number;
  agentName: string;
  agentPhone: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  serviceType,
  itemName,
  itemDetails,
  price,
  agentName,
  agentPhone,
}: BookingModalProps) {
  
  const { addBooking, addNotification } = useApp();
  const [step, setStep] = useState<'form' | 'done'>('form');

  const [formData, setFormData] = useState({
    pickupDate: '',
    passengers: 1,
    location: '',
    specialRequests: '',
  });

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('form');
      setFormData({
        pickupDate: '',
        passengers: 1,
        location: '',
        specialRequests: '',
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const booking: Booking = {
      id: Date.now().toString(),
      serviceType: serviceType as any,
      itemName,
      details: itemDetails,
      bookingDate: new Date(),
      totalAmount: price,
      status: "confirmed",
      agentName,
      agentPhone,
      pickupDate: formData.pickupDate,
      passengers: formData.passengers,
      location: formData.location,
    };

    addBooking(booking);

    addNotification({
      type: 'booking',
      bookingId: booking.id,
      title: 'Booking Confirmed!',
      message: `Your ${itemName} booking has been confirmed. Agent ${agentName} will contact you soon at ${agentPhone}.`,
      timestamp: new Date(),
      read: false,
    });

    setStep("done");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-fadeIn">

        {/* =========================  
            STEP 1 : BOOKING FORM
        ========================== */}
        {step === 'form' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Confirm Your Booking</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">

              {/* Service Summary Card */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                <h3 className="text-lg font-bold text-gray-800">{itemName}</h3>
                <p className="text-sm text-gray-600 mt-1">{itemDetails}</p>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-600">Total Price</p>
                  <p className="text-2xl font-bold text-green-600">₹{price}</p>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Pickup Date */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">Pickup Date</label>
                  <input
                    type="date"
                    required
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Passengers — show only for rides */}
                {serviceType !== "tickets" && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Passengers</label>
                    <select
                      value={formData.passengers}
                      onChange={(e) =>
                        setFormData({ ...formData, passengers: Number(e.target.value) })
                      }
                      className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {[...Array(8)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Pickup Location */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">Pickup Location</label>
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">Special Requests (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Any special requirements..."
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData({ ...formData, specialRequests: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Agent Info */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <p className="text-xs text-gray-600 font-semibold">AGENT</p>
                  <p className="font-bold text-gray-800">{agentName}</p>
                  <p className="font-semibold text-blue-600">{agentPhone}</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </>
        )}

        {/* =========================  
            STEP 2 : SUCCESS SCREEN
        ========================== */}
        {step === 'done' && (
          <div className="flex flex-col items-center justify-center p-12 space-y-4 text-center">

            <CheckCircle className="w-20 h-20 text-green-500 animate-bounce" />

            <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>

            <p className="text-gray-600">
              Your booking has been successfully confirmed.  
              The agent will contact you soon.
            </p>

            <button
              onClick={onClose}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold hover:shadow-xl"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
