
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Phone, Mail, FileText, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OverdueInvoicesPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const overdueStats = {
    totalAmount: 4567,
    invoiceCount: 3,
    oldestInvoice: 18,
    averageOverdue: 12,
    collectionRate: 94
  };

  const overdueInvoices = [
    { 
      id: "INV-2024-001", 
      customer: "Slow Pay Logistics", 
      amount: 2450, 
      dueDate: "2024-06-05", 
      daysOverdue: 18, 
      lastContact: "2024-06-15",
      priority: "high",
      phone: "(555) 123-4567",
      email: "ap@slowpay.com"
    },
    { 
      id: "INV-2024-003", 
      customer: "Delayed Freight Co", 
      amount: 1350, 
      dueDate: "2024-06-12", 
      daysOverdue: 11, 
      lastContact: "2024-06-20",
      priority: "medium",
      phone: "(555) 987-6543",
      email: "billing@delayed.com"
    },
    { 
      id: "INV-2024-005", 
      customer: "Late Payment Inc", 
      amount: 767, 
      dueDate: "2024-06-18", 
      daysOverdue: 5, 
      lastContact: "Never",
      priority: "low",
      phone: "(555) 456-7890",
      email: "accounts@latepay.com"
    }
  ];

  const collectionActions = [
    { action: "Send Reminder Email", completed: 8, total: 12 },
    { action: "Phone Call Follow-up", completed: 5, total: 12 },
    { action: "Formal Demand Letter", completed: 2, total: 12 },
    { action: "Collection Agency", completed: 1, total: 12 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getOverdueColor = (days: number) => {
    if (days >= 15) return 'text-red-600';
    if (days >= 7) return 'text-yellow-600';
    return 'text-orange-600';
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
                  <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
                  Overdue Invoices
                </h1>
                <p className="text-slate-600">Outstanding invoices requiring immediate attention</p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          {/* Overdue Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-red-100 text-sm font-medium mb-1">Total Overdue</div>
                    <div className="text-3xl font-bold">${overdueStats.totalAmount.toLocaleString()}</div>
                    <div className="text-red-100 text-sm mt-1">{overdueStats.invoiceCount} invoices</div>
                  </div>
                  <DollarSign className="w-12 h-12 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Oldest Invoice</div>
                <div className="text-2xl font-bold text-red-600">{overdueStats.oldestInvoice}</div>
                <div className="text-slate-500 text-sm mt-1">days overdue</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Average Overdue</div>
                <div className="text-2xl font-bold text-orange-600">{overdueStats.averageOverdue}</div>
                <div className="text-slate-500 text-sm mt-1">days</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-slate-600 text-sm font-medium mb-1">Collection Rate</div>
                <div className="text-2xl font-bold text-green-600">{overdueStats.collectionRate}%</div>
                <div className="text-slate-500 text-sm mt-1">historical</div>
              </CardContent>
            </Card>
          </div>

          {/* Overdue Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Overdue Invoice Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overdueInvoices.map((invoice, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-bold text-slate-900">{invoice.id}</div>
                          <div className="text-lg font-medium text-slate-700">{invoice.customer}</div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(invoice.priority)}`}>
                          {invoice.priority.toUpperCase()} PRIORITY
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">${invoice.amount.toLocaleString()}</div>
                        <div className={`text-sm font-medium ${getOverdueColor(invoice.daysOverdue)}`}>
                          {invoice.daysOverdue} days overdue
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-slate-600">Due Date:</span>
                        <span className="ml-2 font-medium">{invoice.dueDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Last Contact:</span>
                        <span className="ml-2 font-medium">{invoice.lastContact}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Phone:</span>
                        <span className="ml-2 font-medium">{invoice.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Customer
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Reminder
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Escalate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Collection Actions Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                Collection Actions Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {collectionActions.map((action, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-900">{action.action}</span>
                      <div className="text-right">
                        <div className="font-bold">{action.completed} / {action.total}</div>
                        <div className="text-sm text-slate-600">
                          {Math.round((action.completed / action.total) * 100)}% completed
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(action.completed / action.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Collection Strategy */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Collection Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Immediate Actions</h4>
                  <ul className="space-y-1 text-sm text-red-800">
                    <li>• Call Slow Pay Logistics today (18 days overdue)</li>
                    <li>• Send formal demand letter to all customers</li>
                    <li>• Document all communication attempts</li>
                    <li>• Set payment deadlines with consequences</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Prevention Strategies</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Implement credit checks for new customers</li>
                    <li>• Require deposits from slow-paying customers</li>
                    <li>• Set up automatic payment reminders</li>
                    <li>• Consider factoring for cash flow improvement</li>
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

export default OverdueInvoicesPage;
