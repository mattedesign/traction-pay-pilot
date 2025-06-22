import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { EmailCommunication, EmailThread, EmailAttachment } from './emailService';

type EmailThreadRow = Database['public']['Tables']['email_threads']['Row'];
type EmailCommunicationRow = Database['public']['Tables']['email_communications']['Row'];
type EmailAttachmentRow = Database['public']['Tables']['email_attachments']['Row'];

export class SupabaseEmailService {
  // Convert database row to EmailThread interface
  private static mapToEmailThread(
    threadRow: EmailThreadRow,
    emails: EmailCommunication[]
  ): EmailThread {
    return {
      threadId: threadRow.thread_id,
      loadId: threadRow.load_id,
      subject: threadRow.subject,
      participants: threadRow.participants,
      lastActivity: new Date(threadRow.last_activity),
      unreadCount: threadRow.unread_count,
      emails
    };
  }

  // Convert database row to EmailCommunication interface
  private static mapToEmailCommunication(
    emailRow: EmailCommunicationRow,
    attachments: EmailAttachment[] = []
  ): EmailCommunication {
    return {
      id: emailRow.email_id,
      loadId: emailRow.load_id,
      from: emailRow.from_email,
      to: emailRow.to_email,
      subject: emailRow.subject,
      body: emailRow.body,
      timestamp: new Date(emailRow.timestamp),
      threadId: emailRow.thread_id,
      isRead: emailRow.is_read,
      type: emailRow.email_type,
      attachments
    };
  }

  // Convert database row to EmailAttachment interface
  private static mapToEmailAttachment(attachmentRow: EmailAttachmentRow): EmailAttachment {
    return {
      id: attachmentRow.attachment_id,
      fileName: attachmentRow.file_name,
      fileSize: attachmentRow.file_size,
      mimeType: attachmentRow.mime_type,
      downloadUrl: attachmentRow.download_url || undefined
    };
  }

  // Get email threads for a specific load
  static async getEmailThreadsForLoad(loadId: string): Promise<EmailThread[]> {
    try {
      // Get threads for the load
      const { data: threads, error: threadsError } = await supabase
        .from('email_threads')
        .select('*')
        .eq('load_id', loadId)
        .order('last_activity', { ascending: false });

      if (threadsError) throw threadsError;
      if (!threads || threads.length === 0) return [];

      // Get emails and attachments for each thread
      const emailThreads: EmailThread[] = [];
      
      for (const thread of threads) {
        const { data: emails, error: emailsError } = await supabase
          .from('email_communications')
          .select(`
            *,
            email_attachments (*)
          `)
          .eq('thread_id', thread.thread_id)
          .order('timestamp', { ascending: true });

        if (emailsError) throw emailsError;

        const emailCommunications: EmailCommunication[] = emails?.map(email => {
          const attachments = email.email_attachments?.map(att => 
            this.mapToEmailAttachment(att)
          ) || [];
          return this.mapToEmailCommunication(email, attachments);
        }) || [];

        emailThreads.push(this.mapToEmailThread(thread, emailCommunications));
      }

      return emailThreads;
    } catch (error) {
      console.error('Error fetching email threads for load:', error);
      return [];
    }
  }

  // Get all email threads
  static async getAllEmailThreads(): Promise<EmailThread[]> {
    try {
      const { data: threads, error: threadsError } = await supabase
        .from('email_threads')
        .select('*')
        .order('last_activity', { ascending: false })
        .limit(50); // Limit for performance

      if (threadsError) throw threadsError;
      if (!threads || threads.length === 0) return [];

      const emailThreads: EmailThread[] = [];
      
      for (const thread of threads) {
        const { data: emails, error: emailsError } = await supabase
          .from('email_communications')
          .select(`
            *,
            email_attachments (*)
          `)
          .eq('thread_id', thread.thread_id)
          .order('timestamp', { ascending: true });

        if (emailsError) throw emailsError;

        const emailCommunications: EmailCommunication[] = emails?.map(email => {
          const attachments = email.email_attachments?.map(att => 
            this.mapToEmailAttachment(att)
          ) || [];
          return this.mapToEmailCommunication(email, attachments);
        }) || [];

        emailThreads.push(this.mapToEmailThread(thread, emailCommunications));
      }

      return emailThreads;
    } catch (error) {
      console.error('Error fetching all email threads:', error);
      return [];
    }
  }

  // Mark thread as read
  static async markThreadAsRead(threadId: string): Promise<void> {
    try {
      // Update all emails in the thread to read
      const { error: emailError } = await supabase
        .from('email_communications')
        .update({ is_read: true })
        .eq('thread_id', threadId);

      if (emailError) throw emailError;

      // Update thread unread count
      const { error: threadError } = await supabase
        .from('email_threads')
        .update({ unread_count: 0 })
        .eq('thread_id', threadId);

      if (threadError) throw threadError;
    } catch (error) {
      console.error('Error marking thread as read:', error);
    }
  }

  // Create new email thread
  static async createEmailThread(thread: Omit<EmailThread, 'emails'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('email_threads')
        .insert({
          thread_id: thread.threadId,
          load_id: thread.loadId,
          subject: thread.subject,
          participants: thread.participants,
          last_activity: thread.lastActivity.toISOString(),
          unread_count: thread.unreadCount
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error creating email thread:', error);
    }
  }

  // Add email to thread
  static async addEmailToThread(email: EmailCommunication): Promise<void> {
    try {
      // Insert email
      const { error: emailError } = await supabase
        .from('email_communications')
        .insert({
          email_id: email.id,
          thread_id: email.threadId,
          load_id: email.loadId,
          from_email: email.from,
          to_email: email.to,
          subject: email.subject,
          body: email.body,
          timestamp: email.timestamp.toISOString(),
          is_read: email.isRead,
          email_type: email.type
        });

      if (emailError) throw emailError;

      // Insert attachments if any
      if (email.attachments && email.attachments.length > 0) {
        const attachmentInserts = email.attachments.map(att => ({
          attachment_id: att.id,
          email_id: email.id,
          file_name: att.fileName,
          file_size: att.fileSize,
          mime_type: att.mimeType,
          download_url: att.downloadUrl
        }));

        const { error: attachmentError } = await supabase
          .from('email_attachments')
          .insert(attachmentInserts);

        if (attachmentError) throw attachmentError;
      }

      // Update thread last activity and unread count
      const { error: threadError } = await supabase
        .from('email_threads')
        .update({
          last_activity: email.timestamp.toISOString(),
          unread_count: email.isRead ? 0 : 1
        })
        .eq('thread_id', email.threadId);

      if (threadError) throw threadError;
    } catch (error) {
      console.error('Error adding email to thread:', error);
    }
  }

  // Subscribe to real-time updates for a load
  static subscribeToLoadEmails(
    loadId: string, 
    onUpdate: (payload: any) => void
  ) {
    return supabase
      .channel(`load_emails_${loadId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'email_threads',
          filter: `load_id=eq.${loadId}`
        },
        onUpdate
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'email_communications',
          filter: `load_id=eq.${loadId}`
        },
        onUpdate
      )
      .subscribe();
  }
}
