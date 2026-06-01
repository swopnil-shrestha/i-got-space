export type Spot = {
  id: string;
  name: string;
  address: string;
  image: string;
  pricePerHour: number;
  distanceKm: number;
  available: number;
  total: number;
  vehicles: ("car" | "bike")[];
  amenities: string[];
  rating: number;
  /** percent positions on the mock map (0-100) */
  x: number;
  y: number;
};

import driveway from "@/assets/driveway.jpg";
import garage from "@/assets/garage.jpg";
import rooftop from "@/assets/rooftop.jpg";

export const spots: Spot[] = [
  {
    id: "s1",
    name: "Pulchowk Driveway",
    address: "Pulchowk Marg, Lalitpur",
    image: driveway,
    pricePerHour: 1.5,
    distanceKm: 0.4,
    available: 2,
    total: 3,
    vehicles: ["car", "bike"],
    amenities: ["CCTV", "Covered"],
    rating: 4.8,
    x: 28,
    y: 64,
  },
  {
    id: "s2",
    name: "Durbar Marg Garage",
    address: "Durbar Marg, Kathmandu",
    image: garage,
    pricePerHour: 3,
    distanceKm: 1.2,
    available: 18,
    total: 40,
    vehicles: ["car"],
    amenities: ["CCTV", "Security", "EV charging"],
    rating: 4.6,
    x: 58,
    y: 38,
  },
  {
    id: "s3",
    name: "City Tower Rooftop",
    address: "Kamaladi, Kathmandu",
    image: rooftop,
    pricePerHour: 2,
    distanceKm: 2.1,
    available: 0,
    total: 24,
    vehicles: ["car"],
    amenities: ["Covered"],
    rating: 4.4,
    x: 72,
    y: 22,
  },
  {
    id: "s4",
    name: "Thamel Bike Bay",
    address: "Thamel Chowk, Kathmandu",
    image: driveway,
    pricePerHour: 1,
    distanceKm: 0.9,
    available: 6,
    total: 8,
    vehicles: ["bike"],
    amenities: ["Security"],
    rating: 4.9,
    x: 44,
    y: 50,
  },
  {
    id: "s5",
    name: "Patan Plaza Lot",
    address: "Patan Dhoka, Lalitpur",
    image: garage,
    pricePerHour: 2.5,
    distanceKm: 3.4,
    available: 4,
    total: 12,
    vehicles: ["car", "bike"],
    amenities: ["CCTV", "Washroom"],
    rating: 4.5,
    x: 18,
    y: 80,
  },
  {
    id: "s6",
    name: "Boudha Heights",
    address: "Boudha, Kathmandu",
    image: rooftop,
    pricePerHour: 1.8,
    distanceKm: 5.6,
    available: 9,
    total: 20,
    vehicles: ["car"],
    amenities: ["CCTV", "EV charging"],
    rating: 4.3,
    x: 84,
    y: 62,
  },
];
