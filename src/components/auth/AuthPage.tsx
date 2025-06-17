
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Dark with truck image and messaging */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-800 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: "url('/lovable-uploads/3216cb11-a358-4add-92c8-d23aa389334c.png')"
        }}>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-slate-800/70"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Top section with logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/b21fd570-2ee4-4af9-8ee7-44980e7d6708.png" 
              alt="TractionPay Logo" 
              className="h-8 w-auto object-contain"
            />
          </div>
          
          {/* Main content */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6 leading-tight">Giving Traction To Your Payments.</h1>
            <p className="text-lg text-slate-200 leading-relaxed">We believe carriers and brokers deserve a faster, easier and more intelligent way to running their business.</p>
            
            {/* Pagination dots */}
            <div className="flex space-x-2 mt-8">
              <div className="w-8 h-1 bg-white rounded-full"></div>
              <div className="w-2 h-1 bg-white/40 rounded-full"></div>
              <div className="w-2 h-1 bg-white/40 rounded-full"></div>
            </div>
          </div>

          {/* Language selector placeholder */}
          <div className="flex justify-end">
            <Button variant="ghost" className="text-white hover:bg-white/10 px-0">
              English
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo - only shown on small screens */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <img 
              src="/lovable-uploads/b21fd570-2ee4-4af9-8ee7-44980e7d6708.png" 
              alt="TractionPay Logo" 
              className="h-8 w-auto object-contain"
            />
          </div>

          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {activeTab === "login" ? "Login" : "Sign Up"}
              </h2>
              <p className="text-slate-600">
                {activeTab === "login" ? "Welcome back! Please enter your email id and password" : "Create your account to get started"}
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100 p-1 rounded-lg">
                <TabsTrigger 
                  value="login" 
                  className="rounded-md py-2 px-4 text-sm font-medium transition-all data-[state=active]:bg-slate-800 data-[state=active]:text-white data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-800"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="rounded-md py-2 px-4 text-sm font-medium transition-all data-[state=active]:bg-slate-800 data-[state=active]:text-white data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-800"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
