
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Key, 
  Bell, 
  CreditCard, 
  Download, 
  Trash2,
  AlertTriangle 
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import NavigationSidebar from "@/components/NavigationSidebar";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";

const AccountPage = () => {
  const { profile } = useAuth();
  const { toast } = useToast();

  const handlePasswordChange = () => {
    toast({
      title: "Password Change",
      description: "Password change functionality would be implemented here.",
    });
  };

  const handleNotificationSettings = () => {
    toast({
      title: "Notification Settings",
      description: "Notification preferences would be managed here.",
    });
  };

  const handleDataExport = () => {
    toast({
      title: "Data Export",
      description: "Your data export has been initiated and will be emailed to you.",
    });
  };

  const SidebarComponent = profile?.user_type === 'broker' ? BrokerNavigationSidebar : NavigationSidebar;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarComponent />
      
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Account Settings</h1>
            <p className="text-slate-600">Manage your account security, notifications, and data.</p>
          </div>

          {/* Account Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Your account details and status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Account Type</p>
                  <p className="text-sm text-slate-600">Your current account privileges</p>
                </div>
                <Badge variant="outline" className="capitalize">
                  {profile?.user_type || 'Carrier'} Account
                </Badge>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Account Status</p>
                  <p className="text-sm text-slate-600">Your account is active and verified</p>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Active
                </Badge>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Member Since</p>
                  <p className="text-sm text-slate-600">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-slate-600">Change your account password</p>
                </div>
                <Button variant="outline" onClick={handlePasswordChange}>
                  Change Password
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-600">Add an extra layer of security</p>
                </div>
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  Not Enabled
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Control how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-slate-600">Manage your email notification preferences</p>
                </div>
                <Button variant="outline" onClick={handleNotificationSettings}>
                  Manage Notifications
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing (for future use) */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Billing & Payments
              </CardTitle>
              <CardDescription>
                Manage your subscription and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Current Plan</p>
                  <p className="text-sm text-slate-600">Free tier - No billing information required</p>
                </div>
                <Badge variant="outline">
                  Free
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Data Management
              </CardTitle>
              <CardDescription>
                Export or manage your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Export Data</p>
                  <p className="text-sm text-slate-600">Download a copy of your account data</p>
                </div>
                <Button variant="outline" onClick={handleDataExport}>
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible actions that affect your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-red-600">Delete Account</p>
                  <p className="text-sm text-slate-600">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
