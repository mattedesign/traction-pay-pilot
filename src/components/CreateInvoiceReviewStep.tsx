
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Building2, FileText } from "lucide-react";

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

interface CreateInvoiceReviewStepProps {
  formData: InvoiceFormData;
  onCreateInvoice: () => void;
}

const CreateInvoiceReviewStep = ({ formData, onCreateInvoice }: CreateInvoiceReviewStepProps) => {
  const [emailTo, setEmailTo] = useState(formData.customerEmail);
  const [ccEmails, setCcEmails] = useState("");

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Review and send</h2>
        <p className="text-slate-600">Review your invoice details before sending.</p>
      </div>

      {/* Invoice Summary */}
      <div className="space-y-4">
        <div>
          <p className="text-slate-600">Invoice to {formData.customerName}.</p>
          <div className="text-3xl font-bold text-slate-900 mt-2">
            ${calculateTotal().toFixed(2)}
          </div>
          <div className="flex items-center mt-2 text-sm text-slate-500">
            <Calendar className="w-4 h-4 mr-1" />
            Due on {formData.dueDate ? formatDate(formData.dueDate) : 'No due date set'}
          </div>
        </div>

        {/* Share Invoice */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-900">Share your invoice</h3>
          
          <div className="space-y-2">
            <Label htmlFor="emailTo">Email to</Label>
            <Input
              id="emailTo"
              type="email"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              className="text-blue-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ccEmails">CC</Label>
            <Input
              id="ccEmails"
              type="email"
              value={ccEmails}
              onChange={(e) => setCcEmails(e.target.value)}
              placeholder="Input email"
            />
          </div>
        </div>
      </div>

      {/* Invoice Preview Card */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Invoice</h3>
          </div>
        </div>

        {/* Invoice Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-2">From</h4>
            <div className="space-y-1 text-sm">
              <p className="font-medium">Saturn Okane</p>
              <p className="text-slate-600">jack@saturn.com</p>
              <p className="text-slate-600">666 Dragon St</p>
              <p className="text-slate-600">Floor 21</p>
              <p className="text-slate-600">New York, CA 94105</p>
              <p className="text-slate-600">United States</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-2">To</h4>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{formData.customerName}</p>
              <p className="text-slate-600">{formData.customerEmail}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-2">Details</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Invoice no.</span>
                <span>{formData.invoiceNumber}</span>
              </div>
              {formData.poNumber && (
                <div className="flex justify-between">
                  <span className="text-slate-600">PO no.</span>
                  <span>{formData.poNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="space-y-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left text-sm font-medium text-slate-600 pb-2">Item</th>
                <th className="text-center text-sm font-medium text-slate-600 pb-2">Quantity</th>
                <th className="text-right text-sm font-medium text-slate-600 pb-2">Unit price</th>
                <th className="text-right text-sm font-medium text-slate-600 pb-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 text-sm">{item.description}</td>
                  <td className="py-3 text-sm text-center">{item.quantity}</td>
                  <td className="py-3 text-sm text-right">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-3 text-sm text-right">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end pt-4">
            <div className="text-right">
              <div className="text-lg font-semibold">
                Total: ${calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Memo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t">
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-2">Terms</h4>
            <div className="space-y-1 text-sm text-slate-600">
              <div>Invoice no. {formData.invoiceDate ? formatDate(formData.invoiceDate) : 'TBD'}</div>
              <div>Due date {formData.dueDate ? formatDate(formData.dueDate) : 'TBD'}</div>
              <div>Pay via Manual transfer (ACH/wire), Pay by Mercury</div>
            </div>
          </div>

          {formData.memo && (
            <div>
              <h4 className="text-sm font-medium text-slate-600 mb-2">Memo</h4>
              <p className="text-sm text-slate-600">{formData.memo}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline">
          Create only
        </Button>
        <Button onClick={onCreateInvoice} className="bg-blue-600 hover:bg-blue-700">
          Create and Send Email
        </Button>
      </div>
    </div>
  );
};

export default CreateInvoiceReviewStep;
