
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RouteInformationCardProps {
  formData: {
    origin: string;
    destination: string;
    pickupDate: string;
    deliveryDate: string;
    distance: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const RouteInformationCard = ({ formData, onInputChange }: RouteInformationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="origin">Origin</Label>
            <Textarea
              id="origin"
              value={formData.origin}
              onChange={(e) => onInputChange('origin', e.target.value)}
              placeholder="Enter pickup address"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Textarea
              id="destination"
              value={formData.destination}
              onChange={(e) => onInputChange('destination', e.target.value)}
              placeholder="Enter delivery address"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pickupDate">Pickup Date</Label>
            <Input
              id="pickupDate"
              type="datetime-local"
              value={formData.pickupDate}
              onChange={(e) => onInputChange('pickupDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryDate">Delivery Date</Label>
            <Input
              id="deliveryDate"
              type="datetime-local"
              value={formData.deliveryDate}
              onChange={(e) => onInputChange('deliveryDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="distance">Distance</Label>
            <Input
              id="distance"
              value={formData.distance}
              onChange={(e) => onInputChange('distance', e.target.value)}
              placeholder="000 miles"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteInformationCard;
