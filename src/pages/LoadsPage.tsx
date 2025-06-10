
import { useState, useEffect } from "react";
import NavigationSidebar from "@/components/NavigationSidebar";
import LoadsSidebar from "@/components/LoadsSidebar";
import EmailThreadDisplay from "@/components/EmailThreadDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Plus, Filter, Mail, MessageSquare } from "lucide-react";
import { EmailService, EmailThread } from "@/services/emailService";
import { useAuth } from "@/hooks/useAuth";

const LoadsPage = () => {
  const [recentEmailThreads, setRecentEmailThreads] = useState<EmailThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    const loadRecentThreads = async () => {
      try {
        setIsLoading(true);
        // Get recent email threads across all loads
        const allThreads = await EmailService.getAllEmailThreads();
        setRecentEmailThreads(allThreads.slice(0, 5)); // Show 5 most recent
      } catch (error) {
        console.error('Error loading recent email threads:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRecentThreads();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex w-full">
      <NavigationSidebar />
      <LoadsSidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Load Management</h1>
            <p className="text-slate-600">Manage and track all your loads in one place</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-sm">
              <Truck className="w-3 h-3 mr-1" />
              {profile?.company_name || 'Carrier Account'}
            </Badge>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Active Loads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">12</div>
                  <p className="text-xs text-green-600">+2 from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">$24,650</div>
                  <p className="text-xs text-green-600">+15% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Avg Load Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">$2,054</div>
                  <p className="text-xs text-slate-600">Across all loads</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">Load #1234 picked up</p>
                        <p className="text-sm text-slate-600">Shreve, OH → Grove City, OH</p>
                      </div>
                      <span className="text-sm text-slate-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">Load #5678 delivered</p>
                        <p className="text-sm text-slate-600">Phoenix, AZ → Perris, CA</p>
                      </div>
                      <span className="text-sm text-slate-500">1 day ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">New load assigned</p>
                        <p className="text-sm text-slate-600">Houston, TX → Dallas, TX</p>
                      </div>
                      <span className="text-sm text-slate-500">3 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Recent Communications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="text-slate-500 text-sm">Loading communications...</div>
                    </div>
                  ) : recentEmailThreads.length > 0 ? (
                    <EmailThreadDisplay threads={recentEmailThreads} compact={true} />
                  ) : (
                    <div className="text-center py-8">
                      <Mail className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm">No recent email communications</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadsPage;
