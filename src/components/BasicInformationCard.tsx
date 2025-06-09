
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInformationCardProps {
  formData: {
    loadId: string;
    brokerName: string;
    rate: string;
    referenceNumber: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const BasicInformationCard = ({ formData, onInputChange }: BasicInformationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="loadId">Load ID *</Label>
            <Input
              id="loadId"
              value={formData.loadId}
              onChange={(e) => onInputChange('loadId', e.target.value)}
              placeholder="Enter load ID"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brokerName">Broker Name *</Label>
            <Input
              id="brokerName"
              value={formData.brokerName}
              onChange={(e) => onInputChange('brokerName', e.target.value)}
              placeholder="Enter broker name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Rate *</Label>
            <Input
              id="rate"
              value={formData.rate}
              onChange={(e) => onInputChange('rate', e.target.value)}
              placeholder="$0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="referenceNumber">Reference Number</Label>
            <Input
              id="referenceNumber"
              value={formData.referenceNumber}
              onChange={(e) => onInputChange('referenceNumber', e.target.value)}
              placeholder="Enter reference number"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInformationCard;
