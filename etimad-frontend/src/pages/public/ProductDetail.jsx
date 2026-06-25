
// import { useParams,useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../../api/axios";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
// const navigate = useNavigate();
//   useEffect(() => {
//     API.get(`/products/${id}`)
//       .then((res) => setProduct(res.data))
//       .catch(() => alert("Failed to load product"));
//   }, [id]);

//   const placeOrder = async () => {
//     try {
//       await API.post("/orders", { productId: id });
//       alert("Order placed successfully");
//     } catch (err) {
//       alert("Login as buyer to place order");
//     }
//   };
//   const contactSeller = async () => {
//   const res = await API.post("/chat/conversation", {
//     sellerId: product.seller,
//     productId: product._id
//   });
//     const pathPre =  JSON.parse(localStorage.getItem("user")).role == "seller"?"seller":"buyer-dashboard";


//   navigate(`/${pathPre}/chat/${res.data._id}`);
// };

//   if (!product) return <div className="p-20">Loading...</div>;

//   return (
//     <div className="max-w-7xl mx-auto py-20 grid md:grid-cols-2 gap-16">

//       <img
//   src={`http://localhost:5000${product.image}`}
//         className="rounded-3xl shadow-xl"
//       />

//       <div>
//         <h1 className="text-5xl font-bold mb-6">{product.name}</h1>

//         <p className="text-gray-600 text-lg leading-8">
//           {product.description}
//         </p>

//         {/* <div className="text-4xl font-bold mt-8">
//           ${product.price}
//         </div> */}

//         <div className="mt-8 flex gap-4">
//           {/* <button
//             onClick={placeOrder}
//             className="bg-indigo-600 text-white px-8 py-4 rounded-2xl"
//           >
//             Place Direct Order
//           </button> */}

//           <button className="border px-8 py-4 rounded-2xl" onClick={contactSeller}   style={{
//               background:"#22666B",}}>
//            <label className="text-white"> Contact Seller</label>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";
import { useCart } from "../../context/CartContext";
import { color } from "framer-motion";
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
const { refreshCartCount } = useCart();
  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

 const addToCart = async () => {
  await API.post("/cart/add", {
    productId: id,
    quantity: qty,
  });

  refreshCartCount();
};

  const buyNow = async () => {
  await API.post("/cart/add", {
    productId: id,
    quantity: qty,
  });

  refreshCartCount();
  navigate("/checkout");
};

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-12">
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
        className="w-full rounded-3xl shadow-lg"
      />

      <div>
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <p className="text-3xl font-bold mb-6">Rs. {product.price}</p>

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-4 py-2 border rounded-xl"
          >
            -
          </button>
          <span className="text-xl font-bold">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-4 py-2 border rounded-xl"
          >
            +
          </button>
        </div>
 <div className="flex gap-4">
          <button
            onClick={addToCart}
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl"
              style={{ background: "#22666B"}}
          >
          <label className="text-white"> Add to Cart</label>
          </button>

          <button
            onClick={buyNow}
            className="border px-6 py-3 rounded-2xl"
          >
            Buy It Now
          </button>
        </div>
      </div>
    </div>
  );
}