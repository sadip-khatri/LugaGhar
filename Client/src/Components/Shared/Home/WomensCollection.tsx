/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ProductCard from "../../Ui/ProductCard";
import { Link } from "react-router-dom";
import api from "../../../Utils/api";

const WomensCollections = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const allowedCategories = [
    "Bodycon",
    "Lehenga",
    "Sari",
    "Tops",
    "Miniskirt",
    "W-Shirts",
    "W-Pants",
  ];

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      const filtered = res.data.filter((item: any) =>
        allowedCategories.includes(item.category)
      );
      setProducts(filtered.slice(0, 4)); // ✅ Only show first 4
    } catch (err) {
      console.error("Failed to fetch women's products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="px-6 md:px-16 py-14 bg-white text-gray-900">
      {/* Top Text Section */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-2">
          WOMEN'S COLLECTIONS
        </h2>
        <p className="text-[var(--color-secondary)] mb-4">
          Inspired by elegance and crafted for confidence, our women’s
          collection blends timeless style with modern versatility. Perfect for
          every moment—from work to weekend—each piece empowers you to shine
          with grace and comfort.
        </p>
        <Link to="/womens-collection">
          <button className="mt-5 px-6 py-2 bg-[#C62828] text-white rounded-full hover:bg-[#D4AF37] transition">
            Shop Now →
          </button>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 h-[300px] animate-pulse rounded-md"
            ></div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="min-w-[220px] shrink-0">
              <Link to={`/product/${product._id}`} className="block">
                <ProductCard
                  id={product._id}
                  image={product.mainImage}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                />
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No women's products found.
          </p>
        )}
      </div>
    </section>
  );
};

export default WomensCollections;
