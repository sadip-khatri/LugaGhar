import React, { useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCountry } from "../../../Contexts/CountryContext";
import { formatPrice } from "../../../utils/formatPrice";

const items = [
  {
    id: 1,
    title: "CRINKLE STRIPE DRESS",
    price: 2000,
    image: "/assets/images/bag1.jpg",
  },
  {
    id: 2,
    title: "CRINKLE STRIPE DRESS",
    price: 2000,
    image: "/assets/images/bag2.jpg",
  },
  {
    id: 3,
    title: "CRINKLE STRIPE DRESS",
    price: 2000,
    image: "/assets/images/bag3.jpg",
  },
  {
    id: 4,
    title: "CRINKLE STRIPE DRESS",
    price: 2000,
    image: "/assets/images/bag4.jpg",
  },
  {
    id: 5,
    title: "CRINKLE STRIPE DRESS",
    price: 2000,
    image: "/assets/images/bag5.jpg",
  },
  {
    id: 6,
    title: "CRINKLE STRIPE DRESS",
    price: 2000,
    image: "/assets/images/bag5.jpg",
  },
  {
    id: 7,
    title: "CRINKLE STRIPE DRESS",
    price: 2000,
    image: "/assets/images/bag5.jpg",
  },
];

const YouMightAlsoLike: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedCountry } = useCountry();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="px-4 md:px-16 py-12 bg-[var(--color-bg)]">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)]">YOU MIGHT ALSO LIKE</h2>
          <p className="text-sm text-[var(--color-secondary)] mt-2 max-w-xl">
            Rooted in the concept of minimalism & re-usability, the bag is a
            classic silhouette that represents a bag that can do it all.
            Comfortable & convenient, the bag is an essential.
          </p>
        </div>
        <Link to="/shop">
          <button className="text-sm border-b border-[var(--color-accent)] hover:border-[var(--color-cta)] transition-colors text-[var(--color-accent)] hover:text-[var(--color-cta)]">
            SHOP NOW →
          </button>
        </Link>
      </div>

      {/* Scrollable Cards */}
      <div className="relative">
        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-[var(--color-bg)] border border-[var(--color-secondary)]/30 rounded-full p-2 z-10 shadow-md hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg)] cursor-pointer transition-colors"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-[var(--color-bg)] border border-[var(--color-secondary)]/30 rounded-full p-2 z-10 shadow-md hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg)] cursor-pointer transition-colors"
        >
          <FaChevronRight />
        </button>
        <div
          className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar pr-6"
          ref={scrollRef}
        >
          {items.map((item) => {
            const convertedPrice = item.price * selectedCountry.rate;
            return (
              <div
                key={item.id}
                className="min-w-[220px] bg-[var(--color-bg)] rounded-md overflow-hidden shadow-sm shrink-0 border border-[var(--color-secondary)]/20"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-3">
                  <p className="text-sm text-[var(--color-text)]">{item.title}</p>
                  <p className="font-semibold mt-1 text-[var(--color-secondary)]">
                    {formatPrice(convertedPrice, selectedCountry.currency)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      
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

export default YouMightAlsoLike;
