
import { Load } from "@/types/load";

export class LoadRepository {
  private static mockLoads: Load[] = [
    {
      id: "TMS-001",
      broker: "Continental Logistics Partners",
      status: "pending_acceptance",
      amount: "$850.00",
      origin: "Dallas, TX",
      destination: "Houston, TX",
      pickupTime: "Jun 8, 9:00 AM",
      distance: "240 miles",
      source: "tms",
      tmsData: {
        loadNumber: "TMS-001",
        brokerLoadNumber: "CLP-45821",
        equipment: "53' Dry Van",
        commodity: "Electronics",
        weight: "35,000 lbs",
        pieces: "15 pallets",
        deliveryTime: "Jun 8, 3:00 PM",
        specialInstructions: "White glove delivery required",
        contactInfo: {
          name: "Sarah Johnson",
          phone: "(555) 123-4567",
          email: "sarah@continentallogistics.com"
        }
      },
      notificationSent: true
    },
    {
      id: "1234",
      broker: "Continental Logistics Partners",
      status: "pending_pickup",
      amount: "$500.00",
      origin: "Shreve, OH",
      destination: "Grove City, OH",
      pickupTime: "Today 1:00 PM",
      distance: "45 miles",
      source: "manual",
      rateConfirmation: {
        originalRate: "$500.00",
        commodity: "General Freight",
        weight: "26000 lbs"
      }
    },
    {
      id: "5678", 
      broker: "Apex Freight Solutions",
      status: "in_transit",
      amount: "$750.00",
      origin: "Phoenix, AZ",
      destination: "Perris, CA", 
      pickupTime: "May 29, 7:00 AM",
      distance: "332 miles",
      source: "manual",
      rateConfirmation: {
        originalRate: "$750.00",
        commodity: "Electronics",
        weight: "34000 lbs"
      }
    },
    {
      id: "000",
      broker: "Summit Cargo Connect",
      status: "in_transit",
      amount: "$1,200.00",
      origin: "Dallas, TX",
      destination: "Miami, FL",
      pickupTime: "Jun 5, 8:00 AM",
      distance: "1,100 miles",
      source: "manual",
      rateConfirmation: {
        originalRate: "$1,200.00",
        commodity: "Electronics",
        weight: "40000 lbs"
      }
    },
    {
      id: "9876",
      broker: "Meridian Shipping Services", 
      status: "pending_pickup",
      amount: "$850.00",
      origin: "Seattle, WA",
      destination: "Portland, OR",
      pickupTime: "Jun 6, 10:00 AM",
      distance: "173 miles",
      source: "manual",
      rateConfirmation: {
        originalRate: "$850.00",
        commodity: "Machinery",
        weight: "38000 lbs"
      }
    },
    {
      id: "9012",
      broker: "Crossroads Transport Brokers", 
      status: "delivered",
      amount: "$650.00",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      pickupTime: "May 28, 9:00 AM", 
      distance: "240 miles",
      source: "manual",
      rateConfirmation: {
        originalRate: "$650.00",
        commodity: "Steel Coils",
        weight: "45000 lbs"
      }
    },
    {
      id: "898243",
      broker: "Gateway Freight Advisors",
      status: "delivered",
      amount: "$950.00",
      origin: "Chicago, IL",
      destination: "Detroit, MI",
      pickupTime: "May 25, 2:00 PM",
      distance: "280 miles",
      source: "manual",
      rateConfirmation: {
        originalRate: "$950.00",
        commodity: "Auto Parts",
        weight: "32000 lbs"
      }
    },
    {
      id: "348383",
      broker: "Pinnacle Load Management",
      status: "delivered",
      amount: "$1,150.00",
      origin: "Los Angeles, CA",
      destination: "Las Vegas, NV",
      pickupTime: "May 20, 6:00 AM",
      distance: "270 miles",
      source: "manual",
      rateConfirmation: {
        originalRate: "$1,150.00",
        commodity: "Consumer Goods",
        weight: "36000 lbs"
      }
    },
    {
      id: "324982",
      broker: "Horizon Transport Group",
      status: "delivered",
      amount: "$720.00",
      origin: "Atlanta, GA",
      destination: "Nashville, TN",
      pickupTime: "May 18, 11:00 AM",
      distance: "250 miles",
      source: "manual",
      rateConfirmation: {
        originalRate: "$720.00",
        commodity: "Food Products",
        weight: "28000 lbs"
      }
    }
  ];

  static getAllLoads(): Load[] {
    return this.mockLoads;
  }

  static getLoadById(id: string): Load | undefined {
    return this.mockLoads.find(load => load.id === id);
  }

  static addLoad(load: Load): void {
    this.mockLoads.unshift(load);
  }

  static updateLoad(id: string, updates: Partial<Load>): Load | null {
    const index = this.mockLoads.findIndex(load => load.id === id);
    if (index === -1) return null;
    
    this.mockLoads[index] = { ...this.mockLoads[index], ...updates };
    return this.mockLoads[index];
  }

  static deleteLoad(id: string): boolean {
    const index = this.mockLoads.findIndex(load => load.id === id);
    if (index === -1) return false;
    
    this.mockLoads.splice(index, 1);
    return true;
  }

  static acceptLoad(id: string): Load | null {
    const load = this.getLoadById(id);
    if (!load || load.status !== "pending_acceptance") return null;
    
    return this.updateLoad(id, {
      status: "pending_pickup",
      acceptedAt: new Date().toISOString()
    });
  }
}
