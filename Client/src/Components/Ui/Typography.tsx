import React from "react";

export const SectionHeading: React.FC<{ text: string }> = ({ text }) => (
  <h2 className="text-3xl font-semibold mb-2 text-[var(--color-text)]">{text}</h2>
);

export const ShopNowLink: React.FC<{ href: string }> = ({ href }) => (
  <a
    href={href}
    className="text-sm font-medium mt-2 hover:underline flex items-center gap-1 text-[var(--color-accent)] hover:text-[var(--color-cta)] transition-colors"
  >
    SHOP NOW <span>→</span>
  </a>
);

export const ViewAllLink: React.FC<{ href: string }> = ({ href }) => (
  <a
    href={href}
    className="mt-3 inline-block text-sm font-medium text-[var(--color-secondary)] hover:text-[var(--color-accent)] hover:underline transition-colors"
  >
    VIEW ALL →
  </a>
);
