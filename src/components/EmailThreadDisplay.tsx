
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Clock, Paperclip, ChevronDown, ChevronRight, User } from "lucide-react";
import { EmailThread, EmailCommunication } from "@/services/emailService";

interface EmailThreadDisplayProps {
  threads: EmailThread[];
  compact?: boolean;
  onThreadClick?: (threadId: string) => void;
}

const EmailThreadDisplay = ({ threads, compact = true, onThreadClick }: EmailThreadDisplayProps) => {
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());

  const toggleThread = (threadId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    const newExpanded = new Set(expandedThreads);
    if (newExpanded.has(threadId)) {
      newExpanded.delete(threadId);
    } else {
      newExpanded.add(threadId);
    }
    setExpandedThreads(newExpanded);
  };

  const handleThreadClick = (threadId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (onThreadClick) {
      onThreadClick(threadId);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return 'Just now';
    }
  };

  const getEmailPreview = (thread: EmailThread) => {
    const latestEmail = thread.emails.sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    )[0];
    return latestEmail?.body.substring(0, 100) + (latestEmail?.body.length > 100 ? '...' : '');
  };

  const getSenderName = (email: string) => {
    return email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (threads.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {threads.map((thread) => {
        const isExpanded = expandedThreads.has(thread.threadId);
        const sortedEmails = thread.emails.sort((a, b) => 
          a.timestamp.getTime() - b.timestamp.getTime()
        );

        return (
          <Card 
            key={thread.threadId} 
            className={`transition-all duration-200 ${
              onThreadClick ? 'cursor-pointer hover:bg-slate-50 hover:shadow-md' : ''
            }`}
            onClick={onThreadClick ? (e) => handleThreadClick(thread.threadId, e) : undefined}
          >
            <CardHeader 
              className="pb-2 cursor-pointer hover:bg-slate-50"
              onClick={(e) => toggleThread(thread.threadId, e)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2 flex-1">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 mt-1 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mt-1 text-slate-400" />
                  )}
                  <Mail className="w-4 h-4 mt-1 text-blue-600" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <CardTitle className="text-sm font-medium text-slate-900 truncate">
                        {thread.subject}
                      </CardTitle>
                      {thread.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                          {thread.unreadCount}
                        </Badge>
                      )}
                      {thread.emails.some(e => e.attachments && e.attachments.length > 0) && (
                        <Paperclip className="w-3 h-3 text-slate-400" />
                      )}
                    </div>
                    {compact && !isExpanded && (
                      <p className="text-xs text-slate-600 truncate">
                        {getEmailPreview(thread)}
                      </p>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-slate-500">
                        {thread.emails.length} message{thread.emails.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">
                        {formatTimeAgo(thread.lastActivity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            {isExpanded && (
              <CardContent className="pt-0">
                <div className="space-y-3 border-l-2 border-slate-200 ml-3 pl-4">
                  {sortedEmails.map((email, index) => (
                    <div key={email.id} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            email.type === 'inbound' ? 'bg-blue-500' : 'bg-green-500'
                          }`} />
                          <User className="w-3 h-3 text-slate-400" />
                          <span className="text-xs font-medium text-slate-700">
                            {getSenderName(email.from)}
                          </span>
                          <span className="text-xs text-slate-500">
                            to {getSenderName(email.to)}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {email.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      
                      <div className="bg-slate-50 rounded p-3 ml-5">
                        <p className="text-xs text-slate-700 whitespace-pre-wrap">
                          {email.body}
                        </p>
                        
                        {email.attachments && email.attachments.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-slate-200">
                            <div className="flex items-center space-x-1 mb-1">
                              <Paperclip className="w-3 h-3 text-slate-400" />
                              <span className="text-xs text-slate-600 font-medium">
                                {email.attachments.length} attachment{email.attachments.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                            {email.attachments.map((attachment) => (
                              <div key={attachment.id} className="flex items-center justify-between text-xs">
                                <span className="text-slate-700 truncate">
                                  {attachment.fileName}
                                </span>
                                <span className="text-slate-500">
                                  {attachment.fileSize}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {index < sortedEmails.length - 1 && (
                        <div className="border-b border-slate-100 ml-5" />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Reply
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default EmailThreadDisplay;
