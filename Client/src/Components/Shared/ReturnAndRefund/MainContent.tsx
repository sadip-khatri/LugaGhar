// src/components/MainContent.tsx
import React from "react";

const MainContent: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-[#623e18] space-y-10">
      <section>
        <h2 className="text-2xl font-semibold">
          a. I’ve changed my mind. Can I return my order?
        </h2>
        <p className="mt-2">
          We completely understand, sometimes things don’t feel quite right.
        </p>
        <p className="mt-2">
          While we don’t offer refunds in cases of change of mind, we’re happy
          to help with:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            An <span className="font-semibold">exchange</span>, or
          </li>
          <li>
            A <span className="font-semibold">store credit*</span>, so you can
            find something that suits you better.
          </li>
        </ul>
        <p className="mt-4">
          For full refunds, we’re only able to process them in situations where:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            Your item is{" "}
            <span className="font-semibold">damaged during shipping</span>
          </li>
          <li>
            The product is{" "}
            <span className="font-semibold">defective or incorrect</span>
          </li>
        </ul>
        <p className="italic mt-4 text-sm">
          * Store credit will be issued for the exact amount paid for the
          product. If a discount code was used, the discounted price will be
          credited. Please note, shipping charges are not included in the store
          credit.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">
          b. My order arrived damaged or isn’t what I expected, what now?
        </h2>
        <p className="mt-2">
          We’re so sorry to hear that. If your order isn’t quite right, we’ll
          make it right.
        </p>
        <p className="mt-2">
          Please email us at{" "}
          <a href="mailto:LugaGhar@gmail.com" className="font-semibold">
            LugaGhar@gmail.com
          </a>{" "}
          within <span className="font-semibold">48 hours</span> of delivery
          with:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            Your <span className="font-semibold">order number</span>, and
          </li>
          <li>
            Clear <span className="font-semibold">photos</span> of the issue
          </li>
        </ul>
        <p className="mt-2">
          Once verified, we’ll arrange a return pickup and ship out a
          replacement as soon as we receive the item back.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">
          c. Will I have to pay for return shipping?
        </h2>
        <p className="mt-2">
          Not at all. If your product is damaged or incorrect, we’ll take care
          of the return shipping.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">
          d. Can I cancel my order and get a refund?
        </h2>
        <p className="mt-2">
          Once your order has been shipped, we’re unable to cancel it.
        </p>
        <p className="mt-2">However, we’re happy to offer a refund if:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            Your shipping address is{" "}
            <span className="font-semibold">Tamrakar Complex, New Road</span>
          </li>
          <li>
            Your order has{" "}
            <span className="font-semibold">
              not shipped within 2 business days
            </span>{" "}
            of placing it (unless it’s marked pre-order on our site)
          </li>
        </ul>
        <p className="mt-2">
          Refunds, if applicable, are processed within{" "}
          <span className="font-semibold">7–10 business days</span>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">
          e. When are refunds not possible?
        </h2>
        <p className="mt-2">
          We do our best to be flexible, but refunds aren’t available in these
          situations:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            An{" "}
            <span className="font-semibold">
              incomplete or incorrect address (Tamrakar Complex, New Road)
            </span>{" "}
            was provided
          </li>
          <li>
            The recipient was <span className="font-semibold">unavailable</span>{" "}
            at the time of delivery
          </li>
          <li>
            The <span className="font-semibold">package was refused</span>
          </li>
          <li>
            The returned product is{" "}
            <span className="font-semibold">not in its original condition</span>
          </li>
        </ul>
        <p className="mt-2">
          If delivery fails, we’ll try once more. If the second attempt is also
          unsuccessful, the order will be marked as cancelled without refund.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">
          f. Are returns, exchanges and COD available on all products?
        </h2>
        <p className="mt-2">
          Customised and personalised pieces are made just for you - with that
          in mind, returns, exchanges and COD aren’t applicable on these orders.
        </p>
      </section>
    </div>
  );
};

export default MainContent;
