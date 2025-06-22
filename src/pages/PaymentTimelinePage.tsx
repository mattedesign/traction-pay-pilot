
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowLeft, Calendar, AlertTriangle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentTimelinePage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const timelineStats = {
    averagePaymentTime: 8.4,
    industryAverage: 3.4,
    fastestPayment: 1,
    slowestPayment: 21,
    totalPendingDays: 156
  };

  const paymentTimeline = [
    { customer: "ABC Logistics", invoiceId: "INV-2024-001", submitted: "2024-06-10", due: "2024-06-15", expected: "2024-06-18", status: "pending", days: 8 },
    { customer: "XYZ Freight", invoiceId: "INV-2024-002", submitted: "2024-06-12", due: "2024-06-20", expected: "2024-06-19", status: "paid", days: 7 },
    { customer: "Quick Ship Co", invoiceId: "INV-2024-003", submitted: "2024-06-14", due: "2024-06-22", expected: "2024-06-22", status: "pending", days: 8 },
    { customer: "Fast Track", invoiceId: "INV-2024-004", submitted: "2024-06-16", due: "2024-06-25", expected: "2024-06-28", status: "overdue", days: 12 },
    { customer: "Prime Movers", invoiceId: "INV-2024-005", submitted: "2024-06-18", due: "2024-06-30", expected: "2024-06-29", status: "pending", days: 11 }
  ];

  const paymentCategories = [
    { category: "0-3 Days", count: 12, percentage: 15, color: "bg-green-500" },
    { category: "4-7 Days", count: 28, percentage: 35, color: "bg-blue-500" },
    { category: "8-14 Days", count: 32, percentage: 40, color: "bg-yellow-500" },
    { category: "15+ Days", count: 8, percentage: 10, color: "bg-red-500" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-blue-600 bg-blue-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4" />;
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
                  <Clock className="w-6 h-6 mr-2 text-cyan-600" />
                  Payment Timeline
                </h1>
                <p className="text-slate-600">Average payment processing time analysis</p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          {/* Timeline Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-cyan-100 text-sm font-medium mb-1">Avg Payment Time</div>
                    <div className="text-3xl font-bold">{timelineStats.averagePaymentTime}</div>
                    <div className="text-cyan-100 text-sm mt-1">days</div>
                  </div>
                  <Clock className="w-12 h-12 text-cyan-200" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Industry Average</div>
                <div className="text-2xl font-bold text-green-600">{timelineStats.industryAverage}</div>
                <div className="text-slate-500 text-sm mt-1">days faster</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Fastest Payment</div>
                <div className="text-2xl font-bold text-green-600">{timelineStats.fastestPayment}</div>
                <div className="text-slate-500 text-sm mt-1">day</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Slowest Payment</div>
                <div className="text-2xl font-bold text-red-600">{timelineStats.slowestPayment}</div>
                <div className="text-slate-500 text-sm mt-1">days</div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Time Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Payment Time Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-900">{category.category}</span>
                      <div className="text-right">
                        <div className="font-bold">{category.count} invoices</div>
                        <div className="text-sm text-slate-600">{category.percentage}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className={`${category.color} h-3 rounded-full`} 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Payment Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Current Payment Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentTimeline.map((payment, index) => (
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
                      <div className="font-bold text-slate-900">{payment.days} days</div>
                      <div className="text-sm text-slate-600">
                        Due: {payment.due}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Improvement Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Ways to Improve Payment Speed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Quick Wins</h4>
                  <ul className="space-y-1 text-sm text-green-800">
                    <li>• Submit complete documentation with invoices</li>
                    <li>• Follow up on overdue payments weekly</li>
                    <li>• Use electronic invoice submission</li>
                    <li>• Establish payment terms upfront</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Long-term Strategies</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Build relationships with reliable customers</li>
                    <li>• Consider factoring for immediate payment</li>
                    <li>• Implement credit checks for new customers</li>
                    <li>• Diversify customer base to reduce risk</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentTimelinePage;
