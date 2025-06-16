
import NavigationSidebar from "@/components/NavigationSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, FileText, Users } from "lucide-react";
import DemoDataSeeder from "@/components/DemoDataSeeder";
import SupabaseSetup from "@/components/SupabaseSetup";

const SupportPage = () => {
  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-slate-200 px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">Support & Help</h1>
          <p className="text-slate-600 mt-1">Get help and manage your account</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Demo Data Seeder */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">Development Tools</h2>
            <DemoDataSeeder />
          </div>

          {/* Supabase Setup */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">Database Setup</h2>
            <SupabaseSetup />
          </div>

          {/* Support Options */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">Get Support</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <span>Live Chat</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Get instant help from our support team</p>
                  <Button className="w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span>Phone Support</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Call us for urgent support needs</p>
                  <Button variant="outline" className="w-full">
                    1-800-TRACTION
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <span>Email Support</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Send us a detailed message</p>
                  <Button variant="outline" className="w-full">
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">Self-Service Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-orange-600" />
                    <span>Knowledge Base</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Browse articles and tutorials</p>
                  <Button variant="outline" className="w-full">
                    Browse Articles
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span>Community Forum</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Connect with other users</p>
                  <Button variant="outline" className="w-full">
                    Join Forum
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Common Issues */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">Common Issues</h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="font-medium text-slate-800 mb-2">How do I upload documents?</h3>
                    <p className="text-slate-600 text-sm">You can upload documents from the Load Details page or through the main navigation.</p>
                  </div>
                  
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="font-medium text-slate-800 mb-2">When will I get paid?</h3>
                    <p className="text-slate-600 text-sm">Payment terms depend on your agreement with the broker. Check your rate confirmation for details.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">How do I track my loads?</h3>
                    <p className="text-slate-600 text-sm">Use the Loads page to view all your active loads and their current status.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
