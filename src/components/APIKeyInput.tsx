
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import { validateAPIKey } from '@/utils/security';
import { useToast } from '@/hooks/use-toast';

interface APIKeyInputProps {
  onKeySubmit: (key: string) => void;
  isLoading?: boolean;
}

const APIKeyInput = ({ onKeySubmit, isLoading = false }: APIKeyInputProps) => {
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow natural typing without sanitization - validation happens on submit
    setKey(e.target.value);
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!key.trim()) {
      setValidationError('API key is required');
      return;
    }

    if (!validateAPIKey(key.trim())) {
      setValidationError('Invalid API key format. Please check your Anthropic API key.');
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid Anthropic API key starting with 'sk-ant-'",
        variant: "destructive"
      });
      return;
    }

    try {
      onKeySubmit(key.trim());
    } catch (error) {
      console.error('API key submission error:', error);
      toast({
        title: "Setup Error",
        description: "There was an issue setting up the AI service. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span>Secure AI Demo Setup</span>
        </CardTitle>
        <CardDescription>
          This demo uses a CORS proxy to enable frontend-only AI functionality. Your API key is validated and stored securely in your browser.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Security Notice:</p>
              <p>Your API key is validated client-side and stored locally with basic encoding. Never share your API key with others.</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showKey ? 'text' : 'password'}
              placeholder="sk-ant-api03-..."
              value={key}
              onChange={handleInputChange}
              className={`pr-10 ${validationError ? 'border-red-500 focus:border-red-500' : ''}`}
              autoComplete="off"
              spellCheck={false}
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
          
          {validationError && (
            <p className="text-sm text-red-600 flex items-center space-x-1">
              <AlertCircle className="w-3 h-3" />
              <span>{validationError}</span>
            </p>
          )}
          
          <Button 
            type="submit" 
            disabled={!key.trim() || isLoading || !!validationError} 
            className="w-full"
          >
            {isLoading ? 'Validating...' : 'Start Secure AI Demo'}
          </Button>
        </form>
        
        <div className="mt-4 space-y-2">
          <p className="text-xs text-slate-500">
            Get your API key from{' '}
            <a 
              href="https://console.anthropic.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              console.anthropic.com
            </a>
          </p>
          <div className="flex items-center space-x-1 text-xs text-green-600">
            <Shield className="w-3 h-3" />
            <span>Your API key is stored locally and never transmitted to our servers</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIKeyInput;
