import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

const FollowUs = () => {
  return (
    <section className="bg-[var(--color-bg)] py-16 px-6 md:px-20 text-center max-w-5xl mx-auto rounded-2xl border border-[var(--color-secondary)] shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]">
        Follow Us & Stay Connected
      </h2>
      <p className="text-[var(--color-secondary)] mb-12 max-w-lg mx-auto">
        Join our community on social media for exclusive updates,
        behind-the-scenes content, and the latest fashion trends from LugaGhar.
      </p>

      <div className="flex justify-center gap-10 text-[var(--color-accent)] text-4xl transition-colors">
        <a
          href="https://instagram.com/lugaghar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-cta)]"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://facebook.com/lugaghar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-cta)]"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com/lugaghar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-cta)]"
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>
        <a
          href="https://pinterest.com/lugaghar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-cta)]"
          aria-label="Pinterest"
        >
          <FaPinterestP />
        </a>
      </div>

      <p className="mt-12 text-[var(--color-secondary)] text-sm">
        Follow us for style inspiration and the latest updates.
      </p>
    </section>
  );
};

export default FollowUs;
