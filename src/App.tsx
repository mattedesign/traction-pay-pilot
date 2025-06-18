
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import LoadsPage from "./pages/LoadsPage";
import NewLoadPage from "./pages/NewLoadPage";
import LoadDetail from "./pages/LoadDetail";
import InvoicesPage from "./pages/InvoicesPage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import BankingPage from "./pages/BankingPage";
import SearchPage from "./pages/SearchPage";
import SupportPage from "./pages/SupportPage";
import ProfilePage from "./pages/ProfilePage";
import AccountPage from "./pages/AccountPage";
import NotFound from "./pages/NotFound";
import RouteOptionsPage from "./pages/RouteOptionsPage";
import BrokerDashboard from "./pages/BrokerDashboard";
import BrokerLoadsInProgressPage from "./pages/BrokerLoadsInProgressPage";
import BrokerPaymentsPage from "./pages/BrokerPaymentsPage";
import BrokerOutstandingInvoicesPage from "./pages/BrokerOutstandingInvoicesPage";
import BrokerPaidInvoicesPage from "./pages/BrokerPaidInvoicesPage";
import BrokerCreditDashboardPage from "./pages/BrokerCreditDashboardPage";
import BrokerInsightsPage from "./pages/BrokerInsightsPage";
import BrokerCarriersPage from "./pages/BrokerCarriersPage";
import BrokerReportsPage from "./pages/BrokerReportsPage";
import BrokerSettingsPage from "./pages/BrokerSettingsPage";
import BrokerRevenueAnalyticsPage from "./pages/BrokerRevenueAnalyticsPage";
import BrokerProfitMarginAnalyticsPage from "./pages/BrokerProfitMarginAnalyticsPage";
import BrokerQuickPayAnalyticsPage from "./pages/BrokerQuickPayAnalyticsPage";
import BrokerLoadValueAnalyticsPage from "./pages/BrokerLoadValueAnalyticsPage";
import AuthPage from "./components/auth/AuthPage";
import Dashboard2Page from "./pages/Dashboard2Page";
import "./App.css";
import BrokerLoadDetailPage from "./pages/BrokerLoadDetailPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            } />
            <Route path="/dashboard2" element={
              <ProtectedRoute>
                <Dashboard2Page />
              </ProtectedRoute>
            } />
            <Route path="/loads" element={
              <ProtectedRoute requiredUserType="carrier">
                <LoadsPage />
              </ProtectedRoute>
            } />
            <Route path="/loads/new" element={
              <ProtectedRoute requiredUserType="carrier">
                <NewLoadPage />
              </ProtectedRoute>
            } />
            <Route path="/load/:loadId" element={
              <ProtectedRoute>
                <LoadDetail />
              </ProtectedRoute>
            } />
            <Route path="/invoices" element={
              <ProtectedRoute requiredUserType="carrier">
                <InvoicesPage />
              </ProtectedRoute>
            } />
            <Route path="/invoices/new" element={
              <ProtectedRoute requiredUserType="carrier">
                <CreateInvoicePage />
              </ProtectedRoute>
            } />
            <Route path="/invoice/:invoiceId" element={
              <ProtectedRoute>
                <InvoiceDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/banking" element={
              <ProtectedRoute>
                <BankingPage />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            } />
            <Route path="/support" element={
              <ProtectedRoute>
                <SupportPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/account" element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            } />
            <Route path="/route-options" element={
              <ProtectedRoute requiredUserType="carrier">
                <RouteOptionsPage />
              </ProtectedRoute>
            } />
            <Route path="/broker" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/broker/loads-in-progress" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerLoadsInProgressPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/load/:loadId" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerLoadDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/payments" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerPaymentsPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/payments/outstanding" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerOutstandingInvoicesPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/payments/paid" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerPaidInvoicesPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/payments/credit" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerCreditDashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/insights" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerInsightsPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/carriers" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerCarriersPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/reports" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerReportsPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/settings" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerSettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/analytics/revenue" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerRevenueAnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/analytics/profit-margin" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerProfitMarginAnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/analytics/quickpay" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerQuickPayAnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/analytics/load-value" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerLoadValueAnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

// Component to route users to their appropriate dashboard
const DashboardRouter = () => {
  const { profile } = useAuth();
  
  if (profile?.user_type === 'broker') {
    return <BrokerDashboard />;
  }
  
  // Default to carrier dashboard with adaptive experience
  return <Index />;
};

export default App;
