
import { useAuth } from "@/hooks/useAuth";
import AuthPage from "./auth/AuthPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'carrier' | 'broker' | 'habitually_late_carrier';
}

const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();

  console.log('ProtectedRoute state:', { 
    isLoading, 
    hasUser: !!user, 
    hasProfile: !!profile, 
    userType: profile?.user_type,
    requiredUserType 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('Redirecting to auth page - no user');
    return <AuthPage />;
  }

  // If we have a user but no profile yet, show loading
  if (!profile) {
    console.log('User found but profile loading');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (requiredUserType && profile.user_type !== requiredUserType) {
    console.log('Access denied - wrong user type:', profile.user_type, 'required:', requiredUserType);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Access Denied</h1>
          <p className="text-slate-600">You don't have permission to access this page.</p>
          <p className="text-slate-500 mt-2">Current user type: {profile.user_type}</p>
          <p className="text-slate-500">Required user type: {requiredUserType}</p>
        </div>
      </div>
    );
  }

  console.log('Access granted - rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
