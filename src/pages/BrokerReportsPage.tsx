
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Filter } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";

const BrokerReportsPage = () => {
  const { profile, signOut } = useAuth();

  const reports = [
    { name: "Monthly Revenue Report", type: "Financial", lastGenerated: "2024-06-01", status: "Ready" },
    { name: "Carrier Performance Report", type: "Operations", lastGenerated: "2024-05-28", status: "Ready" },
    { name: "Load Analysis Report", type: "Analytics", lastGenerated: "2024-05-25", status: "Generating" },
    { name: "Payment Summary Report", type: "Financial", lastGenerated: "2024-05-20", status: "Ready" },
  ];

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
              <p className="text-slate-600">Generate and download business reports</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 px-8 py-6 space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Available Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-slate-900">{report.name}</h3>
                      <p className="text-sm text-slate-600">{report.type}</p>
                      <div className="flex items-center space-x-1 mt-1 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span>Last generated: {report.lastGenerated}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        report.status === 'Ready' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                      {report.status === 'Ready' && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrokerReportsPage;
