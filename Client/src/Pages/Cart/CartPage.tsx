/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import api from "../../Utils/api";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import NewsLetter from "../../Components/Shared/Home/NewsLetter";
import { useCountry } from "../../Contexts/CountryContext";
import { formatPrice } from "../../Utils/formatPrice";

interface CartItem {
  _id: string; // Cart item id
  product: {
    _id: string;
    title: string;
    mainImage: string;
    price: number;
    size?: string[];
  };
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedCountry } = useCountry();

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      const data = Array.isArray(res.data) ? res.data : [];
      setCartItems(data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity with optimistic UI
  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(cartItemId);

    // Optimistic UI update
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === cartItemId ? { ...item, quantity } : item
      )
    );

    try {
      await api.patch(`/cart/${cartItemId}`, { quantity });
      // No immediate fetch to avoid overwriting optimistic update
    } catch (err) {
      console.error("Failed to update quantity", err);
      // Revert UI if PATCH fails
      fetchCart();
    }
  };

  // Remove item
  const removeItem = async (cartItemId: string) => {
    try {
      await api.delete(`/cart/${cartItemId}`);
      setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  // Checkout handler
  const handleCheckout = async () => {
    try {
      const formattedCartItems = cartItems.map((item) => ({
        title: item.product.title,
        image: item.product.mainImage,
        price: item.product.price * selectedCountry.rate,
        quantity: item.quantity,
      }));

      const res = await api.post("/payment/create-checkout-session", {
        cartItems: formattedCartItems,
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        // alert("Checkout session failed. No URL returned.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to proceed to payment.");
    }
  };

  // Calculate totals
  const subtotal = cartItems
    .filter((item) => item.product && typeof item.product.price === "number")
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 4 : 0;
  const total = subtotal + shipping;

  if (!localStorage.getItem("authToken")) {
    return (
      <div className="text-center p-10 text-gray-700">
        Please{" "}
        <Link to="/login" className="text-blue-600 underline">
          log in
        </Link>{" "}
        to view your cart.
      </div>
    );
  }

  if (loading) return <div className="p-10 text-center">Loading cart...</div>;
  if (!selectedCountry)
    return (
      <div className="p-10 text-center">Loading country information...</div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Cart</span>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="p-6 text-center text-gray-700 text-lg">
          Your cart is empty.
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="grid grid-cols-12 gap-4 p-6 border-b text-sm font-medium text-gray-600 uppercase">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2 text-center">Item Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Subtotal</div>
                </div>

                {cartItems.map((item) => {
                  if (!item.product) return null;
                  return (
                    <div
                      key={item._id}
                      className="grid grid-cols-12 gap-4 p-6 border-b items-center"
                    >
                      <div className="col-span-6 flex items-center space-x-4">
                        <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.product.mainImage}
                            alt={item.product.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {item.product.title}
                          </h3>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="text-sm text-red-600 hover:text-red-800 flex items-center mt-2 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        <span className="text-gray-900">
                          {formatPrice(
                            item.product.price * selectedCountry.rate,
                            selectedCountry.currency
                          )}
                        </span>
                      </div>

                      <div className="col-span-2 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            className="w-8 h-8 border border-gray-300 rounded-md cursor-pointer"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="w-8 h-8 border border-gray-300 rounded-md cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        <span className="text-gray-900">
                          {formatPrice(
                            item.product.price *
                              item.quantity *
                              selectedCountry.rate,
                            selectedCountry.currency
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  ORDER SUMMARY
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sub Total</span>
                    <span className="text-gray-900">
                      {formatPrice(
                        subtotal * selectedCountry.rate,
                        selectedCountry.currency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {formatPrice(
                        shipping * selectedCountry.rate,
                        selectedCountry.currency
                      )}
                    </span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">
                      {formatPrice(
                        total * selectedCountry.rate,
                        selectedCountry.currency
                      )}
                    </span>
                  </div>
                </div>
                <Link
                  to="/esewa"
                  state={{ amount: total * selectedCountry.rate }}
                >
                  <button className="w-full bg-[#8B5D3B] hover:bg-[#754C29] text-white font-medium py-3 px-4 rounded-lg mt-6 transition-colors cursor-pointer">
                    PROCEED TO CHECKOUT
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <NewsLetter />
    </div>
  );
}
