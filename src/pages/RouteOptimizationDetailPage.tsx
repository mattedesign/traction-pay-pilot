
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Navigation, Fuel, Clock, DollarSign, MapPin, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockRouteOptimizationData } from "@/data/mockRouteOptimization";
import NavigationSidebar from "@/components/NavigationSidebar";

const RouteOptimizationDetailPage = () => {
  const { optimizationType } = useParams();
  const navigate = useNavigate();
  
  const routeData = mockRouteOptimizationData[optimizationType || 'fuel_efficient'];
  
  if (!routeData) {
    return (
      <div className="h-screen bg-slate-50 flex">
        <NavigationSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Route Not Found</h1>
            <p className="text-slate-600">The requested route optimization could not be found.</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getOptimizationTitle = (type: string) => {
    switch (type) {
      case 'fuel_efficient': return 'Fuel-Efficient Route';
      case 'fastest': return 'Fastest Route';
      case 'multi_stop': return 'Multi-Stop Optimization';
      case 'weather_aware': return 'Weather-Aware Route';
      default: return 'Route Optimization';
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex">
      <NavigationSidebar />
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {getOptimizationTitle(optimizationType || '')}
              </h1>
              <p className="text-slate-600">Load #{routeData.loadId} Route Optimization</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Route Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-slate-500" />
                    <span>Original Route</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-600">Distance</div>
                      <div className="font-semibold">{routeData.originalRoute.distance}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Duration</div>
                      <div className="font-semibold">{routeData.originalRoute.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Fuel Cost</div>
                      <div className="font-semibold">{routeData.originalRoute.fuelCost}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Toll Costs</div>
                      <div className="font-semibold">{routeData.originalRoute.tollCosts}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-green-600" />
                    <span>Optimized Route</span>
                    <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-600">Distance</div>
                      <div className="font-semibold">{routeData.optimizedRoute.distance}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Duration</div>
                      <div className="font-semibold">{routeData.optimizedRoute.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Fuel Cost</div>
                      <div className="font-semibold">{routeData.optimizedRoute.fuelCost}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Toll Costs</div>
                      <div className="font-semibold">{routeData.optimizedRoute.tollCosts}</div>
                    </div>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-800">
                        Total Savings: {routeData.optimizedRoute.savings}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Fuel Stops */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Fuel className="w-5 h-5 text-blue-600" />
                  <span>Recommended Fuel Stops</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routeData.fuelStops.map((stop, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{stop.name}</h4>
                          <p className="text-sm text-slate-600">{stop.address}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{stop.pricePerGallon}</div>
                          <div className="text-sm text-slate-600">per gallon</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {stop.amenities.map((amenity, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather & Traffic Alerts */}
            <div className="grid md:grid-cols-2 gap-6">
              {routeData.weatherAlerts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <span>Weather Alerts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {routeData.weatherAlerts.map((alert, index) => (
                        <div key={index} className="border-l-4 border-yellow-400 pl-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{alert.location}</h4>
                              <p className="text-sm text-slate-600">{alert.description}</p>
                            </div>
                            <Badge variant={alert.severity === 'Light' ? 'secondary' : 'destructive'}>
                              {alert.severity}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <span>Traffic Updates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {routeData.trafficUpdates.map((update, index) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{update.location}</h4>
                            <p className="text-sm text-slate-600">{update.description}</p>
                          </div>
                          <Badge variant={update.delay === 'Clear' ? 'secondary' : 'outline'}>
                            {update.delay}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Navigation className="w-4 h-4 mr-2" />
                Start Navigation
              </Button>
              <Button size="lg" variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                View in Maps
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizationDetailPage;
