
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface FormData {
  loadId: string;
  linehaul: string;
  broker: string;
  factor: string;
  funding: string;
  invoiceNumber: string;
  expectedPayDate: string;
}

interface NewLoadFormDataProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
}

const NewLoadFormData = ({ formData, onInputChange }: NewLoadFormDataProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="loadId" className="text-sm font-medium text-slate-700">Load #</Label>
        <Input
          id="loadId"
          value={formData.loadId}
          onChange={(e) => onInputChange('loadId', e.target.value)}
          placeholder="3249883"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="linehaul" className="text-sm font-medium text-slate-700">
          <span className="inline-flex items-center">
            💰 Linehaul
          </span>
        </Label>
        <Input
          id="linehaul"
          value={formData.linehaul}
          onChange={(e) => onInputChange('linehaul', e.target.value)}
          placeholder="$1,250.00"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="broker" className="text-sm font-medium text-slate-700">
          <span className="inline-flex items-center">
            👤 Broker
          </span>
        </Label>
        <div className="mt-1 relative">
          <Input
            id="broker"
            value={formData.broker}
            onChange={(e) => onInputChange('broker', e.target.value)}
            placeholder="Mainstreet Brokerage"
          />
          {formData.broker && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
              onClick={() => onInputChange('broker', '')}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="factor" className="text-sm font-medium text-slate-700">
          <span className="inline-flex items-center">
            👤 Factor
          </span>
        </Label>
        <Input
          id="factor"
          value={formData.factor}
          onChange={(e) => onInputChange('factor', e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="funding" className="text-sm font-medium text-slate-700">
          <span className="inline-flex items-center">
            💳 Funding
          </span>
        </Label>
        <div className="mt-1 flex items-center space-x-2">
          <Input
            id="funding"
            value={formData.funding}
            onChange={(e) => onInputChange('funding', e.target.value)}
            className="flex-1"
          />
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="invoiceNumber" className="text-sm font-medium text-slate-700">
          <span className="inline-flex items-center">
            📄 Invoice #
          </span>
        </Label>
        <Input
          id="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={(e) => onInputChange('invoiceNumber', e.target.value)}
          placeholder="#090345035"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="expectedPayDate" className="text-sm font-medium text-slate-700">
          <span className="inline-flex items-center">
            📅 Expected Pay Date
          </span>
        </Label>
        <Input
          id="expectedPayDate"
          value={formData.expectedPayDate}
          onChange={(e) => onInputChange('expectedPayDate', e.target.value)}
          placeholder="Monday, March 26, 2025"
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default NewLoadFormData;
