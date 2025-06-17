
import { Card, CardContent } from "@/components/ui/card";

const NewLoadSummaryCard = () => {
  return (
    <Card className="border-slate-200 bg-slate-50">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-600">Amount</span>
            <span className="font-medium">$0.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Fee</span>
            <span className="font-medium">$0.00</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between">
              <span className="font-medium text-slate-900">Total</span>
              <span className="font-bold text-lg">$0.00</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewLoadSummaryCard;
