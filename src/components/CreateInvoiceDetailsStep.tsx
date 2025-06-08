
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

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

interface CreateInvoiceDetailsStepProps {
  formData: InvoiceFormData;
  updateFormData: (updates: Partial<InvoiceFormData>) => void;
  onNext: () => void;
}

const CreateInvoiceDetailsStep = ({ formData, updateFormData, onNext }: CreateInvoiceDetailsStepProps) => {
  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `INV-${year}-${month}-${random}`;
  };

  const handleInvoiceNumberGenerate = () => {
    updateFormData({ invoiceNumber: generateInvoiceNumber() });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    updateFormData({ items: updatedItems });
  };

  const addLineItem = () => {
    updateFormData({
      items: [...formData.items, { description: "", quantity: 1, unitPrice: 0 }]
    });
  };

  const removeLineItem = (index: number) => {
    if (formData.items.length > 1) {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      updateFormData({ items: updatedItems });
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const canProceed = formData.invoiceNumber && formData.items.every(item => 
    item.description && item.quantity > 0 && item.unitPrice > 0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Invoice details</h2>
        <p className="text-slate-600">Fill out this form for the recipient and their details.</p>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="invoiceNumber">Invoice number *</Label>
          <div className="flex space-x-2">
            <Input
              id="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={(e) => updateFormData({ invoiceNumber: e.target.value })}
              placeholder="INV-2024-001"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleInvoiceNumberGenerate}
              className="whitespace-nowrap"
            >
              Generate
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="poNumber">PO number (Optional)</Label>
          <Input
            id="poNumber"
            value={formData.poNumber}
            onChange={(e) => updateFormData({ poNumber: e.target.value })}
            placeholder="PO-123456"
          />
        </div>
      </div>

      {/* Line Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Line Items</Label>
          <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
            <Plus className="w-4 h-4 mr-2" />
            Add Line Item
          </Button>
        </div>

        {formData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-3 items-end">
            <div className="col-span-6">
              <Label className="text-sm">Item</Label>
              <Input
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                placeholder="Description of service or product"
              />
            </div>
            <div className="col-span-2">
              <Label className="text-sm">Quantity</Label>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                min="1"
              />
            </div>
            <div className="col-span-3">
              <Label className="text-sm">Unit price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                <Input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                  className="pl-8"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            <div className="col-span-1">
              {formData.items.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeLineItem(index)}
                  className="h-12 w-12 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="flex justify-end pt-4 border-t">
          <div className="text-right">
            <div className="text-lg font-semibold text-slate-900">
              Total: ${calculateTotal().toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Memo */}
      <div className="space-y-2">
        <Label htmlFor="memo">Memo (Optional)</Label>
        <Textarea
          id="memo"
          value={formData.memo}
          onChange={(e) => updateFormData({ memo: e.target.value })}
          placeholder="Additional notes or instructions for the customer"
          rows={3}
        />
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <Button onClick={onNext} disabled={!canProceed}>
          Payment Details
        </Button>
      </div>
    </div>
  );
};

export default CreateInvoiceDetailsStep;
