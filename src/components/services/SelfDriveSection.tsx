// SelfDriveSection.tsx
import React, { useMemo, useState } from "react";
import { Clock, Phone, Star } from "lucide-react";
import BookingModal from "../BookingModal";

import imgbike from "../../logos/enfield-350.jpg";
import a from "../../logos/duke.jpg";
import b from "../../logos/gt-650.jpg";
import c from "../../logos/harley.jpg";
import d from "../../logos/honda.jpg";
import e from "../../logos/hyundai.jpg";
import f from "../../logos/jawa.jpg";
import g from "../../logos/mahindra.jpg";
import h from "../../logos/mt-15.jpg";
import i from "../../logos/skoda.jpg";
import j from "../../logos/tata-siera.png";
import k from "../../logos/Thor.png";

type PriceMode = "hourly" | "daily";
type VehicleTab = "all" | "cars" | "bikes";

interface Agent {
  name: string;
  phone: string;
}

export interface Vehicle {
  id: string;
  type: string;
  name: string;
  description: string;
  hourly: number;
  dailyRate: number;
  agent: Agent;
  imageUrl: string;
  features: string[];
  rating: number;
  reviews: number;
  mileage: string;
  seating: number;
  transmission: "Manual" | "Automatic";
  fuel: string;
  location: string;
  availability: string;
}

const VEHICLES: Vehicle[] = [
  {
    id: "hc1",
    type: "Sedan",
    name: "Honda City 2024",
    description: "Comfortable compact sedan perfect for city drives",
    hourly: 299,
    dailyRate: 2499,
    agent: { name: "Rajesh Kumar", phone: "+91 98765 43210" },
    imageUrl: d,
    features: ["AC", "Power Steering", "ABS Brakes"],
    rating: 4.8,
    reviews: 342,
    mileage: "15 km/l",
    seating: 5,
    transmission: "Manual",
    fuel: "Petrol",
    location: "Downtown Hub",
    availability: "Available Now",
  },
  {
    id: "tc1",
    type: "SUV",
    name: "Thar",
    description: "Spacious SUV for family trips and offroad adventures",
    hourly: 599,
    dailyRate: 4999,
    agent: { name: "Priya Sharma", phone: "+91 98765 43211" },
    imageUrl: k,
    features: ["4WD", "Sunroof", "Premium Sound"],
    rating: 4.9,
    reviews: 528,
    mileage: "12 km/l",
    seating: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    location: "Central Station",
    availability: "Available Now",
  },
  {
    id: "bx1",
    type: "Premium Sedan",
    name: "Tata Sierra",
    description: "Luxury driving experience with premium features",
    hourly: 999,
    dailyRate: 7999,
    agent: { name: "Vikram Singh", phone: "+91 98765 43212" },
    imageUrl: j,
    features: ["Leather Seats", "Apple CarPlay", "Panoramic Roof"],
    rating: 5.0,
    reviews: 156,
    mileage: "14 km/l",
    seating: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    location: "Airport Terminal",
    availability: "Available Now",
  },
  {
    id: "mv1",
    type: "Microvan",
    name: "Mahindra Xylo",
    description: "Perfect for group travel with spacious interiors",
    hourly: 449,
    dailyRate: 3999,
    agent: { name: "Arjun Patel", phone: "+91 98765 43213" },
    imageUrl: g,
    features: ["AC", "Wide Seats", "DVD Player"],
    rating: 4.7,
    reviews: 289,
    mileage: "13 km/l",
    seating: 8,
    transmission: "Manual",
    fuel: "Diesel",
    location: "Highway Terminal",
    availability: "Available Now",
  },
  {
    id: "re1",
    type: "Bike",
    name: "Royal Enfield Classic 350",
    description: "Classic bike for smooth highway and city rides",
    hourly: 149,
    dailyRate: 899,
    agent: { name: "Mohan Verma", phone: "+91 98765 43214" },
    imageUrl: imgbike,
    features: ["ABS Brakes", "LED Headlight"],
    rating: 4.6,
    reviews: 1247,
    mileage: "35 km/l",
    seating: 2,
    transmission: "Manual",
    fuel: "Petrol",
    location: "City Center",
    availability: "Multiple Available",
  },
  {
    id: "ha2",
    type: "Scooter",
    name: "Honda Activa 6G",
    description: "Reliable scooter for urban commutes",
    hourly: 99,
    dailyRate: 599,
    agent: { name: "Sneha Singh", phone: "+91 98765 43215" },
    imageUrl: "https://media.zigcdn.com/media/model/2024/Mar/lest-side-view-1453709626_930x620.jpg",
    features: ["LED Lights", "Storage Box"],
    rating: 4.5,
    reviews: 2156,
    mileage: "45 km/l",
    seating: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    location: "Metro Stations",
    availability: "Multiple Available",
  },
];

export default function SelfDriveSection() {
  const [priceMode, setPriceMode] = useState<PriceMode>("hourly");
  const [vehicleTab, setVehicleTab] = useState<VehicleTab>("all");
  const [modelFilter, setModelFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"popular" | "priceAsc" | "priceDesc" | "rating">("popular");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Generate dropdown values dynamically
  const modelOptions = useMemo(() => {
    if (vehicleTab === "cars")
      return ["all", "Sedan", "SUV", "Premium Sedan", "Microvan"];

    if (vehicleTab === "bikes")
      return ["all", "Bike", "Scooter"];

    return ["all", "Sedan", "SUV", "Premium Sedan", "Microvan", "Bike", "Scooter"];
  }, [vehicleTab]);

  const filtered = useMemo(() => {
    let arr = [...VEHICLES];

    // TAB FILTER
    if (vehicleTab === "cars") {
      arr = arr.filter(v => v.type !== "Bike" && v.type !== "Scooter");
    } else if (vehicleTab === "bikes") {
      arr = arr.filter(v => v.type === "Bike" || v.type === "Scooter");
    }

    // MODEL FILTER
    if (modelFilter !== "all") {
      arr = arr.filter(v => v.type === modelFilter);
    }

    // SORT
    switch (sortBy) {
      case "priceAsc":
        arr.sort((a, b) =>
          priceMode === "hourly" ? a.hourly - b.hourly : a.dailyRate - b.dailyRate
        );
        break;
      case "priceDesc":
        arr.sort((a, b) =>
          priceMode === "hourly" ? b.hourly - a.hourly : b.dailyRate - a.dailyRate
        );
        break;
      case "rating":
        arr.sort((a, b) => b.rating - a.rating);
        break;
    }

    return arr;
  }, [vehicleTab, modelFilter, priceMode, sortBy]);

  const openBooking = (v: Vehicle) => setSelectedVehicle(v);
  const closeBooking = () => setSelectedVehicle(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-4 text-white">
        <h2 className="text-4xl font-bold mb-2">Self-Drive Rentals</h2>
        <p className="text-blue-100 text-lg">
          Choose your ride — flexible hourly and daily pricing.
        </p>
      </div>

      {/* ONE-LINE FILTER BAR */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-xl shadow-sm">

        {/* VEHICLE TABS */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-full">
          {["all", "cars", "bikes"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setVehicleTab(tab as VehicleTab);
                setModelFilter("all");
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                vehicleTab === tab ? "bg-blue-600 text-white" : "text-gray-700"
              }`}
            >
              {tab === "all" ? "All" : tab === "cars" ? "Cars" : "Bikes"}
            </button>
          ))}
        </div>

        {/* PRICE MODE */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-full">
          <button
            onClick={() => setPriceMode("hourly")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
              priceMode === "hourly" ? "bg-blue-600 text-white" : "text-gray-700"
            }`}
          >
            Hourly
          </button>

          <button
            onClick={() => setPriceMode("daily")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
              priceMode === "daily" ? "bg-blue-600 text-white" : "text-gray-700"
            }`}
          >
            Daily
          </button>
        </div>

        {/* MODEL DROPDOWN */}
        <select
          value={modelFilter}
          onChange={(e) => setModelFilter(e.target.value)}
          className="px-4 py-1.5 bg-gray-100 rounded-lg text-sm"
        >
          {modelOptions.map((m) => (
            <option key={m} value={m}>
              {m === "all" ? "All Models" : m}
            </option>
          ))}
        </select>

        {/* SORT */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-1.5 bg-gray-100 rounded-lg text-sm"
        >
          <option value="popular">Popular</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* VEHICLE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((v) => (
          <article
            key={v.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition hover:-translate-y-1"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <img src={v.imageUrl} alt={v.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-4 space-y-3">
              <h3 className="text-lg font-bold">{v.name}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{v.description}</p>

              <div className="flex justify-between text-sm">
                <span className="font-semibold text-green-600">
                  {priceMode === "hourly" ? `₹${v.hourly}/hr` : `₹${v.dailyRate}/day`}
                </span>

                <span className="flex items-center gap-1 text-gray-700">
                  <Star className="w-4 h-4 text-amber-500" /> {v.rating}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                <a
                  href={`tel:${v.agent.phone}`}
                  className="flex items-center justify-center gap-2 border rounded-lg py-2 text-sm"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>

                <button
                  onClick={() => openBooking(v)}
                  className="bg-blue-600 text-white rounded-lg py-2 text-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {selectedVehicle && (
        <BookingModal
          isOpen={!!selectedVehicle}
          onClose={closeBooking}
          serviceType="self-drive"
          itemName={selectedVehicle.name}
          itemDetails={`${selectedVehicle.type} — ${selectedVehicle.description}`}
          price={priceMode === "hourly" ? selectedVehicle.hourly : selectedVehicle.dailyRate}
          agentName={selectedVehicle.agent.name}
          agentPhone={selectedVehicle.agent.phone}
        />
      )}
    </div>
  );
}
