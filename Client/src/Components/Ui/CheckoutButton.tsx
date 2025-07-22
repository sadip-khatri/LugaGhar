
import { useCountry } from "../../Contexts/CountryContext";
import axios from "axios";

interface CartItem {
  title: string;
  image?: string;
  mainImage?: string;
  price: number;
  quantity?: number;
}

const CheckoutButton = ({ cartItems }: { cartItems: CartItem[] }) => {
  const { selectedCountry } = useCountry();

  const handleCheckout = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/payment/create-checkout-session", {
        cartItems: cartItems.map((item: CartItem) => ({
          title: item.title,
          image: item.image || item.mainImage,
          price: item.price * selectedCountry.rate,
          quantity: item.quantity || 1,
        })),
      });

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Checkout error", err);
      alert("Payment failed");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-[var(--color-accent)] text-[var(--color-bg)] px-4 py-2 rounded hover:bg-[var(--color-cta)]"
    >
      Proceed to Checkout
    </button>
  );
};

export default CheckoutButton;
