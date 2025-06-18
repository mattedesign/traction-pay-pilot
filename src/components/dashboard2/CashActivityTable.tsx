
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

interface CashActivityTableProps {}

const cashFlowData = [
  { period: 'Week 1', cashIn: 589.99, cashOut: 589.99, available: 854084.55 },
  { period: 'Week 2', cashIn: 643634.3, cashOut: 782.01, available: 40627533 },
  { period: 'Week 3', cashIn: 375729, cashOut: 105.55, available: 76750.7600 },
  { period: 'Week 4', cashIn: 464393.8, cashOut: 473.85, available: 73965.00 }
];

const CashActivityTable = ({}: CashActivityTableProps) => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center space-x-6 border-b border-gray-200 pb-3">
          <button className="text-sm font-medium text-gray-900 border-b-2 border-blue-600 pb-2">
            Cash Activity
          </button>
          <button className="text-sm text-gray-500 pb-2">
            Profit & Loss
          </button>
          <button className="text-sm text-gray-500 pb-2">
            Balance Sheet
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 px-4 py-3 text-xs font-medium text-gray-500 bg-gray-50">
            <div>Cash In ↑</div>
            <div>Cash Out ↑</div>
            <div>Available Cash Out ↑</div>
          </div>
          
          {/* Data Rows */}
          {cashFlowData.map((row, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 px-4 py-3 text-sm border-b border-gray-100 last:border-b-0">
              <div className="text-gray-900">${row.cashIn.toLocaleString()}</div>
              <div className="text-gray-900">${row.cashOut}</div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">${row.available.toLocaleString()}</span>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CashActivityTable;
