
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginError from "./LoginError";
import ForgotPasswordLink from "./ForgotPasswordLink";
import SignupPrompt from "./SignupPrompt";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

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
          setError(`Invalid email or password. Please check your credentials and try again.`);
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
      <form onSubmit={handleLogin} className="space-y-6">
        <LoginError error={error} />

        <EmailInput email={email} onEmailChange={setEmail} />

        <PasswordInput password={password} onPasswordChange={setPassword} />

        <ForgotPasswordLink />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white font-medium text-base rounded-lg"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <SignupPrompt />
    </div>
  );
};

export default LoginForm;
