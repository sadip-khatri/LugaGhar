import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--color-secondary)] text-[var(--color-bg)] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[var(--color-cta)] transition cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
