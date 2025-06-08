
import { Star } from "lucide-react";

interface LoadGroupHeaderProps {
  title: string;
  isActive?: boolean;
}

const LoadGroupHeader = ({ title, isActive = false }: LoadGroupHeaderProps) => {
  return (
    <div className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-slate-500">
      <Star className="w-4 h-4" />
      <span>{title}</span>
    </div>
  );
};

export default LoadGroupHeader;
