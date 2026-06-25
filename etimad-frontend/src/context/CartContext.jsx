import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    try {
      const res = await API.get("/cart");
      setCartCount(res.data.items.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartCount, setCartCount, refreshCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);