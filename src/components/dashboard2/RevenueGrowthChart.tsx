
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface RevenueGrowthChartProps {}

const pieData = [
  { name: 'USA', value: 65.02, color: '#8B5CF6' },
  { name: 'UK', value: 20.15, color: '#EC4899' },
  { name: 'Others', value: 14.83, color: '#E5E7EB' }
];

const RevenueGrowthChart = ({}: RevenueGrowthChartProps) => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Revenue Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="relative">
            <ResponsiveContainer width={280} height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx={140}
                  cy={140}
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-lg font-medium text-gray-600">USA</div>
              <div className="text-3xl font-bold text-gray-900">65.02%</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-8 mt-6">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueGrowthChart;
