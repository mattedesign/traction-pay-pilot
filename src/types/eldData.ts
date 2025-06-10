
export interface EldLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface EldData {
  id: number;
  time: string;
  tsp_source: string;
  oem: string;
  model: string;
  model_year: number;
  vin: string;
  location: EldLocation;
  speed: number;
  odometer: number;
}

export interface EldRoutePoint extends EldData {
  fuelLevel?: number;
  engineHours?: number;
  driverStatus?: 'driving' | 'on_duty' | 'off_duty' | 'sleeper';
  hoursRemaining?: number;
}

export interface EldIntelligence {
  avgSpeed: number;
  totalMiles: number;
  fuelEfficiency: number;
  idleTime: number;
  hardBraking: number;
  rapidAcceleration: number;
  driverScore: number;
  estimatedArrival: string;
  routeOptimization: {
    currentRoute: string;
    suggestedRoute?: string;
    timeSavings?: number;
    fuelSavings?: number;
  };
}
