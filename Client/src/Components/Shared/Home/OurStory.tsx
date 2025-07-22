import React from "react";
import { SectionHeading, ViewAllLink } from "../../Ui/Typography";

const OurStory: React.FC = () => {
  return (
    <section className="px-6 md:px-20 py-16 bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-bg)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <SectionHeading text="OUR STORY" />
          <p className="max-w-2xl text-[var(--color-secondary)] text-sm md:text-base leading-relaxed mt-2">
            At <strong>LugaGhar</strong>, we believe fashion should empower
            everyday life. From humble beginnings to becoming a
            trusted name in apparel, our mission is to empower you
            through quality, comfort, and style.
          </p>
        </div>
        <a
          href="/our-story"
          className="text-[var(--color-accent)] hover:text-[var(--color-cta)] transition font-medium text-sm md:text-base"
        >
          Learn More →
        </a>
      </div>

      {/* Visual Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <img
          src="/assets/img/Home/tech-innovation.jpg"
          alt="Tech innovation lab"
          className="rounded-xl object-cover w-full h-80 shadow-lg hover:scale-[1.02] transition-transform"
        />

        <div className="space-y-6">
          <img
            src="/assets/img/Home/team-brainstorming.jpg"
            alt="Team brainstorming"
            className="w-full h-36 rounded-xl object-cover shadow-md"
          />
          <img
            src="/assets/img/Home/gadget-distribution.jpg"
            alt="Gadget distribution"
            className="w-full h-36 rounded-xl object-cover shadow-md"
          />
          <div className="bg-[var(--color-bg)] border border-[var(--color-secondary)] flex items-center justify-center rounded-xl h-14 font-bold text-lg text-[var(--color-accent)] shadow-sm">
            {/* <img
              src="/images/logo-tech.png"
              alt="246 Impex"
              className="h-6 mr-2"
            /> */}
            LugaGhar
          </div>
        </div>

        <img
          src="/assets/img/Home/tech-showroom.jpg"
          alt="Tech showroom"
          className="rounded-xl object-cover w-full h-80 shadow-lg hover:scale-[1.02] transition-transform"
        />
      </div>

      {/* Founder Story */}
      {/* <div className="mt-16 bg-white shadow-lg rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              FROM GARAGE LAB TO GLOBAL TECH BRAND
            </h3>
            <p className="text-gray-500 mt-1 text-sm">
              with Alex Khatri, Founder of 246 Impex
            </p>
            <ViewAllLink href="/interview/founder-story" />
          </div>
          <div className="flex-[2] text-gray-700 text-sm md:text-base leading-relaxed">
            <p>
              In this exclusive feature, our founder Alex Khatri shares the
              inspiring journey of launching 246 Impex — overcoming early
              struggles, building a user-centric tech platform, and scaling to
              serve customers across the globe.
            </p>
            <a
              href="/interview/founder-story"
              className="text-blue-600 underline font-medium mt-3 inline-block hover:text-blue-800"
            >
              Read the full interview
            </a>
          </div>
        </div> */}
    </section>
  );
};

export default OurStory;
