/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "../../Ui/ProductCard";
import { Link } from "react-router-dom";
import api from "../../../Utils/api";

type Product = {
  _id: string;
  mainImage: string;
  title: string;
  price: number;
  category: string;
  stock: number;
};

const itemsPerPage = 6;

const MensCollections: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [stockFilter, setStockFilter] = useState<"all" | "in" | "out">("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortOption, setSortOption] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        const allProducts = res.data;

        // ✅ Only include men's collection categories
        const filteredProducts = allProducts.filter(
          (p: Product) =>
            p.category === "M-Shirts" ||
            p.category === "M-Pants" ||
            p.category === "M-Blazers"
        );

        setProducts(filteredProducts);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const sortedAndFiltered = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortOption === "low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, selectedCategory, priceRange, sortOption]);

  const totalPages = Math.ceil(sortedAndFiltered.length / itemsPerPage);
  const displayedProducts = sortedAndFiltered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="px-4 md:px-16 py-10 bg-white">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/5 sticky top-20 self-start space-y-6">
          <h2 className="text-2xl font-bold mb-1">MENS COLLECTION</h2>
          <p className="text-sm text-gray-500 mb-6">
            {loading ? "Loading..." : `${sortedAndFiltered.length} items found`}
          </p>

          {/* Categories Filter */}
          <div>
            <h3 className="text-sm font-medium mb-2">CATEGORIES</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={selectedCategory === "all"}
                  onChange={() => handleCategoryChange("all")}
                  className="accent-[#C62828]"
                />
                All
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="M-Shirts"
                  checked={selectedCategory === "M-Shirts"}
                  onChange={() => handleCategoryChange("M-Shirts")}
                  className="accent-[#C62828]"
                />
                Shirts
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="M-Pants"
                  checked={selectedCategory === "M-Pants"}
                  onChange={() => handleCategoryChange("M-Pants")}
                  className="accent-[#C62828]"
                />
                Pants
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="M-Blazers"
                  checked={selectedCategory === "M-Blazers"}
                  onChange={() => handleCategoryChange("M-Blazers")}
                  className="accent-[#C62828]"
                />
                Blazers
              </label>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium mb-3">PRICE RANGE</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Rs. {priceRange[0]}</span>
                <span>Rs. {priceRange[1]}</span>
              </div>

              <div className="relative h-6">
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      Math.max(+e.target.value, priceRange[0] + 100),
                    ])
                  }
                  className="absolute z-20 w-full h-1 bg-transparent appearance-none pointer-events-auto accent-[#C62828]"
                />

                <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-[2px] bg-gray-300 z-0" />
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 h-[2px] bg-[#C62828] z-0"
                  style={{
                    left: `${(priceRange[0] / 10000) * 100}%`,
                    width: `${
                      ((priceRange[1] - priceRange[0]) / 10000) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Stock Filter */}
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sorting */}
          <div className="flex justify-end py-4 mb-8">
            <select
              className="border px-3 py-2 rounded text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="text-center text-gray-500 mt-10">
              Loading products...
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No matching menswear found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="block"
                  >
                    <ProductCard
                      id={product._id}
                      image={product.mainImage}
                      title={product.title}
                      price={product.price}
                      category={product.category}
                    />
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-10 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border text-sm rounded hover:bg-gray-100 ${
                      currentPage === i + 1 ? "bg-[#C62828] text-white" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MensCollections;
