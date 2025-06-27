"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, CheckCircle, Clock, Shield, Smile, Sparkles, Zap, Calendar, Stethoscope, ClipboardList, Activity, HeartPulse } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import ProcessSection from "@/components/sections/ProcessSection";
import FeaturedServices from "@/components/sections/FeaturedServices";

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
  // CTA section data
  const ctaData = {
    title: "Мэргэжлийн шүдний эмчилгээ авахыг хүсч байна уу?",
    description: "Надтай холбогдож, мэргэжлийн зөвлөгөө авахыг хүсвэл одоо цаг захиалаарай.",
    primaryButtonText: "Цаг захиалах",
    primaryButtonLink: "/booking",
    secondaryButtonText: "Холбоо барих",
    secondaryButtonLink: "/contact",
    backgroundImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop"
  };
  
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
      <div ref={featuredRef}>
        <FeaturedServices
          services={featuredServices}
          isInView={isInView.featured}
        />
      </div>

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
      <ProcessSection
        title="Эмчилгээний үйл явц"
        description="Мөнгөндент эмнэлэгт үйлчлүүлэх үйл явц энгийн бөгөөд тав тухтай байхаар зохион байгуулагдсан."
        steps={[
          {
            title: "Цаг захиалах",
            description: "Утсаар эсвэл онлайнаар цаг захиалах. Бид таны хэрэгцээнд тохирсон цагийг санал болгоно.",
            icon: Calendar
          },
          {
            title: "Анхны үзлэг",
            description: "Эмч таны шүдний эрүүл мэндийг үнэлж, шаардлагатай эмчилгээг тодорхойлно.",
            icon: Stethoscope
          },
          {
            title: "Эмчилгээний төлөвлөгөө",
            description: "Эмч таны хэрэгцээнд тохирсон эмчилгээний төлөвлөгөө, үнийн санал гаргана.",
            icon: ClipboardList
          },
          {
            title: "Эмчилгээ",
            description: "Эмчилгээг мэргэжлийн өндөр түвшинд, тав тухтай орчинд хийж гүйцэтгэнэ.",
            icon: Activity
          },
          {
            title: "Хяналт",
            description: "Эмчилгээний дараах хяналт, зөвлөгөөг үзүүлж, таны шүдний эрүүл мэндийг хадгалахад туслана.",
            icon: HeartPulse
          }
        ]}
      />

      {/* CTA Section */}
      <CTASection {...ctaData}/>
    </>
  );
}