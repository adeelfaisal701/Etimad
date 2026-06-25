import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/admin/orders").then((res) => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    const res = await API.put(`/admin/orders/${id}`, {
      status,
    });

    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? res.data : o
      )
    );
  };

  // Format Mongo ID into two lines
  const formatId = (id) => {
    if (!id) return "";
    return (
      <>
        {id.toString().slice(0, 12)}
        <br />
        {id.toString().slice(12)}
      </>
    );
  };

  // Badge colors for order status
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Delivered":
        return "bg-emerald-100 text-emerald-700";
      case "Shipped":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Payment Verified":
        return "bg-purple-100 text-purple-700";
      case "Refunded":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const statusOptions = [
    "Pending Payment",
    "Payment Submitted",
    "Payment Verified",
    "Processing",
    "Shipped",
    "Delivered",
    "Completed",
    "Refunded",
  ];

  const deleteOrder = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this order?");
  if (!confirmDelete) return;

  try {
    await API.delete(`/admin/orders/${id}`);

    setOrders((prev) => prev.filter((o) => o._id !== id));
  } catch (err) {
    console.error(err);
    alert("Failed to delete order");
  }
};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#2f6f6f]">
        Admin Orders
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full min-w-[1500px] text-sm">
          <thead className="bg-[#2f6f6f] text-white">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Product ID</th>
              <th className="p-3 text-left">Buyer ID</th>
              <th className="p-3 text-left">Seller ID</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Buyer</th>
              <th className="p-3 text-left">Seller</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Commission</th>
              <th className="p-3 text-left">Seller Receivable</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr
                key={o._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* ORDER ID */}
                <td className="p-3 text-xs font-mono">
                  {formatId(o._id)}
                </td>

                {/* PRODUCT ID */}
                <td className="p-3 text-xs font-mono">
                  {formatId(o.product?._id)}
                </td>

                {/* BUYER ID */}
                <td className="p-3 text-xs font-mono">
                  {formatId(o.buyer?._id)}
                </td>

                {/* SELLER ID */}
                <td className="p-3 text-xs font-mono">
                  {formatId(o.seller?._id || o.seller)}
                </td>

                {/* PRODUCT NAME */}
                <td className="p-3 font-medium">
                  {o.product?.name || "N/A"}
                </td>

                {/* BUYER NAME */}
                <td className="p-3">
                  {o.buyer?.name || "N/A"}
                </td>

                {/* SELLER NAME */}
                <td className="p-3">
                  {o.seller?.name || "N/A"}
                </td>

                {/* QUANTITY */}
                <td className="p-3">
                  {o.quantity || 1}
                </td>

                {/* TOTAL AMOUNT */}
                <td className="p-3 font-semibold text-[#2f6f6f]">
                  Rs. {o.amount?.toLocaleString() || 0}
                </td>

                {/* ADMIN COMMISSION */}
                <td className="p-3">
                  Rs. {o.adminCommission?.toLocaleString() || 0}
                </td>

                {/* SELLER RECEIVABLE */}
                <td className="p-3">
                  Rs. {o.sellerReceivable?.toLocaleString() || 0}
                </td>

                {/* PAYMENT METHOD */}
                <td className="p-3">
                  {o.paymentMethod || "N/A"}
                </td>

                {/* STATUS BADGE */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                      o.status
                    )}`}
                  >
                    {o.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2 items-center">

  {/* STATUS UPDATE */}
  <select
    value={o.status}
    onChange={(e) => updateStatus(o._id, e.target.value)}
    className="border rounded-lg px-3 py-2 text-sm bg-white"
  >
    {statusOptions.map((status) => (
      <option key={status} value={status}>
        {status}
      </option>
    ))}
  </select>

  {/* DELETE BUTTON */}
  <button
    onClick={() => deleteOrder(o._id)}
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
  >
    Delete
  </button>

</td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="14"
                  className="p-8 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}