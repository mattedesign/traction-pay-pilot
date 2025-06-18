
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface WelcomeBannerProps {}

const WelcomeBanner = ({}: WelcomeBannerProps) => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
      <span className="text-blue-900">Welcome to the ledgr Demo. Learn more about ledgr.</span>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        <Plus className="w-4 h-4 mr-2" />
        Sign up Free
      </Button>
    </div>
  );
};

export default WelcomeBanner;
