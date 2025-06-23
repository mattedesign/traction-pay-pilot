
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
            ) : (
              <EmailThreadDisplay threads={emailThreads} />
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default EmailCommunicationsSection;
