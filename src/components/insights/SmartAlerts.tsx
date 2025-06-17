
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, DollarSign, Clock, X, Bell } from "lucide-react";

interface SmartAlertsProps {
  carrierData: {
    monthlyRevenue: number;
    factoringRate: number;
    onTimeRate: number;
    fuelEfficiency: number;
  };
}

const SmartAlerts = ({ carrierData }: SmartAlertsProps) => {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  
  const generateAlerts = () => {
    const alerts = [];
    
    // High-priority cost savings alert
    if (carrierData.factoringRate > 3.0) {
      alerts.push({
        id: "high-factoring-rate",
        type: "cost_savings",
        priority: "high",
        title: "Factoring Rate Review Needed",
        message: `Your ${carrierData.factoringRate}% rate is significantly above market. Potential savings: $${((carrierData.monthlyRevenue * (carrierData.factoringRate - 2.5)) / 100).toLocaleString()}/month`,
        action: "Request Rate Review",
        urgency: "high",
        icon: <DollarSign className="w-5 h-5" />
      });
    }
    
    // Market opportunity alert
    if (carrierData.onTimeRate >= 95) {
      alerts.push({
        id: "premium-qualification",
        type: "opportunity",
        priority: "medium", 
        title: "Premium Rate Qualification",
        message: `Your ${carrierData.onTimeRate}% delivery rate qualifies for premium customer programs. Apply now for winter rate negotiations.`,
        action: "Apply Now",
        urgency: "medium",
        icon: <TrendingUp className="w-5 h-5" />
      });
    }
    
    // Equipment opportunity
    if (carrierData.monthlyRevenue > 45000 && carrierData.onTimeRate > 90) {
      alerts.push({
        id: "expansion-ready",
        type: "expansion",
        priority: "medium",
        title: "Fleet Expansion Opportunity",
        message: "Your performance metrics indicate readiness for a second truck. Winter demand surge starting soon.",
        action: "View Analysis",
        urgency: "medium", 
        icon: <Clock className="w-5 h-5" />
      });
    }
    
    // Fuel efficiency alert
    if (carrierData.fuelEfficiency < 6.0) {
      alerts.push({
        id: "fuel-efficiency",
        type: "cost_savings",
        priority: "high",
        title: "Fuel Optimization Alert", 
        message: `Fuel efficiency below optimal. Immediate route optimization could save $${(carrierData.monthlyRevenue * 0.12).toLocaleString()}/month.`,
        action: "Optimize Routes",
        urgency: "high",
        icon: <AlertTriangle className="w-5 h-5" />
      });
    }
    
    return alerts.filter(alert => !dismissedAlerts.includes(alert.id));
  };
  
  const alerts = generateAlerts();
  
  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };
  
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          card: 'bg-red-50 border-red-200',
          badge: 'bg-red-100 text-red-800',
          button: 'bg-red-600 hover:bg-red-700 text-white'
        };
      case 'medium':
        return {
          card: 'bg-orange-50 border-orange-200', 
          badge: 'bg-orange-100 text-orange-800',
          button: 'bg-orange-600 hover:bg-orange-700 text-white'
        };
      default:
        return {
          card: 'bg-blue-50 border-blue-200',
          badge: 'bg-blue-100 text-blue-800', 
          button: 'bg-blue-600 hover:bg-blue-700 text-white'
        };
    }
  };
  
  if (alerts.length === 0) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-900">All systems optimal</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            No urgent alerts. Your operation is running efficiently.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Smart Alerts</h3>
        <Badge className="bg-red-100 text-red-800">
          {alerts.length} Active
        </Badge>
      </div>
      
      {alerts.map((alert) => {
        const styles = getPriorityStyles(alert.priority);
        
        return (
          <Card key={alert.id} className={styles.card}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="text-slate-700 mt-1">{alert.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-slate-900">{alert.title}</h4>
                      <Badge className={styles.badge}>
                        {alert.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-700 mb-3">{alert.message}</p>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className={styles.button}>
                        {alert.action}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => dismissAlert(alert.id)}
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-slate-600"
                  onClick={() => dismissAlert(alert.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SmartAlerts;
