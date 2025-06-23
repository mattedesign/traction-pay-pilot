
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Paperclip, Forward } from 'lucide-react';
import { format } from 'date-fns';
import { EmailCommunication } from '../services/emailService';
import EmailAttachments from './EmailAttachments';

interface EmailMessageProps {
  email: EmailCommunication;
  onForward?: (emailId: string) => void;
}

const EmailMessage = ({ email, onForward }: EmailMessageProps) => {
  const handleForward = () => {
    if (onForward) {
      onForward(email.id);
    }
  };

  const getEmailStatusColor = (email: EmailCommunication) => {
    if (!email.isRead) return 'bg-blue-50 border-blue-200';
    return 'bg-white';
  };

  const getTypeIcon = (type: 'incoming' | 'outgoing') => {
    return type === 'incoming' ? '📨' : '📤';
  };

  const formatEmailAddress = (email: string) => {
    // Extract name if format is "Name <email@domain.com>"
    const match = email.match(/^(.+?)\s*<(.+?)>$/);
    if (match) {
      return { name: match[1].trim(), email: match[2].trim() };
    }
    return { name: email, email };
  };

  const fromInfo = formatEmailAddress(email.from);
  const toInfo = formatEmailAddress(email.to);

  return (
    <Card className={`${getEmailStatusColor(email)} transition-colors`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{getTypeIcon(email.type)}</span>
              <div className="text-sm">
                <div className="font-medium">
                  {email.type === 'incoming' ? `From: ${fromInfo.name}` : `To: ${toInfo.name}`}
                </div>
                <div className="text-slate-500">
                  {email.type === 'incoming' ? fromInfo.email : toInfo.email}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-4">
              <span>{format(email.timestamp, 'MMM dd, yyyy HH:mm')}</span>
              {email.attachments && email.attachments.length > 0 && (
                <div className="flex items-center gap-1">
                  <Paperclip className="w-3 h-3" />
                  <span>{email.attachments.length} attachment{email.attachments.length > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {!email.isRead && (
              <Badge variant="secondary" className="text-xs">
                Unread
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleForward}
              className="text-xs px-2 py-1 h-auto"
            >
              <Forward className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="text-sm whitespace-pre-wrap bg-slate-50 p-3 rounded-md">
          {email.body}
        </div>
        
        <EmailAttachments attachments={email.attachments || []} />
      </CardContent>
    </Card>
  );
};

export default EmailMessage;
