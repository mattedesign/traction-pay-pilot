
export interface CarrierNotification {
  id: string;
  carrierId: string;
  carrierName: string;
  loadId: string;
  type: 'quickpay_available' | 'quickpay_reminder' | 'quickpay_expiring';
  message: string;
  originalRate: string;
  quickPayRate: string;
  discount: string;
  sentAt: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  contactMethod: 'email' | 'sms' | 'both';
}

export interface NotificationTemplate {
  type: string;
  subject: string;
  message: string;
  smsMessage: string;
}

const notificationTemplates: Record<string, NotificationTemplate> = {
  quickpay_available: {
    type: 'quickpay_available',
    subject: 'QuickPay Available - Get Paid in 24 Hours!',
    message: `Hi {carrierName},

Great news! Your load {loadId} is now eligible for QuickPay.

Load Details:
• Original Rate: {originalRate}
• QuickPay Rate: {quickPayRate}
• You save time getting paid in 24 hours vs 30-45 days

Ready to get paid faster? Reply to this email or contact us to process your QuickPay.

Best regards,
Your Freight Broker Team`,
    smsMessage: 'QuickPay available for load {loadId}! Get {quickPayRate} in 24hrs vs {originalRate} in 30-45 days. Reply YES to process.'
  },
  quickpay_reminder: {
    type: 'quickpay_reminder',
    subject: 'Reminder: QuickPay Still Available',
    message: `Hi {carrierName},

Just a friendly reminder that QuickPay is still available for load {loadId}.

• QuickPay Rate: {quickPayRate}
• Get paid in 24 hours instead of waiting 30-45 days

Don't miss out on faster payment! Contact us to process your QuickPay today.

Best regards,
Your Freight Broker Team`,
    smsMessage: 'Reminder: QuickPay for {loadId} still available. Get {quickPayRate} in 24hrs. Reply YES to process.'
  },
  quickpay_expiring: {
    type: 'quickpay_expiring',
    subject: 'URGENT: QuickPay Offer Expiring Soon',
    message: `Hi {carrierName},

Your QuickPay offer for load {loadId} is expiring soon!

• QuickPay Rate: {quickPayRate}
• Expires: End of business today

Act fast to get paid in 24 hours instead of waiting weeks. Contact us immediately to process your QuickPay.

Best regards,
Your Freight Broker Team`,
    smsMessage: 'URGENT: QuickPay for {loadId} expires today! Get {quickPayRate} in 24hrs. Reply YES now!'
  }
};

class CarrierNotificationService {
  private notifications: CarrierNotification[] = [];

  async sendQuickPayNotification(
    carrierName: string,
    carrierEmail: string,
    carrierPhone: string,
    loadId: string,
    originalRate: string,
    quickPayRate: string,
    notificationType: 'quickpay_available' | 'quickpay_reminder' | 'quickpay_expiring' = 'quickpay_available',
    contactMethod: 'email' | 'sms' | 'both' = 'email'
  ): Promise<CarrierNotification> {
    
    const template = notificationTemplates[notificationType];
    const discount = this.calculateDiscount(originalRate, quickPayRate);
    
    // Create notification record
    const notification: CarrierNotification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      carrierId: `carrier_${carrierName.replace(/\s+/g, '_').toLowerCase()}`,
      carrierName,
      loadId,
      type: notificationType,
      message: this.populateTemplate(template.message, {
        carrierName,
        loadId,
        originalRate,
        quickPayRate,
        discount
      }),
      originalRate,
      quickPayRate,
      discount,
      sentAt: new Date(),
      status: 'sent',
      contactMethod
    };

    // Simulate sending notification (in real app, this would call email/SMS services)
    try {
      if (contactMethod === 'email' || contactMethod === 'both') {
        console.log(`Sending email to ${carrierEmail}:`, {
          subject: template.subject,
          message: notification.message
        });
      }

      if (contactMethod === 'sms' || contactMethod === 'both') {
        const smsMessage = this.populateTemplate(template.smsMessage, {
          carrierName,
          loadId,
          originalRate,
          quickPayRate,
          discount
        });
        console.log(`Sending SMS to ${carrierPhone}:`, smsMessage);
      }

      // Store notification
      this.notifications.push(notification);
      
      // Simulate delivery confirmation after a short delay
      setTimeout(() => {
        notification.status = 'delivered';
      }, 2000);

      return notification;
    } catch (error) {
      notification.status = 'failed';
      throw new Error(`Failed to send notification: ${error}`);
    }
  }

  private populateTemplate(template: string, variables: Record<string, string>): string {
    let populated = template;
    Object.entries(variables).forEach(([key, value]) => {
      populated = populated.replace(new RegExp(`{${key}}`, 'g'), value);
    });
    return populated;
  }

  private calculateDiscount(originalRate: string, quickPayRate: string): string {
    const original = parseFloat(originalRate.replace(/[$,]/g, ''));
    const quickPay = parseFloat(quickPayRate.replace(/[$,]/g, ''));
    const discountAmount = original - quickPay;
    const discountPercentage = ((discountAmount / original) * 100).toFixed(1);
    return `$${discountAmount.toLocaleString()} (${discountPercentage}%)`;
  }

  getNotificationHistory(): CarrierNotification[] {
    return [...this.notifications].sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
  }

  getNotificationsByLoad(loadId: string): CarrierNotification[] {
    return this.notifications.filter(n => n.loadId === loadId);
  }

  getNotificationsByCarrier(carrierId: string): CarrierNotification[] {
    return this.notifications.filter(n => n.carrierId === carrierId);
  }

  getNotificationStats() {
    const total = this.notifications.length;
    const sent = this.notifications.filter(n => n.status === 'sent').length;
    const delivered = this.notifications.filter(n => n.status === 'delivered').length;
    const failed = this.notifications.filter(n => n.status === 'failed').length;
    
    return {
      total,
      sent,
      delivered,
      failed,
      deliveryRate: total > 0 ? ((delivered / total) * 100).toFixed(1) : '0'
    };
  }
}

// Export singleton instance
export const carrierNotificationService = new CarrierNotificationService();
