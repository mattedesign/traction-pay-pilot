
import { useAuth } from "@/hooks/useAuth";
import AuthPage from "./auth/AuthPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'carrier' | 'broker' | 'habitually_late_carrier';
}

const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();

  console.log('🛡️ ProtectedRoute evaluation:', { 
    isLoading, 
    hasUser: !!user, 
    hasProfile: !!profile, 
    userType: profile?.user_type,
    requiredUserType,
    userEmail: user?.email
  });

  // Show loading spinner while authentication is being determined
  if (isLoading) {
    console.log('⏳ ProtectedRoute: Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your account...</p>
          <p className="text-slate-500 text-sm mt-2">Please wait while we verify your credentials</p>
        </div>
      </div>
    );
  }

  // If no user is authenticated, redirect to auth page
  if (!user) {
    console.log('🚫 ProtectedRoute: No user found, redirecting to auth');
    return <AuthPage />;
  }

  // If we have a user but no profile, show a different loading state
  // This might happen for new users or if there's a profile fetch issue
  if (!profile) {
    console.log('⚠️ ProtectedRoute: User found but no profile, showing profile loading');
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Setting up your profile...</h2>
          <p className="text-slate-600 mb-4">We're preparing your account. This usually takes just a moment.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-800 text-sm">
              If this screen persists, please try refreshing the page or contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Check if user has required user type
  if (requiredUserType && profile.user_type !== requiredUserType) {
    console.log('🚫 ProtectedRoute: Access denied - wrong user type:', {
      currentType: profile.user_type, 
      requiredType: requiredUserType
    });
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Access Restricted</h1>
          <p className="text-slate-600 mb-2">You don't have permission to access this page.</p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm">
            <p className="text-slate-700">
              <span className="font-medium">Your account type:</span> {profile.user_type}
            </p>
            <p className="text-slate-700">
              <span className="font-medium">Required access level:</span> {requiredUserType}
            </p>
          </div>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  console.log('✅ ProtectedRoute: Access granted, rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
