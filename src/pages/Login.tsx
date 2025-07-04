
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, Truck, MapPin, Route } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login attempt:", data.email);
    toast({
      title: "Welcome back!",
      description: "Logging you into your dashboard...",
    });
    
    // Simulate login process
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Dark with truck image */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/lovable-uploads/9c7f43ac-d9db-486b-bb6a-fc72efae0f39.png')"
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
          {/* Logo */}
          <div className="mb-8">
            <img 
              alt="TractionPay Logo" 
              className="w-12 h-12 object-contain" 
              src="/lovable-uploads/b21fd570-2ee4-4af9-8ee7-44980e7d6708.png" 
            />
          </div>
          
          {/* Main content */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Welcome to TractionPay
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              Your trusted partner for faster payments, smarter routes, and better cash flow management.
            </p>
            
            {/* Feature highlights */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-slate-200 font-medium">Smart Logistics Solutions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Route className="w-4 h-4" />
                </div>
                <span className="text-slate-200 font-medium">Optimized Route Planning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-slate-200 font-medium">Real-time Load Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border border-slate-200 bg-white">
            <CardHeader className="text-center space-y-3 pb-6">
              {/* Mobile logo - only shown on small screens */}
              <div className="lg:hidden w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-slate-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-800">Sign In</CardTitle>
              <CardDescription className="text-slate-600 text-base">
                Access your dashboard to manage loads and payments
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium text-sm">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="your@email.com"
                            className="h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium text-sm">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 pr-12 text-base"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent text-slate-500 hover:text-slate-700"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-end">
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800 px-0 text-sm">
                      Forgot password?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white font-medium text-base">
                    Sign In
                  </Button>
                </form>
              </Form>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-600">
                  Don't have an account?{" "}
                  <Button variant="ghost" size="sm" className="text-slate-800 hover:text-slate-900 px-1 font-medium text-sm">
                    Contact your broker
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
