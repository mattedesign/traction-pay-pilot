
import { useParams } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";
import LoadsSidebar from "@/components/LoadsSidebar";
import LoadMainContent from "@/components/LoadMainContent";
import { LoadRepository } from "@/services/loadRepository";

const LoadDetail = () => {
  const { loadId } = useParams();

  // Get load data from repository
  const loadData = LoadRepository.getLoadById(loadId || "1234");

  // Fallback if load not found
  if (!loadData) {
    return (
      <div className="min-h-screen bg-slate-50 flex w-full">
        <NavigationSidebar />
        <LoadsSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Load Not Found</h1>
            <p className="text-slate-600">The requested load could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex w-full">
      <NavigationSidebar />
      <LoadsSidebar />
      <LoadMainContent loadData={loadData} />
    </div>
  );
};

export default LoadDetail;
