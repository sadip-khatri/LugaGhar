/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../../Ui/ProductCard";
import api from "../../../Utils/api";
import { FaStar } from "react-icons/fa";

type Product = {
  _id: string;
  mainImage: string;
  title: string;
  price: number;
  category: string;
};

const itemsPerPage = 6;
const exclusiveCategories = ["Bodycon", "M-Blazers", "Miniskirt", "Sari"];

const ExclusiveCollections: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortOption, setSortOption] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sidebarCategories = ["All", ...exclusiveCategories];

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, sortOption]);

  // Filter products based on selected category and price range
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "All"
          ? exclusiveCategories.includes(p.category)
          : p.category === selectedCategory;

      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

      return matchesCategory && matchesPrice;
    });
  }, [products, selectedCategory, priceRange]);

  // Sort products
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    if (sortOption === "low") sorted.sort((a, b) => a.price - b.price);
    else if (sortOption === "high") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [filteredProducts, sortOption]);

  // Pick the highest-priced product per category
  const uniqueCategoryProducts = useMemo(() => {
    const categoryMap = new Map<string, Product>();

    for (const product of sortedProducts) {
      if (!exclusiveCategories.includes(product.category)) continue;

      if (
        !categoryMap.has(product.category) ||
        product.price > (categoryMap.get(product.category)?.price || 0)
      ) {
        categoryMap.set(product.category, product);
      }
    }

    return Array.from(categoryMap.values());
  }, [sortedProducts]);

  const totalPages = Math.ceil(uniqueCategoryProducts.length / itemsPerPage);
  const displayedProducts = uniqueCategoryProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="px-4 md:px-16 py-10 bg-white">
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-1/5">
            <div className="space-y-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-1">EXCLUSIVE COLLECTIONS</h2>
              <p className="text-sm text-gray-500 mb-6">
                {uniqueCategoryProducts.length} item(s)
              </p>

              <div>
                <h3 className="text-sm font-medium mb-2">CATEGORIES</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  {sidebarCategories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="accent-[#C62828]"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">PRICE RANGE</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
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
                        setPriceRange([priceRange[0], +e.target.value])
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
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
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

            {displayedProducts.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                No products found.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                  <div key={product._id} className="relative">
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-0.5 text-xs font-semibold rounded flex items-center gap-1 z-10">
                      <FaStar className="text-yellow-300" />
                      Exclusive
                    </div>
                    <ProductCard
                      id={product._id}
                      image={product.mainImage}
                      title={product.title}
                      price={product.price}
                      category={product.category}
                    />
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 border rounded ${
                          currentPage === page
                            ? "bg-[#C62828] text-white"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExclusiveCollections;
