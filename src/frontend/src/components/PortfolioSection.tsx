import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import type { PortfolioEntry } from "../backend.d";
import { useGetPortfolio } from "../hooks/useQueries";

const portfolioImages: Record<string, string> = {
  "La Maison Bistro": "/assets/generated/portfolio-la-maison.dim_600x400.jpg",
  "Ember & Oak": "/assets/generated/portfolio-ember-oak.dim_600x400.jpg",
  "Sakura Garden": "/assets/generated/portfolio-sakura.dim_600x400.jpg",
  "The Harbor Grill":
    "/assets/generated/portfolio-harbor-grill.dim_600x400.jpg",
};

function getPortfolioImage(
  restaurantName: string,
  imageDescription: string,
): string {
  return (
    portfolioImages[restaurantName] ??
    `https://placehold.co/600x400/243039/C9A36A?text=${encodeURIComponent(imageDescription)}`
  );
}

function PortfolioCard({
  entry,
  index,
}: { entry: PortfolioEntry; index: number }) {
  return (
    <motion.article
      data-ocid={`portfolio.item.${index + 1}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-sm bg-dark-card border border-charcoal-500/30 hover:border-gold/30 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={getPortfolioImage(entry.restaurantName, entry.imageDescription)}
          alt={entry.restaurantName}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-transparent to-transparent" />

        {/* Metric badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 bg-copper/90 backdrop-blur-sm text-white text-xs font-body font-semibold px-3 py-1.5 rounded-sm uppercase tracking-wide">
            <TrendingUp size={11} />
            {entry.resultMetric}
          </div>
        </div>

        {/* Category tag */}
        <div className="absolute bottom-4 left-4">
          <Badge
            variant="outline"
            className="border-gold/50 text-gold text-[10px] tracking-wider uppercase font-body bg-charcoal-900/70 backdrop-blur-sm"
          >
            {entry.category}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-gold transition-colors duration-200 mb-2">
          {entry.restaurantName}
        </h3>
        <p className="font-body text-muted-foreground text-sm">
          {entry.imageDescription}
        </p>
      </div>
    </motion.article>
  );
}

export default function PortfolioSection() {
  const { data: portfolio = [], isLoading } = useGetPortfolio();

  return (
    <section
      id="portfolio"
      className="section-padding"
      style={{ backgroundColor: "oklch(17% 0.035 228)" }}
      aria-label="Portfolio section"
    >
      <div className="container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gold/40" />
            <span className="font-body text-gold text-xs tracking-widest2 uppercase">
              Our Work
            </span>
            <div className="h-px w-16 bg-gold/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide mb-4">
            Featured
            <span className="block text-gold">Case Studies</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Real results for real restaurants. See how we&apos;ve transformed
            dining experiences into digital success stories.
          </p>
          <div className="gold-divider mt-6" />
        </motion.div>

        {isLoading ? (
          <div
            data-ocid="portfolio.loading_state"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {["sk-1", "sk-2", "sk-3", "sk-4"].map((id) => (
              <div
                key={id}
                className="bg-dark-card rounded-sm border border-charcoal-500/30 h-64 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.map((entry, i) => (
              <PortfolioCard key={String(entry.id)} entry={entry} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
