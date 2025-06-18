
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, MoreVertical } from "lucide-react";

interface NetBurnCardProps {
  title: string;
  amount: string;
  progressColor: string;
  progressWidth: string;
  percentage: string;
}

const NetBurnCard = ({ title, amount, progressColor, progressWidth, percentage }: NetBurnCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-3xl font-bold text-gray-900">{amount}</div>
          <div className={`w-full ${progressColor} rounded-full h-2`}>
            <div className={`${progressColor.replace('200', '600')} h-2 rounded-full`} style={{ width: progressWidth }}></div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500">Compared to the previous 30 day period</span>
            <Badge className="ml-2 bg-green-100 text-green-800">
              <TrendingUp className="w-3 h-3 mr-1" />
              {percentage}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetBurnCard;
