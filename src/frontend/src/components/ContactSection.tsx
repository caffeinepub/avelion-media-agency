import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "../hooks/useQueries";

interface FormState {
  name: string;
  restaurantName: string;
  email: string;
  website: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  restaurantName: "",
  email: "",
  website: "",
  message: "",
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitContactForm();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        setSubmitted(true);
        setForm(initialForm);
        toast.success("Message sent! We'll be in touch within 24 hours.");
      },
      onError: (err) => {
        toast.error(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        );
      },
    });
  };

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ backgroundColor: "oklch(17% 0.035 228)" }}
      aria-label="Contact section"
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
              Work With Us
            </span>
            <div className="h-px w-16 bg-gold/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide mb-4">
            Ready To Grow
            <span className="block text-gold">Your Restaurant?</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Start a conversation with our team today. Free consultation, no
            obligation.
          </p>
          <div className="gold-divider mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-dark-card border border-charcoal-500/30 rounded-sm p-8 md:p-10"
          >
            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="text-center py-10"
              >
                <CheckCircle2 className="text-gold mx-auto mb-4" size={48} />
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  Message Received!
                </h3>
                <p className="font-body text-muted-foreground mb-6">
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours with a personalized strategy.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  data-ocid="contact.send_another.secondary_button"
                  className="btn-gold-outline rounded-sm"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-ocid="contact.form" noValidate>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Get Free Consultation
                </h3>

                <div className="space-y-5">
                  {/* Name + Restaurant Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="font-body text-xs uppercase tracking-wider text-muted-foreground"
                      >
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        placeholder="Marco Rossi"
                        data-ocid="contact.name.input"
                        className="bg-charcoal-700/50 border-charcoal-500/50 text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 rounded-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="restaurantName"
                        className="font-body text-xs uppercase tracking-wider text-muted-foreground"
                      >
                        Restaurant Name *
                      </Label>
                      <Input
                        id="restaurantName"
                        name="restaurantName"
                        value={form.restaurantName}
                        onChange={handleChange}
                        required
                        autoComplete="organization"
                        placeholder="La Maison Bistro"
                        data-ocid="contact.restaurant_name.input"
                        className="bg-charcoal-700/50 border-charcoal-500/50 text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 rounded-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="font-body text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="contact@lamaisonbistro.com"
                      data-ocid="contact.email.input"
                      className="bg-charcoal-700/50 border-charcoal-500/50 text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 rounded-sm"
                    />
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="website"
                      className="font-body text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Restaurant Website
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={form.website}
                      onChange={handleChange}
                      autoComplete="url"
                      placeholder="https://www.yourrestaurant.com"
                      data-ocid="contact.website.input"
                      className="bg-charcoal-700/50 border-charcoal-500/50 text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 rounded-sm"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="font-body text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Tell Us About Your Goals *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about your restaurant and what you're looking to achieve..."
                      data-ocid="contact.message.textarea"
                      className="bg-charcoal-700/50 border-charcoal-500/50 text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 rounded-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    data-ocid="contact.submit.primary_button"
                    className="btn-copper rounded-sm w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      "GET FREE CONSULTATION"
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right: Image + Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Restaurant image */}
            <div className="rounded-sm overflow-hidden border border-charcoal-500/30 aspect-video">
              <img
                src="/assets/generated/contact-restaurant.dim_800x600.jpg"
                alt="Elegant restaurant interior"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            {/* Contact info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <MessageCircle size={18} />,
                  label: "WHATSAPP",
                  value: "+27 767 429 569",
                  href: "https://wa.me/27767429569",
                },
                {
                  icon: <Phone size={18} />,
                  label: "CALL US",
                  value: "+266 62380695 / 57113542",
                  href: "tel:+26662380695",
                },
                {
                  icon: <Mail size={18} />,
                  label: "EMAIL",
                  value: "avelionmedia@gmail.com",
                  href: "mailto:avelionmedia@gmail.com",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "WHATSAPP" ? "_blank" : undefined}
                  rel={
                    item.label === "WHATSAPP"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="bg-dark-card border border-charcoal-500/30 rounded-sm p-4 flex flex-col gap-2 hover:border-gold/40 transition-colors duration-200"
                >
                  <div className="text-gold">{item.icon}</div>
                  <div className="font-body text-[10px] tracking-widest text-muted-foreground uppercase">
                    {item.label}
                  </div>
                  <div className="font-body text-sm text-foreground break-words">
                    {item.value}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
