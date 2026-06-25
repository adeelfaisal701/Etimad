import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/buyer")
      .then(res => setOrders(res.data))
      .catch(() => alert("Failed to load orders"));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="grid gap-6">
        {orders.map(o => (
          <div key={o._id} className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-xl font-bold">
              {o.product?.name}
            </h2>

            <p>Seller: {o.seller?.name}</p>

            <p className="mt-2 font-semibold">
              Amount: Rs.{o.amount}
            </p>

            <p className="mt-2 text-sm">
              Status:
              <span className="ml-2 font-bold text-indigo-600">
                {o.status}
              </span>
            </p>
            {o.status === "Delivered" && (
  <button
    onClick={async () => {
      await API.put(`/orders/${o._id}/received`);

      setOrders(prev =>
        prev.map(order =>
          order._id === o._id
            ? {
                ...order,
                status: "Completed",
                paymentStatus: "Released"
              }
            : order
        )
      );
    }}
    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl"
  >
    Mark Received
  </button>
)}

          </div>
        ))}
      </div>
    </div>
  );
}