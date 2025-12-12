// ToursSection.tsx
import React, { useMemo, useRef, useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Phone,
  Star,
  Bed,
  Utensils,
  Bus,
  Heart,
  
  ChevronLeft,
  ChevronRight,
  Bookmark,
  
} from "lucide-react";
import BookingModal from "../BookingModal";

type TourId = string;

interface Agent {
  name: string;
  phone: string;
  verified?: boolean;
  travelersCount?: number;
}

interface Tour {
  id: TourId;
  destination: string;
  region?: string;
  duration: number; // days
  nights: number;
  startingPrice: number;
  pricePerPerson?: number; // alias
  images: string[]; // carousel images
  agent: Agent;
  highlights: string[];
  included: string[];
  excluded?: string[];
  rating: number;
  reviews: number;
  maxPersons: number;
  description: string;
  itinerary?: string[]; // day-by-day
  tags?: string[]; // e.g., ["Best Seller", "Family"]
  category?: string; // beach, adventure, cultural
  bestTimeToVisit?: string;
  isPopular?: boolean;
}

const TOURS: Tour[] = [
  {
    id: "t1",
    destination: "Goa Beach Paradise",
    region: "Goa",
    duration: 3,
    nights: 2,
    startingPrice: 12999,
    pricePerPerson: 12999,
    images: [
      "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    agent: { name: "Goa Travels Ltd", phone: "+91 98765 43220", verified: true, travelersCount: 12000 },
    highlights: ["Baga Beach", "Fort Aguada", "Spice Plantation", "Water Sports"],
    included: ["Accommodation", "Breakfast", "Guided Tours", "Airport Transfer"],
    excluded: ["Flight tickets", "Lunch/Dinner unless specified", "Personal expenses"],
    rating: 4.7,
    reviews: 523,
    maxPersons: 4,
    description: "Experience the vibrant beaches and nightlife of Goa with comfortable stays and curated activities.",
    itinerary: [
      "Day 1 — Arrival, Baga Beach & Sunset",
      "Day 2 — Water sports and Fort Aguada visit",
      "Day 3 — Spice plantation and departure"
    ],
    tags: ["Best Seller", "Beach"],
    category: "beach",
    bestTimeToVisit: "Nov - Feb",
    isPopular: true
  },
  {
    id: "t2",
    destination: "Himalayan Adventure",
    region: "Himachal",
    duration: 5,
    nights: 4,
    startingPrice: 25999,
    pricePerPerson: 25999,
    images: [
      "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/372748/pexels-photo-372748.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/289647/pexels-photo-289647.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    agent: { name: "Mountain Quest Tours", phone: "+91 98765 43221", verified: true, travelersCount: 5400 },
    highlights: ["Manali Valley", "Rohtang Pass", "Paragliding", "Adventure Sports"],
    included: ["Hotels", "All Meals", "Guides", "Equipment", "Transport"],
    excluded: ["Personal insurance", "Tips"],
    rating: 4.9,
    reviews: 687,
    maxPersons: 6,
    description: "Thrilling mountain adventure with scenic landscapes and curated adventure activities.",
    itinerary: [
      "Day 1 — Arrival & acclimatize",
      "Day 2 — Local sightseeing & valley trek",
      "Day 3 — Rohtang Pass day trip",
      "Day 4 — Paragliding & leisure",
      "Day 5 — Departure"
    ],
    tags: ["Adventure", "Trending"],
    category: "adventure",
    bestTimeToVisit: "Apr - Jun",
    isPopular: true
  },
  {
    id: "t3",
    destination: "Kerala Backwaters Tour",
    region: "Kerala",
    duration: 4,
    nights: 3,
    startingPrice: 18999,
    pricePerPerson: 18999,
    images: [
      
      "https://images.pexels.com/photos/221463/pexels-photo-221463.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    agent: { name: "Kerala Tourism Board", phone: "+91 98765 43222", verified: true, travelersCount: 8800 },
    highlights: ["Houseboat Cruise", "Chinese Fishing Nets", "Spice Gardens", "Lagoons"],
    included: ["Houseboat Stay", "Meals", "Sightseeing", "Local Guides"],
    excluded: ["Flight", "Optional activities"],
    rating: 4.8,
    reviews: 742,
    maxPersons: 4,
    description: "Serene backwater experience with traditional houseboat stays and local cuisine.",
    itinerary: [
      "Day 1 — Arrival & houseboat check-in",
      "Day 2 — Local sightseeing",
      "Day 3 — Spice garden tour & cultural show",
      "Day 4 — Departure"
    ],
    tags: ["Relax", "Family"],
    category: "relax",
    bestTimeToVisit: "Sep - Mar",
    isPopular: false
  },
  {
    id: "t4",
    destination: "Rajasthan Royal Circuit",
    region: "Rajasthan",
    duration: 6,
    nights: 5,
    startingPrice: 35999,
    pricePerPerson: 35999,
    images: [
      "https://images.pexels.com/photos/1619311/pexels-photo-1619311.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/248280/pexels-photo-248280.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/21014/pexels-photo-21014.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    agent: { name: "Royal Rajasthan Tours", phone: "+91 98765 43223", verified: true, travelersCount: 10300 },
    highlights: ["Jaipur", "Pushkar", "Udaipur", "Jaisalmer", "Camel Safari"],
    included: ["Luxury Hotels", "Premium Meals", "All Transfers", "Camel Safari"],
    excluded: ["Personal shopping", "Special permits"],
    rating: 5.0,
    reviews: 891,
    maxPersons: 8,
    description: "Experience the grandeur of royal palaces and desert safaris in an iconic itinerary.",
    itinerary: [
      "Day 1 — Jaipur city tour",
      "Day 2 — Pushkar & local sights",
      "Day 3 — Udaipur exploration",
      "Day 4 — Jaisalmer & desert camp",
      "Day 5 — Leisure",
      "Day 6 — Departure"
    ],
    tags: ["Luxury", "Best Seller"],
    category: "cultural",
    bestTimeToVisit: "Oct - Mar",
    isPopular: true
  },
  {
    id: "t5",
    destination: "Northeast Explorer",
    region: "Northeast",
    duration: 7,
    nights: 6,
    startingPrice: 42999,
    pricePerPerson: 42999,
    images: [
      "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/419532/pexels-photo-419532.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    agent: { name: "Northeast Adventures", phone: "+91 98765 43224", verified: false, travelersCount: 2100 },
    highlights: ["Meghalaya", "Assam", "Arunachal Pradesh", "Tribal Villages"],
    included: ["Lodges", "All Meals", "Jeep Safari", "Local Guide"],
    excluded: ["Flights", "Personal insurance"],
    rating: 4.6,
    reviews: 345,
    maxPersons: 6,
    description: "Discover the untouched beauty of the Northeast with local guides and cultural experiences.",
    itinerary: [
      "Day 1 — Arrival & local market",
      "Day 2 — Waterfalls & caves",
      "Day 3 — Tribal villages",
      "Day 4 — Jeep safari",
      "Day 5 — Cultural program",
      "Day 6 — Leisure",
      "Day 7 — Departure"
    ],
    tags: ["Offbeat"],
    category: "offbeat",
    bestTimeToVisit: "Oct - Apr",
    isPopular: false
  },
  {
    id: "t6",
    destination: "Andaman Island Getaway",
    region: "Andaman",
    duration: 4,
    nights: 3,
    startingPrice: 28999,
    pricePerPerson: 28999,
    images: [
     
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    agent: { name: "Island Escapes", phone: "+91 98765 43225", verified: true, travelersCount: 7700 },
    highlights: ["Port Blair", "Havelock Island", "Scuba Diving", "Coral Reefs"],
    included: ["Resort Stay", "Meals", "Island Tours", "Water Activities"],
    excluded: ["Scuba gear rental", "Flight"],
    rating: 4.8,
    reviews: 612,
    maxPersons: 4,
    description: "Paradise islands with pristine beaches, coral reefs and a variety of water activities.",
    itinerary: [
      "Day 1 — Arrival & local beach",
      "Day 2 — Havelock island & snorkeling",
      "Day 3 — Island tours & leisure",
      "Day 4 — Departure"
    ],
    tags: ["Beach", "Popular"],
    category: "beach",
    bestTimeToVisit: "Nov - Apr",
    isPopular: true
  }
];

export default function ToursSection() {
  // local UI state
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [wishlist, setWishlist] = useState<Record<TourId, boolean>>({});
  const [compareList, setCompareList] = useState<TourId[]>([]);
  const [openCompare, setOpenCompare] = useState(false);
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"popular" | "priceAsc" | "priceDesc" | "rating">("popular");

  // Carousel refs map for each tour id
  const carouselRefs = useRef<Record<TourId, HTMLDivElement | null>>({});

  // derived lists
  const tags = useMemo(() => {
    const s = new Set<string>();
    TOURS.forEach((t) => t.tags?.forEach((tag) => s.add(tag)));
    return ["all", ...Array.from(s)];
  }, []);

  const filtered = useMemo(() => {
    let arr = TOURS.slice();

    if (filterTag !== "all") {
      arr = arr.filter((t) => t.tags?.includes(filterTag));
    }

    if (search.trim().length > 0) {
      const q = search.toLowerCase();
      arr = arr.filter(
        (t) =>
          t.destination.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.agent.name.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "priceAsc":
        arr.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "priceDesc":
        arr.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case "rating":
        arr.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return arr;
  }, [search, filterTag, sortBy]);

  // wishlist toggle
  const toggleWishlist = (id: TourId) => {
    setWishlist((s) => ({ ...s, [id]: !s[id] }));
  };

  // compare actions
  const toggleCompare = (id: TourId) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // limit 3
      return [...prev, id];
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    setOpenCompare(false);
  };

  // scroll carousel function (pure JS)
  const scrollCarousel = (id: TourId, direction: "next" | "prev") => {
    const el = carouselRefs.current[id];
    if (!el) return;
    const w = el.clientWidth;
    const scrollAmount = direction === "next" ? w * 0.8 : -w * 0.8;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // open booking modal (pass minimal safe props to BookingModal)
  const openBookingModal = (tour: Tour) => {
    setSelectedTour(tour);
  };

  // close booking
  const closeBooking = () => {
    setSelectedTour(null);
  };

  return (
    <div className="space-y-8">
      {/* header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-4 text-white">
        <h2 className="text-4xl font-bold mb-2">Tour & Travels</h2>
        <p className="text-purple-100 text-lg">Curated travel packages — view details, compare, and book with trusted vendors.</p>
      </div>

      {/* controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-white rounded-lg p-2 flex items-center gap-2 shadow-sm">
            <input
              placeholder="Search destination, vendor..."
              className="px-3 py-2 outline-none text-sm w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className="text-sm">
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "All packages" : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-3 py-2 rounded bg-white shadow-sm text-sm">
            <option value="popular">Sort: Popular</option>
            <option value="priceAsc">Price low → high</option>
            <option value="priceDesc">Price high → low</option>
            <option value="rating">Top Rated</option>
          </select>

          <button
            onClick={() => { setSearch(""); setFilterTag("all"); setSortBy("popular"); }}
            className="px-3 py-2 rounded bg-white shadow-sm text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((tour) => (
          <article key={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 relative">
            {/* badge row */}
            <div className="absolute top-4 left-4 z-20 flex gap-2 items-center">
              {tour.tags?.map((tag, i) => (
                <span key={i} className={`text-xs font-semibold px-3 py-1 rounded-full ${tag.toLowerCase().includes("best") ? "bg-amber-400 text-white" : "bg-white/80 text-gray-800"}`}>
                  {tag}
                </span>
              ))}

              {tour.isPopular && <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white">Popular</span>}
            </div>

            {/* image carousel (pure scrollable area) */}
            <div className="relative">
              <div className="overflow-hidden h-56 md:h-64 bg-gray-50">
                <div
                  ref={(el) => (carouselRefs.current[tour.id] = el)}
                  className="flex h-full overflow-x-auto scroll-snap-x snap-mandatory gap-2 px-2 py-2 md:px-4 md:py-3 scrollbar-hide"
                  style={{ scrollBehavior: "smooth" } as React.CSSProperties}
                >
                  {tour.images.map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-full md:w-[600px] h-full snap-start rounded-xl overflow-hidden relative">
                      <img src={img} alt={`${tour.destination} ${idx + 1}`} loading="lazy" className="w-full h-full object-cover" />
                      {/* semi overlay with rating */}
                      <div className="absolute bottom-3 left-3 bg-white/80 px-3 py-1 rounded-full flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        <div className="text-sm font-semibold">{tour.rating} <span className="text-xs text-gray-700">({tour.reviews})</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* carousel nav */}
              <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                <button
                  onClick={() => scrollCarousel(tour.id, "prev")}
                  className="pointer-events-auto bg-white/90 p-2 rounded-full shadow-md hover:scale-105 transition"
                  aria-label="Prev"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <button
                  onClick={() => scrollCarousel(tour.id, "next")}
                  className="pointer-events-auto bg-white/90 p-2 rounded-full shadow-md hover:scale-105 transition"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* carousel thumbnails */}
              <div className="absolute right-4 top-4 flex gap-2">
                <button
                  title={wishlist[tour.id] ? "Remove from wishlist" : "Add to wishlist"}
                  onClick={() => toggleWishlist(tour.id)}
                  className="bg-white/90 p-2 rounded-full shadow-md"
                >
                  {wishlist[tour.id] ? <Heart className="w-5 h-5 text-rose-500" /> : <Heart className="w-5 h-5" />}
                </button>

                <button
                  title={compareList.includes(tour.id) ? "Remove from compare" : "Add to compare"}
                  onClick={() => toggleCompare(tour.id)}
                  className={`bg-white/90 p-2 rounded-full shadow-md ${compareList.includes(tour.id) ? "ring-2 ring-blue-300" : ""}`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* body */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{tour.destination}</h3>
                  <p className="text-sm text-gray-600 mt-1">{tour.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>{tour.region} • Best time: {tour.bestTimeToVisit}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-500">Starting from</div>
                  <div className="text-2xl font-bold text-green-600">₹{tour.startingPrice.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mt-1">per person</div>

                  {/* trust badges */}
                  <div className="mt-3 flex flex-col items-end gap-2">
                    <div className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" /> {tour.rating}
                    </div>
                    {tour.agent.verified ? (
                      <div className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full flex items-center gap-2">
                        ✔ Govt Approved
                      </div>
                    ) : (
                      <div className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">Verified Vendor</div>
                    )}
                    <div className="text-xs px-2 py-1 bg-gray-50 text-gray-700 rounded-full">{tour.agent.travelersCount || 0}+ travelers</div>
                  </div>
                </div>
              </div>

              {/* meta grid */}
              <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-semibold">{tour.duration}D / {tour.nights}N</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-pink-600" />
                  <div>
                    <div className="text-xs text-gray-500">Max People</div>
                    <div className="font-semibold">{tour.maxPersons}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-xs text-gray-500">Price Includes</div>
                    <div className="text-sm text-gray-700">{tour.included.slice(0, 2).join(", ")}{tour.included.length > 2 ? "..." : ""}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-xs text-gray-500">Operator</div>
                    <div className="font-semibold">{tour.agent.name}</div>
                  </div>
                </div>
              </div>

              {/* highlights */}
              <div className="mt-4">
                <div className="text-xs font-bold text-gray-600 mb-2">Highlights</div>
                <div className="flex flex-wrap gap-2">
                  {tour.highlights.slice(0, 4).map((h, i) => (
                    <span key={i} className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">📍 {h}</span>
                  ))}
                  {tour.highlights.length > 4 && <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">+{tour.highlights.length - 4} more</span>}
                </div>
              </div>

              {/* itinerary preview (collapsible) */}
              <details className="mt-4 bg-gray-50 p-3 rounded-lg" aria-details={`itinerary-${tour.id}`}>
                <summary className="cursor-pointer text-sm font-semibold">View itinerary</summary>
                <ul className="mt-2 text-sm text-gray-700 space-y-1">
                  {tour.itinerary?.map((day, i) => (
                    <li key={i} className="pl-2">• {day}</li>
                  ))}
                </ul>
              </details>

              {/* price breakdown & reviews preview */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                <div className="bg-white/50 p-3 rounded-lg border">
                  <div className="text-xs font-bold text-gray-600 mb-1">Price Breakdown</div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {tour.included.map((inc, i) => (
                      <li key={i}>✓ {inc}</li>
                    ))}
                    {tour.excluded && tour.excluded.length > 0 && <li className="text-xs text-gray-500 mt-2">Excludes: {tour.excluded.join(", ")}</li>}
                  </ul>
                </div>

                <div className="bg-white/50 p-3 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-gray-600">Reviews</div>
                    <div className="text-xs text-gray-500">{tour.reviews} reviews</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 italic">
                    "{tour.description.slice(0, 80)}..." {/* small testimonial placeholder */}
                  </div>
                  <div className="mt-3 text-xs text-gray-500">Top review: <span className="font-semibold">“Amazing experience — well organized!”</span></div>
                </div>
              </div>

              {/* actions */}
              <div className="mt-5 flex flex-wrap gap-3 items-center">
                <button onClick={() => openBookingModal(tour)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold">Book Package</button>

                <a href={`tel:${tour.agent.phone}`} className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Contact Operator
                </a>

                <button onClick={() => toggleCompare(tour.id)} className={`px-3 py-2 rounded-lg text-sm border ${compareList.includes(tour.id) ? "bg-blue-600 text-white border-blue-600" : ""}`}>
                  {compareList.includes(tour.id) ? "Added to Compare" : "Add to Compare"}
                </button>

                <button onClick={() => toggleWishlist(tour.id)} className="px-3 py-2 rounded-lg text-sm border">
                  {wishlist[tour.id] ? <Bookmark className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />} Save
                </button>

                <div className="ml-auto text-right">
                  <div className="text-xs text-gray-500">Operator</div>
                  <div className="font-semibold">{tour.agent.name}</div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Compare panel (bottom sticky) */}
      {/* Compare panel (bottom sticky) */}
{compareList.length > 0 && !openCompare && (
  <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
    <div className="bg-white rounded-2xl shadow-xl p-4 border flex items-center gap-3">
      <div className="flex-1">
        <div className="text-sm text-gray-600">
          Compare {compareList.length} package(s)
        </div>

        <div className="flex items-center gap-3 mt-2">
          {compareList.map((id) => {
            const t = TOURS.find((x) => x.id === id)!;
            return (
              <div
                key={id}
                className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border"
              >
                <img
                  src={t.images[0]}
                  alt={t.destination}
                  className="w-12 h-8 object-cover rounded"
                />
                <div>
                  <div className="text-sm font-semibold">{t.destination}</div>
                  <div className="text-xs text-gray-500">₹{t.startingPrice}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpenCompare(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg"
        >
          Open Compare
        </button>
        <button onClick={clearCompare} className="px-3 py-2 border rounded-lg">
          Clear
        </button>
      </div>
    </div>
  </div>
)}


      {/* Compare Drawer (simple modal-like) */}
      {openCompare && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-bold">Compare Packages</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => setOpenCompare(false)} className="px-3 py-1 border rounded">Close</button>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {compareList.map((id) => {
                const t = TOURS.find((x) => x.id === id)!;
                return (
                  <div key={id} className="border rounded-lg overflow-hidden">
                    <img src={t.images[0]} alt={t.destination} className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <div className="font-semibold">{t.destination}</div>
                      <div className="text-xs text-gray-500">₹{t.startingPrice} • {t.duration}D/{t.nights}N</div>
                      <div className="mt-2 text-sm text-gray-700">{t.description}</div>

                      <div className="mt-3">
                        <div className="text-xs font-bold text-gray-600">Includes</div>
                        <ul className="text-sm">
                          {t.included.map((inc, i) => <li key={i}>✓ {inc}</li>)}
                        </ul>
                      </div>

                      <div className="mt-3">
                        <div className="text-xs font-bold text-gray-600">Itinerary</div>
                        <ul className="text-sm">
                          {t.itinerary?.slice(0, 3).map((it, i) => <li key={i}>• {it}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Booking modal (safe props only) */}
      {selectedTour && (
        <BookingModal
          isOpen={!!selectedTour}
          onClose={closeBooking}
          serviceType="tours"
          itemName={selectedTour.destination}
          itemDetails={`${selectedTour.duration}D / ${selectedTour.nights}N - ${selectedTour.description}`}
          price={selectedTour.startingPrice}
          agentName={selectedTour.agent.name}
          agentPhone={selectedTour.agent.phone}
        />
      )}
    </div>
  );
}
