
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
      savings: "1h 15m time saved"
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
  },
  "multi_stop": {
    loadId: "1234",
    optimizationType: "multi_stop",
    originalRoute: {
      distance: "487 miles",
      duration: "7h 45m",
      fuelCost: "$245",
      tollCosts: "$35"
    },
    optimizedRoute: {
      distance: "495 miles",
      duration: "8h 15m",
      fuelCost: "$185",
      tollCosts: "$28",
      savings: "$67"
    },
    fuelStops: [
      {
        name: "Love's Travel Stop",
        address: "Exit 126, I-70, Richmond, IN",
        pricePerGallon: "$3.78",
        amenities: ["Showers", "McDonald's", "Subway", "Laundry", "Dog Park"]
      },
      {
        name: "Flying J Travel Plaza",
        address: "Exit 87, I-70, Vandalia, OH",
        pricePerGallon: "$3.82",
        amenities: ["Showers", "Denny's", "Cinnabon", "Game Room", "WiFi"]
      },
      {
        name: "TA Express",
        address: "Exit 52, I-70, Springfield, OH",
        pricePerGallon: "$3.76",
        amenities: ["Showers", "Subway", "Pizza Hut Express", "ATM"]
      }
    ],
    weatherAlerts: [
      {
        location: "Richmond, IN area",
        type: "Fog",
        severity: "Moderate",
        description: "Dense fog possible early morning, visibility reduced to 1/4 mile"
      }
    ],
    trafficUpdates: [
      {
        location: "I-70 through Dayton",
        delay: "10 minutes",
        description: "Heavy traffic during rush hour 4-6 PM"
      }
    ]
  },
  "weather_aware": {
    loadId: "1234",
    optimizationType: "weather_aware",
    originalRoute: {
      distance: "487 miles",
      duration: "7h 45m",
      fuelCost: "$245",
      tollCosts: "$35"
    },
    optimizedRoute: {
      distance: "512 miles",
      duration: "8h 30m",
      fuelCost: "$258",
      tollCosts: "$22",
      savings: "Weather risk avoided"
    },
    fuelStops: [
      {
        name: "Petro Stopping Center",
        address: "Safe Haven Plaza, Route 33",
        pricePerGallon: "$3.94",
        amenities: ["Covered Parking", "Restaurant", "Showers", "Weather Radio"]
      }
    ],
    weatherAlerts: [
      {
        location: "Original I-70 Route",
        type: "Severe Thunderstorm",
        severity: "High",
        description: "Severe storms with 60+ mph winds and large hail expected 3-7 PM"
      },
      {
        location: "Alternative Route US-33",
        type: "Clear",
        severity: "Low",
        description: "Partly cloudy skies, no precipitation expected"
      }
    ],
    trafficUpdates: [
      {
        location: "Weather-Safe Route",
        delay: "Normal",
        description: "Alternative route adds 25 miles but avoids severe weather zone"
      }
    ]
  }
};
