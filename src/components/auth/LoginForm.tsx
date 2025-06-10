
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt for:', email);
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Login response:', { user: data.user?.email, error });

      if (error) {
        console.error('Login error:', error);
        if (error.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again.");
        } else if (error.message.includes("Email not confirmed")) {
          setError("Please check your email and click the confirmation link before signing in.");
        } else {
          setError(error.message);
        }
        return;
      }

      if (data.user) {
        console.log('Login successful for user:', data.user.email);
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your account.",
        });
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-700 font-medium">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-slate-700 font-medium">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent text-slate-500 hover:text-slate-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 bg-slate-800 hover:bg-slate-900 text-white font-medium mt-6"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>

      <div className="text-center pt-2">
        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800 px-0">
          Forgot password?
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
