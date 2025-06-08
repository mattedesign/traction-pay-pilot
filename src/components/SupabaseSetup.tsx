
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { DataMigrationUtility } from '@/utils/dataMigration';
import { SupabaseConnectionUtil } from '@/utils/supabaseConnection';
import { toast } from '@/hooks/use-toast';

const SupabaseSetup = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = () => {
    const connectionStatus = SupabaseConnectionUtil.getConnectionStatus();
    setIsConnected(connectionStatus.connected);
  };

  const testConnection = async () => {
    setIsTesting(true);
    try {
      if (!SupabaseConnectionUtil.isConnected()) {
        toast({
          title: "Not Connected",
          description: "Please connect to Supabase first using the green button in the top right",
          variant: "destructive"
        });
        setIsConnected(false);
        return;
      }

      const connected = await DataMigrationUtility.testSupabaseConnection();
      setIsConnected(connected);
      if (connected) {
        toast({
          title: "Supabase Connected",
          description: "Successfully connected to Supabase database",
        });
      }
    } catch (error) {
      setIsConnected(false);
      toast({
        title: "Connection Failed", 
        description: "Unable to connect to Supabase. Please check your configuration.",
        variant: "destructive"
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleMigration = async () => {
    if (!SupabaseConnectionUtil.isConnected()) {
      toast({
        title: "Not Connected",
        description: "Please connect to Supabase first",
        variant: "destructive"
      });
      return;
    }

    setIsMigrating(true);
    try {
      await DataMigrationUtility.migrateEmailDataToSupabase();
    } catch (error) {
      console.error('Migration failed:', error);
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <span>Supabase Integration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Connection Status:</span>
          <Badge 
            variant={isConnected ? "default" : "destructive"}
            className="flex items-center space-x-1"
          >
            {isConnected ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <AlertCircle className="w-3 h-3" />
            )}
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </Badge>
        </div>

        <div className="space-y-2">
          <Button
            onClick={testConnection}
            disabled={isTesting}
            variant="outline"
            className="w-full"
          >
            {isTesting ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Database className="w-4 h-4 mr-2" />
            )}
            Test Connection
          </Button>

          {isConnected && (
            <Button
              onClick={handleMigration}
              disabled={isMigrating}
              className="w-full"
            >
              {isMigrating ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Database className="w-4 h-4 mr-2" />
              )}
              Migrate Email Data
            </Button>
          )}
        </div>

        {!isConnected && (
          <div className="text-xs text-slate-500 space-y-1">
            <p>To connect to Supabase:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Click the Supabase button in the top right</li>
              <li>Connect your Supabase project</li>
              <li>Run the provided SQL schema</li>
              <li>Test the connection</li>
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupabaseSetup;
