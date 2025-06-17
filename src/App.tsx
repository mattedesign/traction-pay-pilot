
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthPage from "@/components/auth/AuthPage";
import Index from "./pages/Index";
import TractionPayDashboard from "./pages/TractionPayDashboard";
import LoadsPage from "./pages/LoadsPage";
import LoadDetail from "./pages/LoadDetail";
import NewLoadPage from "./pages/NewLoadPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/traction-pay"
              element={
                <ProtectedRoute>
                  <TractionPayDashboard />
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
              path="/load/:loadId"
              element={
                <ProtectedRoute>
                  <LoadDetail />
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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
