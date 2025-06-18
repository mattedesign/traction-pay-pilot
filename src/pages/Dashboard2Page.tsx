
import { useAuth } from "@/hooks/useAuth";
import Dashboard2Sidebar from "@/components/dashboard2/Dashboard2Sidebar";
import Dashboard2Header from "@/components/dashboard2/Dashboard2Header";
import WelcomeBanner from "@/components/dashboard2/WelcomeBanner";
import NetBurnCard from "@/components/dashboard2/NetBurnCard";
import RevenueGrowthChart from "@/components/dashboard2/RevenueGrowthChart";
import RevenueGrowthBarChart from "@/components/dashboard2/RevenueGrowthBarChart";
import CashActivityTable from "@/components/dashboard2/CashActivityTable";

const Dashboard2Page = () => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <Dashboard2Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Dashboard2Header />

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <WelcomeBanner />

              {/* Net Burn Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NetBurnCard
                  title="Net Burn 3 Month Avg."
                  amount="$130,709"
                  progressColor="bg-purple-200"
                  progressWidth="78%"
                  percentage="24%"
                />
                <NetBurnCard
                  title="Net Burn 3 Month Avg."
                  amount="$130,709"
                  progressColor="bg-pink-200"
                  progressWidth="45%"
                  percentage="24%"
                />
              </div>

              {/* Revenue Growth Pie Chart */}
              <RevenueGrowthChart />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Revenue Growth Chart */}
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
