
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Fuel, Clock, Target, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard2Page = () => {
  const { profile } = useAuth();

  // Mock data for the dashboard
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

  const pieData = [
    { name: 'USA', value: 65.02, color: '#8B5CF6' },
    { name: 'UK', value: 20.15, color: '#EC4899' },
    { name: 'Others', value: 14.83, color: '#E5E7EB' }
  ];

  const cashFlowData = [
    { period: 'Week 1', cashIn: 589.99, cashOut: 589.99, available: 854.08 },
    { period: 'Week 2', cashIn: 643.64, cashOut: 782.01, available: 406.27 },
    { period: 'Week 3', cashIn: 575.72, cashOut: 105.55, available: 767.50 },
    { period: 'Week 4', cashIn: 646.39, cashOut: 473.85, available: 739.65 }
  ];

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      <NavigationSidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
              <p className="text-slate-600">Monitor campaigns and optimize your marketing strategy.</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-slate-600">
                Welcome to the ledgr Demo. Learn more about ledgr.
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Sign up Free
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Metrics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Net Burn Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-slate-600">Net Burn 3 Month Avg.</CardTitle>
                      <Button variant="ghost" size="sm">
                        <span className="text-slate-400">⋯</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-3xl font-bold text-slate-900">$330.47K</div>
                      <div className="w-full bg-purple-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-slate-500">Compared to the previous 30 day period</span>
                        <Badge className="ml-2 bg-green-100 text-green-800">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          24%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-slate-600">Net Burn 3 Month Avg.</CardTitle>
                      <Button variant="ghost" size="sm">
                        <span className="text-slate-400">⋯</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-3xl font-bold text-slate-900">$130.70K</div>
                      <div className="w-full bg-pink-200 rounded-full h-2">
                        <div className="bg-pink-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-slate-500">Compared to the previous 30 day period</span>
                        <Badge className="ml-2 bg-green-100 text-green-800">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          21%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Revenue Growth Chart */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">Revenue Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={netBurnData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Bar dataKey="value" fill="#1e293b" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="factored" fill="#a855f7" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Growth Pie Chart */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">Revenue Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <ResponsiveContainer width={200} height={200}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx={100}
                            cy={100}
                            innerRadius={60}
                            outerRadius={80}
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
                        <div className="text-sm font-medium text-slate-600">USA</div>
                        <div className="text-2xl font-bold text-slate-900">65.02%</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-6 mt-4">
                    {pieData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-slate-600">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Cash Activity */}
            <div className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-slate-900">Revenue Growth</CardTitle>
                    <div className="text-sm text-slate-500">Dec 12, 2024</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={netBurnData.slice(-8)} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                        <YAxis stroke="#64748b" fontSize={10} />
                        <Bar dataKey="value" fill="#1e293b" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="factored" fill="#a855f7" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Cash Activity Table */}
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex items-center space-x-6 border-b border-slate-200 pb-3">
                    <button className="text-sm font-medium text-slate-900 border-b-2 border-blue-600 pb-2">
                      Cash Activity
                    </button>
                    <button className="text-sm text-slate-500 pb-2">
                      Profit & Loss
                    </button>
                    <button className="text-sm text-slate-500 pb-2">
                      Balance Sheet
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {/* Header */}
                    <div className="grid grid-cols-3 gap-4 px-4 py-3 text-xs font-medium text-slate-500 bg-slate-50">
                      <div>Cash In ↑</div>
                      <div>Cash Out ↑</div>
                      <div>Available Cash Out ↑</div>
                    </div>
                    
                    {/* Data Rows */}
                    {cashFlowData.map((row, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 px-4 py-3 text-sm border-b border-slate-100 last:border-b-0">
                        <div className="text-slate-900">${row.cashIn}</div>
                        <div className="text-slate-900">${row.cashOut}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-900">${row.available}</span>
                          <Button variant="ghost" size="sm">
                            <span className="text-slate-400">⋯</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Account Analytics */}
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-900">Account Analytics</span>
                  <span className="text-sm text-slate-500">8/10</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Upgrade Plan ↗
                </button>
              </div>

              {/* Chrome Extension */}
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">G</span>
                  </div>
                  <span className="text-sm text-slate-700">Add to Chrome, Ext...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2Page;
