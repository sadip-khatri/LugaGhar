/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import ProductCard from "../../Ui/ProductCard";
import { Link } from "react-router-dom";
import api from "../../../Utils/api";

type Product = {
  _id: string;
  mainImage: string;
  title: string;
  price: number;
  category: string;
};

interface NewInProps {
  heading?: string;
  description?: string;
}

const NewIn: React.FC<NewInProps> = ({
  heading = "New Arrivals",
  description = "Check out the latest additions to our collection!",
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNewArrivals = async () => {
    try {
      const res = await api.get("/products");

      // Keep only products with category "new"
      const filtered = res.data.filter((p: any) => p.category === "new");

      // Show only first 3
      setProducts(filtered.slice(0, 4));
    } catch (err) {
      console.error("Failed to fetch new arrivals", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <section className="px-6 md:px-16 py-14 bg-white text-gray-900">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">{heading}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <Link to="/new-arrival">
          <button className="mt-5 px-6 py-2 bg-[#C62828] text-white rounded-full hover:bg-[#D4AF37] transition">
            Explore All →
          </button>
        </Link>
      </div>

      {/* Grid with 3 products max */}
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
            No new arrivals found.
          </p>
        )}
      </div>
    </section>
  );
};

export default NewIn;
