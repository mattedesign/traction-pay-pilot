
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bell, Check, Truck, DollarSign, AlertCircle, FileCheck, User, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NotificationService } from "@/services/notificationService";
import { LoadNotification } from "@/types/load";

interface NotificationPanelProps {
  userType?: "carrier" | "broker";
}

const NotificationPanel = ({ userType }: NotificationPanelProps) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<LoadNotification[]>([]);
  
  useEffect(() => {
    // Get notifications based on user type
    setNotifications(NotificationService.getAllNotifications(userType));
  }, [userType]);

  const handleNotificationClick = (notification: LoadNotification) => {
    NotificationService.markAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    // Update the notifications list to reflect the read status
    setNotifications(NotificationService.getAllNotifications(userType));
  };

  const handleMarkAllRead = () => {
    NotificationService.markAllAsRead(userType);
    // Update the notifications list to reflect all being read
    setNotifications(NotificationService.getAllNotifications(userType));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_load":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "payment_ready":
        return <DollarSign className="w-4 h-4 text-green-600" />;
      case "load_update":
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case "carrier_assigned":
        return <User className="w-4 h-4 text-purple-600" />;
      case "paperwork_submitted":
        return <FileCheck className="w-4 h-4 text-blue-600" />;
      case "quickpay_request":
        return <Clock className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="w-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Notifications</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllRead}
            className="text-xs"
          >
            <Check className="w-3 h-3 mr-1" />
            Mark all read
          </Button>
        </div>
      </div>

      <ScrollArea className="h-96">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No notifications</p>
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                  !notification.read ? "bg-blue-50 border-l-2 border-blue-500" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationPanel;
