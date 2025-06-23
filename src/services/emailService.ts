export interface EmailCommunication {
  id: string;
  loadId: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  attachments?: EmailAttachment[];
  threadId: string;
  isRead: boolean;
  type: 'inbound' | 'outbound';
}

export interface EmailAttachment {
  id: string;
  fileName: string;
  fileSize: string;
  mimeType: string;
  downloadUrl?: string;
}

export interface EmailThread {
  threadId: string;
  loadId: string;
  subject: string;
  participants: string[];
  lastActivity: Date;
  unreadCount: number;
  emails: EmailCommunication[];
}

import { SupabaseEmailService } from './supabaseEmailService';

export class EmailService {
  static mockEmails: EmailCommunication[] = [
    {
      id: "email_001",
      loadId: "1234",
      from: "dispatch@swiftlogistics.com",
      to: "driver@carrier.com",
      subject: "Load #1234 - Rate Confirmation & Pickup Instructions",
      body: "Please find attached the rate confirmation for load #1234. Pickup is scheduled for today at 1:00 PM at Shreve, OH. Contact me if you have any questions.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      attachments: [
        {
          id: "att_001",
          fileName: "Rate_Confirmation_1234.pdf",
          fileSize: "245 KB",
          mimeType: "application/pdf"
        }
      ],
      threadId: "thread_1234_001",
      isRead: true,
      type: 'inbound'
    },
    {
      id: "email_002",
      loadId: "1234",
      from: "driver@carrier.com",
      to: "dispatch@swiftlogistics.com",
      subject: "RE: Load #1234 - Rate Confirmation & Pickup Instructions",
      body: "Confirmed. I'll be there at 1:00 PM for pickup. Will send BOL once loaded.",
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
      attachments: [],
      threadId: "thread_1234_001",
      isRead: true,
      type: 'outbound'
    },
    {
      id: "email_003",
      loadId: "5678",
      from: "billing@phoenixfreight.com",
      to: "accounts@carrier.com",
      subject: "Load #5678 - Detention Documentation Required",
      body: "We need detention documentation for the delay at pickup. Please provide scale tickets and any detention receipts for processing payment.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      attachments: [],
      threadId: "thread_5678_001",
      isRead: false,
      type: 'inbound'
    },
    {
      id: "email_004",
      loadId: "9012",
      from: "dispatch@deltashipping.com",
      to: "driver@carrier.com",
      subject: "Load #9012 - Delivery Confirmation Received",
      body: "Thank you for the successful delivery. POD has been received and payment will be processed within 3 business days.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      attachments: [
        {
          id: "att_002",
          fileName: "POD_9012.pdf",
          fileSize: "156 KB",
          mimeType: "application/pdf"
        }
      ],
      threadId: "thread_9012_001",
      isRead: true,
      type: 'inbound'
    }
  ];

  static async getEmailThreadsForLoad(loadId: string): Promise<EmailThread[]> {
    try {
      // Try to get from Supabase first
      const supabaseThreads = await SupabaseEmailService.getEmailThreadsForLoad(loadId);
      if (supabaseThreads.length > 0) {
        return supabaseThreads;
      }

      // Fallback to mock data if Supabase is not available
      console.log('Falling back to mock email data');
      const loadEmails = this.mockEmails.filter(email => email.loadId === loadId);
      const threadsMap = new Map<string, EmailThread>();

      loadEmails.forEach(email => {
        if (!threadsMap.has(email.threadId)) {
          threadsMap.set(email.threadId, {
            threadId: email.threadId,
            loadId: email.loadId,
            subject: email.subject.replace(/^(RE:|FW:)\s*/i, ''),
            participants: [],
            lastActivity: email.timestamp,
            unreadCount: 0,
            emails: []
          });
        }

        const thread = threadsMap.get(email.threadId)!;
        thread.emails.push(email);
        
        if (email.timestamp > thread.lastActivity) {
          thread.lastActivity = email.timestamp;
        }
        
        if (!email.isRead) {
          thread.unreadCount++;
        }

        // Add unique participants
        if (!thread.participants.includes(email.from)) {
          thread.participants.push(email.from);
        }
        if (!thread.participants.includes(email.to)) {
          thread.participants.push(email.to);
        }
      });

      return Array.from(threadsMap.values()).sort((a, b) => 
        b.lastActivity.getTime() - a.lastActivity.getTime()
      );
    } catch (error) {
      console.error('Error fetching email threads for load:', error);
      return [];
    }
  }

  static async getAllEmailThreads(): Promise<EmailThread[]> {
    try {
      // Try to get from Supabase first
      const supabaseThreads = await SupabaseEmailService.getAllEmailThreads();
      if (supabaseThreads.length > 0) {
        return supabaseThreads;
      }

      // Fallback to mock data
      console.log('Falling back to mock email data');
      const threadsMap = new Map<string, EmailThread>();

      this.mockEmails.forEach(email => {
        if (!threadsMap.has(email.threadId)) {
          threadsMap.set(email.threadId, {
            threadId: email.threadId,
            loadId: email.loadId,
            subject: email.subject.replace(/^(RE:|FW:)\s*/i, ''),
            participants: [],
            lastActivity: email.timestamp,
            unreadCount: 0,
            emails: []
          });
        }

        const thread = threadsMap.get(email.threadId)!;
        thread.emails.push(email);
        
        if (email.timestamp > thread.lastActivity) {
          thread.lastActivity = email.timestamp;
        }
        
        if (!email.isRead) {
          thread.unreadCount++;
        }

        if (!thread.participants.includes(email.from)) {
          thread.participants.push(email.from);
        }
        if (!thread.participants.includes(email.to)) {
          thread.participants.push(email.to);
        }
      });

      return Array.from(threadsMap.values()).sort((a, b) => 
        b.lastActivity.getTime() - a.lastActivity.getTime()
      );
    } catch (error) {
      console.error('Error fetching all email threads:', error);
      return [];
    }
  }

  static async markThreadAsRead(threadId: string): Promise<void> {
    try {
      // Try Supabase first
      await SupabaseEmailService.markThreadAsRead(threadId);
    } catch (error) {
      console.error('Error marking thread as read in Supabase, falling back to mock:', error);
      // Fallback to mock data
      this.mockEmails
        .filter(email => email.threadId === threadId)
        .forEach(email => email.isRead = true);
    }
  }
}
