
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationPanel from "./NotificationPanel";
import { NotificationService } from "@/services/notificationService";
import { useAuth } from "@/hooks/useAuth";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useAuth();
  const userType = profile?.user_type;
  
  const unreadCount = NotificationService.getUnreadCount(userType);
  const hasNotifications = unreadCount > 0;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // Mark notifications as read when panel is opened
      setTimeout(() => {
        NotificationService.markAllAsRead(userType);
      }, 1000);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`relative w-10 h-10 text-slate-600 hover:text-white hover:bg-slate-700 flex items-center justify-center ${
            hasNotifications ? 'bg-slate-700 text-white' : ''
          }`}
        >
          <Bell className="w-5 h-5" />
          {hasNotifications && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-96 p-0" 
        align="end"
        sideOffset={8}
      >
        <NotificationPanel userType={userType} />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
