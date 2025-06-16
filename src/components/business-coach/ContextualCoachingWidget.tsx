
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Target, 
  Lightbulb, 
  TrendingUp,
  AlertCircle,
  Star,
  DollarSign,
  Route,
  Clock
} from "lucide-react";
import { ContextualBusinessCoach, ContextualCoachingInsight, UserContext } from "@/services/contextualBusinessCoach";
import { CarrierProfile } from "@/pages/Index";
import { useEffect, useState } from "react";

interface ContextualCoachingWidgetProps {
  carrierProfile: CarrierProfile;
  userContext: UserContext;
  onActionClick?: (action: string) => void;
}

const ContextualCoachingWidget = ({ 
  carrierProfile, 
  userContext, 
  onActionClick 
}: ContextualCoachingWidgetProps) => {
  const [insights, setInsights] = useState<ContextualCoachingInsight[]>([]);
  const [contextualPrompts, setContextualPrompts] = useState<string[]>([]);

  useEffect(() => {
    const generatedInsights = ContextualBusinessCoach.generateContextualInsights(
      carrierProfile, 
      userContext
    );
    const prompts = ContextualBusinessCoach.getContextualPrompts(userContext);
    
    setInsights(generatedInsights.slice(0, 3)); // Show top 3 insights
    setContextualPrompts(prompts);
  }, [carrierProfile, userContext]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return TrendingUp;
      case 'warning': return AlertCircle;
      case 'guidance': return Lightbulb;
      case 'celebration': return Star;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string, priority: string) => {
    switch (type) {
      case 'opportunity': return priority === 'high' ? 'text-green-600 bg-green-50' : 'text-green-600 bg-green-50';
      case 'warning': return 'text-red-600 bg-red-50';
      case 'guidance': return 'text-blue-600 bg-blue-50';
      case 'celebration': return 'text-purple-600 bg-purple-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-blue-600" />
          <span>Contextual Business Coach</span>
          <Badge className="bg-blue-100 text-blue-800">
            {userContext.currentPage}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contextual Insights */}
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            Right Now Insights
          </h4>
          
          {insights.map((insight) => {
            const IconComponent = getInsightIcon(insight.type);
            return (
              <div 
                key={insight.id}
                className={`p-4 rounded-lg ${getInsightColor(insight.type, insight.priority)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3">
                    <IconComponent className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold">{insight.title}</h5>
                      <p className="text-sm mt-1">{insight.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getPriorityBadge(insight.priority)}>
                      {insight.priority}
                    </Badge>
                    
                    {insight.potentialImpact?.financial && (
                      <div className="text-sm font-semibold text-green-600">
                        Save ${insight.potentialImpact.financial}
                      </div>
                    )}
                  </div>
                </div>

                {insight.suggestedActions && insight.actionable && (
                  <div className="mt-3">
                    <h6 className="text-sm font-medium mb-2">Quick Actions:</h6>
                    <div className="flex flex-wrap gap-2">
                      {insight.suggestedActions.slice(0, 2).map((action, index) => (
                        <Button 
                          key={index}
                          size="sm" 
                          variant="outline"
                          className="text-xs"
                          onClick={() => onActionClick?.(action)}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contextual Quick Questions */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900">Ask Me About:</h4>
          <div className="grid grid-cols-1 gap-2">
            {contextualPrompts.map((prompt, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="justify-start text-left"
                onClick={() => onActionClick?.(prompt)}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                {prompt}
              </Button>
            ))}
          </div>
        </div>

        {/* Performance Context */}
        {userContext.recentPerformance && (
          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Your Performance Context
            </h4>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-green-600">
                  {(userContext.recentPerformance.onTimeDeliveries * 100).toFixed(1)}%
                </div>
                <div className="text-slate-600">On-Time</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600">
                  {userContext.recentPerformance.averageMargin || '22.5'}%
                </div>
                <div className="text-slate-600">Avg Margin</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContextualCoachingWidget;
