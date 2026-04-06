import Principal "mo:core/Principal";
import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  // Contact Form Submission
  public type ContactSubmission = {
    name : Text;
    restaurantName : Text;
    email : Text;
    website : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // Service
  public type Service = {
    id : Nat;
    title : Text;
    description : Text;
    iconName : Text;
  };

  module Service {
    public func compare(service1 : Service, service2 : Service) : Order.Order {
      Nat.compare(service1.id, service2.id);
    };
  };

  // Portfolio Entry
  public type PortfolioEntry = {
    id : Nat;
    restaurantName : Text;
    resultMetric : Text;
    imageDescription : Text;
    category : Text;
  };

  module PortfolioEntry {
    public func compare(entry1 : PortfolioEntry, entry2 : PortfolioEntry) : Order.Order {
      Nat.compare(entry1.id, entry2.id);
    };
  };

  // Testimonial
  public type Testimonial = {
    id : Nat;
    quote : Text;
    authorName : Text;
    restaurantName : Text;
    avatarInitial : Text;
  };

  module Testimonial {
    public func compare(testimonial1 : Testimonial, testimonial2 : Testimonial) : Order.Order {
      Nat.compare(testimonial1.id, testimonial2.id);
    };
  };

  // State
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  var nextContactId = 1;

  let services = Map.empty<Nat, Service>();
  var nextServiceId = 1;

  let portfolioEntries = Map.empty<Nat, PortfolioEntry>();
  var nextPortfolioId = 1;

  let testimonials = Map.empty<Nat, Testimonial>();
  var nextTestimonialId = 1;

  // Contact Form Submission
  // Anyone can submit (including anonymous/guests)
  public shared func submitContactForm(name : Text, restaurantName : Text, email : Text, website : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      restaurantName;
      email;
      website;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(nextContactId, submission);
    nextContactId += 1;
  };

  // Only admins can view submissions
  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.values().toArray();
  };

  // Services
  // Admin can add/edit/delete
  public shared ({ caller }) func addService(title : Text, description : Text, iconName : Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add services");
    };
    let service : Service = {
      id = nextServiceId;
      title;
      description;
      iconName;
    };
    services.add(nextServiceId, service);
    nextServiceId += 1;
    service.id;
  };

  public shared ({ caller }) func updateService(id : Nat, title : Text, description : Text, iconName : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update services");
    };
    if (not services.containsKey(id)) {
      Runtime.trap("Service not found");
    };
    let service : Service = {
      id;
      title;
      description;
      iconName;
    };
    services.add(id, service);
  };

  public shared ({ caller }) func deleteService(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete services");
    };
    if (not services.containsKey(id)) {
      Runtime.trap("Service not found");
    };
    services.remove(id);
  };

  // Public can read (no authentication required)
  public query func getAllServices() : async [Service] {
    services.values().toArray().sort();
  };

  // Portfolio Entries
  // Admin can manage
  public shared ({ caller }) func addPortfolioEntry(restaurantName : Text, resultMetric : Text, imageDescription : Text, category : Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add portfolio entries");
    };
    let entry : PortfolioEntry = {
      id = nextPortfolioId;
      restaurantName;
      resultMetric;
      imageDescription;
      category;
    };
    portfolioEntries.add(nextPortfolioId, entry);
    nextPortfolioId += 1;
    entry.id;
  };

  public shared ({ caller }) func updatePortfolioEntry(id : Nat, restaurantName : Text, resultMetric : Text, imageDescription : Text, category : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update portfolio entries");
    };
    if (not portfolioEntries.containsKey(id)) {
      Runtime.trap("Portfolio entry not found");
    };
    let entry : PortfolioEntry = {
      id;
      restaurantName;
      resultMetric;
      imageDescription;
      category;
    };
    portfolioEntries.add(id, entry);
  };

  public shared ({ caller }) func deletePortfolioEntry(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete portfolio entries");
    };
    if (not portfolioEntries.containsKey(id)) {
      Runtime.trap("Portfolio entry not found");
    };
    portfolioEntries.remove(id);
  };

  // Public can read (no authentication required)
  public query func getAllPortfolioEntries() : async [PortfolioEntry] {
    portfolioEntries.values().toArray().sort();
  };

  public query func getPortfolioEntriesByCategory(category : Text) : async [PortfolioEntry] {
    portfolioEntries.values().toArray().filter(func(entry) { entry.category == category }).sort();
  };

  // Testimonials
  // Admin can manage
  public shared ({ caller }) func addTestimonial(quote : Text, authorName : Text, restaurantName : Text, avatarInitial : Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add testimonials");
    };
    let testimonial : Testimonial = {
      id = nextTestimonialId;
      quote;
      authorName;
      restaurantName;
      avatarInitial;
    };
    testimonials.add(nextTestimonialId, testimonial);
    nextTestimonialId += 1;
    testimonial.id;
  };

  public shared ({ caller }) func updateTestimonial(id : Nat, quote : Text, authorName : Text, restaurantName : Text, avatarInitial : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update testimonials");
    };
    if (not testimonials.containsKey(id)) {
      Runtime.trap("Testimonial not found");
    };
    let testimonial : Testimonial = {
      id;
      quote;
      authorName;
      restaurantName;
      avatarInitial;
    };
    testimonials.add(id, testimonial);
  };

  public shared ({ caller }) func deleteTestimonial(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };
    if (not testimonials.containsKey(id)) {
      Runtime.trap("Testimonial not found");
    };
    testimonials.remove(id);
  };

  // Public can read (no authentication required)
  public query func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray().sort();
  };
};
