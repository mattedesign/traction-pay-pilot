
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from "./ChatInterface";

interface LoadChatSectionProps {
  loadId: string;
}

const LoadChatSection = ({ loadId }: LoadChatSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask About Load #{loadId}</CardTitle>
        <CardDescription>
          Get help with route planning, document requirements, or discrepancy resolution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChatInterface loadContext={`Load #${loadId}`} />
      </CardContent>
    </Card>
  );
};

export default LoadChatSection;
