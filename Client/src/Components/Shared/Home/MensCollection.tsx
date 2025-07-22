/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "../../Ui/ProductCard";
import api from "../../../Utils/api";

function MensCollection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mensProducts, setMensProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const allowedCategories = ["M-Shirts", "M-Pants", "M-Blazers"];

  const fetchMensProducts = async () => {
    try {
      const res = await api.get("/products");
      console.log("All products fetched:", res.data.length);
      const filtered = res.data.filter((item: any) =>
        allowedCategories.includes(item.category)
      );
      console.log("Filtered mens products:", filtered.length);
      setMensProducts(filtered);
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

  const heading = "Mens Collection";
  const description = "Menswear That Moves With You.";

  return (
    <section className="relative px-4 md:px-16 py-10 bg-[var(--color-bg)]">
      {/* Arrow Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[var(--color-bg)] border border-[var(--color-secondary)] rounded-full p-2 z-10 shadow-md hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg)] cursor-pointer"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[var(--color-bg)] border border-[var(--color-secondary)] rounded-full p-2 z-10 shadow-md hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg)] cursor-pointer"
      >
        <FaChevronRight />
      </button>

      {/* Scrollable Container */}
      <div
        className="overflow-x-auto scroll-smooth hide-scrollbar"
        ref={scrollRef}
      >
        <div className="flex items-start w-max gap-4">
          {/* Intro Text Box */}
          <div className="min-w-[200px] shrink-0">
            <h2 className="text-2xl font-bold mt-1 text-[var(--color-text)]">
              {heading}
            </h2>
            <p className="text-sm text-[var(--color-secondary)] mt-2">
              {description}
            </p>
            <Link to="mens-collection">
              <button className="mt-4 px-5 py-2 border cursor-pointer border-[var(--color-secondary)] text-[var(--color-secondary)] text-sm rounded-full hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg)] transition">
                Shop Now →
              </button>
            </Link>
          </div>

          {/* Product Cards */}
          {loading ? (
            <p className="text-[var(--color-secondary)]">Loading...</p>
          ) : mensProducts.length > 0 ? (
            mensProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="min-w-[220px] shrink-0"
              >
                <Link to={`/product/${product.id}`} className="block">
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
            <p className="text-[var(--color-secondary)]">
              No men's products found.
            </p>
          )}
        </div>
      </div>

      {/* Inline CSS to hide scrollbar */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default MensCollection;
