import { useState } from "react";
import {
  Search,
  ArrowUpDown,
  Star,
  ExternalLink,
  Train,
  Plane,
  Bus,
} from "lucide-react";
import airindia from "../../logos/airplane-taking-off-sunset.jpg"
import busimg from "../../logos/Hyderabad-to-Bangalore-Bus.png"
import railimg from "../../logos/charming-young-traveler-adjusting-strap-backpack-standing-platform.jpg"
import indigoimg from "../../logos/3039589-poster-p-2-most-innovative-companies-2015-indigo.png"
import railimg2 from "../../logos/people-watching-as-train-approaches.jpg"
import abhibusimg from "../../logos/elegant-driver-sitting-shuttle-bus-smiling-camera-summer-day-front-view-happy-man.jpg"
export default function TicketsSection() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("rating-desc");
  const [search, setSearch] = useState("");

  const platforms = [
    {
      id: "irctc",
      type: "train",
      name: "IRCTC",
      description: "Official Indian Railway ticket booking platform.",
      logo: railimg,
      sampleRoute: "NDLS → AGC",
      avgPrice: 350,
      rating: 4.9,
      link: "https://www.irctc.co.in",
      color: "from-blue-50 to-blue-100",
    },
    {
      id: "redbus",
      type: "bus",
      name: "RedBus",
      description: "India's largest bus booking marketplace.",
      logo: busimg,
      sampleRoute: "DEL → JPR",
      avgPrice: 499,
      rating: 4.7,
      link: "https://www.redbus.in",
      color: "from-red-50 to-rose-100",
    },
    {
      id: "indigo",
      type: "flight",
      name: "IndiGo",
      description:
        "India’s largest airline offering domestic & international flights.",
      logo: indigoimg,
      sampleRoute: "DEL → BOM",
      avgPrice: 3499,
      rating: 4.8,
      link: "https://www.goindigo.in",
      color: "from-sky-50 to-blue-100",
    },
    {
      id: "airindia",
      type: "flight",
      name: "Air India",
      description: "Full-service international & domestic airline.",
      logo: airindia,
      sampleRoute: "HYD → DEL",
      avgPrice: 3999,
      rating: 4.6,
      link: "https://www.airindia.in",
      color: "from-red-50 to-orange-100",
    },
    {
      id: "abhibus",
      type: "bus",
      name: "AbhiBus",
      description: "Popular bus booking platform with offers & discounts.",
      logo: abhibusimg,
      sampleRoute: "VJA → HYD",
      avgPrice: 550,
      rating: 4.5,
      link: "https://www.abhibus.com",
      color: "from-orange-50 to-yellow-100",
    },
    {
      id: "konkan",
      type: "train",
      name: "Konkan Railway",
      description: "Scenic coastal railway operator with premium trains.",
      logo: railimg2,
      sampleRoute: "MAO → MUM",
      avgPrice: 650,
      rating: 4.7,
      link: "https://konkanrailway.com",
      color: "from-green-50 to-green-100",
    },
  ];

  // FILTER
  const filtered = platforms.filter((p) => {
    if (filter !== "all" && p.type !== filter) return false;
    if (!p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // SORT
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "rating-desc":
        return b.rating - a.rating;
      case "rating-asc":
        return a.rating - b.rating;
      case "price-asc":
        return a.avgPrice - b.avgPrice;
      case "price-desc":
        return b.avgPrice - a.avgPrice;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-4 text-white">
        <h1 className="text-4xl font-bold">Ticket Booking Marketplace</h1>
        <p className="text-orange-100 mt-2 text-lg">
          Book flights, trains, and buses from verified platforms.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-3">
          {[
            { key: "all", label: "All" },
            { key: "flight", label: "Flights", icon: <Plane className="w-4" /> },
            { key: "train", label: "Trains", icon: <Train className="w-4" /> },
            { key: "bus", label: "Buses", icon: <Bus className="w-4" /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === tab.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center gap-1">
                {tab.icon}
                {tab.label}
              </div>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search platform or route..."
            className="bg-transparent outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Sort */}
        <div>
          <select
            className="bg-gray-100 px-4 py-2 rounded-xl text-sm font-medium"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="rating-desc">Rating (High → Low)</option>
            <option value="rating-asc">Rating (Low → High)</option>
            <option value="price-asc">Price (Low → High)</option>
            <option value="price-desc">Price (High → Low)</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sorted.map((p) => (
          <div
            key={p.id}
            className={`rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 bg-gradient-to-br ${p.color} p-6 flex items-center gap-6`}
          >
            {/* Logo */}
            <img
              src={p.logo}
              alt={p.name}
              className="w-20 h-20 object-contain rounded-xl bg-white shadow-sm p-2"
            />

            {/* Details */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">{p.name}</h3>
              <p className="text-gray-600 text-sm">{p.description}</p>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-gray-700 font-medium">{p.sampleRoute}</span>
                <span className="text-green-600 font-bold">Avg ₹{p.avgPrice}</span>
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-4 h-4" />
                  {p.rating}
                </span>
              </div>

              {/* Visit Button */}
              <button
                onClick={() => window.open(p.link, "_blank")}
                className="mt-3 flex items-center gap-2 text-blue-600 font-semibold hover:underline"
              >
                Visit Platform <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
