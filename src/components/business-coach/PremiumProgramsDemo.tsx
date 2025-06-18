
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  TrendingUp, 
  Shield, 
  Clock, 
  DollarSign, 
  CheckCircle,
  ArrowRight,
  Award,
  Target,
  Users,
  FileCheck
} from "lucide-react";

interface PremiumProgramsDemoProps {
  onClose: () => void;
}

const PremiumProgramsDemo = ({ onClose }: PremiumProgramsDemoProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const premiumPrograms = [
    {
      id: 'elite-financing',
      name: 'Elite Equipment Financing',
      description: 'Get up to $500K for truck purchases with 2.9% APR',
      requirements: ['Credit score 680+', '2+ years experience', 'Clean DOT record'],
      benefits: ['Low interest rates', 'Fast approval', 'Flexible terms'],
      estimatedApproval: '24-48 hours',
      icon: Star,
      color: 'bg-purple-100 text-purple-800',
      eligibilityScore: 92
    },
    {
      id: 'fuel-card-plus',
      name: 'Fuel Card Plus Premium',
      description: 'Advanced fuel management with 15¢/gallon savings',
      requirements: ['$50K+ monthly revenue', 'Fleet of 3+ trucks', 'Good payment history'],
      benefits: ['Maximum fuel savings', 'Real-time tracking', 'Invoice integration'],
      estimatedApproval: '1-2 business days',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-800',
      eligibilityScore: 88
    },
    {
      id: 'insurance-premium',
      name: 'Premium Insurance Program',
      description: 'Comprehensive coverage with 25% savings',
      requirements: ['Clean safety record', '5+ years experience', 'No recent claims'],
      benefits: ['Lower premiums', 'Better coverage', 'Dedicated agent'],
      estimatedApproval: '3-5 business days',
      icon: Shield,
      color: 'bg-blue-100 text-blue-800',
      eligibilityScore: 85
    }
  ];

  const applicationSteps = [
    { title: 'Program Selection', description: 'Choose your premium program' },
    { title: 'Eligibility Check', description: 'Verify your qualifications' },
    { title: 'Application Review', description: 'Complete application details' },
    { title: 'Approval Process', description: 'Submit for approval' }
  ];

  const handleProgramSelect = (programId: string) => {
    setSelectedProgram(programId);
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    if (currentStep < applicationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderProgramSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Premium Programs Available</h2>
        <p className="text-slate-600">Based on your business profile, you qualify for these premium programs</p>
      </div>

      <div className="grid gap-4">
        {premiumPrograms.map((program) => {
          const Icon = program.icon;
          return (
            <Card key={program.id} className="border-2 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => handleProgramSelect(program.id)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${program.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <p className="text-slate-600 text-sm mt-1">{program.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">
                      {program.eligibilityScore}% Match
                    </Badge>
                    <div className="text-xs text-slate-500 mt-1">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {program.estimatedApproval}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {program.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {program.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-center">
                          <Star className="w-4 h-4 text-blue-600 mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <Button className="w-full">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderEligibilityCheck = () => {
    const program = premiumPrograms.find(p => p.id === selectedProgram);
    if (!program) return null;

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Eligibility Verification</h2>
          <p className="text-slate-600">Checking your qualifications for {program.name}</p>
        </div>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Excellent Match!</h3>
                  <p className="text-green-700">You meet all requirements for this program</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                {program.eligibilityScore}% Match
              </Badge>
            </div>

            <div className="space-y-3">
              {program.requirements.map((req, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-slate-900">{req}</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg">
              <h4 className="font-medium text-slate-900 mb-2">Pre-approved Benefits:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$500K</div>
                  <div className="text-sm text-slate-600">Credit Limit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">2.9%</div>
                  <div className="text-sm text-slate-600">APR Rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => setCurrentStep(0)}>
            Back to Programs
          </Button>
          <Button onClick={handleNextStep} className="flex-1">
            Continue Application
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderApplicationReview = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Review</h2>
        <p className="text-slate-600">Review and complete your application details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileCheck className="w-5 h-5" />
            <span>Required Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Business Tax Returns (2 years)', status: 'uploaded' },
              { name: 'Bank Statements (3 months)', status: 'uploaded' },
              { name: 'DOT Authority Certificate', status: 'uploaded' },
              { name: 'Insurance Certificate', status: 'pending' }
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-slate-900">{doc.name}</span>
                {doc.status === 'uploaded' ? (
                  <Badge className="bg-green-100 text-green-800">Uploaded</Badge>
                ) : (
                  <Button size="sm" variant="outline">Upload</Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Loan Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Loan Amount</label>
              <div className="text-2xl font-bold text-slate-900">$350,000</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Loan Term</label>
              <div className="text-2xl font-bold text-slate-900">60 months</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Payment</label>
              <div className="text-2xl font-bold text-green-600">$6,427</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">APR</label>
              <div className="text-2xl font-bold text-green-600">2.9%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
        <Button onClick={handleNextStep} className="flex-1">
          Submit Application
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderApprovalProcess = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h2>
        <p className="text-slate-600">Your application is being processed</p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Application #EP-2024-001847</h3>
          <p className="text-blue-700 mb-4">Your Elite Equipment Financing application has been submitted successfully</p>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600">Processing Progress</span>
              <span className="text-slate-900 font-medium">75%</span>
            </div>
            <Progress value={75} className="w-full" />
          </div>

          <div className="text-left space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-900">Application Received</span>
              </div>
              <span className="text-xs text-slate-500">Completed</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-900">Document Verification</span>
              </div>
              <span className="text-xs text-slate-500">Completed</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-slate-900">Credit Review</span>
              </div>
              <span className="text-xs text-slate-500">In Progress</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-slate-300 rounded-full" />
                <span className="text-slate-500">Final Approval</span>
              </div>
              <span className="text-xs text-slate-500">Pending</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Dedicated Support Team Assigned</span>
            </div>
            <p className="text-green-700 text-sm">Sarah Mitchell will be your account manager throughout the process</p>
            <p className="text-green-700 text-sm">Direct line: (555) 123-4567</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-medium text-slate-900">Expected Approval</div>
            <div className="text-sm text-slate-600">24-48 hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-medium text-slate-900">Funding Available</div>
            <div className="text-sm text-slate-600">Same day</div>
          </CardContent>
        </Card>
      </div>

      <Button onClick={onClose} className="w-full">
        Return to Dashboard
      </Button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto w-full">
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              {applicationSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                  {index < applicationSteps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-slate-600">
              Step {currentStep + 1} of {applicationSteps.length}: {applicationSteps[currentStep].description}
            </div>
          </div>

          {/* Step Content */}
          {currentStep === 0 && renderProgramSelection()}
          {currentStep === 1 && renderEligibilityCheck()}
          {currentStep === 2 && renderApplicationReview()}
          {currentStep === 3 && renderApprovalProcess()}

          {/* Close Button */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <Button variant="outline" onClick={onClose} className="w-full">
              Close Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumProgramsDemo;
