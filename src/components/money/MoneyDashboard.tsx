import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FactoringCostCalculator from "../insights/FactoringCostCalculator";
import { CarrierProfile } from "@/types/carrier";

interface MoneyDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const MoneyDashboard = ({ carrierProfile, userProfile }: MoneyDashboardProps) => {
  const mockCarrierData = {
    monthlyRevenue: 127500,
    factoringRate: 3.5
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Financial Overview</h1>
        <div className="text-sm text-slate-500">
          Current Balance: <span className="font-semibold text-green-600">$45,230</span>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">$45,230</div>
            <p className="text-sm text-green-700 mt-2">Ready for immediate use</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Pending Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">$82,140</div>
            <p className="text-sm text-blue-700 mt-2">7 invoices awaiting payment</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">Quick Pay Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">$65,890</div>
            <p className="text-sm text-orange-700 mt-2">Get funds in 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div>
                <div className="font-medium">Load #TL-2024-001 Payment</div>
                <div className="text-sm text-slate-600">Expected: Today</div>
              </div>
              <div className="text-xl font-bold text-green-600">+$1,850</div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <div className="font-medium">Load #TL-2024-003 Payment</div>
                <div className="text-sm text-slate-600">Expected: Tomorrow</div>
              </div>
              <div className="text-xl font-bold text-blue-600">+$950</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <div className="font-medium">Fuel Card Payment</div>
                <div className="text-sm text-slate-600">Due: June 15</div>
              </div>
              <div className="text-xl font-bold text-orange-600">-$2,340</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Factoring Cost Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Factoring Cost Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <FactoringCostCalculator carrierData={mockCarrierData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MoneyDashboard;
