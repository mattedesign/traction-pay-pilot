
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MapPin, DollarSign, Clock, Fuel, CreditCard, Share2, Route } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatInterface from "./ChatInterface";

const LoadNotification = () => {
  const navigate = useNavigate();

  const loadData = {
    loadId: "1234",
    status: "pending_pickup",
    amount: "$500.00",
    origin: "Shreve, OH",
    destination: "Grove City, OH",
    pickupTime: "Today 1:00 PM",
    deliveryTime: "Today 4:30 PM",
    distance: "45 miles",
    estimatedFuel: "$32.50"
  };

  return (
    <div className="space-y-6">
      {/* Notification Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-blue-600" />
            <div>
              <CardTitle className="text-blue-900">New Load Available!</CardTitle>
              <CardDescription className="text-blue-700">
                Load #{loadData.loadId} has been assigned to you
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-slate-600" />
                <span className="font-medium">Route</span>
              </div>
              <p className="text-sm text-slate-700">{loadData.origin} → {loadData.destination}</p>
              <p className="text-xs text-slate-500">{loadData.distance}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="font-medium">Payment</span>
              </div>
              <p className="text-lg font-bold text-green-600">{loadData.amount}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-sm mb-1">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="font-medium">Pickup</span>
              </div>
              <p className="text-sm">{loadData.pickupTime}</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 text-sm mb-1">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="font-medium">Delivery</span>
              </div>
              <p className="text-sm">{loadData.deliveryTime}</p>
            </div>
          </div>

          <Button 
            onClick={() => navigate(`/load/${loadData.loadId}`)}
            className="w-full"
          >
            View Load Details & Upload Documents
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <Fuel className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-medium text-green-900">Fuel Advance</h3>
            <p className="text-sm text-green-700 mb-3">Get ${Math.round(parseFloat(loadData.amount.slice(1)) * 0.3)} now</p>
            <Button size="sm" variant="outline" className="border-green-300">
              Request Advance
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <Route className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-medium text-blue-900">Optimal Route</h3>
            <p className="text-sm text-blue-700 mb-3">Save $8.50 on fuel</p>
            <Button size="sm" variant="outline" className="border-blue-300">
              View Route
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-medium text-purple-900">Fuel Cards</h3>
            <p className="text-sm text-purple-700 mb-3">Best discounts on route</p>
            <Button size="sm" variant="outline" className="border-purple-300">
              Compare Cards
            </Button>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <Share2 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-medium text-orange-900">Share ELD</h3>
            <p className="text-sm text-orange-700 mb-3">Increase trustworthiness</p>
            <Button size="sm" variant="outline" className="border-orange-300">
              Enable Sharing
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Chat */}
      <Card>
        <CardHeader>
          <CardTitle>Ask About This Load</CardTitle>
          <CardDescription>
            Get instant answers about Load #{loadData.loadId}, route optimization, or payment options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChatInterface loadContext={`Load #${loadData.loadId}`} />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadNotification;
