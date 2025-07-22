import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SeasonEvent from "./Pages/SeasonEvent/SeasonEvent";
import NewArrival from "./Pages/NewArrival/NewArrival";
import Trending from "./Pages/Trending/Trending";
import OurStory from "./Pages/OurStory/OurStory";
import Exclusive from "./Pages/Exclusive/Exclusive";
import Accessories from "./Pages/Accessories/Accessories";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import LogIn from "./Pages/LogIN/LogIn";
// import CartTry from "./Pages/Cart/CartTry";
import Layout from "./Layouts/Layout";
import Home from "./Pages/Home/Home";

import CartPage from "./Pages/Cart/CartPage";
import ProductDetail from "./Pages/ProductDetails/ProductDetails";

import CartTry from "./Pages/Cart/CartTry";
import Blogs from "./Pages/Blogs/Blogs";
import BlogDetail from "./Pages/Blogs/BlogDetail";
import Search from "./Pages/Search/Search";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TermsAndCondition from "./Pages/TermsAndCondition/TermsAndCondition";
import PrivacyAndPolicy from "./Pages/PrivacyAndPolicy/PrivacyAndPolicy";
import ContactUs from "./Pages/Contact/ContactUs";
import ReturnAndRefund from "./Pages/Return&Refund/ReturnAndRefund";

import Dispute from "./Pages/Dispute/Dispute";

import HowToBuy from "./Pages/HowToBuy/HowToBuy";
import OrderLookUp from "./Pages/OrderLookUp/OrderLookUp";
import FAQ from "./Pages/FAQ/FAQ";

import SiteMap from "./Pages/SiteMap/SiteMap";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Women from "./Pages/WomensCollection/Women";
import MensCollection from "./Pages/MensCollection/MensCollection";

// import Home from "./Pages/Home/Hero";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Wrap routes under Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> {/* Or Home if you add it */}
            <Route path="season-event" element={<SeasonEvent />} />
            <Route path="new-arrival" element={<NewArrival />} />
            <Route path="womens-collection" element={<Women />} />
            <Route path="mens-collection" element={<MensCollection />} />
            <Route path="trending" element={<Trending />} />
            <Route path="our-story" element={<OurStory />} />
            <Route path="exclusive" element={<Exclusive />} />
            <Route path="accessories" element={<Accessories />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<LogIn />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cartTry" element={<CartTry />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="search" element={<Search />} />
            <Route path="terms-and-condition" element={<TermsAndCondition />} />
            <Route path="privacy-and-policy" element={<PrivacyAndPolicy />} />
            <Route path="return-and-refund" element={<ReturnAndRefund />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="dispute" element={<Dispute />} />
            <Route path="how-to-buy" element={<HowToBuy />} />
            <Route path="order-look-up" element={<OrderLookUp />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="site-map" element={<SiteMap />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
