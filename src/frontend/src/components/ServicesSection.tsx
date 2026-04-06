import {
  BarChart2,
  Camera,
  Globe,
  Layout,
  Megaphone,
  PenTool,
  Share2,
  Shield,
  Star,
  Target,
} from "lucide-react";
import { motion } from "motion/react";
import { useGetServices } from "../hooks/useQueries";

const iconMap: Record<string, React.ReactNode> = {
  "share-2": <Share2 size={28} />,
  camera: <Camera size={28} />,
  "pen-tool": <PenTool size={28} />,
  target: <Target size={28} />,
  layout: <Layout size={28} />,
  shield: <Shield size={28} />,
  megaphone: <Megaphone size={28} />,
  star: <Star size={28} />,
  globe: <Globe size={28} />,
  "bar-chart": <BarChart2 size={28} />,
};

function getIcon(iconName: string) {
  return iconMap[iconName] ?? <Star size={28} />;
}

export default function ServicesSection() {
  const { data: services = [], isLoading } = useGetServices();

  return (
    <section
      id="services"
      className="section-padding bg-dark-primary"
      aria-label="Services section"
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
              What We Do
            </span>
            <div className="h-px w-16 bg-gold/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide mb-4">
            Our Specialized
            <span className="block text-gold">Services</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            We strictly run as an advertising agency — every campaign is built
            to put more diners in your seats.
          </p>
          <div className="gold-divider mt-6" />
        </motion.div>

        {/* Services grid */}
        {isLoading ? (
          <div
            data-ocid="services.loading_state"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton loader
                key={i}
                className="bg-dark-card rounded-sm border border-charcoal-500/30 p-8 animate-pulse h-32"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.article
                key={String(service.id)}
                data-ocid={`services.item.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-dark-card border border-charcoal-500/30 rounded-sm p-8 hover:border-gold/30 hover:shadow-gold transition-all duration-300 cursor-default"
              >
                {/* Icon */}
                <div className="text-gold mb-5 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(service.iconName)}
                </div>
                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-gold transition-colors duration-200">
                  {service.title}
                </h3>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
