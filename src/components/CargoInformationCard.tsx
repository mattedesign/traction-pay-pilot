
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CargoInformationCardProps {
  formData: {
    commodity: string;
    weight: string;
    pieces: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const CargoInformationCard = ({ formData, onInputChange }: CargoInformationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cargo Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="commodity">Commodity</Label>
            <Input
              id="commodity"
              value={formData.commodity}
              onChange={(e) => onInputChange('commodity', e.target.value)}
              placeholder="General Freight"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              value={formData.weight}
              onChange={(e) => onInputChange('weight', e.target.value)}
              placeholder="00000 lbs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pieces">Pieces</Label>
            <Input
              id="pieces"
              value={formData.pieces}
              onChange={(e) => onInputChange('pieces', e.target.value)}
              placeholder="0 pallets"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CargoInformationCard;
