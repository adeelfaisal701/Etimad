import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "General",
    stockQuantity: "",
    status: "Active",
    image: null
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    API.get("/products/my").then(res => setProducts(res.data));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("stockQuantity", form.stockQuantity);
    formData.append("status", form.status);
    if (form.image) formData.append("image", form.image);

    if (editingId) {
      await API.put(`/products/${editingId}`, formData);
    } else {
      await API.post("/products", formData);
    }

    setForm({
      name: "",
      price: "",
      description: "",
      category: "General",
      stockQuantity: "",
      status: "Active",
      image: null
    });
    setEditingId(null);
    loadProducts();
  };

  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    loadProducts();
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name || p.title || "",
      price: p.price !== undefined ? p.price.toString() : "",
      description: p.description || "",
      category: p.category || "General",
      stockQuantity: p.stockQuantity !== undefined ? p.stockQuantity.toString() : "",
      status: p.status || "Active",
      image: null
    });
    setEditingId(p._id);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8 space-y-4">

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          className="border p-3 w-full rounded-xl"
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({...form, price: e.target.value})}
          className="border p-3 w-full rounded-xl"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
          className="border p-3 w-full rounded-xl"
        />

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({...form, category: e.target.value})}
              className="border p-3 w-full rounded-xl bg-white"
            >
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Beauty">Beauty</option>
              <option value="Accessories">Accessories</option>
              <option value="Gaming">Gaming</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              placeholder="Stock Quantity"
              value={form.stockQuantity}
              onChange={(e) => setForm({...form, stockQuantity: e.target.value})}
              className="border p-3 w-full rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({...form, status: e.target.value})}
              className="border p-3 w-full rounded-xl bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          <input
            type="file"
            onChange={(e) => setForm({...form, image: e.target.files[0]})}
            className="w-full"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl"
        >
          {editingId ? "Update" : "Create"} Product
        </button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p._id} className="bg-white p-4 rounded-xl shadow">

            <img
              src={`http://localhost:5000${p.image}`}
              className="h-40 w-full object-cover rounded"
            />

            <h2 className="font-bold mt-2 text-lg">{p.name || p.title}</h2>
            <p className="text-teal-700 font-semibold">Rs. {p.price}</p>
            <div className="text-sm text-gray-500 mt-1 space-y-1">
              <div>Category: <span className="font-medium text-gray-700">{p.category || "General"}</span></div>
              <div>Stock: <span className="font-medium text-gray-700">{p.stockQuantity}</span></div>
              <div>Status: <span className={`font-semibold ${p.status === "Active" ? "text-green-600" : "text-red-500"}`}>{p.status || "Active"}</span></div>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
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