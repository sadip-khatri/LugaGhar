/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatPrice } from "../../Utils/formatPrice";
import SimilarItems from "../Shared/SimilarItems/SimilarItems";
import { useCountry } from "../../Contexts/CountryContext";

interface Product {
  id: number;
  title: string;
  price: number;
  convertedPrice?: number;
  originalPrice?: number;
  discount?: number;
  category?: string;
  subcategory?: string;
  shipping?: string;
  size?: string[];
  colors?: string[];
  images?: string[];
  image?: string;
  _id?: string;
  mainImage?: string;
  stock?: number;
}

interface ProductPageProps {
  product: Product;
  onAddToCart: (
    product: Product,
    size?: string,
    quantity?: number,
    color?: string
  ) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.size?.[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState({
    description: false,
    condition: false,
    features: false,
    warranty: false,
  });

  const { selectedCountry } = useCountry();

  // ✅ Simplified: use images directly (backend already returns full URLs)
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : product.mainImage
      ? [product.mainImage]
      : [];

  console.log("Product:", product);
  console.log("Resolved images:", productImages);

  const localPrice = product.price * selectedCountry.rate;
  const localOriginalPrice = product.originalPrice
    ? product.originalPrice * selectedCountry.rate
    : null;

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity, selectedColor);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="px-6 py-4 text-sm text-[var(--color-secondary)]">
        Home / {product.category || "Products"}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-6 pb-8">
        {/* Thumbnails */}
        {productImages.length > 1 && (
          <div className="flex lg:flex-col gap-2 order-2 lg:order-1">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`w-16 h-20 cursor-pointer border-2 ${
                  selectedImage === index
                    ? "border-[var(--color-accent)]"
                    : "border-[var(--color-secondary)]/30"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Main Image */}
        <div className="flex-1 order-1 lg:order-2">
          <div className="relative bg-[var(--color-bg)] aspect-[3/4] max-w-md mx-auto border border-[var(--color-secondary)]/20">
            {productImages.length > 0 ? (
              <img
                src={productImages[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--color-secondary)]">
                No Image Available
              </div>
            )}
            {product.discount && (
              <div className="absolute top-4 left-4 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {product.discount}%
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-6 order-3">
          <h1 className="text-2xl font-light tracking-wide">{product.title}</h1>
          {(product.category || product.subcategory) && (
            <div className="text-sm text-[var(--color-secondary)]">
              {product.category && product.subcategory
                ? `${product.category} • ${product.subcategory}`
                : product.category || product.subcategory}
            </div>
          )}

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl text-[var(--color-accent)]">
                {formatPrice(localPrice, selectedCountry.currency)}
              </span>
              {localOriginalPrice && (
                <>
                  <span className="text-sm text-[var(--color-secondary)] line-through">
                    {formatPrice(localOriginalPrice, selectedCountry.currency)}
                  </span>
                  {product.discount && (
                    <span className="text-sm text-[var(--color-accent)]">
                      {product.discount}% off
                    </span>
                  )}
                </>
              )}
            </div>
            {product.shipping && (
              <div className="text-sm text-[var(--color-secondary)]">
                Shipping {product.shipping}
              </div>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium">COLOUR</span>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                      selectedColor === color
                        ? "border-[var(--color-accent)]"
                        : "border-[var(--color-secondary)]/30"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  ></div>
                ))}
              </div>
              <div className="text-sm text-[var(--color-secondary)]">
                {selectedColor}
              </div>
            </div>
          )}

          {/* Sizes */}
          {/* Uncomment if you need sizes */}
          {/* {product.size && product.size.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium">SIZE</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border border-gray-300 px-3 mx-5 py-2 w-20 text-center bg-white"
              >
                {product.size.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )} */}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[var(--color-accent)] text-[var(--color-bg)] py-3 px-6 font-medium tracking-wide hover:bg-[var(--color-cta)] transition-colors cursor-pointer"
          >
            ADD TO CART
          </button>

          {/* Expandable Sections */}
          <div className="space-y-4 border-t pt-6">
            {[
              { key: "description", label: "DESCRIPTION" },
              { key: "condition", label: "CONDITION" },
              { key: "features", label: "FEATURES" },
              { key: "warranty", label: "WARRANTY" },
            ].map(({ key, label }) => (
              <div key={key} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() =>
                    toggleSection(key as keyof typeof expandedSections)
                  }
                  className="flex items-center justify-between w-full text-left text-sm font-medium"
                >
                  <span>{label}</span>
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      expandedSections[key as keyof typeof expandedSections]
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>
                {expandedSections[key as keyof typeof expandedSections] && (
                  <div className="mt-3 text-sm text-[var(--color-secondary)]">
                    Content for {label.toLowerCase()} section would go here.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <SimilarItems
        currentProduct={{
          _id: product._id ?? String(product.id),
          mainImage:
            product.mainImage ?? product.images?.[0] ?? product.image ?? "",
          title: product.title,
          price: product.price,
          category: product.category ?? "",
          stock: product.stock ?? 0,
        }}
      />
    </div>
  );
};

export default ProductPage;
