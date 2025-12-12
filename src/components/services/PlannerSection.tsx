import { useState } from "react";
import { Search, Calendar, Route } from "lucide-react";
import BookingModal from "../BookingModal";

/* --------------------------------------------------------
   1. TYPE DEFINITIONS
--------------------------------------------------------- */
interface PlannerItem {
  id: string;
  vendor: string;
  package: string;
  days: number;
  groupSize: string;
  bestSeason: string;
  difficulty: string;
  price: number;
  route: string;
  image: string;
  highlights: string[];
  includes: string[];
  rating: number;
  reviews: number;
  agent: { name: string; phone: string };
}

/* --------------------------------------------------------
   2. DATA
--------------------------------------------------------- */
const plannerData: PlannerItem[] = [
  {
    id: "p1",
    vendor: "Mountain Expeditions",
    package: "Himalayan Trek – Leh & Nubra Valley",
    days: 7,
    groupSize: "6–20 People",
    bestSeason: "May – October",
    difficulty: "Moderate",
    price: 35999,
    route: "Delhi → Manali → Leh → Nubra → Pangong → Delhi",
    image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg",
    highlights: ["Rohtang Pass", "Nubra Valley", "Pangong Lake", "Khardung La"],
    includes: ["3-Star Hotels", "Meals Included", "Guide", "Transport", "Permits", "Camp Stay"],
    rating: 4.9,
    reviews: 892,
    agent: { name: "Planner Desk", phone: "+91 98765 11111" },
  },
  {
    id: "p2",
    vendor: "Heritage Tours",
    package: "Rajasthan Royal Heritage Circuit",
    days: 6,
    groupSize: "4–16 People",
    bestSeason: "October – February",
    difficulty: "Easy",
    price: 28999,
    route: "Jaipur → Udaipur → Jodhpur → Jaisalmer → Jaipur",
    image: "https://images.pexels.com/photos/1583244/pexels-photo-1583244.jpeg",
    highlights: ["Camel Safari", "Fort Visits", "Palace Stays", "Local Shows"],
    includes: ["Heritage Hotels", "Breakfast & Dinner", "Transport", "Guided Tours"],
    rating: 5.0,
    reviews: 2134,
    agent: { name: "Royal Desk", phone: "+91 98765 22222" },
  },
  {
    id: "p3",
    vendor: "South India Tourism",
    package: "Kerala Backwaters & Hill Stations",
    days: 5,
    groupSize: "4–14 People",
    bestSeason: "September – March",
    difficulty: "Easy",
    price: 24999,
    route: "Cochin → Munnar → Alleppey → Agra → Cochin → Taj",
    image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg",
    highlights: ["Houseboat Stay", "Tea Gardens", "Backwaters"],
    includes: ["3-Star Hotels", "Meals", "Boat Ride", "Transport"],
    rating: 4.8,
    reviews: 1189,
    agent: { name: "South Desk", phone: "+91 98765 33333" },
  },
  {
    id: "p4",
    vendor: "Island Adventures",
    package: "Andaman Islands – Beaches & Water Sports",
    days: 4,
    groupSize: "2–10 People",
    bestSeason: "October – May",
    difficulty: "Easy",
    price: 28999,
    route: "Port Blair → Havelock → Neil → Port Blair",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Scuba Diving", "Coral Reefs", "Havelock Beach"],
    includes: ["Resort Stay", "Breakfast", "Ferry Transfer", "Activities"],
    rating: 4.7,
    reviews: 964,
    agent: { name: "Island Desk", phone: "+91 98765 44444" },
  },
  {
    id: "p5",
    vendor: "Northeast Trails",
    package: "Meghalaya Explorer – Waterfalls & Caves",
    days: 6,
    groupSize: "5–12 People",
    bestSeason: "September – April",
    difficulty: "Moderate",
    price: 27999,
    route: "Guwahati → Shillong → Cherrapunji → Dawki",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Umiam Lake", "Dawki River", "Living Root Bridge"],
    includes: ["Hotels", "Travel", "Breakfast", "Guide"],
    rating: 4.9,
    reviews: 1568,
    agent: { name: "NE Desk", phone: "+91 98765 55555" },
  },
];

/* --------------------------------------------------------
   3. MAIN COMPONENT
--------------------------------------------------------- */
export default function PlannerSection() {
  const [search, setSearch] = useState("");

  // ⭐ NEW STATE FOR BOOKING MODAL
  const [selectedPackage, setSelectedPackage] = useState<PlannerItem | null>(null);

  const filtered = plannerData.filter((p) =>
    p.package.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-3xl text-white">
        <h1 className="text-3xl font-bold">Tour Packages & Planners</h1>
        <p className="text-pink-100 text-md">
          Curated trips from trusted & highly-rated travel vendors.
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full md:w-80">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search package..."
          className="bg-transparent ml-2 w-full outline-none text-sm"
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            {/* SMALL IMAGE */}
            <img src={p.image} className="w-full h-28 object-cover" />

            {/* CARD CONTENT */}
            <div className="p-3 space-y-2 flex flex-col flex-1">
              {/* HEADER */}
              <div className="flex justify-between">
                <div>
                  <p className="text-[11px] text-pink-600 font-semibold">{p.vendor}</p>
                  <h2 className="text-sm font-bold leading-tight">{p.package}</h2>
                </div>

                <div className="text-right">
                  <p className="text-lg text-green-600 font-bold">₹{p.price}</p>
                  <p className="flex items-center text-[10px] text-gray-600 justify-end">
                    <Calendar className="w-3 h-3 mr-1" /> {p.days}d
                  </p>
                </div>
              </div>

              {/* SEASON */}
              <p className="text-[10px] text-gray-700">
                <b>Season:</b> {p.bestSeason}
              </p>

              {/* DIFFICULTY */}
              <p className="text-[10px] text-gray-700">
                <b>Difficulty:</b> {p.difficulty}
              </p>

              {/* ROUTE BOX */}
              <div className="flex items-center bg-gray-50 p-2 rounded-lg border">
                <Route className="w-3 h-3 text-pink-600" />
                <p className="ml-1 text-[10px] font-semibold text-gray-800">{p.route}</p>
              </div>

              {/* HIGHLIGHTS */}
              <div>
                <p className="text-[10px] font-bold text-gray-600 mb-1">Highlights</p>
                <div className="flex flex-wrap gap-1">
                  {p.highlights.slice(0, 3).map((h) => (
                    <span
                      key={h}
                      className="text-[10px] bg-pink-100 text-pink-700 px-2 py-[2px] rounded-full"
                    >
                      📍 {h}
                    </span>
                  ))}
                  {p.highlights.length > 3 && (
                    <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-[2px] rounded-full">
                      +{p.highlights.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* INCLUDED */}
              <div>
                <p className="text-[10px] font-bold text-gray-600 mb-1">Included</p>
                <div className="grid grid-cols-2 gap-1">
                  {p.includes.slice(0, 4).map((i) => (
                    <p key={i} className="text-[10px] text-gray-700 flex items-center">
                      ✓ {i}
                    </p>
                  ))}
                </div>
              </div>

              {/* OPERATOR */}
              <div className="flex justify-between items-center bg-pink-50 p-2 rounded-lg border text-[10px]">
                <div>
                  <p className="font-bold text-[11px]">{p.agent.name}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-amber-600 text-[11px]">{p.rating} ⭐</p>
                  <p className="text-gray-500 text-[9px]">{p.reviews} reviews</p>
                </div>
              </div>

              {/* BOOK PACKAGE BUTTON */}
              <button
                onClick={() => setSelectedPackage(p)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-lg font-bold text-xs h-9 mt-auto"
              >
                Book Package
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {selectedPackage && (
        <BookingModal
          isOpen={!!selectedPackage}
          onClose={() => setSelectedPackage(null)}
          serviceType="planner"
          itemName={selectedPackage.package}
          itemDetails={`${selectedPackage.days} Days • Route: ${selectedPackage.route}`}
          price={selectedPackage.price}
          agentName={selectedPackage.agent.name}
          agentPhone={selectedPackage.agent.phone}
        />
      )}
    </div>
  );
}
