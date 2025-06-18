
import { useState, useEffect, createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  user_type: 'carrier' | 'broker';
  company_name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  console.log('AuthProvider rendering');
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileFetchPromise, setProfileFetchPromise] = useState<Promise<Profile | null> | null>(null);

  const clearAuthState = () => {
    console.log('Clearing auth state due to invalid session');
    setUser(null);
    setProfile(null);
    setSession(null);
    setProfileFetchPromise(null);
    setIsLoading(false);
  };

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      console.log('Fetching profile for user:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      console.log('Profile fetched successfully:', data);

      const profileData: Profile = {
        ...data,
        user_type: data.user_type as 'carrier' | 'broker'
      };

      return profileData;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  const fetchProfileWithCache = async (userId: string): Promise<Profile | null> => {
    if (profileFetchPromise) {
      console.log('Waiting for existing profile fetch...');
      return await profileFetchPromise;
    }

    const newPromise = fetchProfile(userId);
    setProfileFetchPromise(newPromise);

    try {
      const result = await newPromise;
      setProfile(result);
      return result;
    } finally {
      setProfileFetchPromise(null);
    }
  };

  const refreshProfile = async () => {
    if (session?.user) {
      console.log('Refreshing profile...');
      await fetchProfileWithCache(session.user.id);
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        // Handle sign out or session errors
        if (event === 'SIGNED_OUT' || !session) {
          clearAuthState();
          return;
        }

        // Handle token refresh errors
        if (event === 'TOKEN_REFRESHED' && !session) {
          console.error('Token refresh failed, clearing auth state');
          clearAuthState();
          return;
        }
        
        // Update session and user immediately
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const currentProfileId = profile?.id;
          const newUserId = session.user.id;
          
          if (!currentProfileId || currentProfileId !== newUserId) {
            setTimeout(async () => {
              try {
                await fetchProfileWithCache(session.user.id);
              } catch (error) {
                console.error('Error fetching profile in auth state change:', error);
              } finally {
                setIsLoading(false);
              }
            }, 0);
          } else {
            setIsLoading(false);
          }
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        console.log('Checking for existing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          // If there's an error getting the session (like invalid refresh token),
          // clear any stale data and sign out
          if (error.message.includes('refresh_token_not_found') || 
              error.message.includes('Invalid Refresh Token')) {
            console.log('Clearing stale auth data due to invalid refresh token');
            await supabase.auth.signOut();
            clearAuthState();
            return;
          }
          setIsLoading(false);
          return;
        }

        console.log('Existing session found:', !!session, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfileWithCache(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear stale data on any initialization error
        clearAuthState();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      console.log('Signing out user...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      console.log('User signed out successfully');
      clearAuthState();
    } catch (error) {
      console.error('Error during sign out:', error);
      // Even if sign out fails, clear local state
      clearAuthState();
      throw error;
    }
  };

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
