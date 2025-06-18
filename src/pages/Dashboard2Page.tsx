
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import Dashboard2Header from "@/components/dashboard2/Dashboard2Header";
import WelcomeBanner from "@/components/dashboard2/WelcomeBanner";
import NetBurnCard from "@/components/dashboard2/NetBurnCard";
import RevenueGrowthChart from "@/components/dashboard2/RevenueGrowthChart";
import RevenueGrowthBarChart from "@/components/dashboard2/RevenueGrowthBarChart";
import CashActivityTable from "@/components/dashboard2/CashActivityTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Dashboard2Page = () => {
  const { profile } = useAuth();

  // Use existing navigation based on user type
  const NavigationComponent = profile?.user_type === 'broker' ? BrokerNavigationSidebar : NavigationSidebar;

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Use existing navigation */}
      <NavigationComponent />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Dashboard2Header />

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          {/* Welcome Banner - customized for habitually late carriers */}
          {profile?.user_type === 'habitually_late_carrier' ? (
            <div className="bg-orange-50 rounded-lg p-4 flex items-center justify-between mb-6">
              <span className="text-orange-900">⏰ Late Delivery Insights - Optimize your schedule and improve on-time performance.</span>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Optimizer
              </Button>
            </div>
          ) : (
            <WelcomeBanner />
          )}

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Column - Net Burn Cards and Pie Chart */}
            <div className="lg:col-span-2 space-y-6">
              {/* Net Burn Cards - customized for habitually late carriers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NetBurnCard
                  title={profile?.user_type === 'habitually_late_carrier' ? "Late Delivery Penalty" : "Net Burn 3 Month Avg."}
                  amount={profile?.user_type === 'habitually_late_carrier' ? "$45.2K" : "$330.47K"}
                  progressColor="bg-red-200"
                  progressWidth={profile?.user_type === 'habitually_late_carrier' ? "65%" : "78%"}
                  percentage={profile?.user_type === 'habitually_late_carrier' ? "↑12%" : "24%"}
                />
                <NetBurnCard
                  title={profile?.user_type === 'habitually_late_carrier' ? "On-Time Performance" : "Net Burn 3 Month Avg."}
                  amount={profile?.user_type === 'habitually_late_carrier' ? "68%" : "$130.70K"}
                  progressColor={profile?.user_type === 'habitually_late_carrier' ? "bg-yellow-200" : "bg-pink-200"}
                  progressWidth={profile?.user_type === 'habitually_late_carrier' ? "68%" : "45%"}
                  percentage={profile?.user_type === 'habitually_late_carrier' ? "↓8%" : "21%"}
                />
              </div>

              {/* Revenue Growth Pie Chart */}
              <RevenueGrowthChart />
            </div>

            {/* Right Column - Bar Chart and Cash Activity Table */}
            <div className="space-y-6">
              {/* Revenue Growth Bar Chart */}
              <RevenueGrowthBarChart />

              {/* Cash Activity Table */}
              <CashActivityTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2Page;
