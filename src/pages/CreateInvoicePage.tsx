
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CreateInvoiceCustomerStep from "@/components/CreateInvoiceCustomerStep";
import CreateInvoiceDetailsStep from "@/components/CreateInvoiceDetailsStep";
import CreateInvoicePaymentStep from "@/components/CreateInvoicePaymentStep";
import CreateInvoiceReviewStep from "@/components/CreateInvoiceReviewStep";

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

const CreateInvoicePage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<InvoiceFormData>({
    loadId: "",
    customerName: "",
    customerEmail: "",
    invoiceNumber: "",
    poNumber: "",
    items: [{ description: "", quantity: 1, unitPrice: 0 }],
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    memo: "",
    ccEmails: [],
    acceptCreditCards: false,
    acceptDebit: false,
    internalNote: ""
  });

  const steps = [
    { id: 1, title: "Customer", description: "Select customer and load" },
    { id: 2, title: "Details", description: "Invoice details and line items" },
    { id: 3, title: "Payment", description: "Payment settings" },
    { id: 4, title: "Review", description: "Review and send" }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/invoices');
    }
  };

  const updateFormData = (updates: Partial<InvoiceFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleCreateInvoice = () => {
    console.log("Creating invoice with data:", formData);
    // Here you would typically save the invoice
    navigate('/invoices');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CreateInvoiceCustomerStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <CreateInvoiceDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <CreateInvoicePaymentStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <CreateInvoiceReviewStep
            formData={formData}
            onCreateInvoice={handleCreateInvoice}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F6FA' }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Create Invoice</h1>
              <p className="text-slate-600">Step {currentStep} of 4: {steps[currentStep - 1]?.description}</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-slate-300 text-slate-400'
                }`}>
                  {step.id}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-8 h-0.5 w-24 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {renderCurrentStep()}
              </CardContent>
            </Card>
          </div>

          {/* Invoice Preview */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Invoice Preview</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-slate-500">Load:</span>
                    <span className="ml-2 text-slate-900">{formData.loadId || 'Not selected'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Customer:</span>
                    <span className="ml-2 text-slate-900">{formData.customerName || 'Not selected'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Invoice #:</span>
                    <span className="ml-2 text-slate-900">{formData.invoiceNumber || 'TBD'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Total:</span>
                    <span className="ml-2 text-slate-900 font-semibold">
                      ${formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
