import { useState } from "react";
import { api } from "../utils/api";

function AddItems() {
  const [form, setForm] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!image || !form.category || !form.name || !form.price) {
      setMessage("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", form.category);
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);

    try {
      await api.post("/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Product added successfully!");
      setForm({ category: "", name: "", description: "", price: "" });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Add New Product
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Fill in the details below to add a product to your store.
        </p>

        {message && (
          <div
            className={`mb-6 rounded-lg px-4 py-2 text-sm ${
              message.includes("success")
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select Category</option>
              <option>Kurtis</option>
              <option>Anarkalis</option>
              <option>Crop Tops</option>
              <option>Western Wear</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price *
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="₹0.00"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image *
            </label>
            <input
              type="file"
              onChange={handleImage}
              className="w-full text-sm"
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 mb-2">Image Preview</p>
              <img
                src={preview}
                alt="Preview"
                className="h-48 w-48 object-cover rounded-xl border"
              />
            </div>
          )}

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Write a short description..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItems;
