import { useState } from "react";
import {
  Car,
  Plane,
  Package,
  Map,
  Heart,
  Calendar,
  Shield,
  Clock,
  Star,
  Check,
} from "lucide-react";

interface LandingProps {
  onEnterDashboard?: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onOpenSelfDrive?: () => void;
}

export default function Landing({
  onEnterDashboard,
  onOpenLogin,
  onOpenRegister,
  onOpenSelfDrive,
}: LandingProps) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const openLogin = () => {
    if (onOpenLogin) return onOpenLogin();
    if (onEnterDashboard) return onEnterDashboard();
    setLoginOpen(true);
  };

  const openRegister = () => {
    if (onOpenRegister) return onOpenRegister();
    if (onEnterDashboard) return onEnterDashboard();
    setRegisterOpen(true);
  };

  const testimonials = [
    {
      name: "Khasim",
      role: "Bengaluru",
      photo: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 5,
      comment:
        "JustRide made our weekend trip effortless — smooth booking and great car.",
    },
    {
      name: "Bala Ramesh",
      role: "Hyderabad",
      photo: "https://randomuser.me/api/portraits/men/12.jpg",
      rating: 5,
      comment: "Wedding car service was clean, punctual and perfectly decorated.",
    },
    {
      name: "Nithin",
      role: "Chennai",
      photo: "https://randomuser.me/api/portraits/men/41.jpg",
      rating: 5,
      comment: "Packers & Movers team handled our entire move flawlessly.",
    },
  ];

  const services = [
    {
      id: "selfdrive",
      icon: Car,
      title: "Self-Drive Rentals",
      description: "Wide selection of clean cars and bikes for rent.",
      image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
      action: () => onOpenSelfDrive && onOpenSelfDrive(),
    },
    {
      id: "tickets",
      icon: Plane,
      title: "Ticket Booking",
      description: "Flights, trains & buses with instant confirmation.",
      image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
      action: openRegister,
    },
    {
      id: "packers",
      icon: Package,
      title: "Packers & Movers",
      description: "Professional relocation with packing & transport.",
      image: "https://images.pexels.com/photos/4246234/pexels-photo-4246234.jpeg",
      action: openRegister,
    },
    {
      id: "tourist",
      icon: Map,
      title: "Tourist Planner",
      description: "Custom itineraries & guided tours.",
      image: "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg",
      action: openRegister,
    },
    {
      id: "wedding",
      icon: Heart,
      title: "Wedding Cars",
      description: "Luxury decorated cars for weddings.",
      image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      action: openRegister,
    },
    {
      id: "tempo",
      icon: Calendar,
      title: "Tempo Travels",
      description: "Group travel for trips & corporate outings.",
      image: "https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg",
      action: openRegister,
    },
  ];
console.log(loginOpen);
console.log(registerOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
     
      <main className="pt-0">
        {/* HERO SECTION */}
        <section className="relative h-[80vh] flex items-center">
          <img
            src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            alt="hero"
          />

          <div className="relative text-center text-white max-w-6xl mx-auto px-6">
            <h1 className="text-5xl font-bold mb-4">
              Your Journey, <span className="text-cyan-300">Our Passion</span>
            </h1>
            <p className="max-w-xl mx-auto text-blue-100 mb-8">
              One platform for rentals, ticketing, movers, weddings & tours.
            </p>

            <div className="flex justify-center gap-4">
              <button
                className="px-8 py-3 bg-blue-600 rounded-xl"
                onClick={openRegister}
              >
                Get Started
              </button>
              <button
                className="px-8 py-3 rounded-xl border text-white"
                onClick={openLogin}
              >
                Explore Services
              </button>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-16 px-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  onClick={s.action}
                  className="bg-white rounded-2xl shadow hover:shadow-xl cursor-pointer overflow-hidden"
                >
                  <img src={s.image} className="h-56 w-full object-cover" alt={s.title} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-600 p-2 rounded-lg">
                        <Icon className="text-white w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold">{s.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{s.description}</p>
                    <span className="text-blue-600 font-semibold">Book Now</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* OUR MOTIVE */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <img
              src="https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg"
              className="rounded-3xl shadow-lg w-full h-[420px] object-cover"
              alt="motive"
            />

            <div>
              <h2 className="text-4xl font-bold mb-4">Our Motive</h2>
              <p className="text-gray-700 text-lg mb-6">
                We unified travel services so users can book faster, easier and with confidence.
              </p>

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Shield className="text-blue-600 w-6 h-6" />
                  <div>
                    <div className="font-semibold">Verified Vendors</div>
                    <p className="text-gray-600 text-sm">Thorough partner checks</p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <Clock className="text-blue-600 w-6 h-6" />
                  <div>
                    <div className="font-semibold">24/7 Support</div>
                    <p className="text-gray-600 text-sm">Real-time assistance</p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <Star className="text-amber-500 w-6 h-6" />
                  <div>
                    <div className="font-semibold">Top Quality</div>
                    <p className="text-gray-600 text-sm">Satisfaction guaranteed</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 px-6 bg-white text-center">
          <h2 className="text-4xl font-bold mb-10">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-6 rounded-2xl border shadow-sm">
              <Check className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Choose Service</h4>
              <p className="text-gray-600 text-sm">Select rentals, movers, tickets or tours.</p>
            </div>

            <div className="p-6 rounded-2xl border shadow-sm">
              <Star className="w-10 h-10 text-amber-500 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Compare & Book</h4>
              <p className="text-gray-600 text-sm">Transparent pricing & instant confirmation.</p>
            </div>

            <div className="p-6 rounded-2xl border shadow-sm">
              <Car className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Enjoy the Ride</h4>
              <p className="text-gray-600 text-sm">Support throughout your journey.</p>
            </div>
          </div>
        </section>

        {/* WHY TRUST US */}
        <section className="py-16 px-6 bg-gray-50">
          <h2 className="text-4xl font-bold text-center mb-10">Why People Trust JustRide</h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { label: "Verified Partners", img: "https://cdn-icons-png.flaticon.com/512/992/992700.png" },
              { label: "Instant Booking", img: "https://cdn-icons-png.flaticon.com/512/992/992651.png" },
              { label: "Transparent Pricing", img: "https://cdn-icons-png.flaticon.com/512/992/992674.png" },
              { label: "24/7 Support", img: "https://cdn-icons-png.flaticon.com/512/992/992681.png" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow text-center">
                <img src={item.img} alt={item.label} className="w-16 mx-auto mb-4" />
                <h4 className="font-bold">{item.label}</h4>
                <p className="text-sm text-gray-600">Premium service quality guaranteed.</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 px-6 bg-white">
          <h2 className="text-4xl font-bold text-center mb-10">What Our Customers Say</h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-6 text-center">
                <img src={t.photo} className="w-20 h-20 mx-auto rounded-full mb-4" alt={t.name} />
                <div className="flex justify-center gap-1 mb-2">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="text-amber-500 w-4 h-4" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-2">“{t.comment}”</p>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center">
          <h2 className="text-4xl font-bold mb-3">Ready to Start Your Journey?</h2>
          <p className="text-blue-100 mb-6">Join thousands of travellers switching to JustRide.</p>

          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold" onClick={openRegister}>
              Get Started
            </button>
            <button className="px-6 py-3 rounded-xl border border-white/50" onClick={openLogin}>
              Login
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Car className="text-white w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">JustRide</h4>
              </div>

              <p className="text-gray-400 mb-4 max-w-md">
                One platform for rentals, tickets, movers & tours — trusted by thousands.
              </p>

              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4" />
                <span className="font-semibold">4.8/5</span>
                <span className="text-sm text-gray-500 ml-1">— 50,000+ customers</span>
              </div>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-3">Quick Links</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Services</li>
                <li className="hover:text-white cursor-pointer">How it works</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">Help Center</li>
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer">Terms</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} JustRide. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
