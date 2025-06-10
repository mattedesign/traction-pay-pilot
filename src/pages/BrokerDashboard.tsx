
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  FileText,
  Truck,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle,
  CreditCard,
  Clock,
  Eye
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";

const BrokerDashboard = () => {
  const { profile, signOut } = useAuth();

  const financialStats = [
    { label: "Amount Due", value: "$89,450", icon: AlertCircle, color: "text-red-600", description: "Outstanding payments" },
    { label: "Amount Incoming", value: "$156,780", icon: TrendingUp, color: "text-green-600", description: "Expected payments" },
    { label: "Credit Line Available", value: "$250,000", icon: CreditCard, color: "text-blue-600", description: "Available credit" },
    { label: "Loads in Progress", value: "18", icon: Truck, color: "text-orange-600", description: "Active loads" },
  ];

  const loadsInProgress = [
    {
      id: "BL-2024-001",
      origin: "Chicago, IL",
      destination: "Dallas, TX",
      status: "In Transit",
      carrier: "ABC Trucking",
      pickupDate: "2024-06-08",
      rate: "$2,450",
      eta: "2024-06-10"
    },
    {
      id: "BL-2024-002", 
      origin: "Los Angeles, CA",
      destination: "Phoenix, AZ",
      status: "Pickup Complete",
      carrier: "XYZ Logistics",
      pickupDate: "2024-06-07",
      rate: "$1,850",
      eta: "2024-06-09"
    },
    {
      id: "BL-2024-003",
      origin: "Miami, FL", 
      destination: "Atlanta, GA",
      status: "Pickup Scheduled",
      carrier: "Fast Transport",
      pickupDate: "2024-06-10",
      rate: "$1,675",
      eta: "2024-06-11"
    }
  ];

  const paperworkReview = [
    {
      carrier: "ABC Trucking",
      loadId: "BL-2024-001",
      documentsSubmitted: ["BOL", "POD"],
      documentsNeeded: ["Rate Confirmation"],
      submittedDate: "2024-06-08",
      priority: "High"
    },
    {
      carrier: "XYZ Logistics", 
      loadId: "BL-2024-002",
      documentsSubmitted: ["BOL", "POD", "Rate Confirmation"],
      documentsNeeded: [],
      submittedDate: "2024-06-07",
      priority: "Complete"
    },
    {
      carrier: "Fast Transport",
      loadId: "BL-2024-005",
      documentsSubmitted: ["BOL"],
      documentsNeeded: ["POD", "Rate Confirmation"],
      submittedDate: "2024-06-06",
      priority: "Medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Pickup Complete": return "bg-orange-100 text-orange-800";
      case "Pickup Scheduled": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-orange-100 text-orange-800";
      case "Complete": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Broker Dashboard</h1>
              <p className="text-slate-600">Welcome back, {profile?.first_name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                <Building2 className="w-3 h-3 mr-1" />
                {profile?.company_name || 'Broker Account'}
              </Badge>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-8 py-6 space-y-6">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialStats.map((stat, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Loads in Progress */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Loads in Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadsInProgress.map((load) => (
                  <div key={load.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900">{load.id}</h3>
                        <Badge className={getStatusColor(load.status)}>{load.status}</Badge>
                      </div>
                      <span className="font-bold text-green-600">{load.rate}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{load.origin} → {load.destination}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{load.carrier}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>ETA: {load.eta}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  View All Loads
                </Button>
              </CardContent>
            </Card>

            {/* Paperwork Review */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Paperwork Review</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paperworkReview.map((item, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900">{item.carrier}</h3>
                        <p className="text-sm text-slate-600">Load: {item.loadId}</p>
                      </div>
                      <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Submitted: {item.documentsSubmitted.join(", ")}</span>
                      </div>
                      {item.documentsNeeded.length > 0 && (
                        <div className="flex items-center space-x-2 text-orange-600">
                          <AlertCircle className="w-4 h-4" />
                          <span>Needed: {item.documentsNeeded.join(", ")}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span>Submitted: {item.submittedDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Review All Documents
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;
