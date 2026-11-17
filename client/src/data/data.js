import {
  FaTachometerAlt,
  FaPlusCircle,
  FaWrench,
  FaCalendarCheck,
  FaImage,
} from "react-icons/fa";
import search_icon from "../assets/search_icon.svg";
import close_icon from "../assets/close_icon.svg";
import menu_icon from "../assets/menu_icon.svg";
import arrow_icon from "../assets/arrow_icon.svg";
import star_icon from "../assets/star_icon.svg";
import filter_icon from "../assets/filter_icon.svg";
import gmail_logo from "../assets/gmail_logo.svg";
import edit_icon from "../assets/edit_icon.svg";
import hero_photo from "../assets/hero_photo.jpg";
import dashboardIcon from "../assets/dashboardIcon.svg";
import dashboardIconColored from "../assets/dashboardIconColored.svg";
import addIcon from "../assets/addIcon.svg";
import addIconColored from "../assets/addIconColored.svg";
import carIcon from "../assets/carIcon.svg";
import carIconColored from "../assets/carIconColored.svg";
import listIcon from "../assets/listIcon.svg";
import listIconColored from "../assets/listIconColored.svg";
import testimonial_image_1 from "../assets/testimonial_image_1.png";
import testimonial_image_2 from "../assets/testimonial_image_2.png";
import testimonial_image_3 from "../assets/testimonial_image_3.jpg";
import why_choose_us from "../assets/why_choose_us.jpg";
import user_profile from "../assets/user_profile.png";
import Bob_img from "../assets/Bob_img.jpg";
import Liam_img from "../assets/Liam_img.jpg";
import Ryan_img from "../assets/Ryan_img.jpg";
import Emma_img from "../assets/Emma_img.jpg";
import Our_Story from "../assets/Our_Story.jpg";

export const assets = {
  search_icon,
  close_icon,
  menu_icon,
  arrow_icon,
  star_icon,
  filter_icon,
  gmail_logo,
  edit_icon,
  hero_photo,
  testimonial_image_1,
  testimonial_image_2,
  testimonial_image_3,
  why_choose_us,
  user_profile,
  dashboardIcon,
  dashboardIconColored,
  addIcon,
  addIconColored,
  carIcon,
  carIconColored,
  listIcon,
  listIconColored,
  Bob_img,
  Liam_img,
  Ryan_img,
  Emma_img,
  Our_Story,
};

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact Us", path: "/contact-us" },
  // { name: "Booking Service", path: "/booking-service" },
];

export const ownerMenuLinks = [
  {
    name: "Dashboard",
    path: "/owner",
    icon: FaTachometerAlt,
    // coloredIcon: dashboardIconColored,
  },
  {
    name: "Add Service",
    path: "/owner/add-service",
    icon: FaPlusCircle,
    // coloredIcon: addIconColored,
  },
  {
    name: "Manage Services",
    path: "/owner/manage-services",
    icon: FaWrench,
    // coloredIcon: carIconColored,
  },
  {
    name: "Manage Bookings",
    path: "/owner/manage-bookings",
    icon: FaCalendarCheck,
    // coloredIcon: listIconColored,
  },

  {
    name: "Hero Image Upload",
    path: "/owner/hero-settings",
    icon: FaImage,
    // coloredIcon: assets.edit_icon,
  },
];

export const servicesInfo = [
  {
    id: "1",
    name: "Oil Change",
    category: "Maintenance",
    description:
      "Engine oil and filter replacement to keep your engine running smoothly.",
    image:
      "https://images.pexels.com/photos/13065691/pexels-photo-13065691.jpeg",
    priceFrom: 89,
    duration: "30-45 min",
    isPopular: true,

    features: [
      "Engine oil replacement",
      "Oil filter replacement",
      "Fluid level check",
      "Basic vehicle inspection",
    ],
  },
  {
    id: "2",
    name: "Brake Service",
    category: "Brakes",
    description:
      "Brake inspection, pad servicing and safety checks for reliable stopping.",
    image:
      "https://images.pexels.com/photos/37175105/pexels-photo-37175105.jpeg",
    priceFrom: 120,
    duration: "1-2 hrs",
    isPopular: true,

    features: [
      "Brake system inspection",
      "Brake pad inspection",
      "Brake fluid check",
      "Safety assessment",
    ],
  },
  {
    id: "3",
    name: "Battery Replacement",
    category: "Electrical",
    description:
      "Battery testing and replacement to keep your vehicle starting reliably.",
    image:
      "https://images.pexels.com/photos/32282232/pexels-photo-32282232.jpeg",
    priceFrom: 160,
    duration: "30-45 min",
    isPopular: false,

    features: [
      "Battery health test",
      "Battery replacement",
      "Charging system check",
      "Electrical system inspection",
    ],
  },
  {
    id: "4",
    name: "Tyre Service",
    category: "Tyres",
    description:
      "Tyre inspection, fitting and pressure checks for a safer drive.",
    image: "https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg",
    priceFrom: 40,
    duration: "30-60 min",
    isPopular: true,

    features: [
      "Tyre condition inspection",
      "Tyre pressure check",
      "Tyre fitting",
      "Tread depth inspection",
    ],
  },
  {
    id: "5",
    name: "Air Conditioning",
    category: "Air Conditioning",
    description:
      "Air conditioning inspection and servicing to keep your cabin cool.",
    image: "https://images.pexels.com/photos/7540410/pexels-photo-7540410.jpeg",
    priceFrom: 120,
    duration: "1-2 hrs",
    isPopular: false,

    features: [
      "Air conditioning inspection",
      "System performance check",
      "Refrigerant level check",
      "Cabin cooling assessment",
    ],
  },
  {
    id: "6",
    name: "Engine Diagnostics",
    category: "Diagnostics",
    description:
      "Computer diagnostics to identify engine warning lights and performance issues.",
    image: "https://images.pexels.com/photos/6870324/pexels-photo-6870324.jpeg",
    priceFrom: 90,
    duration: "30-60 min",
    isPopular: true,

    features: [
      "Engine computer scan",
      "Warning light diagnosis",
      "Error code analysis",
      "Performance assessment",
    ],
  },
  {
    id: "7",
    name: "Suspension Service",
    category: "Suspension",
    description:
      "Suspension inspection and repairs for a smoother and safer ride.",
    image: "https://images.pexels.com/photos/8985614/pexels-photo-8985614.jpeg",
    priceFrom: 150,
    duration: "1-3 hrs",
    isPopular: false,

    features: [
      "Suspension inspection",
      "Shock absorber check",
      "Steering component inspection",
      "Suspension repair assessment",
    ],
  },
  {
    id: "8",
    name: "Wheel Balancing",
    category: "Wheels",
    description: "Wheel balancing to reduce vibration and improve tyre wear.",
    image: "https://images.pexels.com/photos/8986147/pexels-photo-8986147.jpeg",
    priceFrom: 60,
    duration: "30-45 min",
    isPopular: false,

    features: [
      "Wheel balance inspection",
      "Wheel weight adjustment",
      "Vibration check",
      "Tyre wear assessment",
    ],
  },
  {
    id: "9",
    name: "Full Car Servicing",
    category: "Maintenance",
    description:
      "Comprehensive vehicle inspection and routine maintenance for peace of mind.",
    image: "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg",
    priceFrom: 180,
    duration: "1-2 hrs",
    isPopular: true,

    features: [
      "Comprehensive vehicle inspection",
      "Engine oil and fluid checks",
      "Brake and tyre inspection",
      "General safety assessment",
    ],
  },
];

export const dummyUserData = [
  {
    id: "6847f7cab3d8daecdb517095",
    name: "Bob",
    email: "admin@bobgarage.com",
    role: "owner",
    image: "https://images.pexels.com/photos/4481942/pexels-photo-4481942.jpeg",
  },
];

export const dummyMyBookingsData = [
  {
    id: "68482bcc98eb9722b7751f70",
    service: servicesInfo[0], // Oil Change
    user: "6847f7cab3d8daecdb517095",

    customerName: "Alex Johnson",
    customerEmail: "alex.johnson@example.com",
    customerPhone: "0412 345 678",

    vehicleMake: "Toyota",
    vehicleModel: "Camry",
    vehicleYear: 2021,
    vehicleRegistration: "ABC 123",

    bookingDate: "2026-08-28T00:00:00.000Z",
    bookingTime: "09:00 AM",

    status: "confirmed",
    price: 89,

    notes: "Please check the engine oil and fluid levels.",
    createdAt: "2026-08-25T12:57:48.244Z",
  },

  {
    id: "68482bb598eb9722b7751f60",
    service: servicesInfo[1], // Brake Service
    user: "6847f7cab3d8daecdb517095",

    customerName: "Michael Smith",
    customerEmail: "michael.smith@example.com",
    customerPhone: "0423 456 789",

    vehicleMake: "Mazda",
    vehicleModel: "CX-5",
    vehicleYear: 2020,
    vehicleRegistration: "XYZ 456",

    bookingDate: "2026-08-29T00:00:00.000Z",
    bookingTime: "10:30 AM",

    status: "pending",
    price: 120,

    notes: "Brake warning light has recently appeared.",
    createdAt: "2026-08-25T12:57:25.613Z",
  },

  {
    id: "684800fa0fb481c5cfd92e56",
    service: servicesInfo[5], // Engine Diagnostics
    user: "6847f7cab3d8daecdb517095",

    customerName: "Sarah Williams",
    customerEmail: "sarah.williams@example.com",
    customerPhone: "0434 567 890",

    vehicleMake: "Hyundai",
    vehicleModel: "i30",
    vehicleYear: 2019,
    vehicleRegistration: "DEF 789",

    bookingDate: "2026-08-30T00:00:00.000Z",
    bookingTime: "01:00 PM",

    status: "pending",
    price: 90,

    notes: "Check engine light is showing on the dashboard.",
    createdAt: "2026-08-25T09:55:06.379Z",
  },

  {
    id: "6847fe790fb481c5cfd92d94",
    service: servicesInfo[3], // Tyre Service
    user: "6847f7cab3d8daecdb517095",

    customerName: "Daniel Brown",
    customerEmail: "daniel.brown@example.com",
    customerPhone: "0456 678 901",

    vehicleMake: "Ford",
    vehicleModel: "Ranger",
    vehicleYear: 2022,
    vehicleRegistration: "GHI 321",

    bookingDate: "2026-09-01T00:00:00.000Z",
    bookingTime: "09:30 AM",

    status: "confirmed",
    price: 40,

    notes: "Please inspect all four tyres.",
    createdAt: "2026-08-25T09:44:25.410Z",
  },

  {
    id: "6847fd680fb481c5cfd92d80",
    service: servicesInfo[4], // Air Conditioning
    user: "6847f7cab3d8daecdb517095",

    customerName: "Emma Wilson",
    customerEmail: "emma.wilson@example.com",
    customerPhone: "0467 789 012",

    vehicleMake: "Honda",
    vehicleModel: "Civic",
    vehicleYear: 2018,
    vehicleRegistration: "JKL 654",

    bookingDate: "2026-09-02T00:00:00.000Z",
    bookingTime: "02:00 PM",

    status: "completed",
    price: 120,

    notes: "Air conditioning is not cooling properly.",
    createdAt: "2026-08-25T08:30:12.410Z",
  },
];

export const dummyServiceData = [
  {
    serviceId: "67ff5bc069c03d4e45f30b77",
    name: "Full Car Service",
    image: "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg",
    category: "Maintenance",
    price: 250,
    duration: "3 hours",
    description:
      "A comprehensive vehicle service including oil and filter replacement, fluid checks, brake inspection, and general vehicle safety checks.",
    isAvailable: true,
    createdAt: "2025-04-16T07:26:56.215Z",
  },

  {
    serviceId: "67ff6b758f1b3684286a2a65",
    name: "Brake Inspection & Repair",
    image:
      "https://images.pexels.com/photos/37175105/pexels-photo-37175105.jpeg",
    category: "Brakes",
    price: 180,
    duration: "2 hours",
    description:
      "Professional brake inspection and repair service to ensure your vehicle's braking system is safe and operating correctly.",
    isAvailable: true,
    createdAt: "2025-04-16T08:33:57.993Z",
  },

  {
    serviceId: "67ff6b9f8f1b3684286a2a68",
    name: "Oil & Filter Change",
    image:
      "https://images.pexels.com/photos/13065691/pexels-photo-13065691.jpeg",
    category: "Oil Change",
    price: 120,
    duration: "1 hour",
    description:
      "Engine oil and oil filter replacement to help maintain engine performance and extend the life of your vehicle.",
    isAvailable: true,
    createdAt: "2025-04-16T08:34:39.592Z",
  },

  {
    serviceId: "68009c93a3f5fc6338ea7e34",
    name: "Vehicle Inspection",
    image: "https://images.pexels.com/photos/6870324/pexels-photo-6870324.jpeg",
    category: "Inspection",
    price: 100,
    duration: "1 hour",
    description:
      "A detailed vehicle inspection covering essential mechanical and safety components to identify potential problems early.",
    isAvailable: false,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
];
export const dummyDashboardData = {
  totalServices: 4,
  totalBookings: 2,
  pendingBookings: 0,
  completedBookings: 2,
  recentBookings: [dummyMyBookingsData[0], dummyMyBookingsData[1]],
  monthlyRevenue: 840,
};

// ==========================================
// About Us - Team Members
// ==========================================

export const teamMembers = [
  {
    id: 1,
    name: "Bob",
    role: "Owner & Head Mechanic",
    image: assets.Bob_img,
  },
  {
    id: 2,
    name: "Liam",
    role: "Automotive Mechanic",
    image: assets.Liam_img,
  },
  {
    id: 3,
    name: "Ryan",
    role: "Automotive Mechanic",
    image: assets.Ryan_img,
  },
  {
    id: 4,
    name: "Emma",
    role: "Receptionist",
    image: assets.Emma_img,
  },
];

// ==========================================
// About Us - Our Values
// ==========================================

export const garageValues = [
  {
    id: 1,
    icon: "quality",
    title: "Quality Workmanship",
    description:
      "We take pride in delivering reliable automotive repairs and maintenance with attention to every detail.",
  },
  {
    id: 2,
    icon: "honesty",
    title: "Honest Service",
    description:
      "We believe in transparent communication, fair pricing, and providing advice you can trust.",
  },
  {
    id: 3,
    icon: "expertise",
    title: "Expert Care",
    description:
      "Our team is dedicated to providing professional automotive services to keep your vehicle running smoothly.",
  },
];
