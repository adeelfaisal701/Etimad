// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/common/Navbar";
// import CartDrawer from "../components/common/CartDrawer";

// export default function PublicLayout() {
//   const [cartOpen, setCartOpen] = useState(false);

//   return (
//     <>
//       <Navbar onOpenCart={() => setCartOpen(true)} />

//       <CartDrawer
//         open={cartOpen}
//         onClose={() => setCartOpen(false)}
//       />

//       <Outlet />
//     </>
//   );
// }