
import { toast } from "@/hooks/use-toast";
import { RateConfirmationData, Load } from "@/types/load";
import { LoadRepository } from "./loadRepository";

export class LoadCreationService {
  static createLoadFromRateConfirmation(data: RateConfirmationData): Load {
    const newLoad: Load = {
      id: data.loadId,
      broker: data.brokerName,
      status: "pending_pickup",
      amount: data.rate,
      origin: data.origin.split(',')[0] + ', ' + data.origin.split(',')[1]?.trim().split(' ')[0],
      destination: data.destination.split(',')[0] + ', ' + data.destination.split(',')[1]?.trim().split(' ')[0],
      pickupTime: data.pickupDate,
      distance: data.distance,
      rateConfirmation: {
        originalRate: data.rate,
        commodity: data.commodity || "General Freight",
        weight: data.weight || "Unknown",
        referenceNumber: data.referenceNumber
      }
    };

    LoadRepository.addLoad(newLoad);
    
    toast({
      title: "Load Created Successfully",
      description: `Load #${data.loadId} has been added to your load list`,
    });

    return newLoad;
  }
}
