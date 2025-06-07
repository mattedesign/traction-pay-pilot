
import NavigationSidebar from "@/components/NavigationSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Banknote, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

const BankingPage = () => {
  const transactions = [
    { id: "1", type: "credit", description: "Load #1234 Payment", amount: "+$500.00", date: "Today" },
    { id: "2", type: "debit", description: "Fuel Purchase", amount: "-$120.50", date: "Yesterday" },
    { id: "3", type: "credit", description: "Load #5678 Payment", amount: "+$750.00", date: "2 days ago" },
    { id: "4", type: "debit", description: "Maintenance", amount: "-$85.00", date: "3 days ago" },
  ];

  return (
    <div className="min-h-screen flex w-full" style={{ backgroundColor: '#F5F6FA' }}>
      <NavigationSidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Banking & Finance</h1>
              <p className="text-slate-600">Manage your cash flow and financial operations</p>
            </div>
            <Button className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Quick Pay</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Account Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">$12,456.78</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5.2% this month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">$3,250.00</div>
                <p className="text-xs text-yellow-600">Expected in 5-7 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Available Credit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">$25,000</div>
                <p className="text-xs text-slate-600">Fuel card limit</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Banknote className="w-5 h-5 mr-2" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? 
                            <ArrowDownRight className="w-4 h-4 text-green-600" /> : 
                            <ArrowUpRight className="w-4 h-4 text-red-600" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{transaction.description}</p>
                          <p className="text-sm text-slate-500">{transaction.date}</p>
                        </div>
                      </div>
                      <span className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Request Quick Pay
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Banknote className="w-4 h-4 mr-2" />
                    Apply for Factoring
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Financial Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingPage;
