
import { Building2, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BillingInformationCardProps {
  invoice: {
    brokerName: string;
    brokerEmail: string;
    brokerAddress: string;
    origin: string;
    destination: string;
    distance: string;
  };
}

const BillingInformationCard = ({ invoice }: BillingInformationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-slate-600">Bill To</span>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-slate-900">{invoice.brokerName}</p>
              <p className="text-sm text-slate-600">{invoice.brokerEmail}</p>
              <p className="text-sm text-slate-600">{invoice.brokerAddress}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-slate-600">Route Information</span>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-slate-500">From:</span>
                <span className="ml-1 text-sm text-slate-900">{invoice.origin}</span>
              </div>
              <div>
                <span className="text-sm text-slate-500">To:</span>
                <span className="ml-1 text-sm text-slate-900">{invoice.destination}</span>
              </div>
              <div>
                <span className="text-sm text-slate-500">Distance:</span>
                <span className="ml-1 text-sm text-slate-900">{invoice.distance}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingInformationCard;
