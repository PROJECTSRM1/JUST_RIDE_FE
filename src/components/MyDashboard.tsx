// UpgradedDashboard.tsx
import React, { useMemo, useState } from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  Phone,
  Users,
  DollarSign,
  Star,
  Menu,
  Bell,
} from "lucide-react";
import { useApp } from "../context/AppContext";

type Booking = {
  id: string;
  serviceType: string;
  itemName: string;
  agentName?: string;
  agentPhone?: string;
  totalAmount: number;
  bookingDate: string;
  pickupDate?: string | null;
  status: "confirmed" | "completed" | "cancelled" | "pending";
  thumbnail?: string;
};

type Notif = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
  type?: "booking" | "confirmation" | "completion" | "alert";
};

export default function UpgradedDashboard() {
  const {
    bookings = [],
    notifications = [],
    sidebarOpen,
    setSidebarOpen,
    completeBooking,
    markNotificationAsRead,
    markAllNotificationsRead,
    user,
  } = useApp() as any;

  // UI State
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showOnlyUpcoming, setShowOnlyUpcoming] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Booking Stats
  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter((b: Booking) => b.status === "confirmed").length;
    const completed = bookings.filter((b: Booking) => b.status === "completed").length;
    const totalSpent = bookings.reduce((s: number, b: Booking) => s + (b.totalAmount || 0), 0);
    return { total, confirmed, completed, totalSpent };
  }, [bookings]);

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    let arr = bookings as Booking[];
    if (filter !== "all") arr = arr.filter((b) => b.status === filter);
    if (search.trim().length > 1) {
      const q = search.toLowerCase();
      arr = arr.filter(
        (b) =>
          b.itemName.toLowerCase().includes(q) ||
          (b.agentName || "").toLowerCase().includes(q) ||
          b.serviceType.toLowerCase().includes(q)
      );
    }
    return arr;
  }, [bookings, filter, search]);

  const unreadCount = notifications.filter((n: Notif) => !n.read).length;

  // Helpers
  const statusStyles = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const statusIcon = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // CSV export helper (robust: quotes and escapes basic commas/newlines)
  const exportCsv = () => {
    const headers = ["Service", "Item", "Agent", "Amount", "Date", "Status"];
    const escape = (v: any) => {
      if (v === null || v === undefined) return "";
      const s = String(v);
      return `"${s.replace(/"/g, '""')}"`;
    };

    const rows = filteredBookings.map((b: Booking) => [
      escape(b.serviceType),
      escape(b.itemName),
      escape(b.agentName || "-"),
      escape(b.totalAmount),
      escape(new Date(b.bookingDate).toLocaleDateString()),
      escape(b.status),
    ]);

    const csvContent = [headers.map(escape).join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 transition-all">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center justify-between px-6 pt-6 pb-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen && setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg bg-white shadow-sm hover:shadow-md"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome back{user?.name ? `, ${user.name}` : ""} — Manage your bookings
            </p>
          </div>
        </div>

        <button
          onClick={() => setNotifOpen(true)}
          className="relative p-2 rounded-lg bg-white shadow-sm hover:shadow-md"
        >
          <Bell className="w-5 h-5 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* ---------------- STATS CARDS ---------------- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl p-5 bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90">Total Bookings</div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-gradient-to-br from-green-500 to-teal-500 text-white shadow-lg">
          <div>
            <div className="text-sm opacity-90">Confirmed</div>
            <div className="text-2xl font-bold">{stats.confirmed}</div>
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-gradient-to-br from-purple-500 to-violet-500 text-white shadow-lg">
          <div>
            <div className="text-sm opacity-90">Completed</div>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg">
          <div>
            <div className="text-sm opacity-90">Total Spent</div>
            <div className="text-2xl font-bold">₹{stats.totalSpent.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* ---------------- MAIN CONTENT (FULL WIDTH TABLE) ---------------- */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="space-y-6">
          {/* Table Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between">
            <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm w-full md:w-auto">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bookings, agent, item..."
                className="px-3 py-2 outline-none text-sm w-full md:w-64"
              />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border rounded text-sm"
              >
                <option value="all">All</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={exportCsv}
                className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm hover:shadow-md"
              >
                Export CSV
              </button>

              <button
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-sm text-sm"
              >
                New Booking
              </button>
            </div>
          </div>

          {/* BOOKINGS TABLE */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                {/* define column widths to prevent the table from growing beyond the container */}
                <colgroup>
                  <col style={{ width: "16%" }} /> {/* Service */}
                  <col style={{ width: "16%" }} /> {/* Item */}
                  <col style={{ width: "20%" }} /> {/* Agent */}
                  <col style={{ width: "8%" }} /> {/* Amount */}
                  <col style={{ width: "10%" }} /> {/* Date */}
                  <col style={{ width: "8%" }} />  {/* Status */}
                  <col style={{ width: "6%" }} />  {/* Action */}
                </colgroup>

                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-3 py-2 text-left text-sm font-semibold">Service</th>
                    <th className="px-3 py-2 text-left text-sm font-semibold">Item</th>
                    <th className="px-3 py-2 text-left text-sm font-semibold">Agent</th>
                    <th className="px-3 py-2 text-left text-sm font-semibold">Amount</th>
                    <th className="px-3 py-2 text-left text-sm font-semibold">Date</th>
                    <th className="px-3 py-2 text-left text-sm font-semibold">Status</th>
                    <th className="px-3 py-2 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-3 py-6 text-center text-sm text-gray-500">
                        No bookings found
                      </td>
                    </tr>
                  )}

                  {filteredBookings.map((b: Booking) => (
                    <tr key={b.id} className="border-b hover:bg-gray-50">
                      {/* Service (placeholder tile, no image) */}
                      <td className="px-3 py-3 align-top" title={`${b.serviceType} — ${b.itemName}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500 shrink-0">
                            {b.itemName
                              ? b.itemName
                                  .split(" ")
                                  .map((s) => s[0])
                                  .slice(0, 2)
                                  .join("")
                              : "—"}
                          </div>

                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate whitespace-nowrap" title={b.serviceType}>
                              {b.serviceType}
                            </div>
                            <div className="text-xs text-gray-500 truncate whitespace-nowrap" title={b.itemName}>
                              {b.itemName}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Item */}
                      <td className="px-1 py-3 align-top">
                        <div className="text-sm truncate whitespace-nowrap" title={b.itemName}>
                          {b.itemName}
                        </div>
                      </td>

                      {/* Agent */}
                      <td className="px-3 py-3 align-top">
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate whitespace-nowrap" title={b.agentName || "—"}>
                            {b.agentName || "—"}
                          </div>
                          <div className="text-xs text-gray-500 truncate whitespace-nowrap flex items-center gap-1" title={b.agentPhone || "No contact"}>
                            {b.agentPhone ? (
                              <>
                                <Phone className="w-3 h-3" />
                                {b.agentPhone}
                              </>
                            ) : (
                              "No contact"
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-3 py-3 align-top">
                        <div className="text-sm font-semibold truncate whitespace-nowrap">₹{b.totalAmount}</div>
                      </td>

                      {/* Date */}
                      <td className="px-3 py-3 align-top">
                        <div className="text-sm truncate whitespace-nowrap" title={new Date(b.bookingDate).toLocaleDateString()}>
                          {new Date(b.bookingDate).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-3 align-top">
                        <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${statusStyles(b.status)}`}>
                          {statusIcon(b.status)}
                          <span className="truncate whitespace-nowrap">{b.status}</span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-3 py-3 align-top">
                        {b.status === "confirmed" ? (
                          <button
                            onClick={() => {
                              if (typeof completeBooking === "function") completeBooking(b.id);
                            }}
                            className="bg-green-600 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap"
                            title="Mark booking completed"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="text-xs text-gray-500">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- NOTIFICATION MODAL ---------------- */}
      {notifOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative">
            <button
              onClick={() => setNotifOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3">Notifications</h2>

            <div className="flex justify-end mb-2">
              <button
                onClick={markAllNotificationsRead}
                className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
              >
                Mark all read
              </button>
            </div>

            <div className="max-h-[350px] overflow-y-auto space-y-3 pr-2">
              {notifications.length === 0 && <div className="text-sm text-gray-500">No notifications</div>}

              {notifications.map((n: Notif) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationAsRead(n.id)}
                  className={`p-3 rounded-lg cursor-pointer transition ${n.read ? "bg-white" : "bg-blue-50"}`}
                >
                  <div className="font-semibold truncate" title={n.title}>{n.title}</div>
                  <div className="text-xs text-gray-600 truncate" title={n.message}>{n.message}</div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    {new Date(n.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-6 py-8 text-xs text-gray-500">© {new Date().getFullYear()} JustRide — Dashboard</div>
    </div>
  );
}
