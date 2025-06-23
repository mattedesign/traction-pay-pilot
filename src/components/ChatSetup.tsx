
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ChatSetupProps {
  onAPIKeySubmit: (key: string) => void;
  isLoading: boolean;
}

const ChatSetup = ({ onAPIKeySubmit, isLoading }: ChatSetupProps) => {
  const handleSetupComplete = () => {
    onAPIKeySubmit(""); // Empty key since it's handled in Supabase
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Chat System Ready</span>
          </CardTitle>
          <CardDescription>
            Your AI chat assistant is powered by Claude via secure Supabase Edge Functions.
            API keys are managed securely in the backend.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleSetupComplete}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Initializing..." : "Start Chatting"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSetup;
