
import { Load } from "@/types/load";

export class FactoringService {
  static isLoadFactored(load: Load): boolean {
    return load.factoring?.isFactored === true;
  }

  static getFactoredLoads(loads: Load[]): Load[] {
    return loads.filter(load => this.isLoadFactored(load));
  }

  static getNonFactoredLoads(loads: Load[]): Load[] {
    return loads.filter(load => !this.isLoadFactored(load));
  }

  static calculateFactoringCost(load: Load): number {
    if (!this.isLoadFactored(load) || !load.factoring?.rate) {
      return 0;
    }
    
    const amount = parseFloat(load.amount.replace('$', '').replace(',', ''));
    return (amount * load.factoring.rate) / 100;
  }

  static getFactoringRate(load: Load): number {
    return load.factoring?.rate || 0;
  }

  static generateFactoringInsights(loads: Load[]): {
    factoredCount: number;
    nonFactoredCount: number;
    totalFactoringCost: number;
    averageFactoringRate: number;
    potentialSavings: number;
  } {
    const factoredLoads = this.getFactoredLoads(loads);
    const nonFactoredLoads = this.getNonFactoredLoads(loads);
    
    const totalFactoringCost = factoredLoads.reduce((total, load) => 
      total + this.calculateFactoringCost(load), 0
    );
    
    const averageFactoringRate = factoredLoads.length > 0 
      ? factoredLoads.reduce((sum, load) => sum + this.getFactoringRate(load), 0) / factoredLoads.length
      : 0;
    
    // Calculate potential savings if all loads were factored at the best rate
    const bestRate = factoredLoads.length > 0 
      ? Math.min(...factoredLoads.map(load => this.getFactoringRate(load)))
      : 0;
    
    const potentialSavings = factoredLoads.reduce((savings, load) => {
      const currentCost = this.calculateFactoringCost(load);
      const amount = parseFloat(load.amount.replace('$', '').replace(',', ''));
      const optimizedCost = (amount * bestRate) / 100;
      return savings + (currentCost - optimizedCost);
    }, 0);

    return {
      factoredCount: factoredLoads.length,
      nonFactoredCount: nonFactoredLoads.length,
      totalFactoringCost,
      averageFactoringRate,
      potentialSavings
    };
  }
}
