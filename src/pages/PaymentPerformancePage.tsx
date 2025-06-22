
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, ArrowLeft, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentPerformancePage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const paymentStats = {
    onTimeRate: 72,
    industryAverage: 85,
    totalInvoices: 156,
    onTimePayments: 112,
    latePayments: 44
  };

  const recentPayments = [
    { customer: "ABC Logistics", invoiceId: "INV-2024-001", dueDate: "2024-06-15", paidDate: "2024-06-18", status: "late", amount: 2450 },
    { customer: "XYZ Freight", invoiceId: "INV-2024-002", dueDate: "2024-06-20", paidDate: "2024-06-19", status: "early", amount: 3200 },
    { customer: "Quick Ship Co", invoiceId: "INV-2024-003", dueDate: "2024-06-22", paidDate: "2024-06-22", status: "ontime", amount: 1875 },
    { customer: "Fast Track", invoiceId: "INV-2024-004", dueDate: "2024-06-25", paidDate: "2024-06-28", status: "late", amount: 4100 },
    { customer: "Prime Movers", invoiceId: "INV-2024-005", dueDate: "2024-06-30", paidDate: "2024-06-29", status: "early", amount: 2900 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'early': return 'text-green-600 bg-green-50';
      case 'ontime': return 'text-blue-600 bg-blue-50';
      case 'late': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'early': return <CheckCircle className="w-4 h-4" />;
      case 'ontime': return <CheckCircle className="w-4 h-4" />;
      case 'late': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

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
                  <Target className="w-6 h-6 mr-2 text-red-600" />
                  Payment Performance
                </h1>
                <p className="text-slate-600">On-time payment tracking and analysis</p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-red-100 text-sm font-medium mb-1">On-Time Rate</div>
                    <div className="text-3xl font-bold">{paymentStats.onTimeRate}%</div>
                    <div className="text-red-100 text-sm mt-1">
                      {paymentStats.onTimeRate - paymentStats.industryAverage}% below industry
                    </div>
                  </div>
                  <Target className="w-12 h-12 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Industry Average</div>
                <div className="text-2xl font-bold text-slate-900">{paymentStats.industryAverage}%</div>
                <div className="text-slate-500 text-sm mt-1">Target benchmark</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Late Payments</div>
                <div className="text-2xl font-bold text-red-600">{paymentStats.latePayments}</div>
                <div className="text-slate-500 text-sm mt-1">Out of {paymentStats.totalInvoices} total</div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="font-medium">Early Payments</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">28</div>
                    <div className="text-sm text-slate-600">17.9%</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium">On-Time Payments</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">84</div>
                    <div className="text-sm text-slate-600">53.8%</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                    <span className="font-medium">Late Payments</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-600">44</div>
                    <div className="text-sm text-slate-600">28.2%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{payment.customer}</div>
                        <div className="text-sm text-slate-600">{payment.invoiceId}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${payment.amount.toLocaleString()}</div>
                      <div className="text-sm text-slate-600">
                        Due: {payment.dueDate} | Paid: {payment.paidDate}
                      </div>
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

export default PaymentPerformancePage;
