import React from "react";
import { Link } from "react-router-dom";

const OurStory: React.FC = () => {
  return (
    <section className="w-full bg-[var(--color-bg)] py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* LEFT: IMAGE */}
        <div className="w-full md:w-1/2">
          <img
            src="/creative-team-and-collaboration.jpg"
            alt="LugaGhar Studio"
            className="w-full h-auto rounded-2xl shadow-xl object-cover"
          />
        </div>

        {/* RIGHT: TEXT CONTENT */}
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)] mb-4 leading-tight">
            Our Story Begins with Fabric & Soul
          </h2>
          <p className="text-[var(--color-secondary)] text-base md:text-lg mb-6 leading-relaxed">
            LugaGhar is more than fashion — it’s a reflection of identity,
            comfort, and expression. Born in a small studio with a big dream,
            we’ve woven our values into every thread to bring you timeless
            apparel crafted for modern life.
          </p>
          <Link to="/our-story">
            <button className="bg-[var(--color-accent)] text-[var(--color-bg)] px-6 py-3 rounded-full font-medium hover:bg-[var(--color-cta)] transition">
              Discover the Full Journey →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
