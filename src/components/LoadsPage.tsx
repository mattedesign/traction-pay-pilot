
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import NavigationSidebar from "@/components/NavigationSidebar";
import LoadsSidebar from "@/components/LoadsSidebar";
import LoadMainContent from "@/components/LoadMainContent";
import { Load } from "@/types/load";

const LoadsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);

  const handleLoadSelect = (load: Load) => {
    setSelectedLoad(load);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <NavigationSidebar />
      
      {/* Mobile loads sidebar toggle - better positioned */}
      <div className="md:hidden fixed top-16 left-4 z-30">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSidebarOpen(true)}
          className="bg-white shadow-md"
        >
          <Menu className="w-4 h-4 mr-2" />
          Loads
        </Button>
      </div>

      <LoadsSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onLoadSelect={handleLoadSelect}
        selectedLoadId={selectedLoad?.id}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        {selectedLoad ? (
          <LoadMainContent loadData={selectedLoad} />
        ) : (
          <div className="flex-1 flex items-center justify-center p-4" style={{ backgroundColor: '#F5F6FA' }}>
            <div className="text-center text-slate-500 max-w-sm">
              <h3 className="text-lg font-medium mb-2">Select a load to view details</h3>
              <p className="text-sm">Choose a load from the sidebar to see its information</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadsPage;
