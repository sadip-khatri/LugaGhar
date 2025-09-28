// src/Components/ProductGallery.tsx
import { useState } from "react";
import type { Product } from "../../Data/Product";

const ProductGallery = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState(product.mainImage);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex md:flex-col space-y-2 mr-2">
        {product.thumbnails.map((thumb, idx) => (
          <img
            key={idx}
            src={thumb}
            alt={`Thumb ${idx + 1}`}
            className="w-16 h-16 object-cover cursor-pointer border border-[var(--color-secondary)]/30"
            onClick={() => setSelectedImage(thumb)}
          />
        ))}
      </div>
      <img
        src={selectedImage}
        alt="Main"
        className="rounded-md w-full h-[500px] object-cover"
      />
    </div>
  );
};

export default ProductGallery;
