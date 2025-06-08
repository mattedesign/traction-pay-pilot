
import { Load } from "@/types/load";
import { mockLoadsData } from "@/data/mockLoads";
import { LoadStatusService } from "./loadStatusService";

export class LoadRepository {
  private static mockLoads: Load[] = [...mockLoadsData];

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
    if (!load || !LoadStatusService.canAcceptLoad(load)) return null;
    
    const updatedLoad = LoadStatusService.acceptLoad(load);
    return this.updateLoad(id, updatedLoad);
  }
}
