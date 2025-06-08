
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

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = NotificationService.getUnreadCount();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // Mark notifications as read when panel is opened
      setTimeout(() => {
        NotificationService.markAllAsRead();
      }, 1000);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative w-10 h-10 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
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
        <NotificationPanel />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
