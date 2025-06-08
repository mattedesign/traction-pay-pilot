
export interface RouteOption {
  id: string;
  name: string;
  description: string;
  fuelCost: number;
  driveTime: string;
  distance: string;
  fuelStops: number;
  savings: number;
  recommended?: boolean;
}

export const routeOptions: RouteOption[] = [
  {
    id: "optimal",
    name: "AI Optimized Route",
    description: "Via I-71 N → I-270 W • Avoids high-fuel zones",
    fuelCost: 52.30,
    driveTime: "1h 15m",
    distance: "68 miles",
    fuelStops: 3,
    savings: 12.50,
    recommended: true
  },
  {
    id: "fastest",
    name: "Fastest Route", 
    description: "Via I-77 N → I-270 W • Direct highway route",
    fuelCost: 58.80,
    driveTime: "1h 12m",
    distance: "65 miles",
    fuelStops: 2,
    savings: 6.00
  },
  {
    id: "standard",
    name: "Standard Route",
    description: "Via US-30 W → I-71 N • Traditional trucker route",
    fuelCost: 64.80,
    driveTime: "1h 25m", 
    distance: "72 miles",
    fuelStops: 4,
    savings: 0
  }
];
