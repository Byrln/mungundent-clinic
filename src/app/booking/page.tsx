"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { BookingsAPI, ServicesAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Нэр 2-оос дээш тэмдэгттэй байх ёстой.",
  }),
  phone: z.string().min(8, {
    message: "Утасны дугаар 8-аас дээш тэмдэгттэй байх ёстой.",
  }),
  serviceType: z.string({
    required_error: "Үйлчилгээний төрлийг сонгоно уу.",
  }),
  date: z.date({
    required_error: "Огноог сонгоно уу.",
  }),
  time: z.string({
    required_error: "Цагийг сонгоно уу.",
  }),
  message: z.string().optional(),
});

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceType: "",
      message: "",
    },
  });

  // Available time slots
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  // Fetch service types from API
  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        setIsLoadingServices(true);
        const services = await ServicesAPI.getAll();
        
        // Extract service titles
        const types = services.map(service => service.title);
        
        // Add default service types if API returns empty array
        if (types.length === 0) {
          setServiceTypes([
            "Шүдний үзлэг",
            "Шүдний цэвэрлэгээ",
            "Хүүхдийн эмчилгээ",
            "Циркон бүрээс",
            "Шүдний ломбо",
            "Зөвлөгөө авах",
          ]);
        } else {
          setServiceTypes(types);
        }
      } catch (err) {
        console.error('Error fetching service types:', err);
        // Fallback to default service types
        setServiceTypes([
          "Шүдний үзлэг",
          "Шүдний цэвэрлэгээ",
          "Хүүхдийн эмчилгээ",
          "Циркон бүрээс",
          "Шүдний ломбо",
          "Зөвлөгөө авах",
        ]);
      } finally {
        setIsLoadingServices(false);
      }
    };
    
    fetchServiceTypes();
  }, []);

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Format date for API
      const formattedDate = format(values.date, "yyyy-MM-dd");
      
      console.log("Submitting booking with data:", {
        name: values.name,
        phone: values.phone,
        serviceType: values.serviceType,
        date: formattedDate,
        time: values.time,
        message: values.message || "",
      });
      
      // Send booking data to API
      const response = await BookingsAPI.create({
        name: values.name,
        phone: values.phone,
        serviceType: values.serviceType,
        date: formattedDate,
        time: values.time,
        message: values.message || "",
      });
      
      console.log("Booking API response:", response);
      
      setIsSuccess(true);
      form.reset();
    } catch (error: any) {
      console.error("Error submitting booking:", error);
      
      // Handle specific error messages from the API
      if (error.message && typeof error.message === 'string') {
        if (error.message.includes('database credentials')) {
          setError("Өгөгдлийн сангийн холболтын алдаа. Та дараа дахин оролдоно уу.");
        } else if (error.message.includes('already exists')) {
          setError("Энэ мэдээллээр цаг захиалга бүртгэгдсэн байна. Өөр цаг сонгоно уу.");
        } else {
          setError("Цаг захиалахад алдаа гарлаа. Дахин оролдоно уу.");
        }
      } else {
        setError("Цаг захиалахад алдаа гарлаа. Дахин оролдоно уу.");
      }
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
                <span className="text-dental-700 font-medium text-sm">Онлайн цаг захиалга</span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              >
                <span className="text-dental-600 relative">
                  Цаг
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,5 Q25,10 50,5 T100,5" fill="none" stroke="#86EFAC" strokeWidth="4"/>
                  </svg>
                </span> захиалга
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto"
              >
                Мөнгөндент эмнэлэгт цаг захиалахын тулд доорх маягтыг бөглөнө үү. Бид таны захиалгыг хүлээн авмагц тантай холбогдох болно.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
            >
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="mt-0.5 bg-dental-100 p-2 rounded-full">
                  <Clock className="text-dental-600" size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Хурдан, хялбар</h3>
                  <p className="text-sm text-gray-500">Хэдхэн минутад захиална</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="mt-0.5 bg-dental-100 p-2 rounded-full">
                  <CheckCircle className="text-dental-600" size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Баталгаат</h3>
                  <p className="text-sm text-gray-500">Найдвартай үйлчилгээ</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="mt-0.5 bg-dental-100 p-2 rounded-full">
                  <CalendarIcon className="text-dental-600" size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Уян хатан</h3>
                  <p className="text-sm text-gray-500">Тохиромжтой цагаа сонгоно</p>
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
          <div className="max-w-3xl mx-auto">
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
                  Цаг захиалга амжилттай!
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Таны цаг захиалгыг хүлээн авлаа. Бид удахгүй тантай холбогдож, цагийг баталгаажуулах болно.
                </p>
                <Button
                  onClick={() => setIsSuccess(false)}
                  className="bg-dental-600 hover:bg-dental-700 shadow-md shadow-dental-500/20 w-full sm:w-auto"
                >
                  Шинээр захиалга хийх
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-xl shadow-lg p-5 md:p-8 border border-gray-100"
              >
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Үйлчилгээний төрөл</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isLoadingServices}
                          >
                            <FormControl>
                              <SelectTrigger className="rounded-lg">
                                <SelectValue placeholder={isLoadingServices ? "Ачааллаж байна..." : "Үйлчилгээний төрлийг сонгоно уу"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isLoadingServices ? (
                                <div className="p-2 text-center text-sm text-gray-500">
                                  Ачааллаж байна...
                                </div>
                              ) : serviceTypes.length > 0 ? (
                                serviceTypes.map((service) => (
                                  <SelectItem key={service} value={service}>
                                    {service}
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="p-2 text-center text-sm text-gray-500">
                                  Үйлчилгээний төрөл олдсонгүй
                                </div>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-sm font-medium">Огноо</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal rounded-lg",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "yyyy-MM-dd")
                                    ) : (
                                      <span>Огноо сонгох</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() || date.getDay() === 0
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Цаг</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Цаг сонгох" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                          <FormLabel className="text-sm font-medium">Нэмэлт мэдээлэл (заавал биш)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Шүдний асуудлын талаар товч тайлбар, эсвэл бусад хүсэлт"
                              className="resize-none rounded-lg min-h-[100px]"
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
                      {isSubmitting ? "Илгээж байна..." : "Цаг захиалах"}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-dental-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.8),transparent_60%)]"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-dental-100/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-dental-100/20 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 rounded-full bg-dental-100 flex items-center justify-center text-dental-600 mr-3">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold">Ажиллах цаг</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center bg-dental-50/50 p-2 rounded-lg">
                    <span className="text-gray-700 font-medium text-sm">Даваа - Баасан:</span>
                    <span className="bg-dental-100 px-3 py-1 rounded-full text-dental-700 text-sm">9:00 - 18:00</span>
                  </li>
                  <li className="flex justify-between items-center bg-dental-50/50 p-2 rounded-lg">
                    <span className="text-gray-700 font-medium text-sm">Бямба:</span>
                    <span className="bg-dental-100 px-3 py-1 rounded-full text-dental-700 text-sm">10:00 - 15:00</span>
                  </li>
                  <li className="flex justify-between items-center bg-dental-50/50 p-2 rounded-lg">
                    <span className="text-gray-700 font-medium text-sm">Ням:</span>
                    <span className="bg-dental-100 px-3 py-1 rounded-full text-dental-700 text-sm">Амарна</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 rounded-full bg-dental-100 flex items-center justify-center text-dental-600 mr-3">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold">Анхааруулга</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-dental-50/50 p-2 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-dental-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Цаг захиалгыг 24 цагийн өмнө цуцлах боломжтой.</span>
                  </li>
                  <li className="flex items-start gap-3 bg-dental-50/50 p-2 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-dental-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Цаг захиалсан өдрөөс 15 минутын өмнө ирэхийг зөвлөж байна.</span>
                  </li>
                  <li className="flex items-start gap-3 bg-dental-50/50 p-2 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-dental-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">Яаралтай тохиолдолд бидэнтэй утсаар холбогдоно уу.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}