import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PortfolioSection from "./components/PortfolioSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-dark-primary">
      <Toaster position="top-right" theme="dark" richColors />
      {showAdmin ? (
        <AdminDashboard onBack={() => setShowAdmin(false)} />
      ) : (
        <>
          <Header />
          <main>
            <HeroSection />
            <ServicesSection />
            <PortfolioSection />
            <TestimonialsSection />
            <ContactSection />
          </main>
          <Footer onAdminClick={() => setShowAdmin(true)} />
        </>
      )}
    </div>
  );
}
