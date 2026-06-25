import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AdminDashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get("/admin/dashboard")
      .then(res => setStats(res.data));
  }, []);

  const cards = [
    {
      title: "Revenue",
      value: `Rs.${stats.totalRevenue || 0}`
    },
    {
      title: "Buyers",
      value: stats.totalBuyers || 0
    },
    {
      title: "Sellers",
      value: stats.totalSellers || 0
    },
    {
      title: "Products",
      value: stats.totalProducts || 0
    },
    {
      title: "Orders",
      value: stats.totalOrders || 0
    }
  ];

  return (
    <div>

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {cards.map((c, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-3xl shadow"
          >
            <p className="text-gray-500 mb-2">
              {c.title}
            </p>

            <h2 className="text-3xl font-bold">
              {c.value}
            </h2>
          </div>
        ))}

      </div>
    </div>
  );
}