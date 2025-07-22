import React from "react";

function FollowUs() {
  return (
    <>
      <section className="px-6 md:px-20 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center md:text-left text-[var(--color-text)]">
          FOLLOW US AT INSTAGRAM
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Large Image */}
          <div className="md:col-span-1">
            <img
              src="/assets/img/Home/hero.jpg"
              alt="Instagram 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Grid of 4 Images */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {" "}
            <img
              src="/assets/img/Home/hero.jpg"
              alt="Instagram 2"
              className="w-full h-full object-cover"
            />
            <img
              src="/assets/img/Home/hero.jpg"
              alt="Instagram 3"
              className="w-full h-full object-cover"
            />
            <img
              src="/assets/img/Home/hero.jpg"
              alt="Instagram 4"
              className="w-full h-full object-cover"
            />
            <img
              src="/assets/img/Home/hero.jpg"
              alt="Instagram 5"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default FollowUs;
