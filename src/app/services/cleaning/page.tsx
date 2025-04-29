"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProcessTimeline } from "@/components/ui/process-timeline";
import { useEffect, useRef, useState } from "react";
import { CheckCircle, Clock, Shield, Sparkles, Star } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

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

export default function CleaningServicePage() {
  const [isInView, setIsInView] = useState({
    benefits: false,
    process: false,
    faq: false,
  });

  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Initialize smooth scrolling
  useSmoothScroll(80);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === benefitsRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, benefits: true }));
          } else if (entry.target === processRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, process: true }));
          } else if (entry.target === faqRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, faq: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (benefitsRef.current) observer.observe(benefitsRef.current);
    if (processRef.current) observer.observe(processRef.current);
    if (faqRef.current) observer.observe(faqRef.current);

    return () => observer.disconnect();
  }, []);

  // Benefits data
  const benefits = [
    {
      title: "Эрүүл буйл",
      description: "Шүдний чулуу, өнгө өөрчлөлтийг арилгаж, буйлны эрүүл мэндийг хадгална.",
      icon: <Shield className="h-8 w-8 text-dental-500" />,
    },
    {
      title: "Амьсгалын чанар",
      description: "Амны хөндийн эрүүл ахуйг сайжруулж, амьсгалын чанарыг дээшлүүлнэ.",
      icon: <Sparkles className="h-8 w-8 text-dental-500" />,
    },
    {
      title: "Урьдчилан сэргийлэлт",
      description: "Шүдний өвчин, буйлны үрэвслээс урьдчилан сэргийлнэ.",
      icon: <CheckCircle className="h-8 w-8 text-dental-500" />,
    },
  ];

  // Process steps
  const processSteps = [
    {
      title: "Үзлэг",
      description: "Шүдний эмч таны шүдний байдлыг үзэж, цэвэрлэгээний төлөвлөгөө гаргана.",
      icon: <Clock className="h-6 w-6 text-dental-500" />,
    },
    {
      title: "Ультра авиан цэвэрлэгээ",
      description: "Тусгай багажаар шүдний чулуу, хатуу өнгөрийг арилгана.",
      icon: <Clock className="h-6 w-6 text-dental-500" />,
    },
    {
      title: "Гар аргаар цэвэрлэх",
      description: "Шүдний завсар, буйлны доорх хэсгийг нарийвчлан цэвэрлэнэ.",
      icon: <Clock className="h-6 w-6 text-dental-500" />,
    },
    {
      title: "Өнгөлгөө",
      description: "Шүдний гадаргууг тусгай оргилуураар өнгөлж, гөлгөр болгоно.",
      icon: <Clock className="h-6 w-6 text-dental-500" />,
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "Шүдний цэвэрлэгээг хэр давтамжтай хийлгэх ёстой вэ?",
      answer: "Ерөнхийдөө 6 сар тутамд мэргэжлийн шүдний цэвэрлэгээ хийлгэхийг зөвлөдөг. Гэхдээ таны шүдний эрүүл мэндийн байдлаас хамаарч энэ хугацаа өөрчлөгдөж болно.",
    },
    {
      question: "Шүдний цэвэрлэгээ өвдөх үү?",
      answer: "Ихэнх тохиолдолд шүдний цэвэрлэгээ нь өвдөлтгүй байдаг. Хэрэв таны буйл маш эмзэг бол бага зэргийн эвгүйцэл мэдрэгдэж болох ч эмч тань үүнийг бууруулах арга хэмжээ авах болно.",
    },
    {
      question: "Шүдний цэвэрлэгээний дараа юу анхаарах вэ?",
      answer: "Цэвэрлэгээний дараа 2 цагийн турш хоол идэхээс зайлсхийх, халуун, хүйтэн, хүчтэй амттай хоол, ундаанаас татгалзах, шүдээ зөв арчлах дадлыг хэвшүүлэх нь чухал.",
    },
    {
      question: "Шүдний цэвэрлэгээ хэр удаан үргэлжлэх вэ?",
      answer: "Ерөнхийдөө шүдний цэвэрлэгээ нь 30-60 минут үргэлжилдэг. Гэхдээ таны шүдний байдлаас хамаарч энэ хугацаа өөрчлөгдөж болно.",
    },
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
                <span className="text-dental-700 font-medium text-sm">Урьдчилан сэргийлэх үйлчилгээ</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Мэргэжлийн <span className="text-dental-600 relative">
                  шүдний
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,5 Q25,10 50,5 T100,5" fill="none" stroke="#86EFAC" strokeWidth="4"/>
                  </svg>
                </span> цэвэрлэгээ
              </h1>
              
              <p className="text-gray-600 text-lg mb-8 max-w-xl">
                Мэргэжлийн шүдний цэвэрлэгээ нь шүдний чулуу, өнгө өөрчлөлтийг арилгаж, эрүүл буйлыг хадгалахад тусална. Шүдний өвчин, буйлны үрэвслээс урьдчилан сэргийлэх хамгийн үр дүнтэй арга юм.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="mt-0.5 bg-dental-100 p-2 rounded-full">
                    <CheckCircle className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Мэргэжлийн арга</h3>
                    <p className="text-sm text-gray-500">Орчин үеийн тоног төхөөрөмж</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="mt-0.5 bg-dental-100 p-2 rounded-full">
                    <CheckCircle className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Эрүүл буйл</h3>
                    <p className="text-sm text-gray-500">Буйлны үрэвслээс сэргийлнэ</p>
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
                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop"
                  alt="Шүдний цэвэрлэгээ"
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
                    <span className="font-medium text-sm">Эрүүл буйл</span>
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
                <h3 className="font-bold text-xl text-dental-700 mb-1">30-60 мин</h3>
                <p className="text-sm text-gray-500">Үйлчилгээний хугацаа</p>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-16">
            <motion.a 
              href="#benefits"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center text-gray-400 hover:text-dental-600 transition-colors cursor-pointer"
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-dental-800">Шүдний цэвэрлэгээний давуу талууд</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Тогтмол хийлгэдэг мэргэжлийн шүдний цэвэрлэгээ нь таны шүдний эрүүл мэндэд олон талын ач холбогдолтой.
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

      {/* Process Section */}
      <section id="process" ref={processRef} className="py-16 md:py-24 bg-dental-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              Үйлчилгээний явц
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-dental-800">Шүдний цэвэрлэгээний үе шатууд</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Мэргэжлийн шүдний цэвэрлэгээ нь дараах үе шатуудаас бүрдэнэ.
            </p>
          </div>

          <ProcessTimeline steps={processSteps} isInView={isInView.process} />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" ref={faqRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              Түгээмэл асуултууд
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-dental-800">Шүдний цэвэрлэгээний талаар</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Шүдний цэвэрлэгээний талаар хамгийн түгээмэл асуултуудад хариулъя.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate={isInView.faq ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className="mb-6"
              >
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-lg mb-3 text-dental-800">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Бусад асуулт байвал бидэнтэй холбогдоорой</p>
            <Button asChild size="lg" className="bg-dental-600 hover:bg-dental-700 text-white">
              <Link href="/booking">Цаг захиалах</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}