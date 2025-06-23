
import { EmailService } from '../services/emailService';
import { SupabaseEmailService } from '../services/supabaseEmailService';
import { toast } from '@/hooks/use-toast';

export class DataMigrationUtility {
  static async migrateEmailDataToSupabase(): Promise<void> {
    try {
      console.log('Starting email data migration to Supabase...');
      
      // Get all existing email threads from the mock service
      const existingThreads = await EmailService.getAllEmailThreads();
      
      if (existingThreads.length === 0) {
        console.log('No email data to migrate');
        return;
      }

      let migratedThreads = 0;
      let migratedEmails = 0;

      for (const thread of existingThreads) {
        try {
          // Create the thread
          await SupabaseEmailService.createEmailThread({
            threadId: thread.threadId,
            loadId: thread.loadId,
            subject: thread.subject,
            participants: thread.participants,
            lastActivity: thread.lastActivity,
            unreadCount: thread.unreadCount
          });

          migratedThreads++;

          // Add each email to the thread
          for (const email of thread.emails) {
            await SupabaseEmailService.addEmailToThread(email);
            migratedEmails++;
          }

          console.log(`Migrated thread ${thread.threadId} with ${thread.emails.length} emails`);
        } catch (error) {
          console.error(`Failed to migrate thread ${thread.threadId}:`, error);
        }
      }

      toast({
        title: "Migration Complete",
        description: `Successfully migrated ${migratedThreads} email threads with ${migratedEmails} emails to Supabase`,
      });

      console.log(`Migration complete: ${migratedThreads} threads, ${migratedEmails} emails`);
    } catch (error) {
      console.error('Error during email data migration:', error);
      toast({
        title: "Migration Failed",
        description: "Failed to migrate email data. Please check the console for details.",
        variant: "destructive"
      });
    }
  }

  static async testSupabaseConnection(): Promise<boolean> {
    try {
      // Try to fetch email threads to test connection
      await SupabaseEmailService.getAllEmailThreads();
      return true;
    } catch (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
  }
}
