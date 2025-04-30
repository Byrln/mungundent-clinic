"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Heart, Shield, Smile, Star, CheckCircle } from "lucide-react";

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

export default function ChildrenDentistryPage() {
  const [isInView, setIsInView] = useState({
    benefits: false,
    services: false,
    approach: false,
  });

  const benefitsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === benefitsRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, benefits: true }));
          } else if (entry.target === servicesRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, services: true }));
          } else if (entry.target === approachRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, approach: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (benefitsRef.current) observer.observe(benefitsRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (approachRef.current) observer.observe(approachRef.current);

    return () => observer.disconnect();
  }, []);

  // Benefits data
  const benefits = [
    {
      title: "Хүүхдэд ээлтэй орчин",
      description: "Манай эмнэлэг нь хүүхдэд тав тухтай, аюулгүй, дулаан уур амьсгалтай орчныг бүрдүүлсэн.",
      icon: <Heart className="h-8 w-8 text-dental-500" />,
    },
    {
      title: "Тусгай сургалттай эмч нар",
      description: "Манай эмч нар нь хүүхдийн сэтгэл зүй, хэрэгцээнд тохирсон тусгай сургалтанд хамрагдсан.",
      icon: <Shield className="h-8 w-8 text-dental-500" />,
    },
    {
      title: "Эерэг туршлага",
      description: "Бид хүүхдэд шүдний эмнэлгийн эерэг туршлага өгч, ирээдүйд шүдний эмчээс айхгүй байхад нь тусална.",
      icon: <Smile className="h-8 w-8 text-dental-500" />,
    },
  ];

  // Services data
  const services = [
    "Урьдчилан сэргийлэх үзлэг",
    "Шүдний цэвэрлэгээ",
    "Фторт эмчилгээ",
    "Шүдний ломбо",
    "Сүүн шүдний эмчилгээ",
    "Шүдний гажиг засал",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-100"></div>
        
        {/* Colored accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dental-300 via-dental-500 to-dental-300"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Left content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="md:w-1/2 mb-10 md:mb-0 md:pr-8"
            >
              <div className="inline-flex items-center px-3 py-1 mb-6 rounded-md bg-dental-50 border-l-4 border-dental-500">
                <span className="text-dental-700 font-medium text-sm">Хүүхдийн шүдний эмчилгээ</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Хүүхдийн <span className="text-dental-600 relative">
                  найрсаг
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,5 Q25,10 50,5 T100,5" fill="none" stroke="#86EFAC" strokeWidth="4"/>
                  </svg>
                </span> шүдний эмчилгээ
              </h1>
              
              <p className="text-gray-600 text-lg mb-8 max-w-xl">
                Мөнгөндент эмнэлэг нь хүүхдийн шүдний эрүүл мэндийг хамгаалах, эерэг туршлага өгөх зорилготой хүүхдэд ээлтэй шүдний эмчилгээг санал болгож байна.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="mt-0.5 bg-dental-100 p-2 rounded-full">
                    <CheckCircle className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Хүүхдэд ээлтэй орчин</h3>
                    <p className="text-sm text-gray-500">Тав тухтай, аюулгүй орчин</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="mt-0.5 bg-dental-100 p-2 rounded-full">
                    <CheckCircle className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Мэргэшсэн эмч нар</h3>
                    <p className="text-sm text-gray-500">Туршлагатай мэргэжилтнүүд</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-dental-600 hover:bg-dental-700 text-white">
                  <Link href="/booking">Цаг захиалах</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-dental-200 text-dental-700 hover:bg-dental-50">
                  <a href="#benefits">Дэлгэрэнгүй мэдээлэл</a>
                </Button>
              </div>
            </motion.div>
            
            {/* Right content - image with floating elements */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop"
                  alt="Хүүхдийн шүдний эмчилгээ"
                  width={600}
                  height={400}
                  className="w-full h-[300px] md:h-[450px] object-cover"
                />
                
                {/* Floating badge 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -left-5 top-10 bg-white p-3 rounded-lg shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="text-green-600 h-5 w-5" />
                    </div>
                    <span className="font-medium text-sm">Эерэг туршлага</span>
                  </div>
                </motion.div>
                
                {/* Floating badge 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -right-5 bottom-10 bg-white p-3 rounded-lg shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Star className="text-blue-600 h-5 w-5" />
                    </div>
                    <span className="font-medium text-sm">Өндөр үнэлгээ</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Stats card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-10 -left-5 md:-left-10 bg-white p-4 rounded-lg shadow-xl border border-gray-100 max-w-[200px]"
              >
                <h3 className="font-bold text-xl text-dental-700 mb-1">1000+</h3>
                <p className="text-sm text-gray-500">Хүүхэд үйлчлүүлсэн</p>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-16">
            <motion.a 
              href="#benefits"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center text-gray-400 hover:text-dental-600 transition-colors"
            >
              <span className="text-sm font-medium mb-2">Доош гүйлгэх</span>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L10 9L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" ref={benefitsRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              Давуу талууд
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-dental-800">Хүүхдийн шүдний эмчилгээний давуу талууд</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Мөнгөндент эмнэлэг нь хүүхдийн шүдний эмчилгээнд тусгайлан анхаарч, хүүхдэд ээлтэй үйлчилгээг санал болгодог.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate={isInView.benefits ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 p-3 bg-dental-50 rounded-full shadow-sm">
                        {benefit.icon}
                      </div>
                      <h3 className="font-semibold text-lg sm:text-xl mb-2 text-dental-800">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section ref={approachRef} className="py-16 md:py-24 bg-dental-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={isInView.approach ? "visible" : "hidden"}
              variants={fadeIn}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=2069&auto=format&fit=crop"
                alt="Хүүхдийн шүдний эмчилгээний арга барил"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate={isInView.approach ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-6 text-dental-800">Бидний арга барил</h2>
              <p className="text-gray-600 mb-6">
                Бид хүүхдийн шүдний эмчилгээнд тусгай арга барил ашигладаг. Хүүхдийн сэтгэл зүйд тохирсон, тэдний айдсыг бууруулах, эерэг туршлага өгөх зорилготой ажилладаг.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Star className="text-dental-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium">Танилцах үе шат</h3>
                    <p className="text-gray-600">Эхлээд хүүхэдтэй танилцаж, тоног төхөөрөмжтэй нь танилцуулж, айдсыг нь арилгана.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-dental-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium">Энгийн хэл яриа</h3>
                    <p className="text-gray-600">Хүүхдэд ойлгомжтой, энгийн үгээр эмчилгээний процессыг тайлбарлана.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-dental-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium">Урамшуулал</h3>
                    <p className="text-gray-600">Эмчилгээний дараа хүүхдийг урамшуулж, эерэг туршлага үлдээнэ.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-dental-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium">Эцэг эхийн оролцоо</h3>
                    <p className="text-gray-600">Эцэг эхчүүдтэй хамтран ажиллаж, гэрт хийх шүдний арчилгааны зөвлөгөө өгнө.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={isInView.services ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-6 text-dental-800">Хүүхдийн шүдний үйлчилгээнүүд</h2>
              <p className="text-gray-600 mb-8">
                Бид хүүхдийн шүдний эрүүл мэндийг хамгаалах, урьдчилан сэргийлэх, эмчлэх олон төрлийн үйлчилгээг санал болгож байна.
              </p>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-dental-500" size={20} />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild className="bg-dental-500 hover:bg-dental-600">
                  <Link href="/booking">Цаг захиалах</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={isInView.services ? "visible" : "hidden"}
              variants={fadeIn}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1607117121355-2a06662d2b8e?q=80&w=1974&auto=format&fit=crop"
                alt="Хүүхдийн шүдний үйлчилгээ"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-dental-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dental-800">Түгээмэл асуултууд</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Хүүхдийн шүдний эмчилгээтэй холбоотой түгээмэл асуултуудын хариулт.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Хүүхдийн анхны шүдний үзлэгийг хэзээ хийлгэх вэ?</h3>
                <p className="text-gray-600">
                  Хүүхдийн анхны шүд ургасны дараа эсвэл 1 нас хүрэхэд анхны шүдний үзлэгийг хийлгэхийг зөвлөдөг.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Сүүн шүдийг яагаад эмчлэх шаардлагатай вэ?</h3>
                <p className="text-gray-600">
                  Сүүн шүд нь хүүхдийн ярих, идэх чадварт нөлөөлөөд зогсохгүй байнгын шүдний зөв ургалтад чухал үүрэгтэй. Тиймээс сүүн шүдийг эрүүл байлгах нь маш чухал.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Хүүхдийн шүдийг хэрхэн зөв арчлах вэ?</h3>
                <p className="text-gray-600">
                  Хүүхдийн насанд тохирсон шүдний оо, сойзоор өдөрт 2 удаа шүдийг нь угаах, чихэрлэг хүнс, ундааг хязгаарлах, тогтмол шүдний эмчид үзүүлэх нь чухал.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Хүүхэд шүдний эмчээс айж байвал яах вэ?</h3>
                <p className="text-gray-600">
                  Бид хүүхдийн айдсыг ойлгож, тэдэнд тохирсон арга барилаар ажилладаг. Эхлээд эмнэлэгтэй танилцах, тоног төхөөрөмжийг үзүүлэх, хүүхдийн сонирхлыг татах аргуудыг ашигладаг.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600">Өөр асуулт байвал бидэнтэй холбогдоорой</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-dental-500 to-[#86EFAC] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Хүүхдийнхээ шүдний эрүүл мэндийг хамгаалъя</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Хүүхдийн шүдний эрүүл мэнд нь ирээдүйн эрүүл мэндийн үндэс. Одоо цаг захиалж, хүүхдийнхээ шүдний эрүүл мэндийг хамгаалаарай.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-dental-600 hover:bg-gray-100">
              <Link href="/booking">Цаг захиалах</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link href="/contact">Холбоо барих</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}