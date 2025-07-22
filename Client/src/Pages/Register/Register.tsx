import React, { useState, type FormEvent } from "react";
import api from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(response.data.message || "Registration successful!");

      // Optionally clear form or redirect to login
      setName("");
      setEmail("");
      setPassword("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Registration error:", err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Registration failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-section">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>CREATE ACCOUNT</h1>
      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="visually-hidden">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="password" className="visually-hidden">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
          </button>
        </div>

        <button
          type="submit"
          className="bg-[#C62828] hover:bg-[#174ea6] text-white font-medium py-2 px-4 rounded-lg transition-colors w-full mt-4"
          disabled={loading}
        >
          {loading ? "Registering..." : "REGISTER"}
        </button>
      </form>
    </section>
  );
};

export default Register;
