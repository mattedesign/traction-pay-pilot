import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SupabaseSetup from "@/components/SupabaseSetup";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import LoadsPage from "./pages/LoadsPage";
import NewLoadPage from "./pages/NewLoadPage";
import LoadDetail from "./pages/LoadDetail";
import RouteOptionsPage from "./pages/RouteOptionsPage";
import SearchPage from "./pages/SearchPage";
import InvoicesPage from "./pages/InvoicesPage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SupportPage from "./pages/SupportPage";
import AccountPage from "./pages/AccountPage";
import ProfilePage from "./pages/ProfilePage";
import BankingPage from "./pages/BankingPage";
import BrokerDashboard from "./pages/BrokerDashboard";
import BrokerInsightsPage from "./pages/BrokerInsightsPage";
import BrokerPaymentsPage from "./pages/BrokerPaymentsPage";
import BrokerCarriersPage from "./pages/BrokerCarriersPage";
import BrokerSettingsPage from "./pages/BrokerSettingsPage";
import BrokerReportsPage from "./pages/BrokerReportsPage";
import BrokerLoadsInProgressPage from "./pages/BrokerLoadsInProgressPage";
import BrokerLoadDetailPage from "./pages/BrokerLoadDetailPage";
import BrokerOutstandingInvoicesPage from "./pages/BrokerOutstandingInvoicesPage";
import BrokerPaidInvoicesPage from "./pages/BrokerPaidInvoicesPage";
import BrokerCreditDashboardPage from "./pages/BrokerCreditDashboardPage";
import BrokerRevenueAnalyticsPage from "./pages/BrokerRevenueAnalyticsPage";
import BrokerProfitMarginAnalyticsPage from "./pages/BrokerProfitMarginAnalyticsPage";
import BrokerLoadValueAnalyticsPage from "./pages/BrokerLoadValueAnalyticsPage";
import BrokerQuickPayAnalyticsPage from "./pages/BrokerQuickPayAnalyticsPage";
import RevenueBreakdownPage from "./pages/RevenueBreakdownPage";
import OnTimeRateAnalysisPage from "./pages/OnTimeRateAnalysisPage";
import ActiveLoadsDetailPage from "./pages/ActiveLoadsDetailPage";
import FuelEfficiencyAnalysisPage from "./pages/FuelEfficiencyAnalysisPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SupabaseSetup />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loads"
            element={
              <ProtectedRoute>
                <LoadsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loads/new"
            element={
              <ProtectedRoute>
                <NewLoadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loads/:id"
            element={
              <ProtectedRoute>
                <LoadDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/route-options"
            element={
              <ProtectedRoute>
                <RouteOptionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <ProtectedRoute>
                <InvoicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoices/create"
            element={
              <ProtectedRoute>
                <CreateInvoicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoices/:id"
            element={
              <ProtectedRoute>
                <InvoiceDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <SupportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/banking"
            element={
              <ProtectedRoute>
                <BankingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/revenue-breakdown"
            element={
              <ProtectedRoute>
                <RevenueBreakdownPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/on-time-rate"
            element={
              <ProtectedRoute>
                <OnTimeRateAnalysisPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/active-loads"
            element={
              <ProtectedRoute>
                <ActiveLoadsDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fuel-efficiency"
            element={
              <ProtectedRoute>
                <FuelEfficiencyAnalysisPage />
              </ProtectedRoute>
            }
          />
          
          {/* Broker Routes */}
          <Route
            path="/broker"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/insights"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerInsightsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/payments"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerPaymentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/carriers"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerCarriersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/settings"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerSettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/reports"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/loads-in-progress"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerLoadsInProgressPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/loads/:id"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerLoadDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/invoices/outstanding"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerOutstandingInvoicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/invoices/paid"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerPaidInvoicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/credit-dashboard"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerCreditDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/analytics/revenue"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerRevenueAnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/analytics/profit-margin"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerProfitMarginAnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/analytics/load-value"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerLoadValueAnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/analytics/quick-pay"
            element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerQuickPayAnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
