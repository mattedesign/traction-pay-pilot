
import { EldRoutePoint, EldIntelligence } from "@/types/eldData";

export const mockEldRouteData: EldRoutePoint[] = [
  {
    id: 103,
    time: "2022-07-27T07:06:25.000Z",
    tsp_source: "samsara",
    oem: "Freightliner",
    model: "Cascadia",
    model_year: 2018,
    vin: "3AKJHHDR9JSJV5535",
    location: {
      latitude: 40.4173,
      longitude: -82.4074,
      address: "3875 S Elyria Rd, Shreve, OH 44676"
    },
    speed: 0,
    odometer: 140100,
    fuelLevel: 85,
    engineHours: 2847.5,
    driverStatus: "on_duty",
    hoursRemaining: 9.5
  },
  {
    id: 104,
    time: "2022-07-27T07:36:25.000Z",
    tsp_source: "samsara",
    oem: "Freightliner",
    model: "Cascadia",
    model_year: 2018,
    vin: "3AKJHHDR9JSJV5535",
    location: {
      latitude: 40.4089,
      longitude: -82.3912,
      address: "Interstate 71 S, Ashland, OH"
    },
    speed: 65.2,
    odometer: 140115,
    fuelLevel: 83,
    engineHours: 2848.0,
    driverStatus: "driving",
    hoursRemaining: 9.0
  },
  {
    id: 105,
    time: "2022-07-27T08:06:25.000Z",
    tsp_source: "samsara",
    oem: "Freightliner",
    model: "Cascadia",
    model_year: 2018,
    vin: "3AKJHHDR9JSJV5535",
    location: {
      latitude: 40.1034,
      longitude: -82.9876,
      address: "US-23 S, Delaware, OH"
    },
    speed: 62.8,
    odometer: 140145,
    fuelLevel: 78,
    engineHours: 2848.5,
    driverStatus: "driving",
    hoursRemaining: 8.5
  },
  {
    id: 106,
    time: "2022-07-27T08:36:25.000Z",
    tsp_source: "samsara",
    oem: "Freightliner",
    model: "Cascadia",
    model_year: 2018,
    vin: "3AKJHHDR9JSJV5535",
    location: {
      latitude: 39.9612,
      longitude: -82.9988,
      address: "I-270 W, Columbus, OH"
    },
    speed: 58.4,
    odometer: 140175,
    fuelLevel: 74,
    engineHours: 2849.0,
    driverStatus: "driving",
    hoursRemaining: 8.0
  },
  {
    id: 107,
    time: "2022-07-27T09:06:25.000Z",
    tsp_source: "samsara",
    oem: "Freightliner",
    model: "Cascadia",
    model_year: 2018,
    vin: "3AKJHHDR9JSJV5535",
    location: {
      latitude: 39.9570,
      longitude: -83.0065,
      address: "3920 Southwest Blvd, Grove City, OH 43123"
    },
    speed: 0,
    odometer: 140185,
    fuelLevel: 72,
    engineHours: 2849.5,
    driverStatus: "on_duty",
    hoursRemaining: 7.5
  }
];

export const mockEldIntelligence: EldIntelligence = {
  avgSpeed: 61.2,
  totalMiles: 85,
  fuelEfficiency: 6.8,
  idleTime: 12,
  hardBraking: 2,
  rapidAcceleration: 1,
  driverScore: 88,
  estimatedArrival: "2022-07-27T09:30:00.000Z",
  routeOptimization: {
    currentRoute: "I-71 S via Columbus",
    suggestedRoute: "US-62 S via Mount Vernon",
    timeSavings: 8,
    fuelSavings: 12
  }
};
