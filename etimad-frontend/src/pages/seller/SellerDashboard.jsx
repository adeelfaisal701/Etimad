import { useEffect, useState } from "react";
import API from "../../api/axios";
import StatsCard from "../../components/StatsCard";

export default function SellerDashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/dashboard/seller")
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <StatsCard title="Total Orders" value={data.totalOrders || 0} />
        <StatsCard title="Processing" value={data.processing || 0} />
                <StatsCard title="Shipped" value={data.shipped || 0} />

        <StatsCard title="Delivered" value={data.delivered || 0} />
                <StatsCard title="Completed" value={data.completed || 0} />

        <StatsCard title="Earnings" value={`Rs.${data.totalEarnings || 0}`} />
      </div>
    </div>
  );
}