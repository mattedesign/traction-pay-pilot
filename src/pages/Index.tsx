
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, FileText, MapPin, DollarSign, Route, Clock } from "lucide-react";
import NavigationSidebar from "@/components/NavigationSidebar";
import MockChatInterface from "@/components/MockChatInterface";

const Index = () => {
  const suggestedActions = [
    {
      icon: Truck,
      title: "Track a load",
      description: "Monitor load status and location",
      color: "text-blue-600"
    },
    {
      icon: FileText,
      title: "Check payment status",
      description: "View invoice and payment details",
      color: "text-green-600"
    },
    {
      icon: Route,
      title: "Plan optimal route",
      description: "Get best routes for fuel efficiency",
      color: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Check HOS compliance",
      description: "Review hours of service status",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen flex w-full" style={{ backgroundColor: '#F5F6FA' }}>
      <NavigationSidebar />
      
      <div className="flex-1 flex items-center justify-center pb-32">
        <div className="max-w-2xl w-full px-8">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Traction
            </h1>
            <p className="text-xl text-slate-600 max-w-lg mx-auto">
              Start with a task, and let Traction complete it for you. Not sure where to start? Try a template
            </p>
          </div>

          {/* Suggested Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {suggestedActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border border-slate-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center`}>
                      <action.icon className={`w-5 h-5 ${action.color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">{action.title}</h3>
                      <p className="text-sm text-slate-600">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Help */}
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-4">
              Traction might provide inaccurate information. Always verify critical details.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Chat Interface */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white p-4 z-50 shadow-lg" 
        style={{ 
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <MockChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Index;
