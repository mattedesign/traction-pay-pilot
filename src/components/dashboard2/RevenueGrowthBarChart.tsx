
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface RevenueGrowthBarChartProps {}

const netBurnData = [
  { name: 'May', value: 95000, factored: 125000 },
  { name: 'Jun', value: 110000, factored: 145000 },
  { name: 'Jul', value: 78000, factored: 98000 },
  { name: 'Aug', value: 95000, factored: 125000 },
  { name: 'Sep', value: 42000, factored: 67000 },
  { name: 'Oct', value: 75000, factored: 98000 },
  { name: 'Nov', value: 155000, factored: 185000 },
  { name: 'Dec', value: 88000, factored: 115000 }
];

const RevenueGrowthBarChart = ({}: RevenueGrowthBarChartProps) => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Revenue Growth</CardTitle>
          <div className="text-sm text-gray-500">📅 Dec 12, 2024</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={netBurnData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={10} />
              <Bar dataKey="value" fill="#1f2937" radius={[2, 2, 0, 0]} />
              <Bar dataKey="factored" fill="#a855f7" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueGrowthBarChart;
