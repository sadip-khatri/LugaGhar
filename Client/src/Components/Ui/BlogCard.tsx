import React from "react";

interface ProductCardProps {
  image: string;
  name: string;
  title: string;
  date: string;
}

const BlogCard: React.FC<ProductCardProps> = ({ image, name, title, date }) => {
  return (
    <div className="min-w-[180px] sm:min-w-[220px] max-w-[240px] bg-[var(--color-bg)] rounded-md overflow-hidden shadow-sm border border-[var(--color-secondary)]/20">
      <img src={image} alt={title} className="w-full h-[300px] object-cover" />
      <div className="p-3">
        <p className="text-sm text-[var(--color-secondary)] pb-2">{name}</p>
        <h4 className="text-xs font-semibold uppercase tracking-wider pb-2 text-[var(--color-text)]">
          {title}
        </h4>
        <p className="text-base font-semibold mt-1 text-[var(--color-secondary)]">
          {date.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
