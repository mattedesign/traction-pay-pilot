
import { mockEldRouteData, mockEldIntelligence } from "@/data/mockEldData";
import { EldRoutePoint, EldIntelligence } from "@/types/eldData";

export class EldDataService {
  static getCurrentLocation(loadId: string): EldRoutePoint | null {
    // For active loads, return the most recent location data
    const activeLoadIds = ["1234", "5678", "000"];
    
    if (activeLoadIds.includes(loadId)) {
      return mockEldRouteData[mockEldRouteData.length - 1];
    }
    
    return null;
  }

  static getRouteHistory(loadId: string): EldRoutePoint[] {
    // Return full route history for loads that have ELD data
    const activeLoadIds = ["1234", "5678", "000"];
    
    if (activeLoadIds.includes(loadId)) {
      return mockEldRouteData;
    }
    
    return [];
  }

  static getIntelligenceData(loadId: string): EldIntelligence | null {
    // Return intelligence data for loads with ELD tracking
    const activeLoadIds = ["1234", "5678", "000"];
    
    if (activeLoadIds.includes(loadId)) {
      return mockEldIntelligence;
    }
    
    return null;
  }

  static formatLocationDisplay(location: EldRoutePoint): string {
    const time = new Date(location.time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return `${location.location.address} (${time})`;
  }

  static calculateFuelEfficiency(routeData: EldRoutePoint[]): number {
    if (routeData.length < 2) return 0;
    
    const startOdometer = routeData[0].odometer;
    const endOdometer = routeData[routeData.length - 1].odometer;
    const totalMiles = endOdometer - startOdometer;
    
    const startFuel = routeData[0].fuelLevel || 100;
    const endFuel = routeData[routeData.length - 1].fuelLevel || 100;
    const fuelUsed = startFuel - endFuel;
    
    // Assuming tank capacity of 200 gallons for calculation
    const gallonsUsed = (fuelUsed / 100) * 200;
    
    return gallonsUsed > 0 ? totalMiles / gallonsUsed : 0;
  }

  static getDriverStatusColor(status: string): string {
    const statusColors = {
      'driving': 'text-green-600 bg-green-50',
      'on_duty': 'text-blue-600 bg-blue-50',
      'off_duty': 'text-slate-600 bg-slate-50',
      'sleeper': 'text-purple-600 bg-purple-50'
    };
    
    return statusColors[status as keyof typeof statusColors] || 'text-slate-600 bg-slate-50';
  }

  static isEldEnabled(loadId: string): boolean {
    // Simulate ELD sharing being enabled for certain loads
    const eldEnabledLoads = ["1234", "5678", "000"];
    return eldEnabledLoads.includes(loadId);
  }
}
