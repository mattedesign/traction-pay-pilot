
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ChevronRight, Lightbulb, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ContextualCoachingWidgetProps {
  carrierData: {
    monthlyRevenue: number;
    factoringRate: number;
    loadCount: number;
    onTimeRate: number;
    fuelEfficiency: number;
  };
}

const ContextualCoachingWidget = ({ carrierData }: ContextualCoachingWidgetProps) => {
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  
  const generateInsights = () => {
    const insights = [];
    
    // Factoring-specific insights
    if (carrierData.factoringRate > 2.5) {
      insights.push({
        type: "cost_optimization",
        title: "Factoring Rate Opportunity",
        message: `Your ${carrierData.factoringRate}% rate is above market average. With your ${carrierData.onTimeRate}% on-time delivery, you qualify for premium rates.`,
        impact: `Potential savings: $${((carrierData.monthlyRevenue * (carrierData.factoringRate - 2.0)) / 100).toLocaleString()}/month`,
        action: "Request rate review",
        priority: "high"
      });
    }
    
    // Performance-based insights
    if (carrierData.onTimeRate >= 95) {
      insights.push({
        type: "premium_qualification",
        title: "Premium Customer Ready",
        message: `Your ${carrierData.onTimeRate}% on-time rate qualifies you for premium customer rates and preferred broker status.`,
        impact: `Potential rate increase: 8-12%`,
        action: "Apply for premium programs",
        priority: "medium"
      });
    }
    
    // Growth insights
    if (carrierData.loadCount >= 20) {
      insights.push({
        type: "expansion_ready",
        title: "Fleet Expansion Analysis",
        message: `Load pattern analysis shows you're handling ${carrierData.loadCount} loads/month efficiently. Adding a second truck could increase profit 34%.`,
        impact: `Projected additional monthly profit: $${(carrierData.monthlyRevenue * 0.34).toLocaleString()}`,
        action: "Run expansion calculator",
        priority: "medium"
      });
    }
    
    // Fuel efficiency insights
    if (carrierData.fuelEfficiency < 6.5) {
      insights.push({
        type: "efficiency_improvement",
        title: "Fuel Optimization Opportunity",
        message: `Your ${carrierData.fuelEfficiency} MPG is below optimal. Route and driving improvements could save significant costs.`,
        impact: `Potential monthly savings: $${(carrierData.monthlyRevenue * 0.15).toLocaleString()}`,
        action: "View fuel optimization tips",
        priority: "high"
      });
    }
    
    // Default positive insight
    if (insights.length === 0) {
      insights.push({
        type: "performance_recognition",
        title: "Strong Performance Metrics",
        message: `Your operation shows excellent fundamentals with ${carrierData.onTimeRate}% on-time delivery and consistent load volume.`,
        impact: `Continue current practices for sustained profitability`,
        action: "Explore growth opportunities",
        priority: "low"
      });
    }
    
    return insights;
  };
  
  const insights = generateInsights();
  const currentInsight = insights[currentInsightIndex];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
    }, 10000); // Rotate every 10 seconds
    
    return () => clearInterval(timer);
  }, [insights.length]);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      default: return 'bg-green-100 text-green-800';
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Current Insight */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-900">{currentInsight.title}</span>
            </div>
            <Badge className={getPriorityColor(currentInsight.priority)}>
              {currentInsight.priority} priority
            </Badge>
          </div>
          
          <p className="text-slate-700 mb-3">{currentInsight.message}</p>
          
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">{currentInsight.impact}</span>
          </div>
          
          <Button variant="outline" size="sm" className="w-full">
            <Lightbulb className="w-4 h-4 mr-2" />
            {currentInsight.action}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
      
      {/* Insight Navigation */}
      {insights.length > 1 && (
        <div className="flex justify-center space-x-2">
          {insights.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentInsightIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentInsightIndex ? 'bg-purple-600' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      )}
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="p-2 bg-slate-50 rounded">
          <div className="text-lg font-bold text-slate-900">{insights.length}</div>
          <div className="text-xs text-slate-600">Active Insights</div>
        </div>
        <div className="p-2 bg-slate-50 rounded">
          <div className="text-lg font-bold text-slate-900">
            ${((carrierData.monthlyRevenue * 0.15) + (carrierData.monthlyRevenue * 0.08)).toLocaleString()}
          </div>
          <div className="text-xs text-slate-600">Potential Monthly Savings</div>
        </div>
      </div>
    </div>
  );
};

export default ContextualCoachingWidget;
