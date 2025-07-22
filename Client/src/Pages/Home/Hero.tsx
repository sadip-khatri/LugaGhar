import React, { useEffect, useState } from "react";
import Button from "../../Components/Ui/Button";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    title: "CRAFT YOUR PERFECT LOOK, ONE PIECE AT A TIME.",
    description:
      "From timeless essentials to the latest trends, discover our curated collections of premium apparel. We believe in style that tells your story.",
    subtext:
      "Quality, comfort, and sophistication, delivered to your wardrobe.",
  },
  {
    title: "ELEVATE YOUR STYLE, DEFINE YOUR STORY.",
    description:
      "Explore versatile fashion pieces that suit every mood and moment. Your wardrobe deserves an upgrade.",
    subtext: "Elegance isn't bought. It's chosen.",
  },
  {
    title: "DESIGNED FOR COMFORT, BUILT FOR CONFIDENCE.",
    description:
      "We bring you fashion that feels as good as it looks. Find your new favorites with us.",
    subtext: "Effortless fashion starts here.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide (optional, can be removed)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full h-[80vh] max-w-[94%] mx-auto flex items-center bg-gradient-to-r from-[var(--color-secondary)]/90 to-[var(--color-text)]/90 text-[var(--color-bg)] relative overflow-hidden rounded-md mb-6 mt-2">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat w-[120%] h-full -left-10 z-0"
        style={{
          backgroundImage: "url('/assets/img/Home/hero.jpg')",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[var(--color-bg)]/30 hover:bg-[var(--color-bg)] text-[var(--color-text)] p-2 rounded-full transition"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[var(--color-bg)]/30 hover:bg-[var(--color-bg)] text-[var(--color-text)] p-2 rounded-full transition"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <div className="w-full transition-all duration-700 ease-in-out">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-bg)] leading-tight mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[var(--color-bg)]/80 w-full mb-2">
            {slides[currentSlide].description}
          </p>
          <p className="italic text-[var(--color-bg)]/60 w-full mb-6">
            {slides[currentSlide].subtext}
          </p>
          <Link to="new-arrival">
            <Button>
              Explore Now <span className="text-lg">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
