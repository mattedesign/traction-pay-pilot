
import { Button } from "@/components/ui/button";

const SignupPrompt = () => {
  return (
    <div className="text-center">
      <p className="text-sm text-slate-600">
        Don't have an account?{" "}
        <Button variant="ghost" size="sm" className="text-slate-800 hover:text-slate-900 px-1 font-medium text-sm">
          Contact your broker
        </Button>
      </p>
    </div>
  );
};

export default SignupPrompt;
