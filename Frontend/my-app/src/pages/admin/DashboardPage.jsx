import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import TruckLoader from "../../components/TruckLoader.jsx";

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const COLORS = {
    Men: "#ef4444",
    Boys: "#3b82f6",
  };

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <TruckLoader />;

  return (
    <div className="space-y-10">

      <div className="grid grid-cols-1 text1 md:grid-cols-4 gap-6 font-serif">
        <StatCard title="Total Revenue"  value={`₹${stats.totalRevenue}`} />
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Active Users" value={stats.activeUsers} />
        <StatCard title="Avg Order Value" value={`₹${stats.avgOrderValue}`} />
      </div>



      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SALES BY CATEGORY */}
        <div className="bg-slate-800 p-6 rounded-lg font-serif ">
          <h2 className="text-lg mb-4 text1">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.salesByTargetGroup}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {stats.salesByTargetGroup.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name] || "#9ca3af"} 
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* MONTHLY ORDERS */}
        <div className="bg-slate-800 font-serif p-6 rounded-lg">
          <h2 className="text-lg mb-4 text1">Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.monthlyOrderData} >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#ef4444"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

const StatCard = ({ title, value }) => (
  <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
    <p className="text-slate-400 text-sm">{title}</p>
    <h2 className="text-2xl font-bold mt-2">{value}</h2>
  </div>
);
