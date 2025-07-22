/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import ProductCard from "../../Ui/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../../Utils/api";
import { toast } from "react-toastify";

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
  heading = "NEW IN",
  description = "Discover all-new arrivals.",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const fetchNewArrivals = async () => {
    try {
      const res = await api.get("/products?tag=new");

      // ✅ Only keep products with id <= 10
      const filtered = res.data.filter((p: any) => p.id && p.id <= 10);

      setProducts(filtered);
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

  const handleAddToCart = (product: Product, selectedSize: string = "M") => {
    const cartProduct = {
      id: product._id,
      name: product.title,
      price: product.price,
      selectedSize,
      quantity: 1,
      images: {
        main: product.mainImage,
      },
    };

    const existingCart = JSON.parse(
      localStorage.getItem("cartProducts") || "[]"
    );

    const existingItemIndex = existingCart.findIndex(
      (item: any) =>
        item.id === product._id && item.selectedSize === selectedSize
    );

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartProduct);
    }

    localStorage.setItem("cartProducts", JSON.stringify(existingCart));
    toast.success(`${product.title} added to cart!`);
  };

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
            <h2 className="text-2xl font-bold mt-1 text-[var(--color-text)]">{heading}</h2>
            <p className="text-sm text-[var(--color-secondary)] mt-2">{description}</p>
            <Link to="new-arrival">
              <button className="mt-4 px-5 py-2 border cursor-pointer border-[var(--color-secondary)] text-[var(--color-secondary)] text-sm rounded-full hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg)] transition">
                Shop Now →
              </button>
            </Link>
          </div>

          {/* Product Cards */}
          {loading ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="min-w-[220px] shrink-0">
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
            <p>No new arrivals found.</p>
          )}
        </div>
      </div>

      {/* Inline CSS for hiding scrollbar */}
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
};

export default NewIn;
