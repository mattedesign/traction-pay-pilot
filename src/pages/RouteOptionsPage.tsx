
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Route, Fuel, Clock, Navigation, MapPin, TrendingDown, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";
import RouteOptimization from "@/components/RouteOptimization";

const RouteOptionsPage = () => {
  const navigate = useNavigate();

  const loadInfo = {
    loadId: "0000",
    origin: "Chicago, IL",
    destination: "Dallas, TX",
    distance: "925 miles",
    estimatedTime: "14h 30m"
  };

  const routeOptions = [
    {
      id: "ai-optimized",
      name: "AI Optimized Route",
      description: "Via I-55 S → I-44 W → I-35 S",
      fuelCost: 180.50,
      driveTime: "14h 15m",
      distance: "918 miles",
      savings: 45.25,
      recommended: true,
      features: ["Avoids high-fuel zones", "3 preferred truck stops", "Real-time traffic optimization"]
    },
    {
      id: "fastest",
      name: "Fastest Route",
      description: "Via I-80 W → I-35 S",
      fuelCost: 195.75,
      driveTime: "13h 45m", 
      distance: "932 miles",
      savings: 30.00,
      features: ["Direct highway route", "Minimal stops", "Highway speed optimization"]
    },
    {
      id: "fuel-efficient",
      name: "Most Fuel Efficient",
      description: "Via I-70 W → I-44 W → I-35 S",
      fuelCost: 165.25,
      driveTime: "15h 20m",
      distance: "945 miles",
      savings: 60.50,
      features: ["Cheapest fuel stops", "Flat terrain priority", "Speed-optimized for MPG"]
    }
  ];

  const handleSelectRoute = (routeId: string) => {
    console.log(`Selected route: ${routeId}`);
    // Open Google Maps with the route
    const origin = encodeURIComponent("Chicago, IL");
    const destination = encodeURIComponent("Dallas, TX");
    const mapsUrl = `https://www.google.com/maps/dir/${origin}/${destination}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Route Options</h1>
              <p className="text-slate-600">Optimized routes for Load #{loadInfo.loadId}</p>
            </div>
          </div>

          {/* Load Summary */}
          <Card className="mb-6 bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-slate-600" />
                <span>Load #{loadInfo.loadId} Route Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Origin</p>
                  <p className="font-medium">{loadInfo.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Destination</p>
                  <p className="font-medium">{loadInfo.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Distance</p>
                  <p className="font-medium">{loadInfo.distance}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Est. Time</p>
                  <p className="font-medium">{loadInfo.estimatedTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Options Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {routeOptions.map((route) => (
              <Card key={route.id} className={`relative bg-white border-slate-200 hover:shadow-lg transition-shadow ${route.recommended ? 'ring-2 ring-blue-200' : ''}`}>
                {route.recommended && (
                  <div className="absolute -top-2 left-4">
                    <Badge className="bg-blue-600 text-white">
                      AI Recommended
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{route.name}</CardTitle>
                  <p className="text-sm text-slate-600">{route.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Fuel className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                      <p className="text-sm text-slate-500">Fuel Cost</p>
                      <p className="text-lg font-bold text-slate-700">${route.fuelCost.toFixed(2)}</p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <Clock className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                      <p className="text-sm text-slate-500">Drive Time</p>
                      <p className="text-lg font-bold text-slate-700">{route.driveTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Savings</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">${route.savings.toFixed(2)}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Features:</p>
                    <ul className="space-y-1">
                      {route.features.map((feature, index) => (
                        <li key={index} className="text-xs text-slate-600 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => handleSelectRoute(route.id)}
                    className={`w-full ${route.recommended ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-600 hover:bg-slate-700'}`}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Select This Route
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Route Optimization Component */}
          <RouteOptimization />
        </div>
      </div>
    </div>
  );
};

export default RouteOptionsPage;
