
import { EmailService } from '../services/emailService';
import { toast } from '@/hooks/use-toast';

export class DataMigrationUtility {
  static async migrateEmailDataToSupabase(): Promise<void> {
    try {
      console.log('Starting email data migration to Supabase...');
      
      // Get all existing email threads from the mock service
      const existingThreads = await EmailService.getAllEmailThreads();
      
      if (existingThreads.length === 0) {
        console.log('No email data to migrate');
        toast({
          title: "No Data to Migrate",
          description: "No email data found to migrate to Supabase",
        });
        return;
      }

      // Since we don't have a SupabaseEmailService implemented yet,
      // we'll just log what would be migrated
      console.log(`Found ${existingThreads.length} email threads to migrate`);
      
      let totalEmails = 0;
      existingThreads.forEach(thread => {
        totalEmails += thread.emails.length;
      });

      toast({
        title: "Migration Ready",
        description: `Found ${existingThreads.length} email threads with ${totalEmails} emails ready for migration. Supabase email service needs to be implemented.`,
      });

      console.log(`Migration preparation complete: ${existingThreads.length} threads, ${totalEmails} emails found`);
    } catch (error) {
      console.error('Error during email data migration:', error);
      toast({
        title: "Migration Failed",
        description: "Failed to prepare email data migration. Please check the console for details.",
        variant: "destructive"
      });
    }
  }

  static async testSupabaseConnection(): Promise<boolean> {
    try {
      // Test basic Supabase connection by checking if we can access the client
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey || 
          supabaseUrl === 'https://placeholder.supabase.co' || 
          supabaseAnonKey === 'placeholder-key') {
        console.log('Supabase not configured properly');
        return false;
      }
      
      console.log('Supabase connection configured');
      return true;
    } catch (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
  }
}
