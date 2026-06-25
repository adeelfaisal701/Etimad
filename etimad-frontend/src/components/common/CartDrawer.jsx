import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Lock } from "lucide-react";
import API from "../../api/axios";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function CartDrawer({ open, onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { refreshCartCount } = useCart();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await API.get("/cart");
      setCart(res.data);
      refreshCartCount();
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && user) {
      loadCart();
    }
  }, [open, user]);

  const updateQty = async (itemId, currentQty, amount) => {
    const newQty = currentQty + amount;
    if (newQty < 1) return;
    try {
      const res = await API.put(`/cart/item/${itemId}`, { quantity: newQty });
      setCart(res.data);
      refreshCartCount();
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const res = await API.delete(`/cart/item/${itemId}`);
      setCart(res.data);
      refreshCartCount();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const subtotal = cart.items ? cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) : 0;

  const totalItems = cart.items ? cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  ) : 0;

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 font-sans ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-[#22666B] w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-800">Your Cart</h2>
            {user && totalItems > 0 && (
              <span className="bg-teal-100 text-[#22666B] text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="h-full flex items-center justify-center flex-col">
              <svg className="animate-spin h-8 w-8 text-[#22666B] mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
              <span className="text-slate-400 text-sm">Loading items...</span>
            </div>
          ) : !user ? (
            /* Guest View */
            <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Your cart is waiting</h3>
              <p className="text-slate-500 text-sm max-w-xs mb-8">
                Sign in to view saved items, manage your cart and continue shopping.
              </p>
              <div className="w-full space-y-3">
                <button
                  onClick={() => {
                    onClose();
                    navigate("/login");
                  }}
                  className="w-full bg-[#22666B] text-white py-3 rounded-xl font-bold hover:bg-[#1a4f52] transition shadow-md"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate("/signup");
                  }}
                  className="w-full border border-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition"
                >
                  Create Account
                </button>
              </div>
            </div>
          ) : !cart.items || cart.items.length === 0 ? (
            /* Empty Cart Logged In */
            <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Your cart is empty</h3>
              <p className="text-slate-500 text-sm max-w-xs mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate("/products");
                }}
                className="w-full bg-[#22666B] text-white py-3 rounded-xl font-bold hover:bg-[#1a4f52] transition shadow-md"
              >
                Browse Products
              </button>
            </div>
          ) : (
            /* Items List */
            <div className="space-y-6 animate-fadeIn">
              {cart.items.map((item) => {
                const imageUrl = item.product.image
                  ? (item.product.image.startsWith("http")
                      ? item.product.image
                      : `http://localhost:5000${item.product.image}`)
                  : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80";

                return (
                  <div key={item._id} className="flex gap-4 p-2 rounded-xl hover:bg-slate-50 transition">
                    <img
                      src={imageUrl}
                      alt={item.product.name || item.product.title}
                      className="w-20 h-20 object-cover rounded-xl border border-slate-100 flex-shrink-0 bg-slate-50"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 text-sm truncate">
                        {item.product.name || item.product.title}
                      </h4>
                      <p className="text-[#22666B] font-bold text-sm mt-1">
                        Rs. {item.price}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => updateQty(item._id, item.quantity, -1)}
                            disabled={item.quantity <= 1}
                            className="p-1 px-2.5 hover:bg-slate-50 text-slate-500 disabled:opacity-30 transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-slate-700 w-6 text-center select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item._id, item.quantity, 1)}
                            className="p-1 px-2.5 hover:bg-slate-50 text-slate-500 transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove item */}
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-slate-400 hover:text-red-500 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Checkout Panel */}
        {user && cart.items && cart.items.length > 0 && (
          <div className="border-t border-slate-100 p-6 bg-slate-50/50 space-y-4">
            <div className="flex justify-between items-center text-slate-800">
              <span className="font-semibold text-sm">Subtotal</span>
              <span className="font-bold text-lg text-[#22666B]">Rs. {subtotal.toFixed(2)}</span>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
                className="w-full bg-[#22666B] text-white py-3.5 rounded-xl font-bold hover:bg-[#1a4f52] transition flex items-center justify-center gap-2 shadow-md"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}