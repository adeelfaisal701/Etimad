import { Link } from "react-router-dom";
import API from "../../api/axios";
import {useEffect } from "react";

export default function CheckoutSuccess() {
    useEffect(() => {
  API.delete("/cart/clear");
}, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-md w-full text-center animate-fadeIn">

        {/* ICON */}
        <div className="text-6xl mb-4">🎉</div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-[#2f6f6f] mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-500 mb-6">
          Your order has been placed successfully. You will receive confirmation shortly.
        </p>

        {/* SUCCESS BOX */}
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6">
          Thank you for shopping with us ❤️
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3">

          <Link
            to="/products"
            className="w-full py-3 rounded-xl text-white font-semibold bg-[#2f6f6f] hover:opacity-90 transition"
          >
          <label className="text-white">  Continue Shopping</label>
          </Link>

          <Link
            to="/buyer-dashboard/orders"
            className="w-full py-3 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            View Orders
          </Link>

        </div>
      </div>
    </div>
  );
}