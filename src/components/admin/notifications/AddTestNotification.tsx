"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNotifications } from "@/context/NotificationsContext";
import { NotificationType } from "./NotificationsPopover";
import { PlusCircle } from "lucide-react";
import { createNotification } from "@/lib/notification-service";
import { toast } from "@/hooks/use-toast";

export default function AddTestNotification() {
  const { refreshNotifications } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<NotificationType>("BOOKING");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create notification data
      const notificationData = {
        type,
        title: title || "Test Notification Title",
        message: message || "This is a test notification message",
        data: type === "BOOKING" 
            ? { bookingId: `BKG-${Math.floor(Math.random() * 10000)}` } 
            : type === "ORDER"
            ? { orderId: `ORD-${Math.floor(Math.random() * 10000)}` }
            : {}
      };
      
      console.log('Creating test notification:', notificationData);
      
      try {
        // Add notification via API
        const result = await createNotification(notificationData);
        console.log('API response:', result);
        
        // Refresh notifications list
        await refreshNotifications();
        
        // Show success toast
        toast({
          title: "Амжилттай",
          description: "Тест мэдэгдэл амжилттай нэмэгдлээ",
          variant: "default",
        });
      } catch (apiError) {
        console.error("API error creating notification:", apiError);
        
        // Fallback: Add notification directly to context
        // Use the existing refreshNotifications function to add a local notification
        const { addNotification } = useNotifications();
        
        // Add a local notification
        addNotification({
          type,
          title: title || "Test Notification Title",
          message: message || "This is a test notification message (added locally)",
        });
        
        toast({
          title: "Частично амжилттай",
          description: "Мэдэгдэл зөвхөн локал дээр нэмэгдлээ",
          variant: "default",
        });
      }
      
      // Reset form and close dialog
      setTitle("");
      setMessage("");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create test notification:", error);
      toast({
        title: "Алдаа",
        description: "Тест мэдэгдэл нэмэхэд алдаа гарлаа",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="flex items-center"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Тест мэдэгдэл нэмэх
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Тест мэдэгдэл нэмэх</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Төрөл</label>
              <Select value={type} onValueChange={(value) => setType(value as NotificationType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Мэдэгдлийн төрөл сонгох" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ORDER">Захиалга</SelectItem>
                  <SelectItem value="BOOKING">Цаг захиалга</SelectItem>
                  <SelectItem value="SYSTEM">Систем</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Гарчиг</label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Мэдэгдлийн гарчиг"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Мэдэгдэл</label>
              <Textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Мэдэгдлийн агуулга"
                required
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Цуцлах
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Нэмж байна..." : "Нэмэх"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}