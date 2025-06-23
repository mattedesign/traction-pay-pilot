
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import DashboardHeader from "@/components/broker/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, TrendingUp, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImmediateActionCenter from "@/components/broker/ImmediateActionCenter";
import CarrierOptimizationEngine from "@/components/broker/CarrierOptimizationEngine";
import PredictiveCashFlowAssistant from "@/components/broker/PredictiveCashFlowAssistant";
import SmartAlertsRecommendations from "@/components/broker/SmartAlertsRecommendations";
import ROIMetricsDashboard from "@/components/broker/ROIMetricsDashboard";
import { LoadInProgress } from "@/types/brokerLoad";

// Mock data for the optimization dashboard
const mockLoadsData: LoadInProgress[] = [
  {
    id: "TL-2024-001",
    origin: "Dallas, TX",
    destination: "Atlanta, GA",
    status: "in_transit",
    carrier: "Swift Transportation",
    driver: "Mike Johnson",
    driverPhone: "(555) 123-4567",
    currentLocation: { lat: 32.7767, lng: -96.7970, city: "Dallas, TX" },
    pickupDate: "June 8, 2024",
    deliveryDate: "June 10, 2024",
    rate: "$1,850",
    distance: "925 mi",
    eta: "June 10, 2:00 PM",
    lastUpdate: "2 hours ago",
    quickPayEligible: true,
    quickPayRate: "$1,813",
    commodity: "Electronics",
    weight: "45,000 lbs",
    equipment: "53' Dry Van",
    referenceNumber: "REF-001",
    specialInstructions: "Temperature sensitive - keep below 75°F"
  },
  {
    id: "TL-2024-002",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    status: "delivery_scheduled",
    carrier: "J.B. Hunt",
    driver: "Sarah Williams",
    driverPhone: "(555) 234-5678",
    currentLocation: { lat: 34.0522, lng: -118.2437, city: "Los Angeles, CA" },
    pickupDate: "June 7, 2024",
    deliveryDate: "June 9, 2024",
    rate: "$1,200",
    distance: "370 mi",
    eta: "June 9, 10:00 AM",
    lastUpdate: "1 hour ago",
    quickPayEligible: false,
    commodity: "Automotive Parts",
    weight: "38,500 lbs",
    equipment: "53' Dry Van",
    referenceNumber: "REF-002"
  },
  {
    id: "TL-2024-003",
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    status: "pickup_scheduled",
    carrier: "Schneider National",
    driver: "Robert Chen",
    driverPhone: "(555) 345-6789",
    pickupDate: "June 9, 2024",
    deliveryDate: "June 10, 2024",
    rate: "$950",
    distance: "280 mi",
    eta: "June 10, 4:00 PM",
    lastUpdate: "30 minutes ago",
    quickPayEligible: true,
    quickPayRate: "$931",
    commodity: "Manufacturing Equipment",
    weight: "42,000 lbs",
    equipment: "48' Flatbed",
    referenceNumber: "REF-003"
  }
];

const BrokerQuickPayOptimizationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/broker")}
                className="hover:bg-slate-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">QuickPay Optimization Center</h1>
                <p className="text-slate-600 mt-1">AI-powered cash flow optimization and carrier relationship management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">
                <Zap className="w-4 h-4 mr-1" />
                Active Optimization
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                <Brain className="w-4 h-4 mr-1" />
                AI-Powered
              </Badge>
            </div>
          </div>

          {/* Smart Alerts & Recommendations - Top Priority */}
          <SmartAlertsRecommendations loads={mockLoadsData} />

          {/* Immediate Action Center */}
          <ImmediateActionCenter loads={mockLoadsData} />

          {/* ROI Metrics Dashboard */}
          <ROIMetricsDashboard loads={mockLoadsData} />

          {/* Two Column Layout for Advanced Features */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Carrier Optimization Engine */}
            <CarrierOptimizationEngine loads={mockLoadsData} />

            {/* Predictive Cash Flow Assistant */}
            <PredictiveCashFlowAssistant loads={mockLoadsData} />
          </div>

          {/* Success Stories / Demo Section */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <span>Optimization Success Story</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">47%</div>
                  <div className="text-sm text-green-700">Cash Flow Improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$23K</div>
                  <div className="text-sm text-blue-700">Monthly Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-purple-700">Carrier Satisfaction</div>
                </div>
              </div>
              <p className="text-center text-slate-600 mt-4">
                "By implementing QuickPay optimization, FreightCorp reduced payment cycles from 15 days to 3 hours 
                while improving carrier relationships and cash flow predictability."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrokerQuickPayOptimizationPage;
