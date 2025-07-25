import React, { useState, useMemo } from "react";
import ProductCard from "../../Ui/ProductCard";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
};

const allProducts: Product[] = [
  {
    id: 1,
    image: "/assets/images/product1.jpg",
    title: "Emerald Leather Dress",
    price: 3200,
    category: "Dresses",
  },
  {
    id: 2,
    image: "/assets/images/product2.jpg",
    title: "Maroon Puff Sleeve Dress",
    price: 2800,
    category: "Dresses",
  },
  {
    id: 3,
    image: "/assets/images/product3.jpg",
    title: "Beige Bodycon Dress",
    price: 2500,
    category: "Dresses",
  },
  {
    id: 4,
    image: "/assets/images/product4.jpg",
    title: "Polka Dot Mini Dress",
    price: 2100,
    category: "Dresses",
  },
  {
    id: 5,
    image: "/assets/images/product5.jpg",
    title: "Sunset Maxi Dress",
    price: 3600,
    category: "Dresses",
  },
  {
    id: 6,
    image: "/assets/images/product6.jpg",
    title: "Vintage Denim Dress",
    price: 3100,
    category: "Dresses",
  },
  {
    id: 7,
    image: "/assets/images/product7.jpg",
    title: "Chic Wrap Dress",
    price: 2900,
    category: "Dresses",
  },
  {
    id: 8,
    image: "/assets/images/product7.jpg",
    title: "Bag",
    price: 2900,
    category: "Bags",
  },
];

const categories = ["Dresses", "Bags", "Shoes", "Jewelry & Accessories"];
const itemsPerPage = 6;

const TrendingSection: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (category: string) => {
    setCurrentPage(1); // reset pagination on filter
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [category]
    );
  };

  const sortedAndFiltered = useMemo(() => {
    let filtered = allProducts;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (sortOption === "low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [selectedCategories, sortOption]);

  const totalPages = Math.ceil(sortedAndFiltered.length / itemsPerPage);
  const displayedProducts = sortedAndFiltered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="px-4 md:px-16 py-10 bg-white">
      <h2 className="text-2xl font-bold mb-1">Trending</h2>
      <p className="text-sm text-gray-500 mb-6">
        {sortedAndFiltered.length} new items
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/5 space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">CATEGORIES</h3>
            <div className="space-y-1 text-sm text-gray-600">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 -mt-24">
          {/* Sorting */}
          <div className="flex justify-end py-4 mb-8">
            <select
              className="border px-3 py-2 rounded text-sm"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid or Message */}
          {displayedProducts.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No products found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                  <Link to={`/product/${product.id}`} className="block">
                    <ProductCard key={product.id} {...product} />
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
                      currentPage === i + 1 ? "bg-black text-white" : ""
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

export default TrendingSection;
