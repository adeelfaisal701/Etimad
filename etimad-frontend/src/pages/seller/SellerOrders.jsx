import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/seller").then((res) => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/orders/${id}/status`, { status });

    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status } : o
      )
    );
  };

  //format ID into 2 lines
  const formatId = (id) => {
    if (!id) return "";
    return (
      <>
        {id.slice(0, 12)} <br />
        {id.slice(12)}
      </>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#22666B]">
        Seller Orders
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full min-w-[1200px] text-sm">
          <thead className="bg-[#2f6f6f] text-white">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Product ID</th>
              <th className="p-3 text-left">Seller ID</th>
              <th className="p-3 text-left">Buyer ID</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Admin Commission</th>
              {/* <th className="p-3 text-left">Max Cap</th> */}
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => {
              const isLocked = o.status === "Completed";

              return (
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

                  {/* SELLER ID */}
                  <td className="p-3 text-xs font-mono">
                    {formatId(o.seller)}
                  </td>

                  {/* BUYER ID */}
                  <td className="p-3 text-xs font-mono">
                    {formatId(o.buyer?._id)}
                  </td>

                  {/* PRODUCT NAME */}
                  <td className="p-3 font-medium">
                    {o.product?.name}
                  </td>

                  {/* AMOUNT */}
                  <td className="p-3 font-semibold text-[#22666B]">
                    Rs. {o.amount}
                  </td>

                  {/* ADMIN COMMISSION */}
                  <td className="p-3">
                    Rs. {o.adminCommission || 0}
                  </td>

                  {/* MAX CAP */}
                  {/* <td className="p-3 font-bold">500</td> */}

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        o.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : o.status === "Shipped"
                          ? "bg-yellow-100 text-yellow-700"
                          : o.status === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>

                  {/* ACTION DROPDOWN */}
                  <td className="p-3">
                    <select
                      disabled={isLocked}
                      value={o.status}
                      onChange={(e) =>
                        updateStatus(o._id, e.target.value)
                      }
                      className={`border rounded-lg px-2 py-1 text-sm ${
                        isLocked
                          ? "bg-gray-100 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    >
                      <option value="Processing">{isLocked? "Completed":"Processing"} </option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      {/* <option value="Completed">Completed</option> */}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}