
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { EmailThread } from '../services/emailService';
import EmailThreadActions from './EmailThreadActions';

interface EmailThreadHeaderProps {
  thread: EmailThread;
  onMarkAsRead?: (threadId: string) => void;
  onReply?: (threadId: string) => void;
  onArchive?: (threadId: string) => void;
}

const EmailThreadHeader = ({ 
  thread, 
  onMarkAsRead, 
  onReply, 
  onArchive 
}: EmailThreadHeaderProps) => {
  return (
    <CardHeader className="pb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <CardTitle className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            {thread.subject}
            {thread.unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {thread.unreadCount} unread
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{thread.participants.length} participants</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Last activity: {format(thread.lastActivity, 'MMM dd, yyyy HH:mm')}</span>
            </div>
          </div>
        </div>
        
        <EmailThreadActions
          thread={thread}
          onMarkAsRead={onMarkAsRead}
          onReply={onReply}
          onArchive={onArchive}
        />
      </div>
    </CardHeader>
  );
};

export default EmailThreadHeader;
