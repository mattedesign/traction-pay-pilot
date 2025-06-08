
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import LoadDetail from "./pages/LoadDetail";
import LoadsPage from "./pages/LoadsPage";
import UploadPage from "./pages/UploadPage";
import RouteOptionsPage from "./pages/RouteOptionsPage";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import SupportPage from "./pages/SupportPage";
import BankingPage from "./pages/BankingPage";
import InvoicesPage from "./pages/InvoicesPage";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loads" element={<LoadsPage />} />
          <Route path="/load/:loadId" element={<LoadDetail />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/route-options" element={<RouteOptionsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/banking" element={<BankingPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
