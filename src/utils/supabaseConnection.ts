
export class SupabaseConnectionUtil {
  static isConnected(): boolean {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    return !!(supabaseUrl && supabaseAnonKey && 
             supabaseUrl !== 'https://placeholder.supabase.co' && 
             supabaseAnonKey !== 'placeholder-key');
  }

  static getConnectionStatus(): { connected: boolean; message: string } {
    if (this.isConnected()) {
      return { connected: true, message: "Supabase is connected" };
    }
    
    return { 
      connected: false, 
      message: "Please connect to Supabase using the green button in the top right" 
    };
  }
}
