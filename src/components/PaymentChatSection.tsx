
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from "./ChatInterface";

interface PaymentChatSectionProps {
  loadId: string;
}

const PaymentChatSection = ({ loadId }: PaymentChatSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Offers</CardTitle>
        <CardDescription>
          Ask about QuickPay, factoring, cash flow management, or payment optimization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChatInterface loadContext={`Load #${loadId} payment options`} />
      </CardContent>
    </Card>
  );
};

export default PaymentChatSection;
