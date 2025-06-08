
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface InvoiceFormData {
  loadId: string;
  customerName: string;
  customerEmail: string;
  invoiceNumber: string;
  poNumber: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  invoiceDate: string;
  dueDate: string;
  memo: string;
  ccEmails: string[];
  acceptCreditCards: boolean;
  acceptDebit: boolean;
  internalNote: string;
}

interface CreateInvoicePaymentStepProps {
  formData: InvoiceFormData;
  updateFormData: (updates: Partial<InvoiceFormData>) => void;
  onNext: () => void;
}

const CreateInvoicePaymentStep = ({ formData, updateFormData, onNext }: CreateInvoicePaymentStepProps) => {
  const generateDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30); // 30 days from now
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Payment details</h2>
        <p className="text-slate-600">Configure payment settings and due dates.</p>
      </div>

      {/* Invoice and Due Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="invoiceDate">Invoice date</Label>
          <Input
            id="invoiceDate"
            type="date"
            value={formData.invoiceDate}
            onChange={(e) => handleDateChange('invoiceDate', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due date</Label>
          <div className="flex space-x-2">
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleDateChange('dueDate', e.target.value)}
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => updateFormData({ dueDate: generateDueDate() })}
              className="whitespace-nowrap"
            >
              +30 days
            </Button>
          </div>
        </div>
      </div>

      {/* Repeat Invoice Option */}
      <div className="flex items-center space-x-2">
        <Checkbox id="repeat" />
        <Label htmlFor="repeat" className="text-sm">Repeat this invoice</Label>
      </div>

      {/* Payer Memo */}
      <div className="space-y-2">
        <Label htmlFor="payerMemo">Payer memo (optional)</Label>
        <Textarea
          id="payerMemo"
          value={formData.memo}
          onChange={(e) => updateFormData({ memo: e.target.value })}
          placeholder="For any details please reach me anytime. Hit me at jane@saturn.com"
          rows={3}
        />
      </div>

      {/* Upload Attachment */}
      <div className="space-y-2">
        <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Upload attachment</span>
        </Button>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Payment methods</Label>
        
        <div className="space-y-3">
          <p className="text-sm text-green-600">
            Payments made via manual ACH, Wire, or Pay with Saturn are accepted by default and always free.
          </p>
          
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="creditCards"
              checked={formData.acceptCreditCards}
              onCheckedChange={(checked) => updateFormData({ acceptCreditCards: !!checked })}
            />
            <Label htmlFor="creditCards" className="text-sm">Accept credit cards</Label>
            <span className="text-sm text-slate-500">You'll pay a vendor fee</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="debit"
              checked={formData.acceptDebit}
              onCheckedChange={(checked) => updateFormData({ acceptDebit: !!checked })}
            />
            <Label htmlFor="debit" className="text-sm">Accept debit</Label>
            <span className="text-sm text-slate-500">Included in your plan. Daily limit of $10K</span>
          </div>
        </div>
      </div>

      {/* Internal Setup */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Internal set up</Label>
        <p className="text-sm text-slate-600">Only visible to members in your organization.</p>
        
        {/* Destination Account */}
        <div className="space-y-2">
          <Label htmlFor="destinationAccount">Destination account</Label>
          <Select defaultValue="ops-payroll">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ops-payroll">
                <div className="flex flex-col">
                  <span className="font-medium">Saturn Ops / Payroll</span>
                  <span className="text-sm text-slate-500">$ 2,001,023.00 / Checking **1023</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Internal Note */}
        <div className="space-y-2">
          <Label htmlFor="internalNote">Internal note (optional)</Label>
          <Textarea
            id="internalNote"
            value={formData.internalNote}
            onChange={(e) => updateFormData({ internalNote: e.target.value })}
            placeholder="Input your note"
            rows={3}
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <Button onClick={onNext}>
          Review
        </Button>
      </div>
    </div>
  );
};

export default CreateInvoicePaymentStep;
