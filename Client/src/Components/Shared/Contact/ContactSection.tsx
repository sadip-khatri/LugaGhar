import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const ContactSection = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 py-15 text-[var(--color-text)] ">
      <h2 className="text-3xl font-semibold mb-8 border-b-2 border-[var(--color-accent)] inline-block">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column */}
        <div>
          {/* Head Office */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-2">Head Office</h3>
            <div className="flex items-start gap-2 mb-1">
              <FaMapMarkerAlt className="mt-1 text-[var(--color-accent)]" />
              <p>
                LugaGhar, <br />
                Gongabu
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[var(--color-accent)]" />
              <a
                href="mailto:LugaGhar@gmail.com"
                className="hover:underline text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                LugaGhar@gmail.com
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-2">Business Hours</h3>
            <div className="flex items-center gap-2">
              <FaClock className="text-[var(--color-accent)]" />
              <p>sun to Fri - 10.00am to 06.30pm</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Order Enquiries */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-2">For Order Enquiries</h3>
            <div className="flex items-center gap-2 mb-1">
              <FaPhoneAlt className="text-[var(--color-accent)]" />
              <a
                href="tel:9869946896"
                className="hover:underline text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                9869946896
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[var(--color-accent)]" />
              <a
                href="mailto:LugaGhar@gmail.com"
                className="hover:underline text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                LugaGhar@gmail.com
              </a>
            </div>
          </div>

          {/* Bulk Enquiries */}
          <div>
            <h3 className="text-xl font-medium mb-2">For Bulk Enquiries</h3>
            <div className="flex items-center gap-2 mb-1">
              <FaPhoneAlt className="text-[var(--color-accent)]" />
              <a
                href="tel:9869946896"
                className="hover:underline text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                9869946896
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[var(--color-accent)]" />
              <a
                href="mailto:LugaGhar@gmail.com"
                className="hover:underline text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                LugaGhar@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
