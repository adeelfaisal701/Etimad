import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import CartDrawer from "../components/common/CartDrawer";
import { useCart } from "../context/CartContext";
import { Outlet } from "react-router-dom";
import Footer from "../old_src/components/Footer";

export default function PublicLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  const { refreshCartCount } = useCart();

  useEffect(() => {
    refreshCartCount(); //  NO API PASS
  }, []);

  return (
    <>
      <Navbar onOpenCart={() => setCartOpen(true)} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      <Outlet />
      <Footer/>
        
    </>
  );
}