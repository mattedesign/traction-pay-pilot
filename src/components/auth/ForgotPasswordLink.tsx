
import { Button } from "@/components/ui/button";

const ForgotPasswordLink = () => {
  return (
    <div className="flex justify-end">
      <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700 px-0 text-sm">
        Forgot Password?
      </Button>
    </div>
  );
};

export default ForgotPasswordLink;
