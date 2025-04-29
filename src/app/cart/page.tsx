"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart, CartItem } from "@/context/CartContext";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight,
  ShoppingBag
} from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("mn-MN", {
      style: "currency",
      currency: "MNT",
      minimumFractionDigits: 0,
    }).format(price);
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

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-dental-50 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-dental-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-dental-800">Таны сагс хоосон байна</h1>
            <p className="text-gray-600 mb-8">
              Та бүтээгдэхүүн сонгоод сагсандаа нэмнэ үү.
            </p>
            <Button asChild>
              <Link href="/shop">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Дэлгүүр рүү буцах
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
          <h1 className="text-3xl font-bold mb-2 text-dental-800">Таны сагс</h1>
          <p className="text-gray-600">
            {cartItems.length} төрлийн бүтээгдэхүүн
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4 flex flex-col sm:flex-row items-start gap-4">
                  <div className="relative h-24 w-full sm:w-24 max-w-[200px] rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 200px, 96px"
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-dental-800">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <p className="text-dental-600 font-medium mt-1">
                      {formatPrice(item.price)}
                    </p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <p className="font-semibold text-dental-800">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-8">
              <Button asChild variant="outline" className="text-dental-600">
                <Link href="/shop">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Үргэлжлүүлэн худалдан авах
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-dental-800">Захиалгын дүн</h2>
              
              <div className="space-y-3 mb-6">
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
              
              <Button asChild className="w-full bg-dental-600 hover:bg-dental-700">
                <Link href="/checkout">
                  <span>Худалдан авах</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="flex items-center mb-2">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  100,000₮-с дээш үнийн дүнд хүргэлт үнэгүй
                </p>
                <p>Хүргэлтийн хугацаа: 2-3 ажлын өдөр</p>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}