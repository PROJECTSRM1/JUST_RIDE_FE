import { useState, useMemo } from "react";
import { Phone, ArrowUpDown, Search, Star, MapPin } from "lucide-react";
import BookingModal from "../BookingModal"; // <— IMPORTANT
import packimg from "../../logos/packers-and-movers-.png"
import packimg1 from "../../logos/whatsapp-image-2024-04-14-at-22-48-53.png"
import twomovers from "../../logos/two-movers-in-uniform-carrying-cardboard-boxes-in-9RUY526.png"

interface MoversItem {
  id: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
  perKm: number;
  perItem: number;
  rating: number;
  reviews: number;
  services: string[];
  agent: { name: string; phone: string; location: string };
}

const moversData: MoversItem[] = [
  {
    id: "mv1",
    name: "Agarwal Packers & Movers",
    description: "India’s most trusted interstate moving company.",
    image: packimg,
    basePrice: 5999,
    perKm: 22,
    perItem: 60,
    rating: 4.9,
    reviews: 5823,
    services: ["Packing", "Loading", "Insurance", "GPS Tracking"],
    agent: { name: "Agarwal Logistics", phone: "+91 98765 10000", location: "Pan India" }
  },
  {
    id: "mv2",
    name: "NoBroker Movers",
    description: "Affordable packers and movers with verified workers.",
    image: packimg1,
    basePrice: 3499,
    perKm: 18,
    perItem: 45,
    rating: 4.7,
    reviews: 4211,
    services: ["Packing", "Loading", "Transport", "Support"],
    agent: { name: "NoBroker Move", phone: "+91 98765 30000", location: "Major Cities" }
  },
  {
    id: "mv3",
    name: "Urban Company Movers",
    description: "Super-fast local shifting with professional packaging.",
    image: twomovers,
    basePrice: 3999,
    perKm: 20,
    perItem: 55,
    rating: 4.8,
    reviews: 3180,
    services: ["Premium Packing", "Safety Wrap", "Furniture Handling"],
    agent: { name: "Urban Co Movers", phone: "+91 98765 22000", location: "Metro Cities" }
  }
];

export default function MoversSection() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"rating" | "price" | "reviews">("rating");

  // ✅ NEW STATE FOR BOOKING MODAL
  const [selectedMover, setSelectedMover] = useState<MoversItem | null>(null);

  const filtered = useMemo(() => {
    return moversData
      .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "price") return a.basePrice - b.basePrice;
        if (sort === "reviews") return b.reviews - a.reviews;
        return 0;
      });
  }, [search, sort]);

  // OPEN FORM
  const openBooking = (item: MoversItem) => {
    setSelectedMover(item);
  };

  // CLOSE FORM
  const closeBooking = () => setSelectedMover(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-3xl text-white">
        <h1 className="text-3xl font-bold">Packers & Movers</h1>
        <p className="text-green-100 text-sm">
          Choose from top-rated professional moving vendors.
        </p>
      </div>

      {/* Search + Sorting */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
          <Search className="w-3 h-3 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendor..."
            className="bg-transparent ml-2 w-full outline-none text-sm"
          />
        </div>

        <button
          onClick={() =>
            setSort(
              sort === "rating"
                ? "price"
                : sort === "price"
                ? "reviews"
                : "rating"
            )
          }
          className="flex items-center bg-gray-100 px-3 py-2 rounded-lg text-gray-700 text-sm"
        >
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Sort: {sort.toUpperCase()}
        </button>
      </div>

      {/* Vendors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
          >
            <img src={m.image} className="w-full h-32 object-cover" />

            <div className="p-3 space-y-2 flex flex-col flex-1">
              <div className="flex justify-between items-start">
                <h2 className="text-sm font-bold">{m.name}</h2>
                <p className="text-green-600 font-bold text-base">₹{m.basePrice}</p>
              </div>

              <p className="text-gray-600 text-xs leading-tight">{m.description}</p>

              <div className="flex items-center gap-2 text-xs">
                <Star className="w-4 h-4 text-amber-500" />
                <p className="font-bold">{m.rating}</p>
                <p className="text-gray-500 text-[11px]">({m.reviews} reviews)</p>
              </div>

              <p className="text-xs text-gray-700">
                ₹{m.perKm}/km • ₹{m.perItem}/item
              </p>

              <div className="flex flex-wrap gap-1">
                {m.services.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] bg-green-100 text-green-700 px-2 py-[2px] rounded-full"
                  >
                    ✓ {s}
                  </span>
                ))}
                {m.services.length > 3 && (
                  <span className="text-[10px] bg-gray-100 px-2 py-[2px] rounded-full">
                    +{m.services.length - 3}
                  </span>
                )}
              </div>

              <div className="bg-green-50 p-2 rounded-lg border text-[11px]">
                <p className="font-bold">{m.agent.name}</p>
                <p className="flex items-center text-gray-700">
                  <MapPin className="w-3 h-3 mr-1" /> {m.agent.location}
                </p>
                <a href={`tel:${m.agent.phone}`} className="flex items-center text-green-700 mt-1">
                  <Phone className="w-3 h-3 mr-1" /> {m.agent.phone}
                </a>
              </div>

              {/* ✔ OPEN BOOKING FORM */}
              <button
                onClick={() => openBooking(m)}
                className="mt-auto w-full h-9 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-lg"
              >
                Get Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {selectedMover && (
        <BookingModal
          isOpen={!!selectedMover}
          onClose={closeBooking}
          serviceType="movers"
          itemName={selectedMover.name}
          itemDetails={`${selectedMover.description}`}
          price={selectedMover.basePrice}
          agentName={selectedMover.agent.name}
          agentPhone={selectedMover.agent.phone}
        />
      )}
    </div>
  );
}
