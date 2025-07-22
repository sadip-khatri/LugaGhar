/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";

const AdBanner = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[var(--color-secondary)] via-[var(--color-accent)] to-[var(--color-secondary)] text-[var(--color-bg)] py-12 px-6 md:px-20 rounded-lg shadow-md overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left: Text Content */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">LugaGhar</h2>
          <p className="text-xl sm:text-2xl font-semibold mb-2">
            Timeless Styles & Modern Apparel
          </p>
          <p className="text-[var(--color-bg)]/80 mb-6 text-sm sm:text-base max-w-md">
            Discover our collections of dresses, suits, casual wear, and
            accessories designed for your lifestyle.
          </p>
          {/* <Link
            to="/new-arrival"
            className="inline-block bg-white text-blue-700 px-5 py-2 rounded-md font-medium shadow hover:bg-gray-100 transition"
          >
            Shop Now →
          </Link> */}
        </div>

        {/* Right: Tech Product Display */}
        <div className="flex justify-center md:justify-end items-center gap-4 flex-wrap">
          <img
            src="/assets/img/Home/laptop-ad.png"
            alt="Blazers"
            className="w-28 h-auto"
          />
          <img
            src="/assets/img/Home/phone-ad.png"
            alt="Bodycon"
            className="w-20 h-auto"
          />
          <img
            src="/assets/img/Home/watch-ad.png"
            alt="Necklace"
            className="w-16 h-auto"
          />
          <img
            src="/assets/img/Home/headphone-ad.png"
            alt="Caps"
            className="w-24 h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default AdBanner;
