
import PaymentPerformanceAlert from "@/components/dashboard2/PaymentPerformanceAlert";
import PendingPaymentsSection from "@/components/dashboard2/PendingPaymentsSection";
import FactoringRateOpportunities from "@/components/dashboard2/FactoringRateOpportunities";
import PaymentCoachSection from "@/components/dashboard2/PaymentCoachSection";
import PaymentCashFlowSection from "@/components/dashboard2/PaymentCashFlowSection";
import PaymentSmartAlerts from "@/components/dashboard2/PaymentSmartAlerts";
import PerformanceComparisonDashboard from "@/components/dashboard2/PerformanceComparisonDashboard";
import QuickActionCenter from "@/components/dashboard2/QuickActionCenter";
import MetroFreightCaseStudy from "@/components/dashboard2/MetroFreightCaseStudy";
import AIPaymentOptimizer from "@/components/dashboard2/AIPaymentOptimizer";
import FactoringSetupWizard from "@/components/dashboard2/FactoringSetupWizard";
import CashFlowVisualization from "@/components/dashboard2/CashFlowVisualization";
import DashboardHeader from "./DashboardHeader";
import KeyMetricsSection from "./KeyMetricsSection";
import { CarrierProfile } from "@/pages/Index";

interface HabituallyLateDashboardLayoutProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const HabituallyLateDashboardLayout = ({ carrierProfile, userProfile }: HabituallyLateDashboardLayoutProps) => {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-full">
      {/* Header with greeting */}
      <DashboardHeader userProfile={userProfile} />

      {/* Payment Performance Alert */}
      <PaymentPerformanceAlert />

      {/* Metro Freight Case Study - Prominent placement */}
      <MetroFreightCaseStudy />

      {/* Cash Flow Transformation Visualization */}
      <CashFlowVisualization />

      {/* AI Payment Optimizer */}
      <AIPaymentOptimizer />

      {/* Pending Payments Section */}
      <PendingPaymentsSection />

      {/* Key Metrics Section */}
      <KeyMetricsSection />

      {/* Factoring Setup Wizard */}
      <FactoringSetupWizard />

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

export default HabituallyLateDashboardLayout;
