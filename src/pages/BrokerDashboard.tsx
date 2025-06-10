
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import DashboardHeader from "@/components/broker/DashboardHeader";
import FinancialStatsGrid from "@/components/broker/FinancialStatsGrid";
import LoadsInProgressCard from "@/components/broker/LoadsInProgressCard";
import PaperworkReviewCard from "@/components/broker/PaperworkReviewCard";

const BrokerDashboard = () => {
  return (
    <div className="h-screen overflow-hidden flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          <FinancialStatsGrid />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LoadsInProgressCard />
            <PaperworkReviewCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;
