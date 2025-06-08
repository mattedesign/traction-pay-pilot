
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from "./ChatInterface";
import { LoadContextProvider } from "./LoadContextProvider";

interface LoadChatSectionProps {
  loadId: string;
}

const LoadChatSection = ({ loadId }: LoadChatSectionProps) => {
  return (
    <LoadContextProvider loadId={loadId}>
      <Card>
        <CardHeader>
          <CardTitle>Ask About Load #{loadId}</CardTitle>
          <CardDescription>
            AI assistant with complete access to load details, documents, and communications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChatInterface loadContext={`Load #${loadId}`} />
        </CardContent>
      </Card>
    </LoadContextProvider>
  );
};

export default LoadChatSection;
