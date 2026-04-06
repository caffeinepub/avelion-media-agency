import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ContactSubmission,
  PortfolioEntry,
  Service,
  Testimonial,
} from "../backend.d";
import { useActor } from "./useActor";

const SAMPLE_SERVICES: Service[] = [
  {
    id: 1n,
    title: "Paid Advertising",
    description:
      "High-performance paid ad campaigns on Google, Meta, and programmatic platforms designed to drive reservations and foot traffic.",
    iconName: "target",
  },
  {
    id: 2n,
    title: "Ad Creative & Copywriting",
    description:
      "Compelling ad creatives and copy crafted specifically for the restaurant industry — designed to convert browsers into diners.",
    iconName: "megaphone",
  },
  {
    id: 3n,
    title: "Campaign Strategy & Analytics",
    description:
      "Data-driven advertising strategy with full reporting so you always know exactly what your ad spend is delivering.",
    iconName: "bar-chart",
  },
];

const SAMPLE_PORTFOLIO: PortfolioEntry[] = [
  {
    id: 1n,
    restaurantName: "La Maison Bistro",
    resultMetric: "+120% Reservations",
    imageDescription: "French fine dining",
    category: "Fine Dining",
  },
  {
    id: 2n,
    restaurantName: "Ember & Oak",
    resultMetric: "+85% Social Growth",
    imageDescription: "Upscale American steakhouse",
    category: "Steakhouse",
  },
  {
    id: 3n,
    restaurantName: "Sakura Garden",
    resultMetric: "+200% Online Orders",
    imageDescription: "Japanese fusion restaurant",
    category: "Asian Fusion",
  },
  {
    id: 4n,
    restaurantName: "The Harbor Grill",
    resultMetric: "+95% Table Bookings",
    imageDescription: "Seafood waterfront restaurant",
    category: "Seafood",
  },
];

const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: 1n,
    quote:
      "Avelion Media completely transformed our digital presence. Our reservations doubled in just 3 months. The team's creativity and strategic thinking is unmatched.",
    authorName: "Marco Rossi",
    restaurantName: "La Maison Bistro",
    avatarInitial: "M",
  },
  {
    id: 2n,
    quote:
      "The photography and social campaigns they ran for us brought in an entirely new clientele. Exceptional work that speaks for itself.",
    authorName: "Sarah Chen",
    restaurantName: "Sakura Garden",
    avatarInitial: "S",
  },
];

export function useGetServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return SAMPLE_SERVICES;
      try {
        const result = await actor.getAllServices();
        return result.length > 0 ? result : SAMPLE_SERVICES;
      } catch {
        return SAMPLE_SERVICES;
      }
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_SERVICES,
  });
}

export function useGetPortfolio() {
  const { actor, isFetching } = useActor();
  return useQuery<PortfolioEntry[]>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      if (!actor) return SAMPLE_PORTFOLIO;
      try {
        const result = await actor.getAllPortfolioEntries();
        return result.length > 0 ? result : SAMPLE_PORTFOLIO;
      } catch {
        return SAMPLE_PORTFOLIO;
      }
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_PORTFOLIO,
  });
}

export function useGetTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return SAMPLE_TESTIMONIALS;
      try {
        const result = await actor.getAllTestimonials();
        return result.length > 0 ? result : SAMPLE_TESTIMONIALS;
      } catch {
        return SAMPLE_TESTIMONIALS;
      }
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_TESTIMONIALS,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      restaurantName: string;
      email: string;
      website: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.submitContactForm(
        data.name,
        data.restaurantName,
        data.email,
        data.website,
        data.message,
      );
    },
  });
}

export function useGetContactSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactSubmission[]>({
    queryKey: ["contactSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeletePortfolioEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.deletePortfolioEntry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });
}
