
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Phone,
  Zap,
  DollarSign
} from "lucide-react";
import { LoadInProgress } from "@/types/brokerLoad";
import { carrierNotificationService, CarrierNotification } from "@/services/carrierNotificationService";
import { toast } from "@/hooks/use-toast";

interface QuickPayNotificationProps {
  loads: LoadInProgress[];
}

const QuickPayNotification = ({ loads }: QuickPayNotificationProps) => {
  const [selectedLoad, setSelectedLoad] = useState<string>("");
  const [notificationType, setNotificationType] = useState<'quickpay_available' | 'quickpay_reminder' | 'quickpay_expiring'>('quickpay_available');
  const [contactMethod, setContactMethod] = useState<'email' | 'sms' | 'both'>('email');
  const [customMessage, setCustomMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sentNotifications, setSentNotifications] = useState<CarrierNotification[]>([]);

  const quickPayEligibleLoads = loads.filter(load => load.quickPayEligible);
  const selectedLoadData = quickPayEligibleLoads.find(load => load.id === selectedLoad);

  const handleSendNotification = async () => {
    if (!selectedLoadData) {
      toast({
        title: "Error",
        description: "Please select a load first.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    
    try {
      // Mock carrier contact info (in real app, this would come from carrier database)
      const carrierEmail = `${selectedLoadData.carrier.toLowerCase().replace(/\s+/g, '.')}@example.com`;
      const carrierPhone = selectedLoadData.driverPhone;
      
      const notification = await carrierNotificationService.sendQuickPayNotification(
        selectedLoadData.carrier,
        carrierEmail,
        carrierPhone,
        selectedLoadData.id,
        selectedLoadData.rate,
        selectedLoadData.quickPayRate || selectedLoadData.rate,
        notificationType,
        contactMethod
      );

      setSentNotifications(prev => [notification, ...prev]);
      
      toast({
        title: "Notification Sent Successfully!",
        description: `QuickPay notification sent to ${selectedLoadData.carrier} via ${contactMethod}.`,
      });

      // Reset form
      setSelectedLoad("");
      setCustomMessage("");
      
    } catch (error) {
      toast({
        title: "Failed to Send Notification",
        description: "There was an error sending the notification. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getContactMethodIcon = (method: string) => {
    switch (method) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <MessageSquare className="w-4 h-4" />;
      case 'both': return <Phone className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="w-5 h-5 text-blue-600" />
            <span>Send QuickPay Notification</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickPayEligibleLoads.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Zap className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>No QuickPay eligible loads available</p>
            </div>
          ) : (
            <>
              {/* Load Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Select Load</label>
                <Select value={selectedLoad} onValueChange={setSelectedLoad}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a QuickPay eligible load..." />
                  </SelectTrigger>
                  <SelectContent>
                    {quickPayEligibleLoads.map((load) => (
                      <SelectItem key={load.id} value={load.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{load.id} - {load.carrier}</span>
                          <div className="flex items-center space-x-2 ml-4">
                            <span className="text-sm text-slate-600">{load.origin} → {load.destination}</span>
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              {load.quickPayRate}
                            </Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Selected Load Details */}
              {selectedLoadData && (
                <div className="p-4 bg-slate-50 rounded-lg border">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-slate-700">Carrier</div>
                      <div>{selectedLoadData.carrier}</div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-700">Original Rate</div>
                      <div>{selectedLoadData.rate}</div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-700">QuickPay Rate</div>
                      <div className="text-green-600">{selectedLoadData.quickPayRate}</div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-700">Discount</div>
                      <div className="text-orange-600">
                        ${(parseFloat(selectedLoadData.rate.replace(/[$,]/g, '')) - parseFloat(selectedLoadData.quickPayRate?.replace(/[$,]/g, '') || '0')).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Notification Type</label>
                  <Select value={notificationType} onValueChange={(value: any) => setNotificationType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quickpay_available">QuickPay Available</SelectItem>
                      <SelectItem value="quickpay_reminder">Reminder</SelectItem>
                      <SelectItem value="quickpay_expiring">Expiring Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Contact Method</label>
                  <Select value={contactMethod} onValueChange={(value: any) => setContactMethod(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Only</SelectItem>
                      <SelectItem value="sms">SMS Only</SelectItem>
                      <SelectItem value="both">Email + SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Custom Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Additional Message (Optional)</label>
                <Textarea
                  placeholder="Add any custom message or special instructions..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Send Button */}
              <Button 
                onClick={handleSendNotification}
                disabled={!selectedLoad || isSending}
                className="w-full"
              >
                {isSending ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Sending Notification...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send QuickPay Notification
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {sentNotifications.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Mail className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>No notifications sent yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sentNotifications.slice(0, 5).map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="font-medium text-slate-900">{notification.loadId}</div>
                      <Badge variant="outline" className="text-xs">
                        {notification.type.replace('_', ' ')}
                      </Badge>
                      <div className="flex items-center space-x-1 text-slate-600">
                        {getContactMethodIcon(notification.contactMethod)}
                        <span className="text-xs">{notification.contactMethod}</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">
                      To: {notification.carrierName} • {notification.quickPayRate} • {notification.sentAt.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(notification.status)}
                    <span className="text-sm capitalize text-slate-600">{notification.status}</span>
                  </div>
                </div>
              ))}
              
              {sentNotifications.length > 5 && (
                <div className="text-center">
                  <Button variant="outline" size="sm">
                    View All Notifications ({sentNotifications.length})
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickPayNotification;
