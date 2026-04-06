import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "SERVICES", href: "#services" },
  { label: "PORTFOLIO", href: "#portfolio" },
  { label: "ABOUT US", href: "#about" },
  { label: "INSIGHTS", href: "#insights" },
  { label: "CONTACT", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-charcoal-900/95 backdrop-blur-md shadow-lg border-b border-charcoal-500/50"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-sm bg-gold/10 border border-gold/40 flex items-center justify-center">
              <span className="font-display text-gold text-xl font-bold">
                A
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-foreground text-lg font-bold tracking-widest uppercase">
                AVELION
              </span>
              <span className="font-body text-gold text-[9px] tracking-widest2 uppercase">
                MEDIA AGENCY
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => scrollTo(link.href)}
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "-")}.link`}
                className="font-body text-xs tracking-widest text-muted-foreground hover:text-gold transition-colors duration-200 uppercase"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              data-ocid="nav.get_started.primary_button"
              className="btn-copper rounded-sm"
            >
              GET STARTED
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="lg:hidden text-foreground hover:text-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            data-ocid="nav.mobile_menu.toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-charcoal-800 border-t border-charcoal-500/50"
            data-ocid="nav.mobile_menu.panel"
          >
            <div className="container-wide py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="font-body text-sm tracking-widest text-muted-foreground hover:text-gold transition-colors duration-200 uppercase text-left py-2 border-b border-charcoal-500/30"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                data-ocid="nav.mobile_get_started.primary_button"
                className="btn-copper rounded-sm mt-2 text-center"
              >
                GET STARTED
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
