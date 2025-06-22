
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Mail, Clock, User, Paperclip, Reply, Forward, Archive } from 'lucide-react';
import { format } from 'date-fns';
import { EmailThread, EmailCommunication } from '../services/emailService';

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

  const handleForward = (emailId: string) => {
    if (onForward) {
      onForward(emailId);
    }
  };

  const handleArchive = () => {
    if (onArchive) {
      onArchive(thread.threadId);
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
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
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {thread.emails.map((email, index) => {
              const fromInfo = formatEmailAddress(email.from);
              const toInfo = formatEmailAddress(email.to);
              
              return (
                <div key={email.id}>
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
                            onClick={() => handleForward(email.id)}
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
                      
                      {email.attachments && email.attachments.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="text-xs font-medium text-slate-600 mb-2">Attachments:</div>
                          <div className="space-y-1">
                            {email.attachments.map((attachment) => (
                              <div
                                key={attachment.id}
                                className="flex items-center gap-2 text-xs bg-white p-2 rounded border"
                              >
                                <Paperclip className="w-3 h-3" />
                                <span className="font-medium">{attachment.fileName}</span>
                                <span className="text-slate-500">
                                  ({(attachment.fileSize / 1024).toFixed(1)} KB)
                                </span>
                                {attachment.downloadUrl && (
                                  <a
                                    href={attachment.downloadUrl}
                                    className="text-blue-600 hover:underline ml-auto"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Download
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {index < thread.emails.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EmailThreadDisplay;
