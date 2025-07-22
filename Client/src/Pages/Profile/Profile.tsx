/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { User, ShoppingCart, LogOut } from "lucide-react";

import api from "../../Utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartCard from "../Cart/CartCard";

interface ProfileData {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [notLoggedIn, setNotLoggedIn] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    email: "",
  });
  const [activeTab, setActiveTab] = useState<string>("personal");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setProfile(res.data);
        setFormData(res.data);
      } catch (err: any) {
        setNotLoggedIn(true);
        toast.info("You must be logged in to view your profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const updateData: any = { ...formData };
      if (newPassword) updateData.password = newPassword;

      await api.put("/user/profile", updateData);
      toast.success("Profile updated successfully");
      setProfile(updateData);
      setNewPassword("");
      setIsEditing(false);
    } catch (err: any) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  if (notLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 text-center text-gray-600 bg-white border rounded-md shadow-sm">
        <p className="text-lg">You are not logged in.</p>
        <p className="text-sm mt-2">
          Please{" "}
          <a href="/login" className="text-blue-600 underline">
            log in
          </a>{" "}
          to access your profile.
        </p>
      </div>
    );
  }

  if (!profile)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-[#C62828] text-center">
            My Account
          </h1>
          <div className="flex justify-center items-center mt-2 text-sm text-gray-500">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>My Account</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4">
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab("personal")}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === "personal"
                        ? "bg-[#C62828] text-white font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <User size={18} />
                    Personal Information
                  </button>

                  <button
                    onClick={() => setActiveTab("cart")}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === "cart"
                        ? "bg-[#C62828] text-white font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ShoppingCart size={18} />
                    My Cart
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "personal" && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-[#C62828] rounded-full flex items-center justify-center">
                        <User className="text-white" size={24} />
                      </div>
                    </div>
                    <div className="absolute ml-12 mt-8 w-6 h-6 bg-[#C62828] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>

                  {!isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                            {profile.name.split(" ")[0] || ""}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                          {profile.email}
                        </div>
                      </div>

                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-[#C62828] text-white px-6 py-2 rounded-md hover:bg-[#1d4ed8] transition-colors"
                      >
                        Update Changes
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={formData.name.split(" ")[0] || ""}
                            onChange={(e) => {
                              const lastName = formData.name
                                .split(" ")
                                .slice(1)
                                .join(" ");
                              setFormData((prev) => ({
                                ...prev,
                                name: lastName
                                  ? `${e.target.value} ${lastName}`
                                  : e.target.value,
                              }));
                            }}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={
                              formData.name.split(" ").slice(1).join(" ") || ""
                            }
                            onChange={(e) => {
                              const firstName =
                                formData.name.split(" ")[0] || "";
                              setFormData((prev) => ({
                                ...prev,
                                name: `${firstName} ${e.target.value}`.trim(),
                              }));
                            }}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password (optional)
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          placeholder="Leave blank to keep current password"
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C62828]"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={loading}
                          className="bg-[#C62828] text-white px-6 py-2 rounded-md hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
                        >
                          {loading ? "Updating..." : "Update Changes"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData(profile);
                            setNewPassword("");
                          }}
                          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "cart" && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">
                    My Cart
                  </h2>
                  <CartCard />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Features */}
      <div className="bg-white border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-orange-500 rounded"></div>
              </div>
              <div>
                <h3 className="font-semibold text-[#C62828]">Free Shipping</h3>
                <p className="text-sm text-gray-600">
                  Free shipping for order above $50
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded"></div>
              </div>
              <div>
                <h3 className="font-semibold text-[#C62828]">
                  Flexible Payment
                </h3>
                <p className="text-sm text-gray-600">
                  Multiple secure payment options
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-[#C62828] rounded"></div>
              </div>
              <div>
                <h3 className="font-semibold text-[#C62828]">24×7 Support</h3>
                <p className="text-sm text-gray-600">
                  We support online all days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
