
import { useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Profile, AuthState } from "./types";
import { fetchProfile } from "./profileService";

export const useAuthState = () => {
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

  return {
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
  };
};
