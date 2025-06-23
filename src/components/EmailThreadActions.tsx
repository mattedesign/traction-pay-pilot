
import React from 'react';
import { Button } from '@/components/ui/button';
import { Reply, Archive } from 'lucide-react';
import { EmailThread } from '../services/emailService';

interface EmailThreadActionsProps {
  thread: EmailThread;
  onMarkAsRead?: (threadId: string) => void;
  onReply?: (threadId: string) => void;
  onArchive?: (threadId: string) => void;
}

const EmailThreadActions = ({ 
  thread, 
  onMarkAsRead, 
  onReply, 
  onArchive 
}: EmailThreadActionsProps) => {
  const handleMarkAsRead = () => {
    if (onMarkAsRead && thread.unreadCount > 0) {
      onMarkAsRead(thread.threadId);
    }
  };

  const handleReply = () => {
    if (onReply) {
      onReply(thread.threadId);
    }
  };

  const handleArchive = () => {
    if (onArchive) {
      onArchive(thread.threadId);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {thread.unreadCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAsRead}
          className="text-xs"
        >
          Mark as Read
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={handleReply}
        className="text-xs"
      >
        <Reply className="w-3 h-3 mr-1" />
        Reply
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleArchive}
        className="text-xs"
      >
        <Archive className="w-3 h-3 mr-1" />
        Archive
      </Button>
    </div>
  );
};

export default EmailThreadActions;
