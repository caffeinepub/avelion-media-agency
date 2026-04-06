import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    const el = document.querySelector("#services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-restaurant.dim_1920x1080.jpg"
          alt="Cinematic restaurant interior"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/95 via-charcoal-900/80 to-charcoal-900/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/30 via-transparent to-charcoal-900/60" />
      </div>

      {/* Content */}
      <div className="relative container-wide pt-24 pb-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold text-xs tracking-widest2 uppercase">
              Restaurant Advertising Specialists
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 uppercase tracking-wide"
          >
            Elevate Your
            <span className="block text-gold">Restaurant&apos;s</span>
            Digital Presence
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-body text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl"
          >
            Avelion Media Agency runs high-impact advertising campaigns
            exclusively for restaurants — driving reservations, foot traffic,
            and revenue.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={scrollToContact}
              data-ocid="hero.get_consultation.primary_button"
              className="btn-copper rounded-sm flex items-center gap-2 group"
            >
              GET FREE CONSULTATION
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              type="button"
              onClick={scrollToServices}
              data-ocid="hero.view_services.secondary_button"
              className="btn-gold-outline rounded-sm"
            >
              VIEW OUR SERVICES
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={scrollToServices}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
      >
        <span className="text-xs tracking-widest uppercase font-body">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
