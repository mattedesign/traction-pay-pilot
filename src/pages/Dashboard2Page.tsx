
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import Dashboard2Header from "@/components/dashboard2/Dashboard2Header";
import WelcomeBanner from "@/components/dashboard2/WelcomeBanner";
import NetBurnCard from "@/components/dashboard2/NetBurnCard";
import RevenueGrowthChart from "@/components/dashboard2/RevenueGrowthChart";
import RevenueGrowthBarChart from "@/components/dashboard2/RevenueGrowthBarChart";
import CashActivityTable from "@/components/dashboard2/CashActivityTable";
import TabbedDashboard from "@/components/TabbedDashboard";

const Dashboard2Page = () => {
  const { profile } = useAuth();
  const isHabituallyLateCarrier = profile?.user_type === 'habitually_late_carrier';

  // Use existing navigation based on user type
  const NavigationComponent = profile?.user_type === 'broker' ? BrokerNavigationSidebar : NavigationSidebar;

  // For habitually late carriers, use the tabbed dashboard
  if (isHabituallyLateCarrier) {
    // Create a carrier profile for the tabbed dashboard
    const carrierProfile = {
      companySize: 'small' as const,
      fleetSize: 3,
      userRoles: ['owner-operator'],
      primaryUser: 'owner-operator' as const,
      businessCoachingLevel: 'basic' as const,
      onboardingCompleted: true
    };

    return (
      <div className="min-h-screen flex w-full bg-slate-50">
        <NavigationComponent />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <TabbedDashboard 
            carrierProfile={carrierProfile}
            userProfile={profile}
          />
        </div>
      </div>
    );
  }

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
          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Standard Dashboard Grid for Other User Types */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Column - Net Burn Cards and Pie Chart */}
            <div className="lg:col-span-2 space-y-6">
              {/* Net Burn Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NetBurnCard
                  title="Net Burn 3 Month Avg."
                  amount="$330.47K"
                  progressColor="bg-red-200"
                  progressWidth="78%"
                  percentage="24%"
                />
                <NetBurnCard
                  title="Net Burn 3 Month Avg."
                  amount="$130.70K"
                  progressColor="bg-pink-200"
                  progressWidth="45%"
                  percentage="21%"
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
