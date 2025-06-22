
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import EmailThreadDisplay from "./EmailThreadDisplay";
import { EmailThread } from "@/services/emailService";

interface EmailCommunicationsSectionProps {
  emailThreads: EmailThread[];
  isLoadingEmails: boolean;
}

const EmailCommunicationsSection = ({ emailThreads, isLoadingEmails }: EmailCommunicationsSectionProps) => {
  const [isEmailSectionOpen, setIsEmailSectionOpen] = useState(false);

  const handleMarkAsRead = (threadId: string) => {
    console.log('Marking thread as read:', threadId);
    // TODO: Implement actual mark as read functionality
  };

  const handleReply = (threadId: string) => {
    console.log('Replying to thread:', threadId);
    // TODO: Implement reply functionality
  };

  const handleForward = (emailId: string) => {
    console.log('Forwarding email:', emailId);
    // TODO: Implement forward functionality
  };

  const handleArchive = (threadId: string) => {
    console.log('Archiving thread:', threadId);
    // TODO: Implement archive functionality
  };

  return (
    <Collapsible open={isEmailSectionOpen} onOpenChange={setIsEmailSectionOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Email Communications</CardTitle>
                <CardDescription>
                  Email threads and communications for this load
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                {isEmailSectionOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            {isLoadingEmails ? (
              <div className="text-center py-8">
                <div className="text-slate-500 text-sm">Loading communications...</div>
              </div>
            ) : emailThreads.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-slate-500 text-sm">No email communications found</div>
              </div>
            ) : (
              <div className="space-y-6">
                {emailThreads.map((thread) => (
                  <EmailThreadDisplay
                    key={thread.threadId}
                    thread={thread}
                    onMarkAsRead={handleMarkAsRead}
                    onReply={handleReply}
                    onForward={handleForward}
                    onArchive={handleArchive}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default EmailCommunicationsSection;
