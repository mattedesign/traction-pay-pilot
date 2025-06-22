
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Key, Zap, CheckCircle, Settings } from "lucide-react";

interface ChatSetupProps {
  onAPIKeySubmit: (key: string) => void;
  isLoading: boolean;
  useSupabase?: boolean;
  onToggleService?: () => void;
}

const ChatSetup = ({ onAPIKeySubmit, isLoading, useSupabase = true, onToggleService }: ChatSetupProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onAPIKeySubmit(apiKey.trim());
    }
  };

  // When using Supabase, show the ready state
  if (useSupabase) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-green-600" />
              <span>AI Assistant Ready</span>
            </CardTitle>
            <CardDescription>
              Your Claude AI assistant is ready to help with trucking operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium">Supabase Edge Functions</div>
                  <div className="text-sm text-slate-600">Secure server-side processing</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ready</Badge>
              </div>
              {onToggleService && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onToggleService}
                  disabled={isLoading}
                >
                  Switch to Client Mode
                </Button>
              )}
            </div>

            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertDescription>
                Your AI assistant is ready to use! The system is configured to use secure Supabase Edge Functions for all AI requests.
              </AlertDescription>
            </Alert>

            <div className="flex justify-center">
              <Button 
                onClick={() => window.location.reload()}
                className="w-full max-w-sm"
              >
                <Brain className="w-4 h-4 mr-2" />
                Start Chatting
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Options */}
        <Card>
          <CardHeader>
            <Button
              variant="ghost"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full justify-between p-0 h-auto"
            >
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Advanced Options</span>
              </div>
              <div className={`transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`}>
                ▼
              </div>
            </Button>
          </CardHeader>
          
          {showAdvanced && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-medium">Service Features:</div>
                  <ul className="text-slate-600 space-y-1">
                    <li>• Secure server-side processing</li>
                    <li>• No API key required from users</li>
                    <li>• Automatic failover support</li>
                    <li>• Enterprise-grade security</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium">AI Capabilities:</div>
                  <ul className="text-slate-600 space-y-1">
                    <li>• Load search and tracking</li>
                    <li>• Route optimization advice</li>
                    <li>• DOT compliance guidance</li>
                    <li>• Payment and factoring help</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    );
  }

  // Fallback for client-side mode
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Direct API Access</span>
            <Badge variant="secondary">Required</Badge>
          </CardTitle>
          <CardDescription>
            Provide your own Anthropic API key for direct access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="sk-ant-api03-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono text-sm"
                disabled={isLoading}
              />
              <div className="text-xs text-slate-500">
                Get your API key from the <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Anthropic Console</a>
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={!apiKey.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Setting up...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Use Direct API Access
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSetup;
