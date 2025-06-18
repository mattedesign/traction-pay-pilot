
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Search, Bell, User, Plus, MoreVertical } from "lucide-react";
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
    { period: 'Week 1', cashIn: 589.99, cashOut: 589.99, available: 854084.55 },
    { period: 'Week 2', cashIn: 643634.3, cashOut: 782.01, available: 40627533 },
    { period: 'Week 3', cashIn: 375729, cashOut: 105.55, available: 76750.7600 },
    { period: 'Week 4', cashIn: 464393.8, cashOut: 473.85, available: 73965.00 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">📊</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">ledgr</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <div className="space-y-1">
            <div className="px-3 py-2 bg-blue-100 text-blue-900 rounded-lg font-medium text-sm flex items-center space-x-3">
              <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">📊</span>
              </div>
              <span>Dashboard</span>
            </div>
          </div>

          <div className="mt-8">
            <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
              WORKSPACE
            </div>
            <div className="mt-2 space-y-1">
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
                <span>✓</span>
                <span>Checklists</span>
              </div>
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
                <span>📥</span>
                <span>Inbox</span>
              </div>
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
                <span>💳</span>
                <span>Transactions</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
              EXPLORE
            </div>
            <div className="mt-2 space-y-1">
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
                <span>📊</span>
                <span>Accounting</span>
              </div>
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
                <span>💰</span>
                <span>Revenue</span>
              </div>
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
                <span>💸</span>
                <span>Expenses</span>
              </div>
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
                <span>👥</span>
                <span>Payroll</span>
              </div>
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
                <span>⬇️</span>
                <span>Downloads</span>
              </div>
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm flex items-center space-x-3 cursor-pointer">
                <span>⚙️</span>
                <span>Settings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Account Analytics</span>
              <span className="text-sm text-gray-500">8/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
              Upgrade Plan <span className="ml-1">↗</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 text-gray-600">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">G</span>
            </div>
            <span className="text-sm">Add to Chrome, Ext...</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600">Monitor campaigns and optimize your marketing strategy.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search in 'workspace'"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Bell className="w-6 h-6 text-gray-600" />
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
                <span className="text-blue-900">Welcome to the ledgr Demo. Learn more about ledgr.</span>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Sign up Free
                </Button>
              </div>

              {/* Net Burn Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-600">Net Burn 3 Month Avg.</CardTitle>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-3xl font-bold text-gray-900">$130,709</div>
                      <div className="w-full bg-purple-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500">Compared to the previous 30 day period</span>
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
                      <CardTitle className="text-sm font-medium text-gray-600">Net Burn 3 Month Avg.</CardTitle>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-3xl font-bold text-gray-900">$130,709</div>
                      <div className="w-full bg-pink-200 rounded-full h-2">
                        <div className="bg-pink-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500">Compared to the previous 30 day period</span>
                        <Badge className="ml-2 bg-green-100 text-green-800">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          24%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Revenue Growth Pie Chart */}
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
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Revenue Growth Chart */}
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

              {/* Cash Activity Table */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2Page;
