
import { LoadRepository } from "./loadRepository";
import { LoadDiscrepancyDetector } from "./loadDiscrepancyDetector";
import { LoadCreationService } from "./loadCreationService";
import { Load, RateConfirmationData, LoadDiscrepancy, DiscrepancyResolutionSuggestions } from "@/types/load";

export class LoadService {
  // Delegate to LoadRepository
  static getAllLoads(): Load[] {
    return LoadRepository.getAllLoads();
  }

  static getLoadById(id: string): Load | undefined {
    return LoadRepository.getLoadById(id);
  }

  // Delegate to LoadCreationService
  static createLoadFromRateConfirmation(data: RateConfirmationData): Load {
    return LoadCreationService.createLoadFromRateConfirmation(data);
  }

  // Delegate to LoadDiscrepancyDetector
  static detectDiscrepancies(loadId: string, documentType: string, documentData: any): LoadDiscrepancy[] {
    return LoadDiscrepancyDetector.detectDiscrepancies(loadId, documentType, documentData);
  }

  static getDiscrepancyResolutionSuggestions(discrepancies: LoadDiscrepancy[]): DiscrepancyResolutionSuggestions | null {
    return LoadDiscrepancyDetector.getDiscrepancyResolutionSuggestions(discrepancies);
  }

  // Additional convenience methods
  static updateLoad(id: string, updates: Partial<Load>): Load | null {
    return LoadRepository.updateLoad(id, updates);
  }

  static deleteLoad(id: string): boolean {
    return LoadRepository.deleteLoad(id);
  }
}
