
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, TrendingUp, AlertCircle, DollarSign } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";

const BrokerCreditDashboardPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const creditInfo = {
    totalCreditLine: 250000,
    availableCredit: 250000,
    usedCredit: 0,
    creditUtilization: 0,
    paymentHistory: "Excellent",
    nextPaymentDue: "N/A"
  };

  const recentCreditActivity = [
    {
      id: "CR-001",
      description: "Credit line increase approved",
      amount: "+$50,000",
      date: "2024-06-01",
      type: "Credit Increase"
    },
    {
      id: "CR-002", 
      description: "Monthly credit review",
      amount: "N/A",
      date: "2024-05-15",
      type: "Review"
    },
    {
      id: "CR-003",
      description: "Initial credit line establishment",
      amount: "$200,000",
      date: "2024-04-01", 
      type: "Initial Setup"
    }
  ];

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "Credit Increase": return "bg-green-100 text-green-800";
      case "Review": return "bg-blue-100 text-blue-800";
      case "Initial Setup": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-screen overflow-hidden flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/broker/payments')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Payments
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Credit Dashboard</h1>
                <p className="text-slate-600">Monitor your credit line and utilization</p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Credit Line</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${creditInfo.totalCreditLine.toLocaleString()}
                    </p>
                  </div>
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Available Credit</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${creditInfo.availableCredit.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Credit Utilization</p>
                    <p className="text-2xl font-bold text-green-600">
                      {creditInfo.creditUtilization}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Payment History</p>
                    <p className="text-2xl font-bold text-green-600">
                      {creditInfo.paymentHistory}
                    </p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Credit Utilization Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Used Credit</span>
                    <span className="font-semibold">${creditInfo.usedCredit.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${creditInfo.creditUtilization}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-slate-600">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✓ Excellent credit utilization! You're using 0% of your available credit.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Credit Management Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Request Credit Increase
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Credit Reports
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Make Payment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Contact Credit Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Recent Credit Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCreditActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-slate-900">{activity.description}</h3>
                      <p className="text-sm text-slate-600">{activity.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{activity.amount}</p>
                      <Badge className={getActivityTypeColor(activity.type)}>
                        {activity.type}
                      </Badge>
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

export default BrokerCreditDashboardPage;
