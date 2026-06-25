import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
];

export default function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    country: "Pakistan",
    city: "Karachi",
    name: "",
    address: "",
    phone: "",
    saveInfo: false,
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  // ---------------- VALIDATION ----------------
  const isFormValid =
    form.email.trim() &&
    form.name.trim() &&
    form.address.trim() &&
    form.phone.trim() &&
    form.city &&
    form.country &&
    paymentMethod;

  // ---------------- STRIPE ----------------
  const handleStripePayment = async () => {
    const res = await API.post("/stripe/create-checkout-session", {
      cartItems: [
        {
          name: "Order Payment",
          price: 999.99*1000,
          quantity: 1,
        },
      ],
    });
    placeOrder();

    window.location.href = res.data.url;
  };

  // ---------------- PLACE ORDER ----------------
  const placeOrder = async () => {
    await API.post("/checkout", {
      shippingInfo: form,
      paymentMethod,
    });

    await API.delete("/cart/clear");

    navigate("/checkout-success");
  };

  // ---------------- MAIN HANDLER ----------------
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      if (paymentMethod === "Visa") {
        await handleStripePayment();
        return;
      }

      await placeOrder();
    } catch (err) {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-[#2f6f6f]">
        Checkout
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-lg space-y-5">

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Email"
            className="border p-4 rounded-xl"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Full Name"
            className="border p-4 rounded-xl"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <select
          className="w-full border p-4 rounded-xl"
          value={form.country}
          onChange={(e) =>
            setForm({ ...form, country: e.target.value })
          }
        >
          <option>Pakistan</option>
        </select>

        <select
          className="w-full border p-4 rounded-xl"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
        >
          {cities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>

        <textarea
          placeholder="Address"
          className="w-full border p-4 rounded-xl"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          className="w-full border p-4 rounded-xl"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        {/* PAYMENT */}
        <div className="pt-4">
          <h2 className="font-bold text-lg mb-3">
            Payment Method
          </h2>

          {["Visa", "JazzCash", "Cash on Delivery"].map(
            (method) => (
              <label
                key={method}
                className="flex items-center gap-3 mb-3 cursor-pointer"
              >
                <input
                  type="radio"
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />
                <span>{method}</span>
              </label>
            )
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handlePlaceOrder}
          disabled={!isFormValid || loading}
          className={`w-full py-4 rounded-2xl text-white font-semibold text-lg transition ${
            !isFormValid || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2f6f6f] hover:opacity-90"
          }`}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}