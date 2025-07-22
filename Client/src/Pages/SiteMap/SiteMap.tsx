import React from "react";

const SiteMap: React.FC = () => {
  const links = [
    { name: "Home", path: "/" },
    // { name: "Season Event", path: "/season-event" },
    { name: "New Arrival", path: "/new-arrival" },
    { name: "Laptop Collection", path: "/laptop-collection" },
    { name: "Mobile Collection", path: "/mobile-collection" },
    // { name: "Trending", path: "/trending" },
    { name: "Exclusive", path: "/exclusive" },
    { name: "Accessories", path: "/accessories" },
    { name: "Our Story", path: "/our-story" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
    { name: "Profile", path: "/profile" },
    { name: "Cart", path: "/cart" },
    { name: "Cart Try", path: "/cartTry" },
    { name: "Track My Order", path: "/order-look-up" },
    { name: "Search", path: "/search" },
    { name: "Blogs", path: "/blog" },
    { name: "Blog Detail", path: "/blog/sample-slug" }, // Example path
    { name: "Product Detail", path: "/product/sample-id" }, // Example path
    { name: "Contact Us", path: "/contact" },
    { name: "Terms & Conditions", path: "/terms-and-condition" },
    { name: "Privacy Policy", path: "/privacy-and-policy" },
    { name: "Return & Refund", path: "/return-and-refund" },
    { name: "Forgot Password", path: "/forgot-password" },
    { name: "Dispute", path: "/dispute" },
    { name: "How to Buy", path: "/how-to-buy" },
    { name: "FAQ", path: "/faq" },
    { name: "Site Map", path: "/site-map" },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-[#eff6ff] border border-[#C62828] rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-[#C62828] text-center mb-10">
          Site Map
        </h1>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.path}
                className="block bg-white text-[#C62828] font-medium text-sm text-center py-2 px-3 rounded-md shadow hover:bg-[#C62828] hover:text-white transition duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SiteMap;
