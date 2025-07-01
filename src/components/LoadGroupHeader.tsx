
import { Star } from "lucide-react";

interface LoadGroupHeaderProps {
  title: string;
  isActive?: boolean;
}

const LoadGroupHeader = ({ title, isActive = false }: LoadGroupHeaderProps) => {
  return (
    <div className="flex items-center space-x-2 px-6 py-2 text-sm font-semibold text-slate-600 bg-slate-50 border-b border-slate-100">
      <Star className="w-4 h-4" />
      <span>{title}</span>
    </div>
  );
};

export default LoadGroupHeader;
