
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import LoadsPage from "./pages/LoadsPage";
import LoadDetail from "./pages/LoadDetail";
import NewLoadPage from "./pages/NewLoadPage";
import InvoicesPage from "./pages/InvoicesPage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import RouteOptionsPage from "./pages/RouteOptionsPage";
import RouteOptimizationDetailPage from "./pages/RouteOptimizationDetailPage";
import ProfilePage from "./pages/ProfilePage";
import AccountPage from "./pages/AccountPage";
import SupportPage from "./pages/SupportPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import DocumentUploadPage from "./pages/DocumentUploadPage";
import InsightsPage from "./pages/InsightsPage";
import Dashboard2Page from "./pages/Dashboard2Page";
import BrokerDashboard from "./pages/BrokerDashboard";
import BrokerLoadsInProgressPage from "./pages/BrokerLoadsInProgressPage";
import BrokerLoadDetailPage from "./pages/BrokerLoadDetailPage";
import BrokerInvoicesPage from "./pages/BrokerInvoicesPage";
import BrokerInvoiceDetail from "./pages/BrokerInvoiceDetail";
import BrokerCarriersPage from "./pages/BrokerCarriersPage";
import BrokerCarrierDetail from "./pages/BrokerCarrierDetail";
import BrokerPaymentsPage from "./pages/BrokerPaymentsPage";
import BrokerInsightsPage from "./pages/BrokerInsightsPage";
import BrokerReportsPage from "./pages/BrokerReportsPage";
import BrokerSettingsPage from "./pages/BrokerSettingsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/loads" element={<ProtectedRoute><LoadsPage /></ProtectedRoute>} />
              <Route path="/loads/:id" element={<ProtectedRoute><LoadDetail /></ProtectedRoute>} />
              <Route path="/new-load" element={<ProtectedRoute><NewLoadPage /></ProtectedRoute>} />
              <Route path="/invoices" element={<ProtectedRoute><InvoicesPage /></ProtectedRoute>} />
              <Route path="/invoices/:id" element={<ProtectedRoute><InvoiceDetailPage /></ProtectedRoute>} />
              <Route path="/create-invoice" element={<ProtectedRoute><CreateInvoicePage /></ProtectedRoute>} />
              <Route path="/route-options" element={<ProtectedRoute><RouteOptionsPage /></ProtectedRoute>} />
              <Route path="/route-optimization/:id" element={<ProtectedRoute><RouteOptimizationDetailPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
              <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
              <Route path="/insights" element={<ProtectedRoute><InsightsPage /></ProtectedRoute>} />
              <Route path="/document-upload" element={<ProtectedRoute><DocumentUploadPage /></ProtectedRoute>} />
              <Route path="/dashboard2" element={<ProtectedRoute><Dashboard2Page /></ProtectedRoute>} />
              {/* Broker Routes */}
              <Route path="/broker" element={<Navigate to="/broker/dashboard" replace />} />
              <Route path="/broker/dashboard" element={<ProtectedRoute><BrokerDashboard /></ProtectedRoute>} />
              <Route path="/broker/loads-in-progress" element={<ProtectedRoute><BrokerLoadsInProgressPage /></ProtectedRoute>} />
              <Route path="/broker/loads" element={<ProtectedRoute><BrokerLoadsInProgressPage /></ProtectedRoute>} />
              <Route path="/broker/loads/:id" element={<ProtectedRoute><BrokerLoadDetailPage /></ProtectedRoute>} />
              <Route path="/broker/payments" element={<ProtectedRoute><BrokerPaymentsPage /></ProtectedRoute>} />
              <Route path="/broker/insights" element={<ProtectedRoute><BrokerInsightsPage /></ProtectedRoute>} />
              <Route path="/broker/invoices" element={<ProtectedRoute><BrokerInvoicesPage /></ProtectedRoute>} />
              <Route path="/broker/invoices/:id" element={<ProtectedRoute><BrokerInvoiceDetail /></ProtectedRoute>} />
              <Route path="/broker/carriers" element={<ProtectedRoute><BrokerCarriersPage /></ProtectedRoute>} />
              <Route path="/broker/carriers/:id" element={<ProtectedRoute><BrokerCarrierDetail /></ProtectedRoute>} />
              <Route path="/broker/reports" element={<ProtectedRoute><BrokerReportsPage /></ProtectedRoute>} />
              <Route path="/broker/settings" element={<ProtectedRoute><BrokerSettingsPage /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
