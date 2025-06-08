
import { LoadNotification } from "@/types/load";

export class NotificationService {
  private static notifications: LoadNotification[] = [
    {
      id: "notif-1",
      loadId: "TMS-001",
      type: "new_load",
      title: "New Load Available",
      message: "Load #TMS-001 from Dallas, TX to Houston, TX - $850.00",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      actionUrl: "/load/TMS-001"
    },
    {
      id: "notif-2", 
      loadId: "1234",
      type: "load_update",
      title: "Load Status Update",
      message: "Load #1234 is ready for pickup",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: false,
      actionUrl: "/load/1234"
    },
    {
      id: "notif-3",
      loadId: "5678",
      type: "payment_ready", 
      title: "Payment Available",
      message: "QuickPay available for Load #5678 - $750.00",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: true,
      actionUrl: "/load/5678"
    }
  ];

  static getAllNotifications(): LoadNotification[] {
    return this.notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  static getUnreadNotifications(): LoadNotification[] {
    return this.notifications.filter(n => !n.read);
  }

  static markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  static markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
  }

  static addNotification(notification: Omit<LoadNotification, 'id' | 'timestamp'>): void {
    const newNotification: LoadNotification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date()
    };
    this.notifications.unshift(newNotification);
  }

  static getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
}
