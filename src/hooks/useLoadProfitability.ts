
import { LoadService } from "@/services/loadService";
import { FactoringService } from "@/services/factoringService";

export interface LoadProfitabilityData {
  id: string;
  customer: string;
  route: string;
  grossRevenue: number;
  factoringFee: number;
  fuelCost: number;
  opportunityCost: number;
  netProfit: number;
  profitMargin: number;
  rating: string;
  isFactored: boolean;
  factoringRate: number;
}

export const useLoadProfitability = () => {
  // Get real factored loads data
  const allLoads = LoadService.getAllLoads();
  const factoredLoads = FactoringService.getFactoredLoads(allLoads);
  
  // Transform factored loads into profitability analysis
  const loads: LoadProfitabilityData[] = factoredLoads.slice(0, 4).map(load => {
    const grossRevenue = parseFloat(load.amount.replace('$', '').replace(',', ''));
    const factoringFee = FactoringService.calculateFactoringCost(load);
    const fuelCost = load.fuelCost ? parseFloat(load.fuelCost.replace('$', '').replace(',', '')) : grossRevenue * 0.15; // Estimate if not provided
    const opportunityCost = 150; // Base opportunity cost
    const netProfit = grossRevenue - factoringFee - fuelCost - opportunityCost;
    const profitMargin = (netProfit / grossRevenue) * 100;
    
    let rating = 'poor';
    if (profitMargin >= 70) rating = 'excellent';
    else if (profitMargin >= 60) rating = 'good';
    else if (profitMargin >= 50) rating = 'fair';
    
    return {
      id: load.id,
      customer: load.broker,
      route: `${load.origin} → ${load.destination}`,
      grossRevenue,
      factoringFee,
      fuelCost,
      opportunityCost,
      netProfit,
      profitMargin,
      rating,
      isFactored: true,
      factoringRate: FactoringService.getFactoringRate(load)
    };
  });

  const avgProfitMargin = loads.reduce((sum, load) => sum + load.profitMargin, 0) / loads.length;
  const highMarginLoads = loads.filter(load => load.profitMargin > avgProfitMargin);
  const lowMarginLoads = loads.filter(load => load.profitMargin <= 60);

  return {
    loads,
    avgProfitMargin,
    highMarginLoads,
    lowMarginLoads
  };
};
