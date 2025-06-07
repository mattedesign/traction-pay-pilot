
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoadDetail from "./pages/LoadDetail";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import LoadsPage from "./pages/LoadsPage";
import InvoicesPage from "./pages/InvoicesPage";
import BankingPage from "./pages/BankingPage";
import SearchPage from "./pages/SearchPage";
import SupportPage from "./pages/SupportPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loads" element={<LoadsPage />} />
          <Route path="/load/:loadId" element={<LoadDetail />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/banking" element={<BankingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
