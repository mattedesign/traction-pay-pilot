
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Key, Zap, AlertCircle, CheckCircle, Settings } from "lucide-react";

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

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Service Status */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-blue-600" />
            <span>AI Assistant Setup</span>
          </CardTitle>
          <CardDescription>
            Choose how to connect to Claude AI for trucking operations assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service Toggle */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium">Supabase Edge Functions</div>
                <div className="text-sm text-slate-600">Secure server-side processing</div>
              </div>
              {useSupabase && <Badge className="bg-green-100 text-green-800">Active</Badge>}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onToggleService}
              disabled={isLoading}
            >
              {useSupabase ? 'Switch to Client' : 'Switch to Supabase'}
            </Button>
          </div>

          {!useSupabase && (
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Direct API Connection</div>
                  <div className="text-sm text-slate-600">Client-side with your API key</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Active</Badge>
              </div>
            </div>
          )}

          {/* Status Messages */}
          {useSupabase ? (
            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertDescription>
                Trying Supabase Edge Functions first. If unavailable, you can provide your API key as fallback.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Using direct API connection. Your API key will be used for all requests.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* API Key Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Anthropic API Key</span>
            {!useSupabase && <Badge variant="secondary">Required</Badge>}
            {useSupabase && <Badge variant="outline">Fallback</Badge>}
          </CardTitle>
          <CardDescription>
            {useSupabase 
              ? "Optional fallback if Supabase Edge Functions are unavailable"
              : "Required for direct API access to Claude AI"
            }
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
                  Initialize AI Assistant
                </>
              )}
            </Button>
          </form>
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
                <div className="font-medium">Service Options:</div>
                <ul className="text-slate-600 space-y-1">
                  <li>• Supabase: Secure, server-side processing</li>
                  <li>• Direct API: Faster, requires your key</li>
                  <li>• Automatic fallback between services</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="font-medium">Features:</div>
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
};

export default ChatSetup;
