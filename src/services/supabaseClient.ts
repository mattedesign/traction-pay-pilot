
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Declare the supabase client variable
let supabaseClient;

// Check if we're in development and environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Please connect to Supabase.');
  // Create a mock client to prevent the app from crashing
  supabaseClient = createClient('https://placeholder.supabase.co', 'placeholder-key');
} else {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

// Export the client
export const supabase = supabaseClient;

// Database types
export interface Database {
  public: {
    Tables: {
      email_threads: {
        Row: {
          id: string;
          thread_id: string;
          load_id: string;
          subject: string;
          participants: string[];
          last_activity: string;
          unread_count: number;
          is_archived: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          thread_id: string;
          load_id: string;
          subject: string;
          participants?: string[];
          last_activity?: string;
          unread_count?: number;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          thread_id?: string;
          load_id?: string;
          subject?: string;
          participants?: string[];
          last_activity?: string;
          unread_count?: number;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      email_communications: {
        Row: {
          id: string;
          email_id: string;
          thread_id: string;
          load_id: string;
          from_email: string;
          to_email: string;
          subject: string;
          body: string;
          timestamp: string;
          is_read: boolean;
          email_type: 'inbound' | 'outbound';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email_id: string;
          thread_id: string;
          load_id: string;
          from_email: string;
          to_email: string;
          subject: string;
          body: string;
          timestamp: string;
          is_read?: boolean;
          email_type: 'inbound' | 'outbound';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email_id?: string;
          thread_id?: string;
          load_id?: string;
          from_email?: string;
          to_email?: string;
          subject?: string;
          body?: string;
          timestamp?: string;
          is_read?: boolean;
          email_type?: 'inbound' | 'outbound';
          created_at?: string;
          updated_at?: string;
        };
      };
      email_attachments: {
        Row: {
          id: string;
          attachment_id: string;
          email_id: string;
          file_name: string;
          file_size: string;
          mime_type: string;
          storage_url: string | null;
          download_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          attachment_id: string;
          email_id: string;
          file_name: string;
          file_size: string;
          mime_type: string;
          storage_url?: string | null;
          download_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          attachment_id?: string;
          email_id?: string;
          file_name?: string;
          file_size?: string;
          mime_type?: string;
          storage_url?: string | null;
          download_url?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
