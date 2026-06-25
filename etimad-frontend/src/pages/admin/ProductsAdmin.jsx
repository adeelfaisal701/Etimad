import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function ProductsAdmin() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/admin/products")
      .then(res => setProducts(res.data));
  }, []);

  const deleteProduct = async (id) => {

    const ok = window.confirm(
      "Delete this product?"
    );

    if (!ok) return;

    await API.delete(`/admin/products/${id}`);

    setProducts(prev =>
      prev.filter(p => p._id !== id)
    );
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Products
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {products.map(p => (
          <div
            key={p._id}
            className="bg-white rounded-3xl shadow overflow-hidden"
          >

            <img
              src={`http://localhost:5000${p.image}`}
              className="h-56 w-full object-cover"
            />

            <div className="p-5">

              <h2 className="font-bold text-xl">
                {p.name}
              </h2>

              <p className="text-gray-500 mb-4">
                Seller: {p.seller?.name}
              </p>

              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-600 text-white px-5 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}