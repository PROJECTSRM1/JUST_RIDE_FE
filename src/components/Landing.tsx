// Landing.tsx
import React, { useState } from "react";
import {
  Car,
  Plane,
  Package,
  Map,
  Heart,
  Calendar,
  ArrowRight,
  Shield,
  Clock,
  Star,
  User,
  X,
} from "lucide-react";

interface LandingProps {
  // backwards-compatible: older code may pass onEnterDashboard
  onEnterDashboard?: () => void;
  // preferred: open login/register modals in parent
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export default function Landing({
  onEnterDashboard,
  onOpenLogin,
  onOpenRegister,
}: LandingProps) {
  // internal modal state (will be used if parent doesn't control login/register)
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  // helper to open login (prefers parent's handler)
  const openLogin = () => {
    if (onOpenLogin) return onOpenLogin();
    if (onEnterDashboard) return onEnterDashboard(); // legacy fallback
    setLoginOpen(true);
  };

  // helper to open register (prefers parent's handler)
  const openRegister = () => {
    if (onOpenRegister) return onOpenRegister();
    if (onEnterDashboard) return onEnterDashboard(); // legacy fallback
    setRegisterOpen(true);
  };

  // Service data (stable Pexels images for reliability)
  const services = [
    {
      id: "self-drive",
      icon: Car,
      title: "Self-Drive Rentals",
      description:
        "Wide selection of clean, well-maintained cars and bikes for hourly or daily trips.",
      image:
        "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: "tickets",
      icon: Plane,
      title: "Ticket Booking",
      description:
        "Flights, trains and buses — compare fares and book instantly with transparent pricing.",
      image:
        "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "movers",
      icon: Package,
      title: "Packers & Movers",
      description:
        "Professional relocation for homes & offices with packing, transport and insurance options.",
      image:
        "https://images.pexels.com/photos/4246234/pexels-photo-4246234.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: "planner",
      icon: Map,
      title: "Tourist Planning",
      description:
        "Custom itineraries, local experts and curated tours for every budget and taste.",
      image:
        "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: "wedding",
      icon: Heart,
      title: "Wedding Cars",
      description:
        "Luxury and themed wedding cars with decoration and reliable chauffeurs for your big day.",
      image:
        "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: "tours",
      icon: Calendar,
      title: "Tour & Travels",
      description:
        "Group & private tours, weekend getaways, and full-package travel solutions.",
      image:
        "https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  const testimonials = [
    {
      name: "Khasim",
      role: "Bengaluru",
      photo: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 5,
      comment:
        "JustRide made our weekend trip effortless — smooth booking, great car and excellent support.",
    },
    {
      name: "Bala Ramesh",
      role: "Hyderabad",
      photo: "https://randomuser.me/api/portraits/men/12.jpg",
      rating: 5,
      comment:
        "Wedding car service was punctual and pristine. Highly professional and very helpful staff.",
    },
    {
      name: "Nithin",
      role: "Chennai",
      photo: "https://randomuser.me/api/portraits/men/41.jpg",
      rating: 5,
      comment:
        "Packers & Movers team handled our move flawlessly — packaging, transport and communication were top notch.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 text-gray-800">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
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

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button onClick={() => document.getElementById("services")?.scrollIntoView({behavior:"smooth"})} className="hover:text-blue-600">Services</button>
            <button onClick={() => document.getElementById("motive")?.scrollIntoView({behavior:"smooth"})} className="hover:text-blue-600">Motive</button>
            <button onClick={() => document.getElementById("how")?.scrollIntoView({behavior:"smooth"})} className="hover:text-blue-600">How it works</button>
            <button onClick={() => document.getElementById("testimonials")?.scrollIntoView({behavior:"smooth"})} className="hover:text-blue-600">Testimonials</button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={openLogin}
              className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
            >
              Login
            </button>
            <button
              onClick={openRegister}
              className="px-4 py-2 text-sm rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-[1.02] transition-transform"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="pt-20">
        <section className="relative h-[80vh] md:h-[85vh] flex items-center">
          <img
            src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Road trip hero"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
          <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              Your Journey,
              <span className="text-cyan-300"> Our Passion</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-blue-100 mb-8">
              One platform for rentals, ticketing, packers & movers, wedding cars and curated tours — trusted by thousands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={openRegister}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-white shadow-lg flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={openLogin}
                className="px-8 py-3 rounded-xl border border-white/20 text-white/95 hover:bg-white/10"
              >
                Explore Services
              </button>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto text-sm text-blue-100">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold">50,000+</div>
                <div className="text-xs">Happy Customers</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold">4.8 / 5</div>
                <div className="text-xs">Average Rating</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold">500+</div>
                <div className="text-xs">Trusted Partners</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold">24/7</div>
                <div className="text-xs">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-8 h-8 text-blue-600" />
                <h4 className="font-bold">Trusted Service</h4>
              </div>
              <p className="text-sm text-gray-600">Verified agents, insurance options and transparent pricing.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-8 h-8 text-blue-600" />
                <h4 className="font-bold">24/7 Support</h4>
              </div>
              <p className="text-sm text-gray-600">Customer support available round the clock for every booking.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-8 h-8 text-amber-500" />
                <h4 className="font-bold">Top Rated</h4>
              </div>
              <p className="text-sm text-gray-600">High satisfaction rating from thousands of travelers.</p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">Our Services</h2>
            <p className="text-gray-600">Comprehensive travel, transport and logistics solutions</p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer"
                  onClick={openRegister} // click leads to register (or parent's register)
                >
                  <div className="h-56 w-full overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">{s.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{s.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-blue-600">Book Now</div>
                      <div className="text-xs text-gray-400">Trusted partners • Insurance options</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* MOTIVE */}
        <section id="motive" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="our motive"
                className="rounded-3xl shadow-lg object-cover w-full h-[420px]"
              />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Motive</h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                We built JustRide to unify travel services and remove friction — so users book, compare and travel with confidence.
                We verify partners, insure trips and keep pricing transparent so customers always know what they're paying for.
              </p>

              <ul className="grid grid-cols-1 gap-4">
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <div className="font-semibold">Verified Vendors</div>
                    <div className="text-sm text-gray-600">Thorough partner checks and ongoing reviews</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <div className="font-semibold">24 / 7 Support</div>
                    <div className="text-sm text-gray-600">Real-time support and booking assistance</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-amber-500 mt-1" />
                  <div>
                    <div className="font-semibold">Quality Promise</div>
                    <div className="text-sm text-gray-600">Quality checks, insurance and satisfaction guarantee</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">How It Works</h2>
            <p className="text-gray-600">Book in 3 simple steps</p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl border shadow-sm">
              <img src="https://cdn-icons-png.flaticon.com/512/747/747376.png" className="w-16 h-16 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Choose Service</h4>
              <p className="text-sm text-gray-600">Select from rentals, movers, tickets, or curated tours.</p>
            </div>
            <div className="p-6 rounded-2xl border shadow-sm">
              <img src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png" className="w-16 h-16 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Compare & Book</h4>
              <p className="text-sm text-gray-600">Compare vendors, transparent pricing and instant confirmation.</p>
            </div>
            <div className="p-6 rounded-2xl border shadow-sm">
              <img src="https://cdn-icons-png.flaticon.com/512/992/992661.png" className="w-16 h-16 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Enjoy Trip</h4>
              <p className="text-sm text-gray-600">Support through the journey, with feedback and follow-ups.</p>
            </div>
          </div>
        </section>

        {/* TRUST / EXTRA */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center mb-10">
            <h3 className="text-3xl font-bold">Why People Trust JustRide</h3>
            <p className="text-gray-600">Reliable service, verified partners and clear pricing</p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/992/992700.png" className="w-16 mx-auto mb-4" alt="verified" />
              <h4 className="font-bold">Verified Partners</h4>
              <p className="text-sm text-gray-600">All service providers vetted & rated.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/992/992651.png" className="w-16 mx-auto mb-4" alt="instant" />
              <h4 className="font-bold">Instant Booking</h4>
              <p className="text-sm text-gray-600">Real-time confirmations and e-tickets.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/992/992674.png" className="w-16 mx-auto mb-4" alt="transparent" />
              <h4 className="font-bold">Transparent Pricing</h4>
              <p className="text-sm text-gray-600">No hidden charges — ever.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/992/992681.png" className="w-16 mx-auto mb-4" alt="support" />
              <h4 className="font-bold">24/7 Support</h4>
              <p className="text-sm text-gray-600">Help anytime through chat & phone.</p>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto text-center mb-8">
            <h2 className="text-4xl font-bold">What Our Customers Say</h2>
            <p className="text-gray-600">Real stories from verified customers</p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow text-center">
                <img src={t.photo} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                <div className="flex items-center justify-center mb-3 gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-amber-500" />
                  ))}
                </div>
                <p className="italic text-gray-700 mb-3">“{t.comment}”</p>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="mb-6 text-blue-100">Join thousands of satisfied customers who trust JustRide.</p>
            <div className="flex gap-4 items-center justify-center">
              <button onClick={openRegister} className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold">Get Started</button>
              <button onClick={openLogin} className="px-6 py-3 rounded-lg border border-white/30">Login</button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">JustRide</h4>
              </div>
              <p className="text-gray-400 max-w-md">One platform for rentals, travel, movers & weddings — trusted and verified.</p>
              <div className="flex items-center gap-2 mt-4 text-amber-400">
                <Star className="w-4 h-4" />
                <span className="font-semibold">4.8/5</span>
                <span className="text-sm text-gray-400">— 50,000+ customers</span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3">Quick Links</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Services</li>
                <li className="hover:text-white cursor-pointer">How it works</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3">Support</h5>
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

      {/* ---------------- LOGIN MODAL (static) ---------------- */}
      {(loginOpen || false) && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">Login</h3>
              <button onClick={() => setLoginOpen(false)} className="p-2 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 space-y-4">
              <input type="email" placeholder="Email" className="w-full border px-4 py-2 rounded" />
              <input type="password" placeholder="Password" className="w-full border px-4 py-2 rounded" />
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 rounded font-semibold">Login</button>
              <div className="text-center text-sm">
                <button onClick={() => { setLoginOpen(false); setRegisterOpen(true); }} className="text-blue-600">Create an account</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- REGISTER MODAL (static) ---------------- */}
      {(registerOpen || false) && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">Register</h3>
              <button onClick={() => setRegisterOpen(false)} className="p-2 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 space-y-4">
              <input type="text" placeholder="Full name" className="w-full border px-4 py-2 rounded" />
              <input type="email" placeholder="Email" className="w-full border px-4 py-2 rounded" />
              <input type="tel" placeholder="Phone number" className="w-full border px-4 py-2 rounded" />
              <input type="password" placeholder="Password" className="w-full border px-4 py-2 rounded" />
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 rounded font-semibold">Create account</button>
              <div className="text-center text-sm">
                <button onClick={() => { setRegisterOpen(false); setLoginOpen(true); }} className="text-blue-600">Already have an account? Login</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
