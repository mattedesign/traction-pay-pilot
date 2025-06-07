
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, MessageSquare, FileText, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";
import MockChatInterface from "@/components/MockChatInterface";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex w-full" style={{ backgroundColor: '#F5F6FA' }}>
      <NavigationSidebar />
      
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              AI-Powered Load Management
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Streamline your trucking operations with intelligent load tracking, AI assistance, and comprehensive logistics management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-6 h-6 mr-2 text-blue-600" />
                  Load Tracking
                </CardTitle>
                <CardDescription>
                  Monitor your loads in real-time with detailed status updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/load/1234")}
                  className="w-full"
                >
                  View Sample Load
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-green-600" />
                  AI Assistant
                </CardTitle>
                <CardDescription>
                  Get instant answers about regulations, routes, and operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/load/1234")}
                  variant="outline" 
                  className="w-full"
                >
                  Try AI Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-purple-600" />
                  Smart Analytics
                </CardTitle>
                <CardDescription>
                  Gain insights into route optimization and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/load/5678")}
                  variant="outline" 
                  className="w-full"
                >
                  View Intelligence
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Sample Loads Available</h2>
            <p className="text-slate-600 mb-6">
              Explore different load scenarios and see how our AI assistant can help with your trucking operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => navigate("/load/1234")}>
                Load #1234 - Pending Pickup
              </Button>
              <Button onClick={() => navigate("/load/5678")} variant="outline">
                Load #5678 - In Transit
              </Button>
              <Button onClick={() => navigate("/load/9012")} variant="outline">
                Load #9012 - Delivered
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Chat Interface */}
        <div className="fixed bottom-6 right-6 w-96 h-96 bg-white rounded-lg shadow-xl border border-slate-200 p-4 z-50">
          <MockChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Index;
