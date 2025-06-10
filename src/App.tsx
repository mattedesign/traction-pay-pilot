
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
import BrokerPaymentsPage from "./pages/BrokerPaymentsPage";
import BrokerInsightsPage from "./pages/BrokerInsightsPage";
import BrokerCarriersPage from "./pages/BrokerCarriersPage";
import BrokerReportsPage from "./pages/BrokerReportsPage";
import BrokerSettingsPage from "./pages/BrokerSettingsPage";
import AuthPage from "./components/auth/AuthPage";
import "./App.css";

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
            <Route path="/broker/payments" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerPaymentsPage />
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
  
  // Default to carrier dashboard (existing Index page)
  return <Index />;
};

export default App;
