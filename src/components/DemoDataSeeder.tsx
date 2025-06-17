
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Database, Users, AlertCircle, CheckCircle, Loader2, Key } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SeedResult {
  email: string;
  status: 'success' | 'already_exists' | 'password_updated' | 'error' | 'user_created_profile_missing';
  user_id?: string;
  profile_id?: string;
  error?: string;
}

const DemoDataSeeder = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [results, setResults] = useState<SeedResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const seedDemoData = async () => {
    setIsSeeding(true);
    setError(null);
    setResults([]);

    try {
      console.log('Calling seed-demo-data function...');
      
      const { data, error } = await supabase.functions.invoke('seed-demo-data', {
        body: {}
      });

      if (error) {
        console.error('Function error:', error);
        setError(error.message || 'Failed to seed demo data');
        toast({
          title: "Error",
          description: "Failed to seed demo data: " + (error.message || 'Unknown error'),
          variant: "destructive"
        });
        return;
      }

      console.log('Function response:', data);

      if (data?.success) {
        setResults(data.results || []);
        const successCount = data.results?.filter((r: SeedResult) => r.status === 'success').length || 0;
        const existingCount = data.results?.filter((r: SeedResult) => r.status === 'already_exists').length || 0;
        const updatedCount = data.results?.filter((r: SeedResult) => r.status === 'password_updated').length || 0;
        
        toast({
          title: "Demo Data Updated",
          description: `${successCount} users created, ${existingCount} already existed, ${updatedCount} passwords updated`
        });
      } else {
        setError(data?.error || 'Unknown error occurred');
        toast({
          title: "Error",
          description: data?.error || 'Unknown error occurred',
          variant: "destructive"
        });
      }

    } catch (err) {
      console.error('Unexpected error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unexpected error occurred';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'password_updated':
        return <Key className="w-4 h-4 text-blue-600" />;
      case 'already_exists':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'error':
      case 'user_created_profile_missing':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'password_updated':
        return 'bg-blue-100 text-blue-800';
      case 'already_exists':
        return 'bg-blue-100 text-blue-800';
      case 'error':
      case 'user_created_profile_missing':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <span>Demo Data Seeder</span>
        </CardTitle>
        <p className="text-sm text-slate-600">
          Create or update demo accounts for testing the application features
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Demo Accounts to be Created/Updated:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
              <span>carrier.demo@tractionpay.com</span>
              <Badge className="bg-green-100 text-green-800">Carrier (Completed Onboarding)</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
              <span>broker.demo@tractionpay.com</span>
              <Badge className="bg-blue-100 text-blue-800">Broker (Completed Onboarding)</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
              <span>newcarrier.demo@tractionpay.com</span>
              <Badge className="bg-orange-100 text-orange-800">Carrier (New - Needs Onboarding)</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
              <span>factor.demo@tractionpay.com</span>
              <Badge className="bg-purple-100 text-purple-800">Factor (Special Dashboard)</Badge>
            </div>
          </div>
        </div>

        <Button
          onClick={seedDemoData}
          disabled={isSeeding}
          className="w-full"
        >
          {isSeeding ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing Demo Accounts...
            </>
          ) : (
            <>
              <Users className="w-4 h-4 mr-2" />
              Create/Update Demo Accounts
            </>
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {results.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Results:</h4>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(result.status)}
                    <span className="text-sm font-medium">{result.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(result.status)}>
                      {result.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-slate-500 space-y-1">
          <p><strong>New password for all demo accounts:</strong> NewDemo123!</p>
          <p>Demo accounts will be automatically confirmed and ready to use.</p>
          <p>Existing accounts will have their passwords updated to the new password.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoDataSeeder;
