import { ArrowRight } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";

interface FooterProps {
  onAdminClick: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "About Us", href: "#about" },
    { label: "Insights", href: "#insights" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      className="bg-charcoal-900 border-t border-charcoal-500/30"
      aria-label="Footer"
    >
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
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
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              The premier digital marketing agency built exclusively for
              restaurants who demand results.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-gold mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    data-ocid={`footer.${link.label.toLowerCase().replace(" ", "-")}.link`}
                    className="font-body text-sm text-muted-foreground hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-gold mb-5">
              Contact Us
            </h4>
            <address className="not-italic space-y-3 font-body text-sm text-muted-foreground">
              <p>
                <a
                  href="https://wa.me/27767429569"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                  data-ocid="footer.whatsapp.link"
                >
                  WhatsApp: +27 767 429 569
                </a>
              </p>
              <p>
                <a
                  href="tel:+26662380695"
                  className="hover:text-gold transition-colors"
                  data-ocid="footer.phone.link"
                >
                  +266 62380695 / 57113542
                </a>
              </p>
              <p>
                <a
                  href="mailto:avelionmedia@gmail.com"
                  className="hover:text-gold transition-colors"
                  data-ocid="footer.email.link"
                >
                  avelionmedia@gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Social + CTA */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-gold mb-5">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-8">
              {[
                {
                  icon: <SiInstagram size={18} />,
                  href: "#",
                  label: "Instagram",
                },
                {
                  icon: <SiFacebook size={18} />,
                  href: "#",
                  label: "Facebook",
                },
                { icon: <SiX size={18} />, href: "#", label: "X (Twitter)" },
                {
                  icon: <SiLinkedin size={18} />,
                  href: "#",
                  label: "LinkedIn",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-sm border border-charcoal-500/50 text-muted-foreground hover:text-gold hover:border-gold/50 flex items-center justify-center transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Ready to grow?
              </p>
              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                data-ocid="footer.get_started.primary_button"
                className="btn-copper rounded-sm text-xs"
              >
                GET STARTED TODAY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-500/20">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-muted-foreground/70">
            © {year} Avelion Media Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
            <span className="text-charcoal-500">·</span>
            <button
              type="button"
              onClick={onAdminClick}
              data-ocid="footer.admin.link"
              className="font-body text-xs text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
