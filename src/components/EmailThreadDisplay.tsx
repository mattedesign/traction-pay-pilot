
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmailThread } from '../services/emailService';
import EmailThreadHeader from './EmailThreadHeader';
import EmailMessage from './EmailMessage';

interface EmailThreadDisplayProps {
  thread: EmailThread;
  onMarkAsRead?: (threadId: string) => void;
  onReply?: (threadId: string) => void;
  onForward?: (emailId: string) => void;
  onArchive?: (threadId: string) => void;
}

const EmailThreadDisplay = ({ 
  thread, 
  onMarkAsRead, 
  onReply, 
  onForward, 
  onArchive 
}: EmailThreadDisplayProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <EmailThreadHeader
        thread={thread}
        onMarkAsRead={onMarkAsRead}
        onReply={onReply}
        onArchive={onArchive}
      />

      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {thread.emails.map((email, index) => (
              <div key={email.id}>
                <EmailMessage
                  email={email}
                  onForward={onForward}
                />
                
                {index < thread.emails.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EmailThreadDisplay;
