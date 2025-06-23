import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import BrokerDashboard from "./pages/BrokerDashboard";
import BrokerLoadsPage from "./pages/BrokerLoadsPage";
import BrokerLoadDetail from "./pages/BrokerLoadDetail";
import BrokerInvoicesPage from "./pages/BrokerInvoicesPage";
import BrokerInvoiceDetail from "./pages/BrokerInvoiceDetail";
import BrokerCarriersPage from "./pages/BrokerCarriersPage";
import BrokerCarrierDetail from "./pages/BrokerCarrierDetail";

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
              <Route path="/document-upload" element={<ProtectedRoute><DocumentUploadPage /></ProtectedRoute>} />
              {/* Broker Routes */}
              <Route path="/broker/dashboard" element={<ProtectedRoute><BrokerDashboard /></ProtectedRoute>} />
              <Route path="/broker/loads" element={<ProtectedRoute><BrokerLoadsPage /></ProtectedRoute>} />
              <Route path="/broker/loads/:id" element={<ProtectedRoute><BrokerLoadDetail /></ProtectedRoute>} />
              <Route path="/broker/invoices" element={<ProtectedRoute><BrokerInvoicesPage /></ProtectedRoute>} />
              <Route path="/broker/invoices/:id" element={<ProtectedRoute><BrokerInvoiceDetail /></ProtectedRoute>} />
              <Route path="/broker/carriers" element={<ProtectedRoute><BrokerCarriersPage /></ProtectedRoute>} />
              <Route path="/broker/carriers/:id" element={<ProtectedRoute><BrokerCarrierDetail /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
```

```typescript
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Route, CreditCard, Upload } from "lucide-react";
import ChatDrawer from "./ChatDrawer";
import { CarrierProfile } from "@/pages/Index";
import HomeDocumentUpload from "./HomeDocumentUpload";
import ChatInput from "./ChatInput";
import { useNavigate } from "react-router-dom";

interface ChatOnlyDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const ChatOnlyDashboard = ({ carrierProfile, userProfile }: ChatOnlyDashboardProps) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTopic, setDrawerTopic] = useState<string | null>(null);
  const [drawerMessage, setDrawerMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleCardClick = (topic: string) => {
    // Handle document upload differently - navigate to the document upload page
    if (topic === "document_upload") {
      navigate("/document-upload");
      return;
    }

    // For other topics, open the chat drawer as before
    setDrawerTopic(topic);
    setDrawerMessage("");
    setIsDrawerOpen(true);
  };

  const handleInputFocus = () => {
    if (message.trim()) {
      setDrawerTopic(null);
      setDrawerMessage(message);
      setIsDrawerOpen(true);
    } else {
      setDrawerTopic(null);
      setDrawerMessage("");
      setIsDrawerOpen(true);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setDrawerTopic(null);
      setDrawerMessage(message);
      setMessage("");
      setIsDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerTopic(null);
    setDrawerMessage("");
  };

  const quickAccessCards = [
    {
      icon: Truck,
      title: "Load Status",
      description: "Check status of any load",
      topic: "load_status"
    },
    {
      icon: Route,
      title: "Route Optimization", 
      description: "Find best routes and save fuel",
      topic: "route_optimization"
    },
    {
      icon: CreditCard,
      title: "Payment Questions",
      description: "Ask about invoices and payments", 
      topic: "payment_questions"
    },
    {
      icon: Upload,
      title: "Document Processing",
      description: "Upload and process documents",
      topic: "document_upload"
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickAccessCards.map((card, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCardClick(card.topic)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <card.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{card.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Document Upload Section */}
          <HomeDocumentUpload />
        </div>
      </div>

      {/* Chat Input - Fixed at bottom */}
      <div className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            message={message}
            onMessageChange={setMessage}
            onSendMessage={handleSendMessage}
            isLoading={false}
            onFocus={handleInputFocus}
          />
        </div>
      </div>

      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        carrierProfile={carrierProfile}
        userProfile={userProfile}
        initialTopic={drawerTopic}
        initialMessage={drawerMessage}
      />
    </div>
  );
};

export default ChatOnlyDashboard;
