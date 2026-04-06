import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Service {
    id: bigint;
    title: string;
    description: string;
    iconName: string;
}
export type Time = bigint;
export interface PortfolioEntry {
    id: bigint;
    resultMetric: string;
    imageDescription: string;
    restaurantName: string;
    category: string;
}
export interface ContactSubmission {
    name: string;
    email: string;
    website: string;
    message: string;
    restaurantName: string;
    timestamp: Time;
}
export interface Testimonial {
    id: bigint;
    authorName: string;
    quote: string;
    restaurantName: string;
    avatarInitial: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPortfolioEntry(restaurantName: string, resultMetric: string, imageDescription: string, category: string): Promise<bigint>;
    addService(title: string, description: string, iconName: string): Promise<bigint>;
    addTestimonial(quote: string, authorName: string, restaurantName: string, avatarInitial: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deletePortfolioEntry(id: bigint): Promise<void>;
    deleteService(id: bigint): Promise<void>;
    deleteTestimonial(id: bigint): Promise<void>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllPortfolioEntries(): Promise<Array<PortfolioEntry>>;
    getAllServices(): Promise<Array<Service>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getCallerUserRole(): Promise<UserRole>;
    getPortfolioEntriesByCategory(category: string): Promise<Array<PortfolioEntry>>;
    isCallerAdmin(): Promise<boolean>;
    submitContactForm(name: string, restaurantName: string, email: string, website: string, message: string): Promise<void>;
    updatePortfolioEntry(id: bigint, restaurantName: string, resultMetric: string, imageDescription: string, category: string): Promise<void>;
    updateService(id: bigint, title: string, description: string, iconName: string): Promise<void>;
    updateTestimonial(id: bigint, quote: string, authorName: string, restaurantName: string, avatarInitial: string): Promise<void>;
}
