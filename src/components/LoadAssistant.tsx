
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from "@/components/ChatInterface";

interface LoadAssistantProps {
  loadId: string;
}

const LoadAssistant = ({ loadId }: LoadAssistantProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Load Assistant</CardTitle>
        <CardDescription>
          Ask questions about this load, routing, payments, or requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChatInterface loadContext={`Load #${loadId}`} />
      </CardContent>
    </Card>
  );
};

export default LoadAssistant;
