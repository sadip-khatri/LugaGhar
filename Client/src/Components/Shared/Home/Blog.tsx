/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from "react";
import { SectionHeading, ViewAllLink } from "../../Ui/Typography";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BlogCard from "../../Ui/BlogCard";
import { blogs } from "../../../Data/BlogsData";
import { Link } from "react-router-dom";

const Blog = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Show all blogs
  // const latestBlogs = blogs.slice(0, 3);

  return (
    <section className="relative px-6 md:px-20 py-10">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <SectionHeading text="OUR BLOGS" />
          <p className="max-w-xl text-[var(--color-secondary)]">
            At LugaGhar, our blog is crafted to bring you the latest in fashion,
            style tips, and collection showcases. Whether you're looking for
            outfit inspiration or care guides for your favorite fabrics, our
            content is designed to empower your everyday style decisions. Stay
            connected. Stay stylish.
          </p>
        </div>
        <ViewAllLink href="blog" />
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-[60%] transform -translate-y-1/2 bg-[var(--color-bg)] border border-[var(--color-secondary)] rounded-full p-2 z-20 shadow-md hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg)] cursor-pointer"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-[60%] transform -translate-y-1/2 bg-[var(--color-bg)] border border-[var(--color-secondary)] rounded-full p-2 z-20 shadow-md hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg)] cursor-pointer"
      >
        <FaChevronRight />
      </button>

      {/* Blog Cards Scroll Area */}
      <div
        className="overflow-x-auto scroll-smooth hide-scrollbar mt-6"
        ref={scrollRef}
      >
        <div className="flex items-start w-max gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="w-[240px] h-[370px] bg-[var(--color-bg)] rounded-md overflow-hidden shadow-sm flex flex-col"
            >
              <Link
                to={`/blog/${blog.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-[180px] object-cover"
                />
                <div className="p-3 flex flex-col justify-between h-[170px]">
                  <p className="text-sm text-[var(--color-secondary)] pb-2">
                    {blog.author}
                  </p>
                  <h4 className="text-xs font-semibold uppercase tracking-wider pb-2 line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-base font-semibold mt-1 text-[var(--color-secondary)]">
                    {new Date(blog.date).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Hide Scrollbar Style */}
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

export default Blog;
