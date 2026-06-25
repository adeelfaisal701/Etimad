import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Cart({ onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const { refreshCartCount } = useCart();

  const loadCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
      refreshCartCount();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const updateQty = async (id, quantity) => {
    if (quantity < 1) return;
    const res = await API.put(`/cart/item/${id}`, { quantity });
    setCart(res.data);
    refreshCartCount();
  };

  const removeItem = async (id) => {
    const res = await API.delete(`/cart/item/${id}`);
    setCart(res.data);
    refreshCartCount();
  };

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="p-20 text-center text-lg font-semibold">
        Loading cart...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4 animate-fadeIn text-center">
        <h1 className="text-4xl font-bold mb-8 text-[#2f6f6f]">
          My Cart
        </h1>
        <div className="py-20 bg-white rounded-3xl shadow">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold">Sign in to view your cart</h2>
          <p className="text-gray-500 mt-2">
            Please log in to view items in your shopping cart
          </p>
          <button
            onClick={() => {
              if (onClose) onClose();
              navigate("/login");
            }}
            className="mt-6 bg-[#2f6f6f] text-white px-8 py-3 rounded-2xl hover:opacity-90 transition font-semibold"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-8 text-[#2f6f6f]">
        My Cart
      </h1>

      {/* EMPTY STATE */}
      {cart.items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-gray-500 mt-2">
            Add some products to continue shopping
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-[#2f6f6f] text-white px-6 py-3 rounded-2xl hover:opacity-90 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          {/* ITEMS */}
          <div className="space-y-5">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-2xl shadow-md flex justify-between items-center hover:shadow-lg transition transform hover:-translate-y-1"
              >
                {/* Product Info */}
                <div>
                  <h2 className="font-bold text-lg">
                    {item.product.name}
                  </h2>
                  <p className="text-[#2f6f6f] font-semibold">
                    Rs. {item.price}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQty(item._id, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100"
                  >
                    -
                  </button>

                  <span className="font-semibold w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQty(item._id, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 ml-4 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="mt-10 bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Subtotal:{" "}
              <span className="text-[#2f6f6f]">
                Rs. {subtotal}
              </span>
            </h2>

            <button
              onClick={() =>{ 
                  if (onClose) onClose();
                navigate("/checkout");

              }}
              className="bg-[#2f6f6f] text-white px-8 py-4 rounded-2xl hover:opacity-90 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}