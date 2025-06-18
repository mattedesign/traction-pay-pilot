
import { User, Session } from "@supabase/supabase-js";

export interface Profile {
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

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  profileFetchPromise: Promise<Profile | null> | null;
}
