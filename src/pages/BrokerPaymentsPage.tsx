
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, TrendingUp, Download, Send } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";

const BrokerPaymentsPage = () => {
  const { profile, signOut } = useAuth();

  const paymentStats = [
    { label: "Outstanding Invoices", value: "$89,450", icon: DollarSign, color: "text-red-600" },
    { label: "This Month Paid", value: "$245,680", icon: TrendingUp, color: "text-green-600" },
    { label: "Available Credit", value: "$250,000", icon: CreditCard, color: "text-blue-600" },
  ];

  const recentPayments = [
    { id: "PAY-001", carrier: "ABC Trucking", amount: "$2,450", status: "Paid", date: "2024-06-08" },
    { id: "PAY-002", carrier: "XYZ Logistics", amount: "$1,850", status: "Pending", date: "2024-06-07" },
    { id: "PAY-003", carrier: "Fast Transport", amount: "$1,675", status: "Processing", date: "2024-06-06" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Payments</h1>
              <p className="text-slate-600">Manage your payment operations</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex-1 px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paymentStats.map((stat, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Payments</CardTitle>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Send Payment
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-slate-900">{payment.id}</h3>
                      <p className="text-sm text-slate-600">{payment.carrier}</p>
                      <p className="text-xs text-slate-500">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{payment.amount}</p>
                      <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
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

export default BrokerPaymentsPage;
