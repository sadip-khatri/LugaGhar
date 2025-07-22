import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);

      // 1. Show alert to user
      alert(
        `You have subscribed to LugaGhar. We'll send updates to: lugaghar@example.com`
      );

      // 2. (Optional) Send email to backend API
      fetch("https://your-backend-api.com/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "lugaghar@example.com" }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Subscribed:", data);
        })
        .catch((error) => {
          console.error("Subscription failed:", error);
        });

      setEmail("");

      // 3. Reset success message
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-[var(--color-bg)] py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-[85px]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[var(--color-bg)] rounded-lg shadow-lg p-8 md:p-12">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
                Stay Updated with{" "}
                <span className="text-[var(--color-accent)]">LugaGhar</span>
              </h2>
              <p className="text-[var(--color-secondary)] text-lg leading-relaxed max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new
                arrivals, exclusive offers, and style tips. Join our community!
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Early Access",
                  description:
                    "Be the first to explore new collections and seasonal arrivals.",
                },
                {
                  title: "Exclusive Offers",
                  description:
                    "Get access to special discounts and promotions.",
                },
                {
                  title: "Style Inspiration",
                  description:
                    "Get fashion tips and outfit ideas straight to your inbox.",
                },
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--color-secondary)] text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Newsletter Form */}
            <div className="bg-[var(--color-bg)] rounded-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold text-[var(--color-text)] mb-4">
                Join Our Newsletter
              </h3>
              <p className="text-[var(--color-secondary)] mb-6">
                Get the exclusive updates of LugaGhar
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 border border-[var(--color-secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[var(--color-accent)] text-[var(--color-bg)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-cta)] transition-colors flex items-center justify-center gap-2"
                  >
                    <FaPaperPlane className="w-4 h-4" />
                    Subscribe
                  </button>
                </div>
              </form>

              {/* Success Message */}
              {isSubscribed && (
                <div className="mt-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-center">
                  🎉 Welcome to the LugaGhar community! Check your email for
                  confirmation.
                </div>
              )}

              <p className="text-[var(--color-secondary)] text-sm mt-4">
                By subscribing, you agree to receive marketing emails from LugaGhar.
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
