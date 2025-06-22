// Basic email service interfaces - keeping these for potential future use
export interface EmailAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  downloadUrl?: string;
}

export interface EmailCommunication {
  id: string;
  loadId: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  threadId?: string;
  isRead: boolean;
  type: 'incoming' | 'outgoing';
  attachments?: EmailAttachment[];
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

// Mock service for demo purposes - replace with actual implementation when needed
export class EmailService {
  static async getEmailThreadsForLoad(loadId: string): Promise<EmailThread[]> {
    console.log('Email service not implemented - returning empty array for load:', loadId);
    return [];
  }

  static async getAllEmailThreads(): Promise<EmailThread[]> {
    console.log('Email service not implemented - returning empty array');
    return [];
  }

  static async markThreadAsRead(threadId: string): Promise<void> {
    console.log('Email service not implemented - thread read status not updated:', threadId);
  }
}
