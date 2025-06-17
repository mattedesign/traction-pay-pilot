
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";

const FactorDashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome to Factor Dashboard, {profile?.first_name}!
            </h1>
            <p className="text-slate-600">
              This is a special dashboard for {profile?.company_name}
            </p>
          </div>

          {/* Placeholder content - will be replaced with your specific requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Special Feature 1
              </h3>
              <p className="text-slate-600">
                This content will be customized based on your requirements.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Special Feature 2
              </h3>
              <p className="text-slate-600">
                Waiting for your prompt to define the specific content.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Special Feature 3
              </h3>
              <p className="text-slate-600">
                Ready to implement your unique dashboard features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactorDashboard;
