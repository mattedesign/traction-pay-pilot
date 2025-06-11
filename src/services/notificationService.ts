
import { LoadNotification } from "@/types/load";

export class NotificationService {
  private static notifications: LoadNotification[] = [
    // Carrier notifications
    {
      id: "notif-1",
      loadId: "TMS-001",
      type: "new_load",
      title: "New Load Available",
      message: "Load #TMS-001 from Dallas, TX to Houston, TX - $850.00",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      actionUrl: "/load/TMS-001",
      userType: "carrier"
    },
    {
      id: "notif-2", 
      loadId: "1234",
      type: "load_update",
      title: "Load Status Update",
      message: "Load #1234 is ready for pickup",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: false,
      actionUrl: "/load/1234",
      userType: "carrier"
    },
    {
      id: "notif-3",
      loadId: "5678",
      type: "payment_ready", 
      title: "Payment Available",
      message: "QuickPay available for Load #5678 - $750.00",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: true,
      actionUrl: "/load/5678",
      userType: "carrier"
    },
    // Broker notifications
    {
      id: "notif-4",
      loadId: "BR-001",
      type: "carrier_assigned",
      title: "Carrier Assigned",
      message: "Regional Express has accepted Load #BR-001",
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      read: false,
      actionUrl: "/broker/load/BR-001",
      userType: "broker"
    },
    {
      id: "notif-5",
      loadId: "BR-002",
      type: "paperwork_submitted",
      title: "Paperwork Submitted",
      message: "Swift Transportation submitted BOL for Load #BR-002",
      timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      read: false,
      actionUrl: "/broker/load/BR-002",
      userType: "broker"
    },
    {
      id: "notif-6",
      loadId: "BR-003",
      type: "quickpay_request",
      title: "QuickPay Request",
      message: "J.B. Hunt requested QuickPay for Load #BR-003 - $1,200",
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      read: true,
      actionUrl: "/broker/load/BR-003",
      userType: "broker"
    }
  ];

  static getAllNotifications(userType?: "carrier" | "broker"): LoadNotification[] {
    if (!userType) {
      return this.notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }
    
    return this.notifications
      .filter(n => n.userType === userType || n.userType === "both")
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  static getUnreadNotifications(userType?: "carrier" | "broker"): LoadNotification[] {
    if (!userType) {
      return this.notifications.filter(n => !n.read);
    }
    
    return this.notifications
      .filter(n => !n.read && (n.userType === userType || n.userType === "both"));
  }

  static markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  static markAllAsRead(userType?: "carrier" | "broker"): void {
    if (!userType) {
      this.notifications.forEach(n => n.read = true);
      return;
    }
    
    this.notifications
      .filter(n => n.userType === userType || n.userType === "both")
      .forEach(n => n.read = true);
  }

  static addNotification(notification: Omit<LoadNotification, 'id' | 'timestamp'>): void {
    const newNotification: LoadNotification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date()
    };
    this.notifications.unshift(newNotification);
  }

  static getUnreadCount(userType?: "carrier" | "broker"): number {
    if (!userType) {
      return this.notifications.filter(n => !n.read).length;
    }
    
    return this.notifications
      .filter(n => !n.read && (n.userType === userType || n.userType === "both"))
      .length;
  }
}
