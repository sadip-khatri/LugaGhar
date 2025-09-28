/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router-dom";
import { CreditCard } from "lucide-react";

interface LocationState {
  amount?: number;
}

const Esewa: React.FC = () => {
  const location = useLocation();
  const amount = (location.state as LocationState)?.amount || 10;

  const [formData, setFormData] = useState({
    amount: amount.toString(),
    tax_amount: "0",
    total_amount: amount.toString(),
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173/paymentsuccess",
    failure_url: "http://localhost:5173/paymentfailure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  useEffect(() => {
    const generateSignature = (
      total_amount: string,
      transaction_uuid: string,
      product_code: string,
      secret: string
    ) => {
      const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
      const hash = CryptoJS.HmacSHA256(hashString, secret);
      return CryptoJS.enc.Base64.stringify(hash);
    };

    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const hashedSignature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      secret
    );

    setFormData((prev) => ({ ...prev, signature: hashedSignature }));
  }, [formData.total_amount]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-[var(--color-secondary)]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <CreditCard className="w-6 h-6 text-[var(--color-accent)]" />
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Pay Securely with eSewa
          </h1>
        </div>

        {/* Form */}
        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
          className="space-y-6"
        >
          {/* Read-only Amount */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-1">
              Amount (NPR)
            </label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              readOnly
              disabled
              className="w-full px-4 py-2 border border-[var(--color-secondary)] bg-[var(--color-bg)] rounded-lg text-[var(--color-text)] cursor-not-allowed"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="LUGA"
              className="w-full px-4 py-2 border border-[var(--color-secondary)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="GHAR"
              className="w-full px-4 py-2 border border-[var(--color-secondary)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>

          {/* Hidden eSewa Fields */}
          {Object.entries({
            amount: formData.amount, // Must still be sent
            tax_amount: formData.tax_amount,
            total_amount: formData.total_amount,
            transaction_uuid: formData.transaction_uuid,
            product_code: formData.product_code,
            product_service_charge: formData.product_service_charge,
            product_delivery_charge: formData.product_delivery_charge,
            success_url: formData.success_url,
            failure_url: formData.failure_url,
            signed_field_names: formData.signed_field_names,
            signature: formData.signature,
          }).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}

          {/* Pay Button */}
          <button
            type="submit"
            className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-cta)] text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Pay NPR {formData.total_amount} via eSewa →
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-xs text-center text-[var(--color-secondary)] mt-6">
          Secured transaction processed through{" "}
          <strong className="text-[var(--color-accent)]">eSewa</strong>. Please
          ensure your wallet is active.
        </p>
      </div>
    </div>
  );
};

export default Esewa;
