/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../../Ui/ProductCard";
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

const WomensCollection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "out">("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortOption, setSortOption] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoryMap: { [key: string]: string } = {
    Bodycon: "Bodycon",
    Lehenga: "Lehenga",
    Sari: "Sari",
    Tops: "Tops",
    Miniskirt: "Miniskirt",
    "W-Shirts": "Shirts",
    "W-Pants": "Pants",
  };

  const categoryKeys = Object.keys(categoryMap);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      const womensProducts = res.data
        .filter((p: any) => categoryKeys.includes(p.category))
        .map((p: any) => ({
          ...p,
          stock: p.stock ?? (Math.random() > 0.5 ? 0 : 10),
        }));
      setProducts(womensProducts);
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

  const handleStockChange = (status: "all" | "in" | "out") => {
    setStockFilter(status);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const sortedAndFiltered = useMemo(() => {
    let filtered = products;

    if (stockFilter === "in") {
      filtered = filtered.filter((p) => (p.stock ?? 0) > 0);
    } else if (stockFilter === "out") {
      filtered = filtered.filter((p) => (p.stock ?? 0) === 0);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (sortOption === "low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, stockFilter, priceRange, sortOption, selectedCategory]);

  const totalPages = Math.ceil(sortedAndFiltered.length / itemsPerPage);
  const displayedProducts = sortedAndFiltered.slice(
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
              <h2 className="text-2xl font-bold mb-1">WOMENS COLLECTION</h2>
              <p className="text-sm text-gray-500 mb-6">
                {sortedAndFiltered.length} items
              </p>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium mb-3">CATEGORY</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      className="accent-[#C62828]"
                      value="all"
                      checked={selectedCategory === "all"}
                      onChange={() => handleCategoryChange("all")}
                    />
                    All
                  </label>
                  {categoryKeys.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        className="accent-[#C62828]"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={() => handleCategoryChange(cat)}
                      />
                      {categoryMap[cat]}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
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

              {/* Stock Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">AVAILABILITY</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  {["all", "in", "out"].map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="stock"
                        className="accent-[#C62828]"
                        value={status}
                        checked={stockFilter === status}
                        onChange={() => handleStockChange(status as any)}
                      />
                      {status === "all"
                        ? "All"
                        : status === "in"
                        ? "In Stock"
                        : "Out of Stock"}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Options */}
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

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  image={product.mainImage}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                />
              ))}
            </div>

            {/* Pagination */}
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

export default WomensCollection;
