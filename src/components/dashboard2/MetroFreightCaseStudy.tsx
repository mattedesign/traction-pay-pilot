
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Building2, Clock, DollarSign, CheckCircle, ArrowRight } from "lucide-react";

const MetroFreightCaseStudy = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="w-6 h-6 text-blue-600" />
            <div>
              <CardTitle className="text-blue-900">Metro Freight Solutions Case Study</CardTitle>
              <p className="text-sm text-blue-700">Similar carrier profile - See their transformation</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">Success Story</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Before/After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              BEFORE: Payment Challenges
            </h4>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• $185,000 in outstanding receivables</li>
              <li>• 25% of loads declined due to cash flow</li>
              <li>• 45-day average payment cycles</li>
              <li>• Limited growth opportunities</li>
              <li>• High factoring rate: 3.8%</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              AFTER: Optimized Operations
            </h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• $166,500 available cash (24 hours)</li>
              <li>• Only 5% loads declined</li>
              <li>• AI-optimized payment selection</li>
              <li>• Fleet expansion 8 months sooner</li>
              <li>• Reduced rate: 2.1% with AI optimization</li>
            </ul>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">311%</div>
            <div className="text-xs text-blue-700">Working Capital Improvement</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">$195K</div>
            <div className="text-xs text-green-700">Additional Annual Revenue</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">3,983%</div>
            <div className="text-xs text-purple-700">ROI on Platform Investment</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3">Growth Acceleration Timeline</h4>
          <div className="flex items-center space-x-2 text-sm">
            <Badge className="bg-blue-100 text-blue-800">Month 1</Badge>
            <ArrowRight className="w-3 h-3" />
            <span className="text-slate-600">Payment optimization</span>
            <ArrowRight className="w-3 h-3" />
            <Badge className="bg-green-100 text-green-800">Month 4</Badge>
            <ArrowRight className="w-3 h-3" />
            <span className="text-slate-600">Cash flow stabilized</span>
            <ArrowRight className="w-3 h-3" />
            <Badge className="bg-purple-100 text-purple-800">Month 8</Badge>
            <ArrowRight className="w-3 h-3" />
            <span className="text-slate-600">Fleet expansion</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Start My Transformation
          </Button>
          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
            View Full Case Study
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetroFreightCaseStudy;
