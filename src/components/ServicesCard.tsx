
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ServicesCardProps {
  invoice: {
    description: string;
    rate: string;
    amount: string;
  };
}

const ServicesCard = ({ invoice }: ServicesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-slate-900">{invoice.description}</p>
              <p className="text-sm text-slate-600">Rate: {invoice.rate}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-slate-900">{invoice.amount}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between pt-3">
            <p className="font-semibold text-slate-900">Total</p>
            <p className="font-bold text-xl text-slate-900">{invoice.amount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesCard;
