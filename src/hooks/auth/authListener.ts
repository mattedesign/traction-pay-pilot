
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AuthListenerProps {
  profile: any;
  setSession: (session: any) => void;
  setUser: (user: any) => void;
  setIsLoading: (loading: boolean) => void;
  clearAuthState: () => void;
  fetchProfileWithCache: (userId: string) => Promise<any>;
}

export const useAuthListener = ({
  profile,
  setSession,
  setUser,
  setIsLoading,
  clearAuthState,
  fetchProfileWithCache
}: AuthListenerProps) => {
  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        // Handle explicit sign out
        if (event === 'SIGNED_OUT') {
          clearAuthState();
          return;
        }

        // Handle token refresh errors (when event is TOKEN_REFRESHED but session is null)
        if (event === 'TOKEN_REFRESHED' && !session) {
          console.error('Token refresh failed, clearing auth state');
          clearAuthState();
          return;
        }

        // For INITIAL_SESSION, SIGNED_IN, TOKEN_REFRESHED with valid session
        if (session) {
          // Update session and user immediately
          setSession(session);
          setUser(session.user);
          
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
        } else if (event === 'INITIAL_SESSION') {
          // For INITIAL_SESSION with no session, just update loading state
          console.log('No initial session found');
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
};
