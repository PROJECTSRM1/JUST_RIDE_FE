import { MapPin, Users, Phone, Truck, Route, Calendar, DollarSign, Heart, Star } from 'lucide-react';
import { useState } from 'react';
import BookingModal from '../BookingModal';

export default function OtherServices() {
  const [activeTab, setActiveTab] = useState<'movers' | 'planner' | 'wedding'>('movers');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const moversServices = [
    {
      id: 'mv1',
      name: 'Local Moving Service',
      description: 'Within same city transport with packing',
      basePrice: 3999,
      perKm: 20,
      perItem: 50,
      agent: { name: 'QuickMove Packers', phone: '+91 98765 43240' },
      rating: 4.6,
      reviews: 2345,
      services: ['Packing', 'Loading', 'Unloading', 'Insurance'],
      type: 'movers'
    },
    {
      id: 'mv2',
      name: 'Interstate Moving',
      description: 'Long distance moving across states',
      basePrice: 8999,
      perKm: 15,
      perItem: 75,
      agent: { name: 'National Movers', phone: '+91 98765 43241' },
      rating: 4.8,
      reviews: 1876,
      services: ['Full Packing', 'GST Covered', 'Tracking', '24/7 Support'],
      type: 'movers'
    }
  ];

  const tourPlans = [
    {
      id: 'tp1',
      vendor: 'Mountain Expeditions',
      package: 'Himalayan Trek Special',
      route: 'Delhi → Manali → Leh → Srinagar → Delhi',
      days: 7,
      price: 35999,
      highlights: ['Rohtang Pass', 'Ladakh Highway', 'Nubra Valley'],
      agent: { name: 'Expedition Planner', phone: '+91 98765 43250' },
      rating: 4.9,
      reviews: 892,
      includes: ['Hotels', 'Meals', 'Transport', 'Guide', 'Equipment'],
      type: 'planner'
    },
    {
      id: 'tp2',
      vendor: 'South India Tours',
      package: 'Southern Circuit',
      route: 'Chennai → Pondicherry → Madurai → Kochi → Cochin',
      days: 5,
      price: 22999,
      highlights: ['Temple Tours', 'Backwater Cruise', 'Beach Time'],
      agent: { name: 'South Tourism', phone: '+91 98765 43251' },
      rating: 4.7,
      reviews: 1256,
      includes: ['Hotels', 'Breakfast', 'Sightseeing', 'Transport'],
      type: 'planner'
    },
    {
      id: 'tp3',
      vendor: 'Heritage Tours',
      package: 'Rajasthan Royal',
      route: 'Jaipur → Udaipur → Jodhpur → Jaisalmer → Bikaner',
      days: 6,
      price: 28999,
      highlights: ['Humpback Camel Safari', 'Fort Tours', 'Palace Stays'],
      agent: { name: 'Rajasthan Specialist', phone: '+91 98765 43252' },
      rating: 5.0,
      reviews: 2134,
      includes: ['Heritage Hotels', 'Meals', 'Camel Safari', 'Jeep Tours'],
      type: 'planner'
    }
  ];

  const weddingCars = [
    {
      id: 'wc1',
      category: 'Ultra Luxury',
      name: 'Mercedes S-Class',
      image: '🚗',
      price: 15000,
      features: ['White Glove Service', 'Red Carpet', 'Flower Decoration', 'Photography'],
      agent: { name: 'Luxury Weddings Inc', phone: '+91 98765 43260' },
      rating: 5.0,
      reviews: 456,
      available: 3,
      type: 'wedding'
    },
    {
      id: 'wc2',
      category: 'Premium',
      name: 'BMW 7 Series',
      image: '🚙',
      price: 12000,
      features: ['Chauffeur Driven', 'Premium Decoration', 'Music System'],
      agent: { name: 'Premium Rentals', phone: '+91 98765 43261' },
      rating: 4.9,
      reviews: 678,
      available: 5,
      type: 'wedding'
    },
    {
      id: 'wc3',
      category: 'Classic Vintage',
      name: 'Vintage Rolls Royce',
      image: '👑',
      price: 25000,
      features: ['Vintage Collection', 'Professional Driver', 'Full Decoration', 'Photos Included'],
      agent: { name: 'Classic Collections', phone: '+91 98765 43262' },
      rating: 4.8,
      reviews: 234,
      available: 2,
      type: 'wedding'
    },
    {
      id: 'wc4',
      category: 'Luxury SUV',
      name: 'Range Rover Sport',
      image: '🚙',
      price: 18000,
      features: ['Modern Luxury', 'Entertainment System', 'Full Decoration'],
      agent: { name: 'SUV Elite', phone: '+91 98765 43263' },
      rating: 4.9,
      reviews: 345,
      available: 4,
      type: 'wedding'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex space-x-4 border-b border-gray-200">
        {[
          { id: 'movers', label: 'Packers & Movers', icon: '📦' },
          { id: 'planner', label: 'Tourist Planner', icon: '🗺️' },
          { id: 'wedding', label: 'Wedding Cars', icon: '💍' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-4 font-bold flex items-center space-x-2 border-b-4 transition-all ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'movers' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-8 text-white">
            <h2 className="text-4xl font-bold mb-2">Packers & Movers</h2>
            <p className="text-green-100 text-lg">Professional moving services with transparent pricing</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {moversServices.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 font-bold">Base Price</p>
                      <p className="text-xl font-bold text-green-600">₹{service.basePrice}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 font-bold">Per km</p>
                      <p className="text-xl font-bold text-green-600">₹{service.perKm}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 font-bold">Per Item</p>
                      <p className="text-xl font-bold text-green-600">₹{service.perItem}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-xs text-gray-600 font-bold">Rating</p>
                        <p className="text-xl font-bold text-amber-600">{service.rating} ⭐</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-2">SERVICES INCLUDED</p>
                    <div className="grid grid-cols-2 gap-2">
                      {service.services.map((svc, i) => (
                        <div key={i} className="flex items-center space-x-1 text-sm">
                          <span className="text-green-600">✓</span>
                          <span className="text-gray-700">{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <p className="text-xs text-gray-600 font-bold mb-2">SERVICE PROVIDER</p>
                    <p className="font-bold text-gray-800">{service.agent.name}</p>
                    <div className="flex items-center space-x-1 text-green-600 font-semibold mt-1">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${service.agent.phone}`}>{service.agent.phone}</a>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedItem(service)}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Get Free Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'planner' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-3xl p-8 text-white">
            <h2 className="text-4xl font-bold mb-2">Tourist Planner</h2>
            <p className="text-pink-100 text-lg">Multi-vendor packages with complete itineraries</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {tourPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all">
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-pink-600">{plan.vendor}</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">{plan.package}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-green-600">₹{plan.price}</p>
                      <p className="text-sm text-gray-600 flex items-center justify-end mt-1">
                        <Calendar className="w-4 h-4 mr-1" /> {plan.days} Days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Route className="w-5 h-5 text-pink-600" />
                    <p className="text-sm font-semibold text-gray-800">{plan.route}</p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-2">HIGHLIGHTS</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.highlights.map((highlight, i) => (
                        <span key={i} className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-medium">
                          📍 {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-2">WHAT'S INCLUDED</p>
                    <div className="grid grid-cols-2 gap-2">
                      {plan.includes.map((item, i) => (
                        <div key={i} className="flex items-center space-x-1 text-sm">
                          <span className="text-pink-600">✓</span>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg border border-pink-200">
                    <div>
                      <p className="text-xs text-gray-600 font-bold">TOUR OPERATOR</p>
                      <p className="font-bold text-gray-800">{plan.agent.name}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-amber-600">{plan.rating} ⭐</p>
                      <p className="text-xs text-gray-500">({plan.reviews} reviews)</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedItem(plan)}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      Book Package
                    </button>
                    <a
                      href={`tel:${plan.agent.phone}`}
                      className="flex items-center justify-center bg-pink-50 text-pink-600 px-4 rounded-xl border border-pink-200 hover:bg-pink-100 transition-colors font-bold"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'wedding' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 text-white">
            <h2 className="text-4xl font-bold mb-2">Wedding Cars</h2>
            <p className="text-amber-100 text-lg">Make your special day memorable with luxury vehicles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weddingCars.map((car) => (
              <div key={car.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-bold text-amber-600">{car.category}</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-2">{car.name}</h3>
                    </div>
                    <span className="text-5xl">{car.image}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 font-bold">Daily Rate</p>
                      <p className="text-2xl font-bold text-green-600">₹{car.price}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-amber-600">{car.rating} ⭐</p>
                      <p className="text-xs text-gray-500">{car.reviews} reviews</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 font-bold">Available</p>
                      <p className="text-xl font-bold text-green-600">{car.available}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-2">FEATURES</p>
                    <div className="space-y-1">
                      {car.features.map((feature, i) => (
                        <p key={i} className="text-sm text-gray-700 flex items-center">
                          <span className="text-amber-600 mr-2">✓</span> {feature}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <p className="text-xs text-gray-600 font-bold mb-2">BOOKING AGENT</p>
                    <p className="font-bold text-gray-800">{car.agent.name}</p>
                    <div className="flex items-center space-x-1 text-amber-600 font-semibold mt-1">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${car.agent.phone}`}>{car.agent.phone}</a>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedItem(car)}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Book for Wedding
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedItem && (
        <BookingModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          serviceType={selectedItem.type}
          itemName={selectedItem.name || selectedItem.package || selectedItem.destination}
          itemDetails={selectedItem.description || selectedItem.route || ''}
          price={selectedItem.price || selectedItem.basePrice || selectedItem.hourly}
          agentName={selectedItem.agent.name}
          agentPhone={selectedItem.agent.phone}
        />
      )}
    </div>
  );
}
