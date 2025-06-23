
import { useState, useEffect, createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  user_type: 'carrier' | 'broker' | 'habitually_late_carrier';
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
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileFetchAttempted, setProfileFetchAttempted] = useState(false);

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      console.log('🔍 Starting profile fetch for user:', userId);
      
      // Add timeout to prevent hanging requests
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Profile fetch timeout after 10 seconds')), 10000);
      });

      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

      if (error) {
        console.error('❌ Error fetching profile:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        
        // If profile doesn't exist, this might be a new user
        if (error.code === 'PGRST116') {
          console.log('⚠️ Profile not found - might be a new user');
        }
        
        return null;
      }

      console.log('✅ Profile fetched successfully:', {
        id: data.id,
        email: data.email,
        user_type: data.user_type,
        company_name: data.company_name
      });

      const profileData: Profile = {
        ...data,
        user_type: data.user_type as 'carrier' | 'broker' | 'habitually_late_carrier'
      };

      return profileData;
    } catch (error: any) {
      console.error('💥 Exception during profile fetch:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      return null;
    }
  };

  const refreshProfile = async () => {
    if (session?.user && !isLoading) {
      console.log('🔄 Refreshing profile...');
      const profileData = await fetchProfile(session.user.id);
      setProfile(profileData);
    }
  };

  const signOut = async () => {
    try {
      console.log('🚪 Starting sign out process...');
      
      // Clear local state immediately
      setUser(null);
      setProfile(null);
      setSession(null);
      setProfileFetchAttempted(false);
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Error signing out:', error);
        throw error;
      }
      
      console.log('✅ User signed out successfully');
      
      // Force reload to ensure clean state
      window.location.href = '/auth';
    } catch (error) {
      console.error('💥 Error during sign out:', error);
      throw error;
    }
  };

  useEffect(() => {
    console.log('🎬 Setting up auth state listener...');
    
    let mounted = true;
    let profileFetchInProgress = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', {
          event,
          userEmail: session?.user?.email,
          userId: session?.user?.id,
          mounted,
          profileFetchInProgress
        });
        
        if (!mounted) {
          console.log('⚠️ Component unmounted, ignoring auth state change');
          return;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && !profileFetchInProgress) {
          profileFetchInProgress = true;
          console.log('👤 User found, fetching profile...');
          
          try {
            const profileData = await fetchProfile(session.user.id);
            
            if (mounted) {
              setProfile(profileData);
              setProfileFetchAttempted(true);
              
              if (!profileData) {
                console.log('⚠️ Profile fetch returned null - user may need to complete profile setup');
              }
            }
          } catch (error) {
            console.error('💥 Profile fetch failed:', error);
            if (mounted) {
              setProfile(null);
              setProfileFetchAttempted(true);
            }
          } finally {
            profileFetchInProgress = false;
            if (mounted) {
              setIsLoading(false);
            }
          }
        } else if (!session?.user) {
          console.log('👤 No user, clearing profile state');
          setProfile(null);
          setProfileFetchAttempted(false);
          setIsLoading(false);
        } else if (session?.user && profileFetchInProgress) {
          console.log('⏳ Profile fetch already in progress, skipping...');
        }
      }
    );

    // Check for existing session after setting up the listener
    const initializeAuth = async () => {
      try {
        console.log('🔍 Checking for existing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Error getting session:', error);
          if (mounted) {
            setIsLoading(false);
          }
          return;
        }

        console.log('📋 Session check result:', {
          hasSession: !!session,
          userEmail: session?.user?.email,
          userId: session?.user?.id
        });
        
        if (!mounted) return;
        
        // The onAuthStateChange callback will handle the session
        // Just ensure we're not stuck in loading if there's no session
        if (!session) {
          console.log('🚫 No existing session found');
          setIsLoading(false);
        }
        
      } catch (error) {
        console.error('💥 Error initializing auth:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Add timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (mounted && isLoading) {
        console.warn('⏰ Auth initialization timeout - forcing loading to false');
        setIsLoading(false);
      }
    }, 15000); // 15 second timeout

    initializeAuth();

    return () => {
      console.log('🧹 Cleaning up auth subscription');
      mounted = false;
      clearTimeout(loadingTimeout);
      subscription.unsubscribe();
    };
  }, []); // Remove isLoading dependency to prevent loops

  // Separate effect to handle loading state based on auth state
  useEffect(() => {
    const shouldBeLoading = !profileFetchAttempted && !!user && !profile;
    
    console.log('🔄 Loading state check:', {
      isLoading,
      shouldBeLoading,
      hasUser: !!user,
      hasProfile: !!profile,
      profileFetchAttempted
    });
    
    if (isLoading !== shouldBeLoading) {
      console.log(`🔄 Updating loading state: ${isLoading} -> ${shouldBeLoading}`);
      setIsLoading(shouldBeLoading);
    }
  }, [user, profile, profileFetchAttempted, isLoading]);

  const contextValue = {
    user,
    profile,
    session,
    isLoading,
    signOut,
    refreshProfile
  };

  console.log('🎭 AuthProvider render:', {
    hasUser: !!user,
    hasProfile: !!profile,
    hasSession: !!session,
    isLoading,
    profileFetchAttempted
  });

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
