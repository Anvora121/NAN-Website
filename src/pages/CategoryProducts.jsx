import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";

function CategoryProducts() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/category/${slug}`);
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-[#FEFAE0] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-serif tracking-[0.18em] text-[#D4A373] mb-12 capitalize">
          {slug.replace("-", " ")}
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-[#6B705C]">No products in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    console.log("Image failed to load from:", e.target.src);
                    e.target.src = "https://via.placeholder.com/300?text=No+Image";
                  }}
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#6B705C] mb-2">{product.name}</h3>
                  {product.description && (
                    <p className="text-sm text-[#6B705C] mb-3">{product.description}</p>
                  )}
                  <p className="text-xl font-semibold text-[#D4A373]">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryProducts;
