
import { Load } from "@/types/load";

export class LoadStatusService {
  static acceptLoad(load: Load): Load {
    if (load.status !== "pending_acceptance") {
      throw new Error("Load is not in pending acceptance status");
    }
    
    return {
      ...load,
      status: "pending_pickup",
      acceptedAt: new Date().toISOString()
    };
  }

  static canAcceptLoad(load: Load): boolean {
    return load.status === "pending_acceptance";
  }

  static getStatusLabel(status: Load["status"]): string {
    switch (status) {
      case "pending_acceptance":
        return "PENDING ACCEPTANCE";
      case "pending_pickup":
        return "PENDING PICKUP";
      case "in_transit":
        return "IN TRANSIT";
      case "delivered":
        return "DELIVERED";
      default:
        // This should never happen, but we handle it for type safety
        return (status as string).replace("_", " ").toUpperCase();
    }
  }

  static getStatusBadgeClass(status: Load["status"]): string {
    switch (status) {
      case "pending_acceptance":
        return "border-orange-200 bg-orange-50 text-orange-700";
      case "pending_pickup":
        return "border-blue-200 bg-blue-50 text-blue-700";
      case "in_transit":
        return "border-green-200 bg-green-50 text-green-700";
      case "delivered":
        return "border-slate-200 bg-slate-50 text-slate-700";
      default:
        return "border-slate-200 bg-slate-50 text-slate-700";
    }
  }
}
