
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, Target, Fuel, Clock } from "lucide-react";
import PaymentPerformanceAlert from "@/components/dashboard2/PaymentPerformanceAlert";
import PendingPaymentsSection from "@/components/dashboard2/PendingPaymentsSection";
import FactoringRateOpportunities from "@/components/dashboard2/FactoringRateOpportunities";
import PaymentCoachSection from "@/components/dashboard2/PaymentCoachSection";
import PaymentCashFlowSection from "@/components/dashboard2/PaymentCashFlowSection";
import PaymentSmartAlerts from "@/components/dashboard2/PaymentSmartAlerts";
import PerformanceComparisonDashboard from "@/components/dashboard2/PerformanceComparisonDashboard";
import QuickActionCenter from "@/components/dashboard2/QuickActionCenter";
import { CarrierProfile } from "@/pages/Index";

interface HabituallyLateInsightsDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const HabituallyLateInsightsDashboard = ({ carrierProfile, userProfile }: HabituallyLateInsightsDashboardProps) => {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-full">
      {/* Header with greeting */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full relative">
                <div className="absolute -top-1 -left-1 w-2 h-1 bg-orange-400 rounded-full"></div>
                <div className="absolute -top-1 -right-1 w-2 h-1 bg-orange-400 rounded-full"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-1 bg-orange-400 rounded-full"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-1 bg-orange-400 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-500 mb-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Good morning, {userProfile?.email?.split('@')[0] || 'Alex'}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Performance Alert */}
      <PaymentPerformanceAlert />

      {/* Pending Payments Section */}
      <PendingPaymentsSection />

      {/* Key Metrics Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Key Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Revenue */}
          <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-600 text-sm font-medium mb-1">Total Revenue</div>
                  <div className="text-slate-400 text-xs">Monthly earnings</div>
                </div>
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">$85.2K</div>
                <div className="flex items-center text-xs">
                  <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                  <span className="text-red-600 font-medium">-23%</span>
                  <span className="text-slate-500 ml-1">due to payment issues</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* On-Time Payment Rate */}
          <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-600 text-sm font-medium mb-1">On-Time Payment Rate</div>
                  <div className="text-slate-400 text-xs">Payment performance</div>
                </div>
                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">72%</div>
                <div className="flex items-center text-xs">
                  <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                  <span className="text-red-600 font-medium">Below average</span>
                  <span className="text-slate-500 ml-1">Industry: 85%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Loads */}
          <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-600 text-sm font-medium mb-1">Available Loads</div>
                  <div className="text-slate-400 text-xs">Restricted access</div>
                </div>
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-amber-600 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">18</div>
                <div className="flex items-center text-xs">
                  <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                  <span className="text-red-600 font-medium">-23%</span>
                  <span className="text-slate-500 ml-1">vs potential</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Factoring Rate */}
          <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-600 text-sm font-medium mb-1">Factoring Rate</div>
                  <div className="text-slate-400 text-xs">Current rate</div>
                </div>
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Fuel className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">3.2%</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="w-3 h-3 text-red-600 mr-1" />
                  <span className="text-red-600 font-medium">+0.4%</span>
                  <span className="text-slate-500 ml-1">vs industry avg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Processing Time */}
          <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-600 text-sm font-medium mb-1">Avg Payment Time</div>
                  <div className="text-slate-400 text-xs">Days to payment</div>
                </div>
                <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-cyan-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">8.4</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="w-3 h-3 text-red-600 mr-1" />
                  <span className="text-red-600 font-medium">5 days late</span>
                  <span className="text-slate-500 ml-1">vs industry</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overdue Amount */}
          <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-600 text-sm font-medium mb-1">Overdue Amount</div>
                  <div className="text-slate-400 text-xs">Requiring immediate attention</div>
                </div>
                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-red-600 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-red-900">$4,567</div>
                <div className="flex items-center text-xs">
                  <span className="text-red-600 font-medium">3 invoices</span>
                  <span className="text-slate-500 ml-1">overdue</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Payment-Focused Dashboard */}
      <div className="space-y-6">
        {/* Factoring Rate Opportunities */}
        <FactoringRateOpportunities />

        {/* AI Business Coach - Payment Focused */}
        <PaymentCoachSection />

        {/* Your Money Section - Enhanced Cash Flow */}
        <PaymentCashFlowSection />

        {/* Smart Alerts - Payment Focused */}
        <PaymentSmartAlerts />

        {/* Performance Comparison Dashboard */}
        <PerformanceComparisonDashboard />

        {/* Quick Action Center */}
        <QuickActionCenter />
      </div>
    </div>
  );
};

export default HabituallyLateInsightsDashboard;
