import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);

      alert(`You have subscribed to LugaGhar. We'll send updates to: ${email}`);

      // Simulate API call
      fetch("https://your-backend-api.com/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then(() => {})
        .catch(() => {});

      setEmail("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <section className="bg-[var(--color-bg)] rounded-3xl p-12 max-w-6xl mx-auto my-20 shadow-lg border border-[var(--color-secondary)]">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-[var(--color-text)]">
          Stay in the Loop with{" "}
          <span className="underline decoration-[var(--color-cta)] decoration-4">
            LugaGhar
          </span>
        </h2>
        <p className="mb-8 text-lg font-light text-[var(--color-secondary)]">
          Subscribe to our newsletter for exclusive updates, offers, and style
          tips.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow rounded-full px-6 py-3 text-[var(--color-text)] font-semibold placeholder-[var(--color-secondary)] border border-[var(--color-secondary)] focus:outline-none focus:ring-4 focus:ring-[var(--color-cta)] transition"
            required
          />
          <button
            type="submit"
            className="bg-[var(--color-accent)] hover:bg-[#a01e1e] text-[var(--color-bg)] rounded-full px-8 py-3 font-bold flex items-center justify-center gap-2 transition"
          >
            <FaPaperPlane />
            Subscribe
          </button>
        </form>

        {isSubscribed && (
          <p className="mt-6 text-[var(--color-accent)] font-semibold">
            🎉 Thanks for joining the LugaGhar family! Check your inbox.
          </p>
        )}

        <p className="mt-6 text-[var(--color-secondary)] text-xs opacity-80">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsLetter;
