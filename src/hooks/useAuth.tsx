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

      // Type cast the user_type to ensure it matches our Profile interface
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
    // If there's already a pending fetch for this user, wait for it
    if (profileFetchPromise) {
      console.log('Waiting for existing profile fetch...');
      return await profileFetchPromise;
    }

    // Create a new fetch promise
    const newPromise = fetchProfile(userId);
    setProfileFetchPromise(newPromise);

    try {
      const result = await newPromise;
      setProfile(result);
      return result;
    } finally {
      // Clear the promise after completion
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
        
        // Update session and user immediately
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Only fetch profile if we don't have one or user changed
          const currentProfileId = profile?.id;
          const newUserId = session.user.id;
          
          if (!currentProfileId || currentProfileId !== newUserId) {
            // Defer profile fetching to avoid blocking auth state changes
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
            // Profile already matches, just update loading state
            setIsLoading(false);
          }
        } else {
          setProfile(null);
          setProfileFetchPromise(null);
          setIsLoading(false);
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
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []); // Remove profile dependency to prevent re-initialization

  const signOut = async () => {
    try {
      console.log('Signing out user...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      console.log('User signed out successfully');
      
      // Clear local state
      setUser(null);
      setProfile(null);
      setSession(null);
      setProfileFetchPromise(null);
    } catch (error) {
      console.error('Error during sign out:', error);
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
