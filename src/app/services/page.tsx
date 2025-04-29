"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, CheckCircle, Clock, Shield, Smile, Sparkles, Zap, Calendar, Stethoscope, ClipboardList, Activity, HeartPulse } from "lucide-react";

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

export default function ServicesPage() {
  const [isInView, setIsInView] = useState({
    featured: false,
    preventive: false,
    restorative: false,
    cosmetic: false,
    pediatric: false,
  });
  
  // Get the tab from URL query parameter
  const [activeTab, setActiveTab] = useState("preventive");
  
  useEffect(() => {
    // Check if we have a tab parameter in the URL
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    
    if (tabParam && ['preventive', 'restorative', 'cosmetic', 'pediatric'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  const featuredRef = useRef<HTMLDivElement>(null);
  const preventiveRef = useRef<HTMLDivElement>(null);
  const restorativeRef = useRef<HTMLDivElement>(null);
  const cosmeticRef = useRef<HTMLDivElement>(null);
  const pediatricRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === featuredRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, featured: true }));
          } else if (entry.target === preventiveRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, preventive: true }));
          } else if (entry.target === restorativeRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, restorative: true }));
          } else if (entry.target === cosmeticRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, cosmetic: true }));
          } else if (entry.target === pediatricRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, pediatric: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (featuredRef.current) observer.observe(featuredRef.current);
    if (preventiveRef.current) observer.observe(preventiveRef.current);
    if (restorativeRef.current) observer.observe(restorativeRef.current);
    if (cosmeticRef.current) observer.observe(cosmeticRef.current);
    if (pediatricRef.current) observer.observe(pediatricRef.current);

    return () => observer.disconnect();
  }, []);

  // Service types
  type Service = {
    id: string;
    title: string;
    description: string;
    imageUrl?: string | null;
    price?: number | null;
    createdAt: string;
    updatedAt: string;
  };

  // Static services data
  const staticServices: Service[] = [
    {
      id: "1",
      title: "Шүдний үзлэг",
      description: "Шүдний эрүүл мэндийн иж бүрэн үзлэг, оношилгоо",
      price: 50000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Шүдний цэвэрлэгээ",
      description: "Мэргэжлийн шүдний цэвэрлэгээ, өнгө өөрчлөлт арилгах",
      price: 80000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Фторт эмчилгээ",
      description: "Шүдийг бэхжүүлэх, цооролтоос хамгаалах фторт эмчилгээ",
      price: 60000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Шүдний ломбо",
      description: "Өндөр чанартай материалаар шүдний цооролтыг засах",
      price: 120000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "5",
      title: "Шүдний суурь эмчилгээ",
      description: "Шүдний суурь бэхжүүлэх, сэргээх эмчилгээ",
      price: 150000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "6",
      title: "Шүдний мэдрэлийн эмчилгээ",
      description: "Шүдний мэдрэлийн иж бүрэн эмчилгээ",
      price: 200000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "7",
      title: "Циркон бүрээс",
      description: "Өндөр чанартай циркон материалаар хийсэн шүдний бүрээс",
      price: 450000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "8",
      title: "Шүдний цайруулалт",
      description: "Мэргэжлийн шүдний цайруулалт, гоо сайхны үйлчилгээ",
      price: 250000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "9",
      title: "Шүдний винир",
      description: "Шүдний гадаргууг сайжруулах, гоо үзэмжийг нэмэгдүүлэх винир",
      price: 350000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "10",
      title: "Хүүхдийн шүдний үзлэг",
      description: "Хүүхдэд зориулсан шүдний эрүүл мэндийн үзлэг",
      price: 40000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "11",
      title: "Хүүхдийн шүдний битүүлэгч",
      description: "Хүүхдийн шүдийг цооролтоос хамгаалах битүүлэгч",
      price: 45000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "12",
      title: "Хүүхдийн шүдний ломбо",
      description: "Хүүхдийн шүдний цооролтыг засах, сэргээх эмчилгээ",
      price: 80000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Map services to featured services
  const featuredServices = [
    {
      title: "Шүдний цэвэрлэгээ",
      description: "Мэргэжлийн шүдний цэвэрлэгээ нь шүдний чулуу, өнгө өөрчлөлтийг арилгаж, эрүүл буйлыг хадгалахад тусална.",
      icon: <Sparkles className="h-10 w-10 text-dental-500" />,
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop",
      link: "/services/cleaning",
    },
    {
      title: "Циркон бүрээс",
      description: "Өндөр чанартай циркон бүрээс нь таны шүдийг сэргээж, байгалийн гоо үзэмжийг олгоно.",
      icon: <Smile className="h-10 w-10 text-dental-500" />,
      image: "https://images.unsplash.com/photo-1581585099522-f6ac2efe9b7c?q=80&w=2070&auto=format&fit=crop",
      link: "/services/zircon",
    },
    {
      title: "Хүүхдийн эмчилгээ",
      description: "Хүүхдэд ээлтэй орчин, тусгай арга барилаар хүүхдийн шүдний эрүүл мэндийг хамгаална.",
      icon: <Shield className="h-10 w-10 text-dental-500" />,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop",
      link: "/services/children-dentistry",
    },
    {
      title: "Шүдний ломбо",
      description: "Орчин үеийн материал ашиглан шүдний цооролтыг засаж, шүдний бүтцийг сэргээнэ.",
      icon: <Zap className="h-10 w-10 text-dental-500" />,
      image: "https://images.unsplash.com/photo-1606265752439-1f18756aa8ed?q=80&w=2070&auto=format&fit=crop",
      link: "/services/filling",
    },
  ];

  // Group services by category
  const categorizeServices = () => {
    // If still loading or there's an error, return empty categories
    if (isLoading || error) {
      return {
        preventive: [],
        restorative: [],
        cosmetic: [],
        pediatric: []
      };
    }

    // Categorize based on title keywords
    const preventive = staticServices.filter(s => 
      s.title.toLowerCase().includes('үзлэг') || 
      s.title.toLowerCase().includes('цэвэрлэгээ') || 
      s.title.toLowerCase().includes('фтор') || 
      s.title.toLowerCase().includes('битүүлэгч')
    );
    
    const restorative = staticServices.filter(s => 
      s.title.toLowerCase().includes('ломбо') || 
      s.title.toLowerCase().includes('суурь') || 
      s.title.toLowerCase().includes('мэдрэл') || 
      s.title.toLowerCase().includes('бүрээс')
    );
    
    const cosmetic = staticServices.filter(s => 
      s.title.toLowerCase().includes('циркон') || 
      s.title.toLowerCase().includes('цайруулалт') || 
      s.title.toLowerCase().includes('винир') || 
      s.title.toLowerCase().includes('гажиг')
    );
    
    const pediatric = staticServices.filter(s => 
      s.title.toLowerCase().includes('хүүхд')
    );
    
    return {
      preventive,
      restorative,
      cosmetic,
      pediatric
    };
  };

  // Service categories from API data
  const serviceCategories = categorizeServices();

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="pt-32 pb-16 md:pt-40 md:pb-24 bg-dental-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.8),transparent_60%)]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-dental-100/50 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-dental-100/30 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              Мэргэжлийн шүдний эмчилгээ
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dental-800">
              Бидний үйлчилгээнүүд
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Мөнгөндент эмнэлэг нь таны шүдний эрүүл мэндийг хамгаалах, гоо үзэмжийг нэмэгдүүлэх олон төрлийн үйлчилгээг санал болгож байна.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="text-dental-500" size={18} />
                <span className="text-sm font-medium">Мэргэжлийн баг</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="text-dental-500" size={18} />
                <span className="text-sm font-medium">Орчин үеийн тоног төхөөрөмж</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="text-dental-500" size={18} />
                <span className="text-sm font-medium">Өндөр чанарын материал</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Services Section */}
      <section ref={featuredRef} className="py-16 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16">
            <div className="max-w-2xl mb-6 md:mb-0">
              <div className="inline-block px-4 py-1 mb-3 md:mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
                Онцлох үйлчилгээнүүд
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-dental-800">Бидний мэргэжлийн үйлчилгээнүүд</h2>
              <p className="text-gray-600">
                Бидний хамгийн түгээмэл үйлчилгээнүүдтэй танилцана уу.
              </p>
            </div>
            <Button asChild variant="outline" className="border-dental-300 text-dental-700 hover:bg-dental-100 hover:border-dental-400 transition-all w-full sm:w-auto">
              <Link href="/services" className="flex items-center justify-center">
                Бүх үйлчилгээг харах
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <motion.div
            initial="hidden"
            animate={isInView.featured ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {featuredServices.map((service, index) => (
              <motion.div key={index} variants={fadeIn}>
                <div className="group h-full rounded-xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-44 sm:h-52 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-dental-100 flex items-center justify-center text-dental-600 group-hover:bg-dental-500 group-hover:text-white transition-colors">
                        {service.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-dental-800 group-hover:text-dental-600 transition-colors">{service.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <Link 
                        href={service.link} 
                        className="text-dental-600 font-medium flex items-center hover:text-dental-700 transition-colors text-sm sm:text-base"
                      >
                        Дэлгэрэнгүй <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                      <Link 
                        href="/booking"
                        className="w-8 h-8 rounded-full bg-dental-50 flex items-center justify-center text-dental-600 hover:bg-dental-100 transition-colors"
                      >
                        <Calendar className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-16 md:py-24 bg-dental-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-dental-100/30 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-dental-100/20 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block px-4 py-1 mb-3 md:mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              Бүх төрлийн үйлчилгээ
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4 text-dental-800">Үйлчилгээний ангилалууд</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Бид таны шүдний эрүүл мэндийн хэрэгцээнд тохирсон олон төрлийн үйлчилгээг санал болгож байна.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={(value) => {
              setActiveTab(value);
              // Update URL without page reload
              const url = new URL(window.location.href);
              url.searchParams.set('tab', value);
              window.history.pushState({}, '', url);
            }} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 md:mb-8">
                <TabsTrigger value="preventive" className="text-xs sm:text-sm py-1.5 sm:py-2">Урьдчилан сэргийлэх</TabsTrigger>
                <TabsTrigger value="restorative" className="text-xs sm:text-sm py-1.5 sm:py-2">Сэргээх</TabsTrigger>
                <TabsTrigger value="cosmetic" className="text-xs sm:text-sm py-1.5 sm:py-2">Гоо сайхны</TabsTrigger>
                <TabsTrigger value="pediatric" className="text-xs sm:text-sm py-1.5 sm:py-2">Хүүхдийн</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preventive" ref={preventiveRef}>
                {isLoading ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="bg-gray-100 rounded-lg h-48 animate-pulse"></div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">{error}</p>
                  </div>
                ) : (
                  <motion.div
                    initial="hidden"
                    animate={isInView.preventive ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {serviceCategories.preventive.length > 0 ? (
                      serviceCategories.preventive.map((service, index) => (
                        <motion.div key={service.id || index} variants={fadeIn}>
                          <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg sm:text-xl text-dental-800">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600 mb-4 text-sm sm:text-base">{service.description}</p>
                              <div className="flex flex-wrap gap-3 items-center justify-between">
                                <div className="flex items-center text-xs sm:text-sm bg-dental-50 px-2 py-1 rounded-full">
                                  <Clock className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4 text-dental-500" />
                                  <span>30-60 минут</span>
                                </div>
                                <div className="flex items-center text-xs sm:text-sm font-medium text-dental-800 bg-dental-100 px-2 py-1 rounded-full">
                                  <span>{service.price ? `${service.price.toLocaleString()}₮-аас` : 'Үнэлгээгээр'}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8">
                        <p className="text-gray-500">Энэ ангилалд үйлчилгээ олдсонгүй.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </TabsContent>
              
              <TabsContent value="restorative" ref={restorativeRef}>
                {isLoading ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="bg-gray-100 rounded-lg h-48 animate-pulse"></div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">{error}</p>
                  </div>
                ) : (
                  <motion.div
                    initial="hidden"
                    animate={isInView.restorative ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {serviceCategories.restorative.length > 0 ? (
                      serviceCategories.restorative.map((service, index) => (
                        <motion.div key={service.id || index} variants={fadeIn}>
                          <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg sm:text-xl text-dental-800">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600 mb-4 text-sm sm:text-base">{service.description}</p>
                              <div className="flex flex-wrap gap-3 items-center justify-between">
                                <div className="flex items-center text-xs sm:text-sm bg-dental-50 px-2 py-1 rounded-full">
                                  <Clock className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4 text-dental-500" />
                                  <span>30-90 минут</span>
                                </div>
                                <div className="flex items-center text-xs sm:text-sm font-medium text-dental-800 bg-dental-100 px-2 py-1 rounded-full">
                                  <span>{service.price ? `${service.price.toLocaleString()}₮-аас` : 'Үнэлгээгээр'}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8">
                        <p className="text-gray-500">Энэ ангилалд үйлчилгээ олдсонгүй.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </TabsContent>
              
              <TabsContent value="cosmetic" ref={cosmeticRef}>
                {isLoading ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="bg-gray-100 rounded-lg h-48 animate-pulse"></div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">{error}</p>
                  </div>
                ) : (
                  <motion.div
                    initial="hidden"
                    animate={isInView.cosmetic ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {serviceCategories.cosmetic.length > 0 ? (
                      serviceCategories.cosmetic.map((service, index) => (
                        <motion.div key={service.id || index} variants={fadeIn}>
                          <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg sm:text-xl text-dental-800">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600 mb-4 text-sm sm:text-base">{service.description}</p>
                              <div className="flex flex-wrap gap-3 items-center justify-between">
                                <div className="flex items-center text-xs sm:text-sm bg-dental-50 px-2 py-1 rounded-full">
                                  <Clock className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4 text-dental-500" />
                                  <span>60-120 минут</span>
                                </div>
                                <div className="flex items-center text-xs sm:text-sm font-medium text-dental-800 bg-dental-100 px-2 py-1 rounded-full">
                                  <span>{service.price ? `${service.price.toLocaleString()}₮-аас` : 'Үнэлгээгээр'}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8">
                        <p className="text-gray-500">Энэ ангилалд үйлчилгээ олдсонгүй.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </TabsContent>
              
              <TabsContent value="pediatric" ref={pediatricRef}>
                {isLoading ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="bg-gray-100 rounded-lg h-48 animate-pulse"></div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">{error}</p>
                  </div>
                ) : (
                  <motion.div
                    initial="hidden"
                    animate={isInView.pediatric ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {serviceCategories.pediatric.length > 0 ? (
                      serviceCategories.pediatric.map((service, index) => (
                        <motion.div key={service.id || index} variants={fadeIn}>
                          <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg sm:text-xl text-dental-800">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600 mb-4 text-sm sm:text-base">{service.description}</p>
                              <div className="flex flex-wrap gap-3 items-center justify-between">
                                <div className="flex items-center text-xs sm:text-sm bg-dental-50 px-2 py-1 rounded-full">
                                  <Clock className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4 text-dental-500" />
                                  <span>20-45 минут</span>
                                </div>
                                <div className="flex items-center text-xs sm:text-sm font-medium text-dental-800 bg-dental-100 px-2 py-1 rounded-full">
                                  <span>{service.price ? `${service.price.toLocaleString()}₮-аас` : 'Үнэлгээгээр'}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8">
                        <p className="text-gray-500">Энэ ангилалд үйлчилгээ олдсонгүй.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-dental-50/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-dental-100/30 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-dental-100/20 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              Таны аюулгүй байдал бидний тэргүүн зорилго
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dental-800">Эмчилгээний үйл явц</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Мөнгөндент эмнэлэгт үйлчлүүлэх үйл явц энгийн бөгөөд тав тухтай байхаар зохион байгуулагдсан.
            </p>
          </div>

          {/* Desktop Process Steps - Hidden on Mobile */}
          <div className="hidden md:grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-dental-100 hover:border-dental-200 group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-dental-500 flex items-center justify-center text-white mb-4 mx-auto group-hover:bg-dental-600 transition-colors">
                  <Calendar className="h-8 w-8" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dental-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="text-xl font-bold mb-3 text-dental-800 text-center">Цаг захиалах</h3>
                <p className="text-gray-600 text-center">
                  Утсаар эсвэл онлайнаар цаг захиалах. Бид таны хэрэгцээнд тохирсон цагийг санал болгоно.
                </p>
                <div className="mt-4 flex justify-center">
                  <Link 
                    href="/booking" 
                    className="text-dental-600 font-medium hover:text-dental-700 transition-colors flex items-center text-sm"
                  >
                    Цаг захиалах <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-dental-500 to-dental-300 transform -translate-y-1/2 z-0"></div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-dental-100 hover:border-dental-200 group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-dental-500 flex items-center justify-center text-white mb-4 mx-auto group-hover:bg-dental-600 transition-colors">
                  <Stethoscope className="h-8 w-8" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dental-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                <h3 className="text-xl font-bold mb-3 text-dental-800 text-center">Анхны үзлэг</h3>
                <p className="text-gray-600 text-center">
                  Эмч таны шүдний эрүүл мэндийг үнэлж, шаардлагатай эмчилгээг тодорхойлно.
                </p>
              </div>
              <div className="absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-dental-500 to-dental-300 transform -translate-y-1/2 z-0"></div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-dental-100 hover:border-dental-200 group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-dental-500 flex items-center justify-center text-white mb-4 mx-auto group-hover:bg-dental-600 transition-colors">
                  <ClipboardList className="h-8 w-8" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dental-600 text-white flex items-center justify-center font-bold text-sm">3</div>
                <h3 className="text-xl font-bold mb-3 text-dental-800 text-center">Эмчилгээний төлөвлөгөө</h3>
                <p className="text-gray-600 text-center">
                  Эмч таны хэрэгцээнд тохирсон эмчилгээний төлөвлөгөө, үнийн санал гаргана.
                </p>
              </div>
              <div className="absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-dental-500 to-dental-300 transform -translate-y-1/2 z-0"></div>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-dental-100 hover:border-dental-200 group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-dental-500 flex items-center justify-center text-white mb-4 mx-auto group-hover:bg-dental-600 transition-colors">
                  <Activity className="h-8 w-8" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dental-600 text-white flex items-center justify-center font-bold text-sm">4</div>
                <h3 className="text-xl font-bold mb-3 text-dental-800 text-center">Эмчилгээ</h3>
                <p className="text-gray-600 text-center">
                  Эмчилгээг мэргэжлийн өндөр түвшинд, тав тухтай орчинд хийж гүйцэтгэнэ.
                </p>
              </div>
              <div className="absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-dental-500 to-dental-300 transform -translate-y-1/2 z-0"></div>
            </motion.div>

            {/* Step 5 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-dental-100 hover:border-dental-200 group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-dental-500 flex items-center justify-center text-white mb-4 mx-auto group-hover:bg-dental-600 transition-colors">
                  <HeartPulse className="h-8 w-8" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dental-600 text-white flex items-center justify-center font-bold text-sm">5</div>
                <h3 className="text-xl font-bold mb-3 text-dental-800 text-center">Хяналт</h3>
                <p className="text-gray-600 text-center">
                  Эмчилгээний дараах хяналт, зөвлөгөөг үзүүлж, таны шүдний эрүүл мэндийг хадгалахад туслана.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Mobile Process Steps - Visible only on Mobile */}
          <div className="md:hidden space-y-6">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-lg p-5 border border-dental-100 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dental-600 text-white flex items-center justify-center font-bold text-sm shadow-md">1</div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-full bg-dental-500 flex-shrink-0 flex items-center justify-center text-white">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-dental-800">Цаг захиалах</h3>
                </div>
                <p className="text-gray-600 text-sm ml-[4.5rem]">
                  Утсаар эсвэл онлайнаар цаг захиалах. Бид таны хэрэгцээнд тохирсон цагийг санал болгоно.
                </p>
                <div className="mt-3 ml-[4.5rem]">
                  <Link 
                    href="/booking" 
                    className="text-dental-600 font-medium hover:text-dental-700 transition-colors flex items-center text-sm"
                  >
                    Цаг захиалах <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-lg p-5 border border-dental-100 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dental-600 text-white flex items-center justify-center font-bold text-sm shadow-md">2</div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-full bg-dental-500 flex-shrink-0 flex items-center justify-center text-white">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-dental-800">Анхны үзлэг</h3>
                </div>
                <p className="text-gray-600 text-sm ml-[4.5rem]">
                  Эмч таны шүдний эрүүл мэндийг үнэлж, шаардлагатай эмчилгээг тодорхойлно.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-lg p-5 border border-dental-100 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dental-600 text-white flex items-center justify-center font-bold text-sm shadow-md">3</div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-full bg-dental-500 flex-shrink-0 flex items-center justify-center text-white">
                    <ClipboardList className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-dental-800">Эмчилгээний төлөвлөгөө</h3>
                </div>
                <p className="text-gray-600 text-sm ml-[4.5rem]">
                  Эмч таны хэрэгцээнд тохирсон эмчилгээний төлөвлөгөө, үнийн санал гаргана.
                </p>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-lg p-5 border border-dental-100 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dental-600 text-white flex items-center justify-center font-bold text-sm shadow-md">4</div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-full bg-dental-500 flex-shrink-0 flex items-center justify-center text-white">
                    <Activity className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-dental-800">Эмчилгээ</h3>
                </div>
                <p className="text-gray-600 text-sm ml-[4.5rem]">
                  Эмчилгээг мэргэжлийн өндөр түвшинд, тав тухтай орчинд хийж гүйцэтгэнэ.
                </p>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-lg p-5 border border-dental-100 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dental-600 text-white flex items-center justify-center font-bold text-sm shadow-md">5</div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-full bg-dental-500 flex-shrink-0 flex items-center justify-center text-white">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-dental-800">Хяналт</h3>
                </div>
                <p className="text-gray-600 text-sm ml-[4.5rem]">
                  Эмчилгээний дараах хяналт, зөвлөгөөг үзүүлж, таны шүдний эрүүл мэндийг хадгалахад туслана.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <Button asChild className="bg-dental-600 hover:bg-dental-700 shadow-lg shadow-dental-500/20">
              <Link href="/booking" className="flex items-center">
                Цаг захиалах <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-28 bg-gradient-to-r from-dental-600 to-dental-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 mb-4 md:mb-6 rounded-full bg-white/20 text-white backdrop-blur-sm font-medium text-sm">
              Мэргэжлийн шүдний эмнэлэг
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Эрүүл шүд, гэрэл инээмсэглэлийн төлөө</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-10 text-white/90 max-w-2xl mx-auto">
              Мэргэжлийн шүдний эмчилгээ авахыг хүсч байна уу? Одоо цаг захиалаарай.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Button asChild size="lg" className="bg-white text-dental-600 hover:bg-white/90 shadow-lg shadow-dental-700/20 w-full sm:w-auto">
                <Link href="/booking" className="flex items-center justify-center">Цаг захиалах <ChevronRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 transition-all w-full sm:w-auto">
                <Link href="/contact" className="flex items-center justify-center">Холбоо барих <ChevronRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}