
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, ArrowLeft, MapPin, Calendar, DollarSign, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AvailableLoadsPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const loadStats = {
    available: 18,
    potential: 78,
    restricted: 60,
    restrictionRate: 77
  };

  const availableLoads = [
    { id: "LD-001", origin: "Chicago, IL", destination: "Dallas, TX", rate: 2400, miles: 925, weight: "45,000 lbs", pickup: "2024-06-25", delivery: "2024-06-26" },
    { id: "LD-002", origin: "Atlanta, GA", destination: "Miami, FL", rate: 1800, miles: 650, weight: "38,500 lbs", pickup: "2024-06-24", delivery: "2024-06-25" },
    { id: "LD-003", origin: "Phoenix, AZ", destination: "Los Angeles, CA", rate: 1200, miles: 370, weight: "42,000 lbs", pickup: "2024-06-26", delivery: "2024-06-27" },
    { id: "LD-004", origin: "Denver, CO", destination: "Seattle, WA", rate: 3200, miles: 1320, weight: "47,500 lbs", pickup: "2024-06-27", delivery: "2024-06-29" },
    { id: "LD-005", origin: "Houston, TX", destination: "New Orleans, LA", rate: 950, miles: 350, weight: "35,000 lbs", pickup: "2024-06-25", delivery: "2024-06-26" }
  ];

  const restrictionReasons = [
    { reason: "Credit Score Below Threshold", count: 25, percentage: 42 },
    { reason: "Insufficient Insurance Coverage", count: 15, percentage: 25 },
    { reason: "Poor On-Time Performance", count: 12, percentage: 20 },
    { reason: "Missing Safety Certifications", count: 8, percentage: 13 }
  ];

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate(-1)} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center">
                  <Truck className="w-6 h-6 mr-2 text-amber-600" />
                  Available Loads
                </h1>
                <p className="text-slate-600">Load availability and access restrictions</p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          {/* Load Access Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-amber-100 text-sm font-medium mb-1">Available</div>
                    <div className="text-3xl font-bold">{loadStats.available}</div>
                    <div className="text-amber-100 text-sm mt-1">Loads accessible</div>
                  </div>
                  <Truck className="w-12 h-12 text-amber-200" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Total Potential</div>
                <div className="text-2xl font-bold text-slate-900">{loadStats.potential}</div>
                <div className="text-slate-500 text-sm mt-1">Loads in system</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Restricted</div>
                <div className="text-2xl font-bold text-red-600">{loadStats.restricted}</div>
                <div className="text-slate-500 text-sm mt-1">Access denied</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Restriction Rate</div>
                <div className="text-2xl font-bold text-red-600">{loadStats.restrictionRate}%</div>
                <div className="text-slate-500 text-sm mt-1">Above industry avg</div>
              </CardContent>
            </Card>
          </div>

          {/* Current Available Loads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Currently Available Loads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableLoads.map((load, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white hover:bg-slate-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="font-bold text-blue-600">{load.id}</div>
                        <div className="text-2xl font-bold text-green-600">${load.rate.toLocaleString()}</div>
                        <div className="text-sm text-slate-600">{load.miles} miles</div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Book Load
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-slate-500 mr-2" />
                        <span><strong>From:</strong> {load.origin}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-slate-500 mr-2" />
                        <span><strong>To:</strong> {load.destination}</span>
                      </div>
                      <div className="flex items-center">
                        <span><strong>Weight:</strong> {load.weight}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Pickup: {load.pickup} | Delivery: {load.delivery}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Access Restrictions Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                Access Restriction Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {restrictionReasons.map((restriction, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-900">{restriction.reason}</span>
                      <div className="text-right">
                        <div className="font-bold text-red-600">{restriction.count} loads</div>
                        <div className="text-sm text-slate-600">{restriction.percentage}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${restriction.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Recommendations to Improve Access</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Improve credit score through consistent payment history</li>
                  <li>• Upgrade insurance coverage to meet broker requirements</li>
                  <li>• Focus on on-time delivery performance improvements</li>
                  <li>• Complete required safety certifications and training</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AvailableLoadsPage;
