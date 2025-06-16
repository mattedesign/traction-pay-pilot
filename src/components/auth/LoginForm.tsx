
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Users, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Add demo account quick fill buttons
  const fillDemoAccount = (accountType: 'carrier' | 'broker' | 'newcarrier') => {
    const accounts = {
      carrier: 'carrier.demo@tractionpay.com',
      broker: 'broker.demo@tractionpay.com',
      newcarrier: 'newcarrier.demo@tractionpay.com'
    };
    setEmail(accounts[accountType]);
    setPassword('NewDemo123!');
  };

  const seedDemoAccounts = async () => {
    setIsSeeding(true);
    setError("");

    try {
      console.log('Calling seed-demo-data function...');
      
      const { data, error } = await supabase.functions.invoke('seed-demo-data', {
        body: {}
      });

      if (error) {
        console.error('Function error:', error);
        setError('Failed to create demo accounts: ' + (error.message || 'Unknown error'));
        toast({
          title: "Error",
          description: "Failed to create demo accounts: " + (error.message || 'Unknown error'),
          variant: "destructive"
        });
        return;
      }

      console.log('Function response:', data);

      if (data?.success) {
        const successCount = data.results?.filter((r: any) => r.status === 'success').length || 0;
        const updatedCount = data.results?.filter((r: any) => r.status === 'password_updated').length || 0;
        
        toast({
          title: "Demo Accounts Ready",
          description: `${successCount} accounts created, ${updatedCount} passwords updated. You can now log in with any demo account.`
        });
        
        setError("");
      } else {
        setError(data?.error || 'Failed to create demo accounts');
        toast({
          title: "Error",
          description: data?.error || 'Failed to create demo accounts',
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt for:', email);
    console.log('Password length:', password.length);
    setIsLoading(true);
    setError("");

    try {
      // Log the attempt details for debugging
      console.log('Attempting login with Supabase...');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      console.log('Login response:', { 
        user: data.user?.email, 
        error: error?.message,
        errorCode: error?.status 
      });

      if (error) {
        console.error('Login error details:', {
          message: error.message,
          status: error.status,
          code: error.code || 'no-code'
        });
        
        if (error.message.includes("Invalid login credentials")) {
          setError(`Invalid email or password. Please check your credentials and try again. If this is your first time, try creating the demo accounts first.`);
        } else if (error.message.includes("Email not confirmed")) {
          setError("Please check your email and click the confirmation link before signing in.");
        } else if (error.message.includes("Too many requests")) {
          setError("Too many login attempts. Please wait a moment and try again.");
        } else {
          setError(`Login failed: ${error.message}`);
        }
        return;
      }

      if (data.user) {
        console.log('Login successful for user:', data.user.email);
        
        // Fetch user profile to determine user type
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          setError("Error loading user profile. Please try again.");
          return;
        }

        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your account.",
        });

        // Redirect based on user type
        if (profile?.user_type === 'broker') {
          console.log('Redirecting broker to /broker');
          navigate('/broker');
        } else {
          console.log('Redirecting carrier to /');
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Demo Account Setup */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="text-sm font-medium text-blue-800 mb-3">Demo Account Setup</h4>
        <div className="space-y-3">
          <Button
            type="button"
            onClick={seedDemoAccounts}
            disabled={isSeeding}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            {isSeeding ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Demo Accounts...
              </>
            ) : (
              <>
                <Users className="w-4 h-4 mr-2" />
                Create/Update Demo Accounts
              </>
            )}
          </Button>
          <p className="text-xs text-blue-600">
            Click this button first to ensure demo accounts exist, then use the quick fill buttons below.
          </p>
        </div>
      </div>

      {/* Demo Account Quick Fill */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 className="text-sm font-medium text-green-800 mb-2">Demo Accounts (Quick Fill)</h4>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fillDemoAccount('carrier')}
              className="text-xs"
            >
              Carrier Demo
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fillDemoAccount('broker')}
              className="text-xs"
            >
              Broker Demo
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fillDemoAccount('newcarrier')}
              className="text-xs"
            >
              New Carrier Demo
            </Button>
          </div>
          <p className="text-xs text-green-600">
            Password for all demo accounts: <code className="bg-green-100 px-1 rounded">NewDemo123!</code>
          </p>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
            Email ID
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="guru.pihlano@abcdef.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-700 font-medium text-sm">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 pr-12 text-base"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700 px-0 text-sm">
            Forgot Password?
          </Button>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white font-medium text-base rounded-lg"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-slate-600">
          Don't have an account?{" "}
          <Button variant="ghost" size="sm" className="text-slate-800 hover:text-slate-900 px-1 font-medium text-sm">
            Contact your broker
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
