import React, { useState } from "react";
import TopHead from "../../Components/Shared/Blogs/TopHead";
import { blogs } from "../../Data/BlogsData";
import { Link } from "react-router-dom";

function Blogs() {
  const [search, setSearch] = useState("");

  // Filter blogs by search input (title, excerpt, or author)
  const filteredBlogs = blogs.filter((blog) => {
    const q = search.toLowerCase();
    return (
      blog.title.toLowerCase().includes(q) ||
      blog.excerpt.toLowerCase().includes(q) ||
      blog.author.toLowerCase().includes(q)
    );
  });

  // Split filtered blogs for layout
  const featured = filteredBlogs.slice(0, 2);
  const rest = filteredBlogs.slice(2);

  return (
    <div className="bg-[#faf8f6] min-h-screen pb-10">
      {/* Breadcrumb */}
      <div className="px-6 md:px-20 pt-8 pb-2 text-sm text-gray-500">
        Home / Blog
      </div>

      {/* Heading and Search */}
      <div className="px-6 md:px-20 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6">
        <h1 className="text-2xl font-bold text-[#C62828]">Our Blog</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search blog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={(e) => e.preventDefault()}
          >
            Search
          </button>
        </div>
      </div>

      {/* Featured Blogs (2-column grid) */}
      <div className="px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {featured.map((blog) => (
          <Link
            to={`/blog/${blog.slug}`}
            key={blog.id}
            className="group block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-6">
              <div className="text-xs text-gray-400 mb-1">
                {blog.author} &bull; {new Date(blog.date).toLocaleDateString()}
              </div>
              <h2 className="text-xl font-semibold mb-2 text-[#C62828] group-hover:text-primary-600 transition-colors">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {blog.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Rest of Blogs (3-column grid) */}
      <div className="px-6 md:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {rest.map((blog) => (
          <Link
            to={`/blog/${blog.slug}`}
            key={blog.id}
            className="group block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <div className="text-xs text-gray-400 mb-1">
                {blog.author} &bull; {new Date(blog.date).toLocaleDateString()}
              </div>
              <h3 className="text-lg font-semibold mb-1 text-[#C62828] group-hover:text-primary-600 transition-colors">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {blog.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* No results message */}
      {filteredBlogs.length === 0 && (
        <div className="px-6 md:px-20 text-center text-gray-500 py-16 text-lg">
          No blogs found.
        </div>
      )}
    </div>
  );
}

export default Blogs;
