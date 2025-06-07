
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, Truck, MapPin, Route } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import LoginIllustration from "@/components/LoginIllustration";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Illustration Side */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-6 p-8">
          <LoginIllustration />
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-slate-800">Welcome to TractionPay</h1>
            <p className="text-lg text-slate-600 max-w-md">
              Your trusted partner for faster payments, smarter routes, and better cash flow management.
            </p>
            <div className="flex items-center justify-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-slate-500">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Smart Logistics</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                  <Route className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Route Optimization</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Real-time Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form Side */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-xl border-0 bg-white">
            <CardHeader className="text-center space-y-3 pb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-slate-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800">Sign In</CardTitle>
              <CardDescription className="text-slate-600">
                Access your dashboard to manage loads and payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <FormLabel className="text-slate-700 font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="your@email.com"
                            className="h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
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
                        <FormLabel className="text-slate-700 font-medium">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent text-slate-500 hover:text-slate-700"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between pt-2">
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800 px-0">
                      Forgot password?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full h-11 bg-slate-800 hover:bg-slate-900 text-white font-medium mt-6">
                    Sign In
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Don't have an account?{" "}
                  <Button variant="ghost" size="sm" className="text-slate-800 hover:text-slate-900 px-1 font-medium">
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
