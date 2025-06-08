
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { LoadService } from "@/services/loadService";

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

interface CreateInvoiceCustomerStepProps {
  formData: InvoiceFormData;
  updateFormData: (updates: Partial<InvoiceFormData>) => void;
  onNext: () => void;
}

const CreateInvoiceCustomerStep = ({ formData, updateFormData, onNext }: CreateInvoiceCustomerStepProps) => {
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  // Mock customers - in a real app, these would come from an API
  const customers = [
    { name: "SpaceX", email: "spacex@saturn.com" },
    { name: "BBX Inc.", email: "bbx@saturn.com" },
    { name: "Corp Conglomerate Incorporated Partners International", email: "corpconglomerate@saturn.com" },
    { name: "NASA", email: "nasa@saturn.com" },
    { name: "Blue Eyes Dragon", email: "bluedragon@saturn.com" },
    { name: "Red Eyes Griffon", email: "redgriffon@saturn.com" },
    { name: "Yellow Eyes Manticore", email: "yellowmanticore@saturn.com" }
  ];

  // Get available loads for invoicing
  const availableLoads = LoadService.getAllLoads().filter(load => 
    load.status === "delivered" || load.status === "ready_to_invoice"
  );

  const handleCustomerSelect = (customerName: string) => {
    const customer = customers.find(c => c.name === customerName);
    if (customer) {
      updateFormData({
        customerName: customer.name,
        customerEmail: customer.email
      });
    }
  };

  const handleLoadSelect = (loadId: string) => {
    const load = availableLoads.find(l => l.id === loadId);
    if (load) {
      updateFormData({
        loadId,
        items: [{
          description: `Freight transportation - ${load.origin} to ${load.destination}`,
          quantity: 1,
          unitPrice: parseFloat(load.amount.replace('$', '').replace(',', ''))
        }]
      });
    }
  };

  const canProceed = formData.customerName && formData.loadId;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Create invoice for</h2>
        <p className="text-slate-600">Select a customer and the load you want to invoice.</p>
      </div>

      {/* Load Selection */}
      <div className="space-y-2">
        <Label htmlFor="load">Load to Invoice *</Label>
        <Select value={formData.loadId} onValueChange={handleLoadSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a load" />
          </SelectTrigger>
          <SelectContent>
            {availableLoads.map((load) => (
              <SelectItem key={load.id} value={load.id}>
                <div className="flex flex-col">
                  <span className="font-medium">Load #{load.id}</span>
                  <span className="text-sm text-slate-500">
                    {load.origin} → {load.destination} | {load.amount}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Customer Selection */}
      <div className="space-y-2">
        <Label htmlFor="customer">Customer *</Label>
        <Select value={formData.customerName} onValueChange={handleCustomerSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a customer" />
          </SelectTrigger>
          <SelectContent>
            {customers.map((customer) => (
              <SelectItem key={customer.name} value={customer.name}>
                <div className="flex flex-col">
                  <span className="font-medium">{customer.name}</span>
                  <span className="text-sm text-slate-500">{customer.email}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={() => setShowCustomerForm(true)} 
        variant="outline" 
        className="w-full flex items-center justify-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add new customer</span>
      </Button>

      {/* Selected Customer Info */}
      {formData.customerName && (
        <div className="p-4 bg-slate-50 rounded-lg">
          <h3 className="font-medium text-slate-900 mb-2">Selected Customer</h3>
          <div className="space-y-1 text-sm">
            <div>
              <span className="text-slate-500">Name:</span>
              <span className="ml-2 text-slate-900">{formData.customerName}</span>
            </div>
            <div>
              <span className="text-slate-500">Email:</span>
              <span className="ml-2 text-slate-900">{formData.customerEmail}</span>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <Button onClick={onNext} disabled={!canProceed}>
          Continue to Details
        </Button>
      </div>
    </div>
  );
};

export default CreateInvoiceCustomerStep;
