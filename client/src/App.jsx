import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import BrandTicker from "./components/BrandTicker/BrandTicker";
import "./App.css";

export default function App() {
  return <div className="app-shell"><Header /><BrandTicker /><Routes><Route path="/" element={<HomePage />} /><Route path="/services" element={<ServicesPage />} /><Route path="/services/:serviceId" element={<ServiceDetailPage />} /><Route path="/reserve" element={<BookingPage />} /><Route path="/privacy" element={<PrivacyPage />} /><Route path="*" element={<HomePage />} /></Routes><Footer /><CookieConsent /></div>;
}
