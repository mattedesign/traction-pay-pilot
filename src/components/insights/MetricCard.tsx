
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  subtitle: string;
  value: string;
  trendIcon: LucideIcon;
  trendValue: string;
  trendLabel: string;
  icon: LucideIcon | (() => JSX.Element);
  iconBgColor: string;
  iconColor: string;
  trendColor: string;
}

const MetricCard = ({
  title,
  subtitle,
  value,
  trendIcon: TrendIcon,
  trendValue,
  trendLabel,
  icon: Icon,
  iconBgColor,
  iconColor,
  trendColor
}: MetricCardProps) => {
  const renderIcon = () => {
    if (typeof Icon === 'function' && Icon.prototype === undefined) {
      // This is a custom JSX function
      const CustomIcon = Icon as () => JSX.Element;
      return <CustomIcon />;
    } else {
      // This is a Lucide icon component
      const LucideIcon = Icon as LucideIcon;
      return <LucideIcon className={`w-5 h-5 ${iconColor}`} />;
    }
  };

  return (
    <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-slate-600 text-sm font-medium mb-1">{title}</div>
            <div className="text-slate-400 text-xs">{subtitle}</div>
          </div>
          <div className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            {renderIcon()}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-slate-900">{value}</div>
          <div className="flex items-center text-xs">
            <TrendIcon className={`w-3 h-3 ${trendColor} mr-1`} />
            <span className={`${trendColor} font-medium`}>{trendValue}</span>
            <span className="text-slate-500 ml-1">{trendLabel}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
