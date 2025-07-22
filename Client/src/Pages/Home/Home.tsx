/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  ShieldCheck,
  Truck,
  ShoppingBag,
  MessageCircleHeart,
} from "lucide-react";
import Hero from "./Hero";
import NewIn from "../../Components/Shared/Home/NewIn";
import Blog from "../../Components/Shared/Home/Blog";
import FollowUs from "../../Components/Shared/Home/FollowUs";
import NewsLetter from "../../Components/Shared/Home/NewsLetter";
import AdBanner from "../../Components/Shared/Home/AdBanner";
import OurStory from "../../Components/Shared/Home/OurStory";
import MensCollection from "../../Components/Shared/Home/MensCollection";
import WomensCollections from "../../Components/Shared/Home/WomensCollection";
import { FaStar, FaHeart } from "react-icons/fa";

const trustPoints = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    title: "Secure Payment",
    desc: "100% safe payments via eSewa",
    bg: "bg-[#C62828]",
  },
  {
    icon: <Truck className="w-6 h-6 text-white" />,
    title: "Fast Delivery",
    desc: "We deliver across Nepal",
    bg: "bg-[#2C3E50]",
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-white" />,
    title: "Handpicked Products",
    desc: "Only quality & trendy picks",
    bg: "bg-[#D4AF37]",
  },
  {
    icon: <MessageCircleHeart className="w-6 h-6 text-white" />,
    title: "Friendly Support",
    desc: "Here to help, anytime!",
    bg: "bg-[#1F1F1F]",
  },
];

const WhyShopWithUs = () => {
  return (
    <section className="px-4 bg-white mb-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1F1F1F] mb-10">
          Why Shop With Us
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-scroll-left w-max">
            {trustPoints.concat(trustPoints).map((item, index) => (
              <div
                key={index}
                className="bg-[#f9f9f9] rounded-2xl min-w-[250px] p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full ${item.bg} mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#1F1F1F]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#2C3E50] mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Floating Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
        {["hero", "new-in", "collections", "blog", "newsletter"].map(
          (section) => (
            <button
              key={section}
              onClick={() =>
                document
                  .getElementById(section)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-4 h-4 bg-white/30 rounded-full hover:bg-[#C62828] transition-all duration-300 shadow-lg"
              title={section.replace("-", " ")}
            />
          )
        )}
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen">
        <Hero />
      </section>

      {/* Why Shop With Us */}
      <WhyShopWithUs />

      {/* New In */}
      <section id="new-in" className="py-20 w-full">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <NewIn />
        </div>
      </section>

      {/* Ad Banner */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 w-full">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <AdBanner />
        </div>
      </section>

      {/* Men's Collection */}
      <section className="py-20 w-full">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <MensCollection />
        </div>
      </section>

      {/* Women's Collection */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 w-full">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <WomensCollections />
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <OurStory />
        </div>
      </section>

      {/* Blog */}
      <section
        id="blog"
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 w-full"
      >
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg mb-4">
              <FaStar className="w-4 h-4" />
              <span>Latest Insights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#C62828] to-[#1d4ed8] bg-clip-text text-transparent">
                Tech Blog
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest tech trends, expert tips, and
              industry insights from the world of innovation.
            </p>
          </div>
          <Blog />
        </div>
      </section>

      {/* Follow Us */}
      <section className="py-20 w-full">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg mb-4">
              <FaHeart className="w-4 h-4" />
              <span>Social Media</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#C62828] via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Follow Us
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow us on Instagram for the latest tech updates, exclusive
              product sneak peeks, and expert tips to upgrade your gadgets every
              day.
            </p>
          </div>
          <FollowUs />
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <NewsLetter />
        </div>
      </section>
    </div>
  );
};

export default Home;
