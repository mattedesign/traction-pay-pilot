
export interface RouteOptimizationData {
  loadId: string;
  optimizationType: string;
  originalRoute: {
    distance: string;
    duration: string;
    fuelCost: string;
    tollCosts: string;
  };
  optimizedRoute: {
    distance: string;
    duration: string;
    fuelCost: string;
    tollCosts: string;
    savings: string;
  };
  fuelStops: Array<{
    name: string;
    address: string;
    pricePerGallon: string;
    amenities: string[];
  }>;
  weatherAlerts: Array<{
    location: string;
    type: string;
    severity: string;
    description: string;
  }>;
  trafficUpdates: Array<{
    location: string;
    delay: string;
    description: string;
  }>;
}

export const mockRouteOptimizationData: Record<string, RouteOptimizationData> = {
  "fuel_efficient": {
    loadId: "1234",
    optimizationType: "fuel_efficient",
    originalRoute: {
      distance: "487 miles",
      duration: "7h 45m",
      fuelCost: "$245",
      tollCosts: "$35"
    },
    optimizedRoute: {
      distance: "501 miles",
      duration: "8h 0m",
      fuelCost: "$198",
      tollCosts: "$18",
      savings: "$64"
    },
    fuelStops: [
      {
        name: "TA Travel Center",
        address: "1234 Highway 71, Columbus, OH",
        pricePerGallon: "$3.89",
        amenities: ["Showers", "Restaurant", "Parking", "Maintenance"]
      },
      {
        name: "Pilot Flying J",
        address: "5678 Interstate Dr, Indianapolis, IN",
        pricePerGallon: "$3.85",
        amenities: ["Showers", "Food Court", "Laundry", "WiFi"]
      }
    ],
    weatherAlerts: [
      {
        location: "Indianapolis, IN",
        type: "Rain",
        severity: "Light",
        description: "Light rain expected between 2-4 PM"
      }
    ],
    trafficUpdates: [
      {
        location: "I-70 near Columbus",
        delay: "15 minutes",
        description: "Construction work in left lane"
      }
    ]
  },
  "fastest": {
    loadId: "1234",
    optimizationType: "fastest",
    originalRoute: {
      distance: "487 miles",
      duration: "7h 45m",
      fuelCost: "$245",
      tollCosts: "$35"
    },
    optimizedRoute: {
      distance: "463 miles",
      duration: "6h 30m",
      fuelCost: "$265",
      tollCosts: "$45",
      savings: "1h 15m saved"
    },
    fuelStops: [
      {
        name: "Speedway",
        address: "Quick Stop Plaza, Highway 40",
        pricePerGallon: "$4.12",
        amenities: ["Quick Fuel", "Snacks", "Restrooms"]
      }
    ],
    weatherAlerts: [],
    trafficUpdates: [
      {
        location: "I-64 Optimal Route",
        delay: "Clear",
        description: "Traffic flowing smoothly on recommended route"
      }
    ]
  }
};
