
import { Load } from "@/types/load";

export const mockLoadsData: Load[] = [
  {
    id: "TMS-001",
    broker: "Continental Logistics Partners",
    status: "pending_acceptance",
    amount: "$850.00",
    origin: "Dallas, TX",
    destination: "Houston, TX",
    pickupTime: "Jun 8, 9:00 AM",
    deliveryTime: "Jun 8, 3:00 PM",
    distance: "240 miles",
    source: "tms",
    factoring: {
      isFactored: true,
      rate: 2.5,
      company: "Traction Pay"
    },
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
    id: "INV-2024",
    broker: "Summit Cargo Connect",
    status: "ready_to_invoice",
    amount: "$1,450.00",
    origin: "Phoenix, AZ",
    destination: "Denver, CO",
    pickupTime: "Jun 4, 8:00 AM",
    deliveryTime: "Jun 5, 2:00 PM",
    deliveredAt: "Jun 5, 1:45 PM",
    distance: "860 miles",
    source: "manual",
    fuelCost: "$320.00",
    factoring: {
      isFactored: true,
      rate: 3.0,
      company: "Traction Pay"
    },
    rateConfirmation: {
      originalRate: "$1,450.00",
      commodity: "Manufacturing Equipment",
      weight: "42000 lbs"
    }
  },
  {
    id: "1234",
    broker: "Continental Logistics Partners",
    status: "pending_pickup",
    amount: "$500.00",
    origin: "Shreve, OH",
    destination: "Grove City, OH",
    pickupTime: "Today 1:00 PM",
    deliveryTime: "Today 4:30 PM",
    distance: "45 miles",
    source: "manual",
    factoring: {
      isFactored: false
    },
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
    deliveryTime: "May 29, 6:00 PM",
    distance: "332 miles",
    source: "manual",
    factoring: {
      isFactored: true,
      rate: 2.8,
      company: "Traction Pay"
    },
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
    deliveryTime: "Jun 7, 6:00 PM",
    distance: "1,100 miles",
    source: "manual",
    factoring: {
      isFactored: false
    },
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
    deliveryTime: "Jun 6, 4:00 PM",
    distance: "173 miles",
    source: "manual",
    factoring: {
      isFactored: true,
      rate: 2.2,
      company: "Traction Pay"
    },
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
    deliveryTime: "May 28, 2:00 PM",
    distance: "240 miles",
    source: "manual",
    factoring: {
      isFactored: true,
      rate: 2.7,
      company: "Traction Pay"
    },
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
    deliveryTime: "May 26, 10:00 AM",
    distance: "280 miles",
    source: "manual",
    factoring: {
      isFactored: false
    },
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
    deliveryTime: "May 20, 4:00 PM",
    distance: "270 miles",
    source: "manual",
    factoring: {
      isFactored: true,
      rate: 2.4,
      company: "Traction Pay"
    },
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
    deliveryTime: "May 18, 6:00 PM",
    distance: "250 miles",
    source: "manual",
    factoring: {
      isFactored: false
    },
    rateConfirmation: {
      originalRate: "$720.00",
      commodity: "Food Products",
      weight: "28000 lbs"
    }
  }
];
