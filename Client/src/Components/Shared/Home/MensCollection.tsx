/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../Ui/ProductCard";
import api from "../../../Utils/api";

type Product = {
  _id: string;
  mainImage: string;
  title: string;
  price: number;
  category: string;
};

const MensCollection: React.FC = () => {
  const [mensProducts, setMensProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const allowedCategories = ["M-Shirts", "M-Pants", "M-Blazers"];

  const fetchMensProducts = async () => {
    try {
      const res = await api.get("/products");
      const filtered = res.data.filter((item: Product) =>
        allowedCategories.includes(item.category)
      );
      setMensProducts(filtered.slice(0, 4)); // show only 4 products
    } catch (err) {
      console.error("Failed to fetch mens products", err);
      setMensProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMensProducts();
  }, []);

  const heading = "Men's Collection";
  const description = "Menswear That Moves With You.";

  return (
    <section className="px-6 md:px-16 py-14 bg-white text-gray-900">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">{heading}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <Link to="/mens-collection">
          <button className="mt-5 px-6 py-2 bg-[#C62828] text-white rounded-full hover:bg-[#D4AF37] transition">
            Shop Now →
          </button>
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 h-[300px] animate-pulse rounded-md"
            ></div>
          ))
        ) : mensProducts.length > 0 ? (
          mensProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="block"
            >
              <ProductCard
                id={product._id}
                image={product.mainImage}
                title={product.title}
                price={product.price} // ✅ Price logic untouched
                category={product.category}
              />
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No men's products found.
          </p>
        )}
      </div>
    </section>
  );
};

export default MensCollection;
