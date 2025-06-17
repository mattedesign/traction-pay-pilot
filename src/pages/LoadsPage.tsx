
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import NavigationSidebar from "@/components/NavigationSidebar";
import LoadsSidebar from "@/components/LoadsSidebar";
import LoadMainContent from "@/components/LoadMainContent";

const LoadsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <NavigationSidebar />
      
      {/* Mobile loads sidebar toggle */}
      <div className="md:hidden fixed top-4 left-20 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
          className="bg-white shadow-md"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      <LoadsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <LoadMainContent />
      </div>
    </div>
  );
};

export default LoadsPage;
