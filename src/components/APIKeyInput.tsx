
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface APIKeyInputProps {
  onKeySubmit: (key: string) => void;
  isLoading?: boolean;
}

const APIKeyInput = ({ onKeySubmit, isLoading = false }: APIKeyInputProps) => {
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onKeySubmit(key.trim());
    }
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Key className="w-5 h-5 text-blue-600" />
          <span>AI Demo Setup</span>
        </CardTitle>
        <CardDescription>
          This demo uses a CORS proxy to enable frontend-only AI functionality. Enter your Anthropic API key to start chatting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Demo Notice:</p>
              <p>This uses a public CORS proxy for demonstration. Your API key is stored locally and only used for requests.</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showKey ? 'text' : 'password'}
              placeholder="sk-ant-api03-..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <Button type="submit" disabled={!key.trim() || isLoading} className="w-full">
            {isLoading ? 'Connecting...' : 'Start AI Demo'}
          </Button>
        </form>
        <p className="text-xs text-slate-500 mt-2">
          Get your API key from{' '}
          <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            console.anthropic.com
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

export default APIKeyInput;
