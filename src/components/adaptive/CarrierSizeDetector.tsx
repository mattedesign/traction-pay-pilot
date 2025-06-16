
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Users, Target, TrendingUp } from "lucide-react";
import { CarrierProfile } from "@/pages/AdaptiveDashboardPage";

interface CarrierSizeDetectorProps {
  onSetupComplete: (profile: CarrierProfile) => void;
}

const CarrierSizeDetector = ({ onSetupComplete }: CarrierSizeDetectorProps) => {
  const [step, setStep] = useState(1);
  const [fleetSize, setFleetSize] = useState("");
  const [primaryRole, setPrimaryRole] = useState<string>("");
  const [businessGoals, setBusinessGoals] = useState<string[]>([]);

  const handleFleetSizeSubmit = () => {
    if (fleetSize && parseInt(fleetSize) > 0) {
      setStep(2);
    }
  };

  const handleRoleSelection = () => {
    if (primaryRole) {
      setStep(3);
    }
  };

  const handleSetupComplete = () => {
    const profile: CarrierProfile = {
      companySize: parseInt(fleetSize) >= 50 ? 'large' : 'small',
      fleetSize: parseInt(fleetSize),
      userRoles: [primaryRole],
      primaryUser: primaryRole as any,
      businessCoachingLevel: parseInt(fleetSize) >= 50 ? 'enterprise' : parseInt(fleetSize) >= 20 ? 'advanced' : 'basic',
      onboardingCompleted: true
    };

    onSetupComplete(profile);
  };

  const getRecommendedDashboard = () => {
    const size = parseInt(fleetSize);
    if (size >= 50) return "Enterprise Dashboard with Role-Based Access";
    if (size >= 20) return "Advanced Fleet Management Dashboard";
    return "Owner-Operator Focused Dashboard";
  };

  return (
    <div className="flex-1 flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Welcome to Your Adaptive Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Let's customize your experience based on your carrier operation
          </p>
        </div>

        {/* Step 1: Fleet Size Detection */}
        {step === 1 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-6 h-6 text-blue-600" />
                <span>Tell us about your fleet</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="fleetSize">How many trucks do you operate?</Label>
                <Input
                  id="fleetSize"
                  type="number"
                  placeholder="Enter number of trucks"
                  value={fleetSize}
                  onChange={(e) => setFleetSize(e.target.value)}
                  className="mt-2"
                />
              </div>

              {fleetSize && parseInt(fleetSize) > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Recommended Dashboard: {getRecommendedDashboard()}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {parseInt(fleetSize) >= 50 && (
                      <>
                        <Badge variant="secondary">Advanced Analytics</Badge>
                        <Badge variant="secondary">Role-Based Access</Badge>
                        <Badge variant="secondary">Enterprise Coaching</Badge>
                      </>
                    )}
                    {parseInt(fleetSize) >= 20 && parseInt(fleetSize) < 50 && (
                      <>
                        <Badge variant="secondary">Fleet Management</Badge>
                        <Badge variant="secondary">Advanced Coaching</Badge>
                        <Badge variant="secondary">Performance Analytics</Badge>
                      </>
                    )}
                    {parseInt(fleetSize) < 20 && (
                      <>
                        <Badge variant="secondary">Owner-Operator Focus</Badge>
                        <Badge variant="secondary">Business Coaching</Badge>
                        <Badge variant="secondary">Simplified Interface</Badge>
                      </>
                    )}
                  </div>
                </div>
              )}

              <Button 
                onClick={handleFleetSizeSubmit}
                className="w-full"
                disabled={!fleetSize || parseInt(fleetSize) <= 0}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Role Selection */}
        {step === 2 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-green-600" />
                <span>What's your primary role?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={primaryRole} onValueChange={setPrimaryRole}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="owner-operator" id="owner-operator" />
                  <Label htmlFor="owner-operator">Owner-Operator</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dispatcher" id="dispatcher" />
                  <Label htmlFor="dispatcher">Dispatcher</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fleet-manager" id="fleet-manager" />
                  <Label htmlFor="fleet-manager">Fleet Manager</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="executive" id="executive" />
                  <Label htmlFor="executive">Executive</Label>
                </div>
              </RadioGroup>

              <Button 
                onClick={handleRoleSelection}
                className="w-full"
                disabled={!primaryRole}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Business Goals */}
        {step === 3 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-purple-600" />
                <span>Setup Complete!</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-6 bg-green-50 rounded-lg">
                  <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    Your Dashboard is Ready!
                  </h3>
                  <p className="text-green-700">
                    We've configured your interface for a {parseInt(fleetSize) >= 50 ? 'large' : 'small'} carrier operation
                    with {fleetSize} trucks and {primaryRole.replace('-', ' ')} access.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-900 mb-2">Smart Features</h4>
                    <p className="text-blue-700">
                      AI-powered insights and recommendations
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <h4 className="font-semibold text-purple-900 mb-2">Business Coach</h4>
                    <p className="text-purple-700">
                      Personalized growth strategies
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg text-center">
                    <h4 className="font-semibold text-orange-900 mb-2">Cost Savings</h4>
                    <p className="text-orange-700">
                      Automated opportunity detection
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSetupComplete}
                className="w-full"
                size="lg"
              >
                Enter Your Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CarrierSizeDetector;
