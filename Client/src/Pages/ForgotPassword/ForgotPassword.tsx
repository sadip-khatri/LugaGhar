import React, { useState, type FormEvent } from "react";
import api from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/forgot-password", { email });

      toast.success(response.data.message || "Reset link sent to your email.");
      setEmail("");
    } catch (err: unknown) {
      console.error("Forgot Password error:", err);

      let message = "Failed to send reset link.";

      if (err && typeof err === "object" && (err as AxiosError).isAxiosError) {
        const axiosErr = err as AxiosError<{
          message?: string;
          error?: string;
        }>;
        message =
          axiosErr.response?.data?.message ||
          axiosErr.response?.data?.error ||
          axiosErr.message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-section">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>FORGOT PASSWORD?</h1>
      <p>
        Remember your password? <a href="/login">Log in</a>
      </p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="visually-hidden">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="john.doe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="register-button bg-[#C62828] hover:bg-[#174ea6] text-white font-medium py-2 px-4 rounded-lg transition-colors w-full mt-4"
          disabled={loading}
        >
          {loading ? "Sending..." : "SEND RESET LINK"}
        </button>
      </form>
    </section>
  );
};

export default ForgotPassword;
