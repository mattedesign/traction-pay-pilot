
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  MessageSquare,
  BarChart3,
  Calendar,
  Star
} from "lucide-react";
import { CarrierProfile } from "@/pages/AdaptiveDashboardPage";

interface AIBusinessCoachProps {
  carrierProfile: CarrierProfile;
}

const AIBusinessCoach = ({ carrierProfile }: AIBusinessCoachProps) => {
  const weeklyReview = {
    performanceScore: 87,
    improvements: [
      "Route efficiency up 12%",
      "Fuel costs down 8%", 
      "On-time delivery 96%"
    ],
    challenges: [
      "Deadhead miles increased",
      "Detention time above target"
    ]
  };

  const growthInsights = [
    {
      title: "Ready for Fleet Expansion",
      description: "Your metrics indicate readiness to add 1-2 trucks",
      confidence: 0.92,
      nextSteps: ["Secure financing", "Hire qualified drivers", "Analyze market capacity"]
    },
    {
      title: "Market Opportunity",
      description: "Southeast corridor showing 18% rate increases",
      confidence: 0.85,
      nextSteps: ["Build broker relationships", "Optimize routes", "Consider dedicated contracts"]
    }
  ];

  const coachingLevel = carrierProfile.businessCoachingLevel;

  return (
    <div className="space-y-6">
      {/* Weekly Performance Review */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <span>Weekly Performance Review</span>
            <Badge className="bg-green-100 text-green-800">
              {weeklyReview.performanceScore}/100
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Improvements This Week
              </h4>
              <ul className="space-y-2">
                {weeklyReview.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-green-600 mr-2" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Areas for Focus
              </h4>
              <ul className="space-y-2">
                {weeklyReview.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Lightbulb className="w-4 h-4 text-orange-600 mr-2" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Planning */}
      {coachingLevel !== 'basic' && (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <span>Growth Intelligence</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {growthInsights.map((insight, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-900">{insight.title}</h4>
                    <Badge className="bg-blue-100 text-blue-800">
                      {(insight.confidence * 100).toFixed(0)}% confident
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 mb-3">{insight.description}</p>
                  
                  <div>
                    <h5 className="font-medium text-slate-900 mb-2">Recommended Next Steps:</h5>
                    <ul className="space-y-1">
                      {insight.nextSteps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-sm text-slate-600 flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Coach */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            <span>Chat with Your Business Coach</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-slate-700">
              Ask me anything about optimizing your carrier operation, from route planning 
              to business growth strategies.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start">
                <Target className="w-4 h-4 mr-2" />
                Set growth goals
              </Button>
              <Button variant="outline" className="justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analyze performance
              </Button>
              <Button variant="outline" className="justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Plan next week
              </Button>
              <Button variant="outline" className="justify-start">
                <Lightbulb className="w-4 h-4 mr-2" />
                Find savings opportunities
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIBusinessCoach;
