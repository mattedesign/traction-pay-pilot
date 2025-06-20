
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Calendar, ArrowUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const CashFlowVisualization = () => {
  const beforeAfterData = [
    { month: "Jan", before: 45000, after: 125000 },
    { month: "Feb", before: 38000, after: 142000 },
    { month: "Mar", before: 52000, after: 156000 },
    { month: "Apr", before: 41000, after: 168000 },
    { month: "May", before: 48000, after: 175000 },
    { month: "Jun", before: 44000, after: 189000 }
  ];

  const paymentTimeline = [
    { day: "Mon", traditional: 0, optimized: 45000 },
    { day: "Tue", traditional: 0, optimized: 78000 },
    { day: "Wed", traditional: 0, optimized: 23000 },
    { day: "Thu", traditional: 0, optimized: 34000 },
    { day: "Fri", traditional: 0, optimized: 56000 },
    { day: "Week 2", traditional: 12000, optimized: 67000 },
    { day: "Week 3", traditional: 28000, optimized: 89000 },
    { day: "Week 4", traditional: 45000, optimized: 92000 }
  ];

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-green-900">
            <TrendingUp className="w-6 h-6" />
            <span>📊 CASH FLOW TRANSFORMATION</span>
          </CardTitle>
          <Badge className="bg-green-100 text-green-800">Live Demo</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Before/After Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-900">Available Cash</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">$166,500</div>
            <div className="text-xs text-green-600 flex items-center">
              <ArrowUp className="w-3 h-3 mr-1" />
              +311% vs traditional
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-slate-900">Payment Speed</span>
            </div>
            <div className="text-2xl font-bold text-green-600">24hrs</div>
            <div className="text-xs text-green-600 flex items-center">
              <ArrowUp className="w-3 h-3 mr-1" />
              73% faster payments
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-slate-900">Load Capacity</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">+95%</div>
            <div className="text-xs text-green-600 flex items-center">
              <ArrowUp className="w-3 h-3 mr-1" />
              from declined loads reduction
            </div>
          </div>
        </div>

        {/* Monthly Cash Flow Comparison */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3">Monthly Available Cash Flow</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={beforeAfterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="before" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Before (Traditional)"
                strokeDasharray="5 5"
              />
              <Line 
                type="monotone" 
                dataKey="after" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="After (AI-Optimized)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Payment Timeline */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3">Payment Timeline Comparison</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={paymentTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Bar dataKey="traditional" fill="#ef4444" name="Traditional Factoring" />
              <Bar dataKey="optimized" fill="#22c55e" name="AI-Optimized Platform" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Impact Summary */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-3">🎯 Transformation Impact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-purple-800 mb-2">Financial Improvements:</h5>
              <ul className="space-y-1 text-sm text-purple-700">
                <li>• $185K receivables → $166.5K available cash</li>
                <li>• Payment delays reduced by 89%</li>
                <li>• $195K additional annual revenue capacity</li>
                <li>• Fleet expansion timeline: 8 months sooner</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-800 mb-2">Operational Benefits:</h5>
              <ul className="space-y-1 text-sm text-purple-700">
                <li>• Declined loads: 25% → 5%</li>
                <li>• AI-powered payment optimization</li>
                <li>• Automated document processing</li>
                <li>• Real-time cash flow visibility</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashFlowVisualization;
