
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AuthPage from "@/components/auth/AuthPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "@/pages/Index";
import LoadsPage from "@/pages/LoadsPage";
import InvoicesPage from "@/pages/InvoicesPage";
import Dashboard2Page from "@/pages/Dashboard2Page";
import BrokerDashboard from "@/pages/BrokerDashboard";
import BrokerQuickPayAnalyticsPage from "@/pages/BrokerQuickPayAnalyticsPage";
import BrokerQuickPayOptimizationPage from "@/pages/BrokerQuickPayOptimizationPage";
import BrokerLoadsInProgressPage from "@/pages/BrokerLoadsInProgressPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/loads" element={
              <ProtectedRoute>
                <LoadsPage />
              </ProtectedRoute>
            } />
            <Route path="/invoices" element={
              <ProtectedRoute>
                <InvoicesPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard2" element={
              <ProtectedRoute>
                <Dashboard2Page />
              </ProtectedRoute>
            } />
            <Route path="/broker" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/broker/quickpay-analytics" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerQuickPayAnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/quickpay-optimization" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerQuickPayOptimizationPage />
              </ProtectedRoute>
            } />
            <Route path="/broker/loads-in-progress" element={
              <ProtectedRoute requiredUserType="broker">
                <BrokerLoadsInProgressPage />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
