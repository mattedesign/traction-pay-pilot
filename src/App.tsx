
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import LoadsPage from "./pages/LoadsPage";
import NewLoadPage from "./pages/NewLoadPage";
import LoadDetail from "./pages/LoadDetail";
import InvoicesPage from "./pages/InvoicesPage";
import BankingPage from "./pages/BankingPage";
import SearchPage from "./pages/SearchPage";
import SupportPage from "./pages/SupportPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RouteOptionsPage from "./pages/RouteOptionsPage";
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
          <Route path="/loads/new" element={<NewLoadPage />} />
          <Route path="/load/:loadId" element={<LoadDetail />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/banking" element={<BankingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/route-options" element={<RouteOptionsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
