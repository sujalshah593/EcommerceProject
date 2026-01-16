import { useEffect, useState } from "react";
import { Search, Filter, ChevronRight, Package } from "lucide-react";
import api from "../../api/axios.js";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/admin/orders/${id}`, { status });
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "All" || o.status === status;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-8 font-serif">
      <h1 className="text-4xl font-serif font-bold text-white">Orders</h1>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
            placeholder="Search order..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 text-white"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map((o) => (
          <div
            key={o._id}
            className="bg-slate-800 p-6 rounded-lg border border-slate-700"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="bg-purple-900/20 p-3 rounded-lg">
                  <Package className="text-purple-400" />
                </div>
                <div>
                  <p className=" text-lg font-bold">
                    {o.orderItems.map((i) => i.name).join(", ")}
                  </p>

                  {/* Customer name */}
                  <p className="text-slate-300">
                    {o.user?.name || "Guest User"}
                  </p>
                  {/*P name*/}
                  <p className="font">{o._id}</p>

                  <p className="text-slate-500 text-xs">Status: {o.status}</p>
                </div>
              </div>

              <button
                onClick={() => updateStatus(o._id, "Shipped")}
                className="text-sm bg-purple-600 px-4 py-2 rounded"
              >
                Mark Shipped
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
