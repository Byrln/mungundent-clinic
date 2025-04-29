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

export default function AddTestNotification() {
  const { addNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<NotificationType>("ORDER");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create notification data
    const notificationData = {
      type,
      title,
      message,
      data: type === "ORDER" 
        ? { orderId: `ORD-${Math.floor(Math.random() * 10000)}` } 
        : type === "BOOKING" 
          ? { bookingId: `BKG-${Math.floor(Math.random() * 10000)}` } 
          : {}
    };
    
    // Add notification
    addNotification(notificationData);
    
    // Reset form and close dialog
    setTitle("");
    setMessage("");
    setIsOpen(false);
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
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Цуцлах
              </Button>
              <Button type="submit">Нэмэх</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}