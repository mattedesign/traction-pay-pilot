
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Target, Zap } from "lucide-react";

interface PerformanceBenchmarkingProps {
  carrierData: {
    onTimeRate: number;
    fuelEfficiency: number;
    loadCount: number;
    monthlyRevenue: number;
  };
}

const PerformanceBenchmarking = ({ carrierData }: PerformanceBenchmarkingProps) => {
  // Industry benchmarks and percentile calculations
  const benchmarks = [
    {
      metric: "On-Time Delivery",
      value: carrierData.onTimeRate,
      unit: "%",
      industryAverage: 92,
      topPerformer: 98,
      percentile: Math.min(95, Math.round((carrierData.onTimeRate / 98) * 100)),
      financialImpact: `Worth $${((carrierData.monthlyRevenue * 0.08)).toLocaleString()}/month in premium rates`,
      icon: <Target className="w-5 h-5" />
    },
    {
      metric: "Fuel Efficiency",
      value: carrierData.fuelEfficiency,
      unit: " MPG",
      industryAverage: 6.2,
      topPerformer: 7.5,
      percentile: Math.min(95, Math.round((carrierData.fuelEfficiency / 7.5) * 100)),
      financialImpact: `Saves $${((carrierData.monthlyRevenue * 0.12)).toLocaleString()}/month vs. average`,
      icon: <Zap className="w-5 h-5" />
    },
    {
      metric: "Monthly Load Volume",
      value: carrierData.loadCount,
      unit: " loads",
      industryAverage: 18,
      topPerformer: 35,
      percentile: Math.min(95, Math.round((carrierData.loadCount / 35) * 100)),
      financialImpact: `${carrierData.loadCount > 25 ? 'Qualifies for volume discounts' : 'Room for growth opportunities'}`,
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];
  
  const getPerformanceLevel = (percentile: number) => {
    if (percentile >= 90) return { label: "Elite", color: "bg-green-100 text-green-800" };
    if (percentile >= 75) return { label: "Above Average", color: "bg-blue-100 text-blue-800" };
    if (percentile >= 50) return { label: "Average", color: "bg-orange-100 text-orange-800" };
    return { label: "Below Average", color: "bg-red-100 text-red-800" };
  };
  
  const overallPercentile = Math.round(benchmarks.reduce((sum, b) => sum + b.percentile, 0) / benchmarks.length);
  const overallLevel = getPerformanceLevel(overallPercentile);
  
  return (
    <div className="space-y-6">
      {/* Overall Performance Score */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Overall Performance</h3>
              <p className="text-slate-600">Your ranking vs. industry peers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900">{overallPercentile}th</div>
              <div className="text-sm text-blue-700">percentile</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge className={overallLevel.color}>
              <Award className="w-4 h-4 mr-1" />
              {overallLevel.label}
            </Badge>
            <div className="text-sm text-slate-600">
              Better than {overallPercentile}% of carriers
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Individual Metrics */}
      <div className="space-y-4">
        <h4 className="font-semibold text-slate-900">Performance Breakdown</h4>
        
        {benchmarks.map((benchmark, index) => {
          const level = getPerformanceLevel(benchmark.percentile);
          
          return (
            <Card key={index} className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="text-blue-600">{benchmark.icon}</div>
                    <span className="font-medium text-slate-900">{benchmark.metric}</span>
                  </div>
                  <Badge className={level.color}>{level.label}</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-slate-600">Your Performance</div>
                    <div className="text-xl font-bold text-slate-900">
                      {benchmark.value}{benchmark.unit}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Industry Average</div>
                    <div className="text-lg font-medium text-slate-700">
                      {benchmark.industryAverage}{benchmark.unit}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Top 10%</div>
                    <div className="text-lg font-medium text-slate-700">
                      {benchmark.topPerformer}{benchmark.unit}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Percentile Ranking</span>
                    <span className="font-medium">{benchmark.percentile}th percentile</span>
                  </div>
                  <Progress value={benchmark.percentile} className="h-2" />
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Financial Impact:</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">{benchmark.financialImpact}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Improvement Opportunities */}
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-orange-900 mb-3">Improvement Opportunities</h4>
          <div className="space-y-2 text-sm text-orange-800">
            {benchmarks
              .filter(b => b.percentile < 75)
              .map((benchmark, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium">{benchmark.metric}:</span>
                    <span className="ml-1">
                      {benchmark.percentile < 50 
                        ? `Focus area - reaching industry average could improve profitability`
                        : `Good foundation - push toward top 10% for maximum returns`
                      }
                    </span>
                  </div>
                </div>
              ))}
            
            {benchmarks.every(b => b.percentile >= 75) && (
              <div className="text-green-800">
                🎉 Excellent performance across all metrics! Focus on maintaining standards while exploring growth opportunities.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceBenchmarking;
