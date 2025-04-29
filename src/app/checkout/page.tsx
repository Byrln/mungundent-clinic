"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { OrdersAPI } from "@/lib/api";
import { 
  ArrowLeft, 
  CreditCard, 
  Landmark, 
  Truck, 
  Check, 
  ShieldCheck,
  ShoppingBag
} from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Улаанбаатар",
    district: "",
    notes: "",
  });

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("mn-MN", {
      style: "currency",
      currency: "MNT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate shipping cost (free over 100,000₮)
  const shippingCost = subtotal > 100000 ? 0 : 5000;

  // Calculate total
  const total = subtotal + shippingCost;

  // Test API connection
  const testApiConnection = async () => {
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      console.log('API test response:', data);
      alert('API connection successful: ' + JSON.stringify(data));
    } catch (error) {
      console.error('API test error:', error);
      alert('API connection failed: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate cart is not empty
      if (cartItems.length === 0) {
        throw new Error('Таны сагс хоосон байна');
      }
      
      // Prepare order data
      const orderData = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.district, // Using district as postal code
        paymentMethod: paymentMethod,
        notes: formData.notes,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name
        }))
      };
      
      console.log('Submitting order:', orderData);
      
      // Use direct fetch for better error handling
      console.log('Sending order data to API...');
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      // Log the raw response for debugging
      console.log('API response status:', response.status, response.statusText);
      
      // Try to parse the response as JSON
      let result;
      try {
        result = await response.json();
        console.log('API response data:', result);
      } catch (parseError) {
        console.error('Error parsing API response:', parseError);
        throw new Error(`API response could not be parsed: ${response.status} ${response.statusText}`);
      }
      
      // Check if the response was successful
      if (!response.ok) {
        throw new Error(
          result?.error || 
          `API error: ${response.status} ${response.statusText}`
        );
      }
      
      console.log('Order created successfully:', result);
      
      // Clear the cart
      clearCart();
      
      // Show order complete screen
      setOrderComplete(true);
    } catch (error: any) {
      console.error('Error creating order:', error);
      
      // Log detailed error information
      if (error.name) console.error('Error name:', error.name);
      if (error.message) console.error('Error message:', error.message);
      if (error.stack) console.error('Error stack:', error.stack);
      
      // Show error toast instead of alert
      let errorMessage = 'Захиалга үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.';
      
      // Provide more specific error messages based on the error
      if (error.message) {
        if (error.message.includes('API response could not be parsed')) {
          errorMessage = 'Сервертэй холбогдоход алдаа гарлаа. Дахин оролдоно уу.';
        } else if (error.message.includes('API error')) {
          errorMessage = 'Сервер алдаа гаргалаа. Дахин оролдоно уу.';
        } else if (error.message.includes('Missing required fields')) {
          errorMessage = 'Бүх талбарыг бөглөнө үү.';
        } else if (error.message.includes('unavailable') || error.message.includes('out of stock')) {
          errorMessage = 'Зарим бүтээгдэхүүн нөөцөд байхгүй байна.';
        } else {
          // Use the error message if it's available
          errorMessage = error.message;
        }
      }
      
      // We'll use window.alert for now since we haven't fully set up the toast yet
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-dental-200 mb-4"></div>
          <div className="h-4 w-32 bg-dental-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-green-50 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <Check className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-dental-800">Захиалга амжилттай!</h1>
            <p className="text-gray-600 mb-4">
              Таны захиалгыг хүлээн авлаа. Захиалгын дугаар: <span className="font-semibold">MN{Math.floor(Math.random() * 10000)}</span>
            </p>
            <p className="text-gray-600 mb-8">
              Захиалгын мэдээллийг таны и-мэйл хаяг руу илгээх болно.
            </p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Нүүр хуудас руу буцах
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-dental-800">Захиалга</h1>
          <p className="text-gray-600">
            Хүргэлтийн мэдээлэл болон төлбөрийн хэлбэрээ сонгоно уу
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-dental-800">Хүргэлтийн мэдээлэл</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Нэр</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Овог</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">И-мэйл</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Утасны дугаар</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <Label htmlFor="address">Хаяг</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Хот</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="district">Дүүрэг</Label>
                    <Input
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Нэмэлт тэмдэглэл</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </Card>
              
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-dental-800">Төлбөрийн хэлбэр</h2>
                
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <CreditCard className="h-5 w-5 mr-2 text-dental-600" />
                      <span>Картаар төлөх</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex items-center cursor-pointer">
                      <Landmark className="h-5 w-5 mr-2 text-dental-600" />
                      <span>Банкаар шилжүүлэх</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center cursor-pointer">
                      <Truck className="h-5 w-5 mr-2 text-dental-600" />
                      <span>Хүргэлтээр төлөх</span>
                    </Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === "bank" && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium mb-2">Банкны мэдээлэл:</h3>
                    <p className="text-sm mb-1">Хүлээн авагч: Мөнгөндент ХХК</p>
                    <p className="text-sm mb-1">Банк: Хаан Банк</p>
                    <p className="text-sm mb-1">Дансны дугаар: 5001234567</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Гүйлгээний утга дээр өөрийн нэр болон утасны дугаараа бичнэ үү.
                    </p>
                  </div>
                )}
              </Card>
              
              <div className="mt-8 md:hidden">
                <Button 
                  type="submit" 
                  className="w-full bg-dental-600 hover:bg-dental-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Боловсруулж байна...</span>
                    </div>
                  ) : (
                    <span>Захиалга баталгаажуулах</span>
                  )}
                </Button>
                
                {/* Hidden in production, only for debugging */}
                {process.env.NODE_ENV !== 'production' && (
                  <Button 
                    type="button"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={testApiConnection}
                  >
                    API холболт шалгах
                  </Button>
                )}
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-32">
              <h2 className="text-xl font-bold mb-4 text-dental-800">Захиалгын дүн</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-dental-800 line-clamp-1">{item.name}</h3>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">{item.quantity} x {formatPrice(item.price)}</span>
                        <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Дүн</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Хүргэлт</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? "Үнэгүй" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Нийт дүн</span>
                    <span className="text-dental-800">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block">
                <Button 
                  type="submit"
                  form="checkout-form"
                  className="w-full bg-dental-600 hover:bg-dental-700"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Боловсруулж байна...</span>
                    </div>
                  ) : (
                    <span>Захиалга баталгаажуулах</span>
                  )}
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <div className="flex items-center mb-2">
                  <ShieldCheck className="h-4 w-4 mr-2 text-dental-600" />
                  <span>Найдвартай, аюулгүй төлбөрийн систем</span>
                </div>
                <div className="flex items-center">
                  <ShoppingBag className="h-4 w-4 mr-2 text-dental-600" />
                  <span>100,000₮-с дээш үнийн дүнд хүргэлт үнэгүй</span>
                </div>
              </div>
            </Card>
            
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/cart">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Сагс руу буцах
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}