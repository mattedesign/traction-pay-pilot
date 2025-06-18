
import { createContext, useContext } from "react";
import { AuthContextType } from "./auth/types";
import { useAuthState } from "./auth/authStateManager";
import { useAuthListener } from "./auth/authListener";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  console.log('AuthProvider rendering');
  
  const {
    user,
    profile,
    session,
    isLoading,
    setUser,
    setProfile,
    setSession,
    setIsLoading,
    clearAuthState,
    fetchProfileWithCache,
    refreshProfile,
    signOut
  } = useAuthState();

  useAuthListener({
    profile,
    setSession,
    setUser,
    setIsLoading,
    clearAuthState,
    fetchProfileWithCache
  });

  console.log('AuthProvider providing context with:', { user: !!user, profile: !!profile, isLoading });

  return (
    <AuthContext.Provider value={{ user, profile, session, isLoading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('useAuth called, context:', !!context);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
