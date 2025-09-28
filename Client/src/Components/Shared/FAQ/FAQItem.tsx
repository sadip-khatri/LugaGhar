// src/components/FAQ/FAQItem.tsx
import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-secondary)]/20 py-4 cursor-pointer">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center text-[var(--color-text)] font-medium text-lg cursor-pointer hover:text-[var(--color-accent)] transition-colors"
      >
        <span>{question}</span>
        <span className="text-[var(--color-accent)]">{open ? "-" : "+"}</span>
      </button>
      {open && <p className="mt-2 text-sm text-[var(--color-secondary)]">{answer}</p>}
    </div>
  );
};

export default FAQItem;
