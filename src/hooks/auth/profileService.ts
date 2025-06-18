
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "./types";

export const fetchProfile = async (userId: string): Promise<Profile | null> => {
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
