import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Earnings() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/dashboard/seller/earnings")
      .then(res => setData(res.data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Earnings</h1>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3>Total Revenue</h3>
          <p className="text-2xl font-bold">Rs.{data.totalRevenue}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3>Commission</h3>
          <p className="text-2xl font-bold text-red-500">
            Rs.{data.totalCommission}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3>Net Earnings</h3>
          <p className="text-2xl font-bold text-green-600">
            Rs.{data.netEarnings}
          </p>
        </div>
      </div>

      {/* ORDERS LIST */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">Order Breakdown</h2>

        {data.orders.map(o => (
          <div key={o._id} className="border-b py-3 flex justify-between">
            <span>{o.product?.name}</span>
            <span>Rs.{o.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}