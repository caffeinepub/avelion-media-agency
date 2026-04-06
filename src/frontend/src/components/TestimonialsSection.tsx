import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useGetTestimonials } from "../hooks/useQueries";

export default function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useGetTestimonials();
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIndex((p) => (p + 1) % testimonials.length);

  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="section-padding bg-dark-primary"
      aria-label="Testimonials section"
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
              Client Stories
            </span>
            <div className="h-px w-16 bg-gold/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide mb-4">
            Testimonials From
            <span className="block text-gold">Thriving Partners</span>
          </h2>
          <div className="gold-divider mt-6" />
        </motion.div>

        {isLoading ? (
          <div
            data-ocid="testimonials.loading_state"
            className="max-w-3xl mx-auto bg-dark-card rounded-sm border border-charcoal-500/30 p-10 animate-pulse h-56"
          />
        ) : testimonials.length === 0 ? (
          <div
            data-ocid="testimonials.empty_state"
            className="text-center text-muted-foreground py-12"
          >
            No testimonials yet.
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  data-ocid={`testimonials.item.${activeIndex + 1}`}
                  className="bg-dark-card border border-charcoal-500/30 rounded-sm p-10 md:p-14 relative"
                >
                  {/* Large gold quote mark */}
                  <Quote
                    size={64}
                    className="text-gold/20 absolute top-6 left-8"
                    aria-hidden="true"
                  />

                  <blockquote className="relative z-10">
                    <p className="font-display text-xl md:text-2xl text-foreground leading-relaxed italic mb-8">
                      &ldquo;{current.quote}&rdquo;
                    </p>

                    {/* Author */}
                    <footer className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold/40 flex items-center justify-center flex-shrink-0">
                        <span className="font-display text-gold text-xl font-bold">
                          {current.avatarInitial}
                        </span>
                      </div>
                      <div>
                        <div className="font-body font-semibold text-foreground">
                          {current.authorName}
                        </div>
                        <div className="font-body text-sm text-gold">
                          Owner at {current.restaurantName}
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-6 mt-8">
                <button
                  type="button"
                  onClick={prev}
                  data-ocid="testimonials.pagination_prev"
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-sm border border-charcoal-500/50 hover:border-gold/50 text-muted-foreground hover:text-gold flex items-center justify-center transition-all duration-200"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      type="button"
                      // biome-ignore lint/suspicious/noArrayIndexKey: testimonial dot navigation
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "bg-gold w-6"
                          : "bg-charcoal-500 hover:bg-gold/50"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={next}
                  data-ocid="testimonials.pagination_next"
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-sm border border-charcoal-500/50 hover:border-gold/50 text-muted-foreground hover:text-gold flex items-center justify-center transition-all duration-200"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
