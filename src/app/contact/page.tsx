"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, Clock, Facebook, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Нэр 2-оос дээш тэмдэгттэй байх ёстой.",
  }),
  email: z.string().email({
    message: "Зөв имэйл оруулна уу.",
  }),
  phone: z.string().min(8, {
    message: "Утасны дугаар 8-аас дээш тэмдэгттэй байх ёстой.",
  }),
  message: z.string().min(10, {
    message: "Мессеж 10-аас дээш тэмдэгттэй байх ёстой.",
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Here you would normally send the data to your API
      console.log(values);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-100"></div>
        
        {/* Colored accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dental-300 via-dental-500 to-dental-300"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-3 py-1 mb-6 rounded-md bg-dental-50 border-l-4 border-dental-500">
                <span className="text-dental-700 font-medium text-sm">Бидэнтэй холбогдох</span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              >
                <span className="text-dental-600 relative">
                  Холбоо
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,5 Q25,10 50,5 T100,5" fill="none" stroke="#86EFAC" strokeWidth="4"/>
                  </svg>
                </span> барих
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto"
              >
                Асуулт, санал хүсэлт байвал бидэнтэй холбогдоорой. Бид таны асуултанд хариулахад таатай байх болно.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10"
            >
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="mt-0.5 bg-dental-100 p-2 rounded-full">
                  <Phone className="text-dental-600" size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Утас</h3>
                  <p className="text-sm text-gray-500">+976 99112233</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="mt-0.5 bg-dental-100 p-2 rounded-full">
                  <Mail className="text-dental-600" size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Имэйл</h3>
                  <p className="text-sm text-gray-500">info@mungundent.mn</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 sm:col-span-2 md:col-span-1">
                <div className="mt-0.5 bg-dental-100 p-2 rounded-full">
                  <MapPin className="text-dental-600" size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Хаяг</h3>
                  <p className="text-sm text-gray-500">Сүхбаатар дүүрэг, 1-р хороо</p>
                </div>
              </div>
            </motion.div>
            
            {/* Scroll indicator */}
            <div className="flex justify-center mb-6">
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center text-gray-400"
              >
                <span className="text-sm font-medium mb-2">Доорх маягтыг бөглөнө үү</span>
                <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L10 9L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
                Бидний мэдээлэл
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-dental-800">Холбоо барих мэдээлэл</h2>
              
              <motion.div variants={fadeIn} className="space-y-4 md:space-y-6">
                <div className="flex items-start space-x-4 bg-dental-50/50 p-4 rounded-xl hover:bg-dental-50 transition-colors">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <MapPin className="h-5 w-5 text-dental-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-dental-700">Хаяг</h3>
                    <p className="text-gray-600 text-sm">
                      Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Их сургуулийн гудамж
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-dental-50/50 p-4 rounded-xl hover:bg-dental-50 transition-colors">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Phone className="h-5 w-5 text-dental-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-dental-700">Утас</h3>
                    <p className="text-gray-600 text-sm">+976 99112233</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-dental-50/50 p-4 rounded-xl hover:bg-dental-50 transition-colors">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Mail className="h-5 w-5 text-dental-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-dental-700">Имэйл</h3>
                    <p className="text-gray-600 text-sm">info@mungundent.mn</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-dental-50/50 p-4 rounded-xl hover:bg-dental-50 transition-colors">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Facebook className="h-5 w-5 text-dental-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-dental-700">Facebook</h3>
                    <p className="text-gray-600 text-sm">
                      <a 
                        href="https://www.facebook.com/mungundent" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-dental-600 hover:underline"
                      >
                        facebook.com/mungundent
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-dental-50/50 p-4 rounded-xl hover:bg-dental-50 transition-colors">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Clock className="h-5 w-5 text-dental-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-dental-700">Ажиллах цаг</h3>
                    <p className="text-gray-600 text-sm">
                      Даваа - Баасан: 9:00 - 18:00<br />
                      Бямба: 10:00 - 15:00<br />
                      Ням: Амарна
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Map */}
              <motion.div 
                variants={fadeIn} 
                className="mt-6 md:mt-8 bg-white rounded-xl h-64 overflow-hidden shadow-lg border border-gray-100"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d504.94960863510994!2d106.92938761763024!3d47.8941491859986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96932b21a25bbf%3A0xf22271ea8319a1ec!2sMungun%20Dent%20-%20Family%20Dental!5e1!3m2!1smn!2smn!4v1745940598158!5m2!1smn!2smn" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 text-center shadow-lg"
                >
                  <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-green-100 p-4 shadow-sm">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-800">
                    Мессеж илгээгдлээ!
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Таны мессежийг хүлээн авлаа. Бид удахгүй тантай холбогдох болно.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="bg-dental-600 hover:bg-dental-700 shadow-md shadow-dental-500/20 w-full sm:w-auto"
                  >
                    Шинээр мессеж илгээх
                  </Button>
                </motion.div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-5 md:p-8 border border-gray-100">
                  <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
                    Холбоо барих
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-6 text-dental-800">Бидэнд мессеж илгээх</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Нэр</FormLabel>
                            <FormControl>
                              <Input placeholder="Таны нэр" {...field} className="rounded-lg" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Имэйл</FormLabel>
                              <FormControl>
                                <Input placeholder="Таны имэйл" {...field} className="rounded-lg" />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Утасны дугаар</FormLabel>
                              <FormControl>
                                <Input placeholder="Утасны дугаар" {...field} className="rounded-lg" />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Мессеж</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Таны мессеж" 
                                className="min-h-[120px] md:min-h-[150px] rounded-lg resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        type="submit"
                        className="w-full bg-dental-600 hover:bg-dental-700 shadow-md shadow-dental-500/20 mt-4 rounded-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Илгээж байна..." : "Илгээх"}
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-dental-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.8),transparent_60%)]"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-dental-100/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-dental-100/20 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
                Асуулт & Хариулт
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-dental-800">Түгээмэл асуултууд</h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
                Үйлчлүүлэгчдийн түгээмэл асуудаг асуултуудын хариултыг доор оруулав
              </p>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <h3 className="font-semibold text-base md:text-lg mb-2 text-dental-800">Цаг захиалахын тулд урьдчилан төлбөр төлөх шаардлагатай юу?</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Үгүй, цаг захиалахад урьдчилан төлбөр төлөх шаардлагагүй. Гэхдээ цаг захиалсан бол ирэх боломжгүй тохиолдолд 24 цагийн өмнө мэдэгдэхийг хүсье.
                </p>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <h3 className="font-semibold text-base md:text-lg mb-2 text-dental-800">Та нар даатгалтай ажилладаг уу?</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Тийм, бид зарим эрүүл мэндийн даатгалтай хамтран ажилладаг. Тодорхой мэдээлэл авахыг хүсвэл бидэнтэй холбогдоорой.
                </p>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <h3 className="font-semibold text-base md:text-lg mb-2 text-dental-800">Яаралтай тохиолдолд хэрхэн холбогдох вэ?</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Яаралтай тохиолдолд манай утсаар шууд холбогдоно уу: +976 99112233. Ажлын цагаар бид аль болох хурдан хариу өгөхийг хичээх болно.
                </p>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <h3 className="font-semibold text-base md:text-lg mb-2 text-dental-800">Та нар хүүхдийн шүдний эмчилгээ хийдэг үү?</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Тийм, бид хүүхдийн шүдний эмчилгээнд мэргэшсэн. Манай эмч нар хүүхдэд ээлтэй арга барилаар ажилладаг бөгөөд тусгай сургалтанд хамрагдсан. Дэлгэрэнгүй мэдээллийг <Link href="/children-dentistry" className="text-dental-600 hover:underline font-medium">энд дарж</Link> авна уу.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-dental-500 to-lavender-500 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Эрүүл шүд, гэрэл инээмсэглэлийн төлөө</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Мэргэжлийн шүдний эмчилгээ, зөвлөгөө авахыг хүсвэл бидэнтэй холбогдоорой.
          </p>
          <Button asChild size="lg" className="bg-white text-dental-600 hover:bg-gray-100">
            <a href="tel:+97699112233">
              <Phone className="mr-2 h-4 w-4" />
              +976 99112233
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}