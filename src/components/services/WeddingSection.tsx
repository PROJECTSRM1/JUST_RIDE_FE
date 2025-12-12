import { useState, useMemo } from "react";
import { Phone, Star, Search, ArrowUpDown } from "lucide-react";
import BookingModal from "../BookingModal";

/* ----------------------------------------------------
   1. TYPE DEFINITIONS
----------------------------------------------------- */
interface WeddingCarItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  features: string[];
  agent: { name: string; phone: string };
}

/* ----------------------------------------------------
   2. DATA
----------------------------------------------------- */
const weddingCars: WeddingCarItem[] = [
  {
    id: "w1",
    name: "Mercedes S-Class",
    category: "Ultra Luxury",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    price: 15000,
    rating: 5.0,
    reviews: 456,
    features: ["Red Carpet", "Flower Decoration", "Premium Chauffeur",],
    agent: { name: "Luxury Wheels", phone: "+91 98765 12345" }
  },
  {
    id: "w2",
    name: "Rolls Royce Phantom",
    category: "Ultra Luxury",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    price: 48000,
    rating: 5.0,
    reviews: 382,
    features: ["Premium Decor", "Champagne Setup", "VIP Chauffeur"],
    agent: { name: "Royal Drive", phone: "+91 98765 75757" }
  },
  {
    id: "w3",
    name: "BMW 7 Series",
    category: "Luxury",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    price: 12000,
    rating: 4.8,
    reviews: 678,
    features: ["Premium Decoration", "Leather Interior", "Sound System"],
    agent: { name: "Elite Cars", phone: "+91 98765 54321" }
  },
  {
    id: "w4",
    name: "Audi A6",
    category: "Luxury",
    image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    price: 9000,
    rating: 4.7,
    reviews: 345,
    features: ["Elegant Decor", "Clean Interior", "Professional Driver"],
    agent: { name: "City Rentals", phone: "+91 90000 11111" }
  },
  {
    id: "w5",
    name: "Range Rover Sport",
    category: "Luxury SUV",
    image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg",
    price: 18000,
    rating: 4.9,
    reviews: 289,
    features: ["Modern Look", "Full Decoration", "Comfort Ride"],
    agent: { name: "SUV Elite", phone: "+91 98989 12121" }
  },
  {
    id: "w6",
    name: "Vintage Rolls Royce",
    category: "Vintage",
    image: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
    price: 25000,
    rating: 4.9,
    reviews: 234,
    features: ["Vintage Styling", "Photo Shoot Ready", "Full Decoration"],
    agent: { name: "Heritage Motors", phone: "+91 99887 66554" }
  },
  {
    id: "w7",
    name: "Ambassador Classic",
    category: "Vintage",
    image: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
    price: 7000,
    rating: 4.6,
    reviews: 198,
    features: ["Classic Decoration", "Retro Feel", "White Theme"],
    agent: { name: "Vintage Drive", phone: "+91 99000 88888" }
  },
  {
    id: "w8",
    name: "Toyota Innova Crysta",
    category: "Premium",
    image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    price: 6500,
    rating: 4.4,
    reviews: 432,
    features: ["Affordable", "Comfortable", "Decor Available"],
    agent: { name: "City Travels", phone: "+91 90909 33333" }
  },
  {
    id: "w9",
    name: "Maruti Ertiga",
    category: "Budget",
    image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    price: 4500,
    rating: 4.3,
    reviews: 305,
    features: ["Budget Friendly", "AC", "Basic Decoration"],
    agent: { name: "Family Rentals", phone: "+91 93455 00000" }
  }
];

/* ----------------------------------------------------
   3. MAIN COMPONENT
----------------------------------------------------- */
export default function WeddingSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("rating");

  // ⭐ New booking state
  const [selectedCar, setSelectedCar] = useState<WeddingCarItem | null>(null);

  const filtered = useMemo(() => {
    return weddingCars
      .filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) &&
          (category === "All" || c.category === category)
      )
      .sort((a, b) => {
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "price_low") return a.price - b.price;
        if (sort === "price_high") return b.price - a.price;
        return 0;
      });
  }, [search, category, sort]);

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl text-white">
        <h1 className="text-4xl font-bold">Wedding Cars</h1>
        <p className="text-amber-100 text-lg">
          From classic to ultra-luxury — choose the perfect car for your big day.
        </p>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-80">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search car..."
            className="bg-transparent ml-2 w-full outline-none"
          />
        </div>

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option>All</option>
          <option>Budget</option>
          <option>Premium</option>
          <option>Luxury</option>
          <option>Ultra Luxury</option>
          <option>Luxury SUV</option>
          <option>Vintage</option>
        </select>

        {/* Sort */}
        <button
          onClick={() =>
            setSort(
              sort === "rating"
                ? "price_low"
                : sort === "price_low"
                ? "price_high"
                : "rating"
            )
          }
          className="flex items-center bg-gray-100 px-4 py-2 rounded-lg text-gray-700"
        >
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Sort: {sort === "rating" ? "Rating" : sort === "price_low" ? "Price Low" : "Price High"}
        </button>
      </div>

      {/* CAR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-white border rounded-2xl shadow hover:shadow-xl overflow-hidden"
          >
            <img src={c.image} className="w-full h-52 object-cover" />

            <div className="p-4 space-y-2">

              <p className="text-xs font-bold text-amber-600">{c.category}</p>
              <h2 className="text-xl font-bold">{c.name}</h2>

              <div className="flex justify-between items-center border-b pb-3">
                <p className="text-xl font-bold text-green-600">₹{c.price}</p>
                <p className="font-bold text-amber-600">
                  <Star className="w-5 h-5 inline mr-1" /> {c.rating}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-600 mb-1">Features</p>
                <div className="space-y-1">
                  {c.features.map((f, i) => (
                    <p key={i} className="text-sm text-gray-700">✓ {f}</p>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 p-3 rounded-lg border">
                <p className="text-xs text-gray-600 font-bold">AGENT</p>
                <p className="font-bold">{c.agent.name}</p>
                <a href={`tel:${c.agent.phone}`} className="flex items-center text-amber-600 mt-1">
                  <Phone className="w-4 h-4 mr-1" /> {c.agent.phone}
                </a>
              </div>

              {/* BOOK BUTTON — OPENS BOOKING MODAL */}
              <button
                onClick={() => setSelectedCar(c)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold mt-2"
              >
                Book for Wedding
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {selectedCar && (
        <BookingModal
          isOpen={!!selectedCar}
          onClose={() => setSelectedCar(null)}
          serviceType="wedding"
          itemName={selectedCar.name}
          itemDetails={`${selectedCar.category} • Includes: ${selectedCar.features.slice(0, 3).join(", ")}...`}
          price={selectedCar.price}
          agentName={selectedCar.agent.name}
          agentPhone={selectedCar.agent.phone}
        />
      )}
    </div>
  );
}
