
import NavigationSidebar from "@/components/NavigationSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter, Clock } from "lucide-react";

const SearchPage = () => {
  const availableLoads = [
    {
      id: "AL-001",
      origin: "Chicago, IL",
      destination: "Indianapolis, IN",
      distance: "185 miles",
      rate: "$420.00",
      pickupDate: "Jun 8, 2024",
      equipment: "Dry Van",
      weight: "15,000 lbs"
    },
    {
      id: "AL-002", 
      origin: "Atlanta, GA",
      destination: "Nashville, TN",
      distance: "250 miles",
      rate: "$580.00",
      pickupDate: "Jun 9, 2024",
      equipment: "Reefer",
      weight: "22,000 lbs"
    },
    {
      id: "AL-003",
      origin: "Denver, CO", 
      destination: "Salt Lake City, UT",
      distance: "525 miles",
      rate: "$950.00",
      pickupDate: "Jun 10, 2024",
      equipment: "Flatbed",
      weight: "35,000 lbs"
    }
  ];

  return (
    <div className="min-h-screen flex w-full" style={{ backgroundColor: '#F5F6FA' }}>
      <NavigationSidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Load Search</h1>
            <p className="text-slate-600">Find available loads that match your route and equipment</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Search Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Origin</label>
                  <Input placeholder="City, State" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                  <Input placeholder="City, State" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Equipment Type</label>
                  <Input placeholder="Dry Van, Reefer, etc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Date</label>
                  <Input type="date" />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Advanced Filters</span>
                </Button>
                <Button className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Search Loads</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Available Loads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">247</div>
                <p className="text-xs text-green-600">+23 new today</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Average Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">$2.15/mi</div>
                <p className="text-xs text-green-600">+3% this week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Hot Markets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">TX, CA, FL</div>
                <p className="text-xs text-slate-600">High demand areas</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Available Loads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableLoads.map((load) => (
                  <div key={load.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{load.id}</Badge>
                        <Badge className="bg-blue-100 text-blue-800">{load.equipment}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{load.rate}</p>
                        <p className="text-sm text-slate-500">{load.distance}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{load.origin} → {load.destination}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{load.pickupDate}</span>
                        </div>
                        <span>Weight: {load.weight}</span>
                      </div>
                      <Button size="sm">Book Load</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
