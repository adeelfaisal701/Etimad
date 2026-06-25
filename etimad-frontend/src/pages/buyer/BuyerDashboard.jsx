import { useEffect, useState } from "react";
import API from "../../api/axios";
import StatsCard from "../../components/StatsCard";

export default function BuyerDashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/dashboard/buyer")
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Buyer Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatsCard title="Total Orders" value={data.totalOrders || 0} />
        <StatsCard title="Pending Orders" value={data.pending || 0} />
        <StatsCard title="Completed Orders" value={data.completed || 0} />
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3>Commission</h3>
          <p className="text-2xl font-bold text-red-500">
            Rs.{0}
          </p>
        </div>
      </div>
    </div>
  );
}