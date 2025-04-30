"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { CheckCircle, Star, ArrowRight } from "lucide-react";

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

export default function ZirconCrownsPage() {
  const [isInView, setIsInView] = useState({
    benefits: false,
    process: false,
    comparison: false,
  });

  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === benefitsRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, benefits: true }));
          } else if (entry.target === processRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, process: true }));
          } else if (entry.target === comparisonRef.current && entry.isIntersecting) {
            setIsInView((prev) => ({ ...prev, comparison: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (benefitsRef.current) observer.observe(benefitsRef.current);
    if (processRef.current) observer.observe(processRef.current);
    if (comparisonRef.current) observer.observe(comparisonRef.current);

    return () => observer.disconnect();
  }, []);

  // Benefits data
  const benefits = [
    {
      title: "Байгалийн харагдац",
      description: "Циркон бүрээс нь байгалийн шүдтэй адил харагдаж, гэрэлд туссан ч ялгаагүй харагдана.",
    },
    {
      title: "Удаан эдэлгээтэй",
      description: "Циркон бүрээс нь маш бат бөх материалаар хийгддэг тул удаан эдэлгээтэй.",
    },
    {
      title: "Биологийн нийцтэй",
      description: "Циркон нь хүний биед хоргүй, харшил үүсгэдэггүй материал юм.",
    },
    {
      title: "Буйлны эрүүл мэнд",
      description: "Циркон бүрээс нь буйлны эрүүл мэндэд сайнаар нөлөөлдөг.",
    },
  ];

  // Process steps
  const processSteps = [
    {
      title: "Үзлэг, зөвлөгөө",
      description: "Эхлээд шүдний үзлэг хийж, циркон бүрээс тавих боломжтой эсэхийг тодорхойлно.",
    },
    {
      title: "Шүд засах",
      description: "Бүрээс тавих шүдийг засаж, хэмжээг тохируулна.",
    },
    {
      title: "Хэв авах",
      description: "Шүдний хэвийг авч, түр зуурын бүрээс тавина.",
    },
    {
      title: "Бүрээс хийх",
      description: "Лабораторид таны шүдний хэв, өнгөнд тохирсон циркон бүрээс хийнэ.",
    },
    {
      title: "Бүрээс тавих",
      description: "Бэлэн болсон циркон бүрээсийг шүдэнд тавьж, тохируулга хийнэ.",
    },
  ];

  // Comparison data
  const comparison = [
    {
      type: "Циркон бүрээс",
      advantages: [
        "Байгалийн шүдтэй адил харагдана",
        "Удаан эдэлгээтэй (10-15 жил)",
        "Биологийн нийцтэй",
        "Буйлны эрүүл мэндэд сайн",
        "Өнгө өөрчлөгддөггүй",
      ],
    },
    {
      type: "Металл-керамик бүрээс",
      advantages: [
        "Бат бөх",
        "Циркон бүрээснээс хямд",
        "Удаан эдэлгээтэй",
        "Шүдний мэдрэг байдлыг бууруулдаг",
      ],
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
                <span className="text-dental-700 font-medium text-sm">Дэвшилтэт технологи</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                <span className="text-dental-600 relative">
                  Циркон
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,5 Q25,10 50,5 T100,5" fill="none" stroke="#86EFAC" strokeWidth="4"/>
                  </svg>
                </span> бүрээс
              </h1>
              
              <p className="text-gray-600 text-lg mb-8 max-w-xl">
                Циркон бүрээс нь орчин үеийн шүдний эмчилгээний нэг хамгийн дэвшилтэт технологи бөгөөд байгалийн шүдтэй адил харагдац, өндөр чанар, удаан эдэлгээгээрээ онцлог.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="mt-0.5 bg-dental-100 p-2 rounded-full">
                    <CheckCircle className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Байгалийн харагдац</h3>
                    <p className="text-sm text-gray-500">Жинхэнэ шүдтэй адил харагдана</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="mt-0.5 bg-dental-100 p-2 rounded-full">
                    <CheckCircle className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Удаан эдэлгээтэй</h3>
                    <p className="text-sm text-gray-500">Бат бөх, удаан хугацаанд эдэлнэ</p>
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
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop"
                  alt="Циркон бүрээс"
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
                    <span className="font-medium text-sm">Биологийн нийцтэй</span>
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
                    <span className="font-medium text-sm">Өндөр чанар</span>
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
                <h3 className="font-bold text-xl text-dental-700 mb-1">10+ жил</h3>
                <p className="text-sm text-gray-500">Эдэлгээний хугацаа</p>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-dental-800">Циркон бүрээсний давуу талууд</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Циркон бүрээс нь олон давуу талтай бөгөөд шүдний эмчилгээний хамгийн дэвшилтэт шийдэл юм.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate={isInView.benefits ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 p-3 bg-dental-50 rounded-full shadow-sm">
                        <Star className="h-6 w-6 text-dental-500" />
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
      <section ref={processRef} className="py-16 md:py-24 bg-dental-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dental-800">Циркон бүрээс хийх үе шатууд</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Циркон бүрээс хийх процесс нь хэд хэдэн үе шаттай бөгөөд ерөнхийдөө 2-3 удаагийн үзлэг шаардагддаг.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate={isInView.process ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex mb-8 last:mb-0"
              >
                <div className="mr-6 relative">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-dental-500 text-white font-bold">
                    {index + 1}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="absolute top-10 bottom-0 left-1/2 w-0.5 -ml-px bg-dental-200"></div>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section ref={comparisonRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dental-800">Бүрээсний төрлүүдийн харьцуулалт</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Циркон бүрээс болон бусад төрлийн бүрээсний харьцуулалт.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate={isInView.comparison ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {comparison.map((item, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-xl mb-4 text-center">{item.type}</h3>
                    <ul className="space-y-2">
                      {item.advantages.map((advantage, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="text-dental-500 mt-0.5 flex-shrink-0" size={18} />
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 md:py-24 bg-dental-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dental-800">Өмнө ба дараа</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Циркон бүрээс тавихаас өмнө ба дараах жишээнүүд.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="relative h-64 md:h-80 mb-4 rounded overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581585095852-97958afb5b3a?q=80&w=2070&auto=format&fit=crop"
                  alt="Циркон бүрээс тавихаас өмнө"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-dental-500 text-white px-3 py-1 rounded">
                  Өмнө
                </div>
              </div>
              <p className="text-center text-gray-600">Эмчилгээний өмнөх байдал</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="relative h-64 md:h-80 mb-4 rounded overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1616099215839-e2b1108e20f1?q=80&w=2070&auto=format&fit=crop"
                  alt="Циркон бүрээс тавьсны дараа"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-dental-500 text-white px-3 py-1 rounded">
                  Дараа
                </div>
              </div>
              <p className="text-center text-gray-600">Циркон бүрээс тавьсны дараах үр дүн</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dental-800">Түгээмэл асуултууд</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Циркон бүрээстэй холбоотой түгээмэл асуултуудын хариулт.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-dental-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Циркон бүрээс хэр удаан эдэлгээтэй вэ?</h3>
                <p className="text-gray-600">
                  Циркон бүрээс нь зөв арчилбал 10-15 жил хүртэл эдэлгээтэй байдаг.
                </p>
              </div>
              <div className="bg-dental-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Циркон бүрээс хийлгэхэд өвддөг үү?</h3>
                <p className="text-gray-600">
                  Циркон бүрээс хийх үед мэдээ алдуулалт хийдэг тул өвдөлтгүй байдаг. Эмчилгээний дараа бага зэргийн мэдрэмтгий байдал үүсч болох ч удаан үргэлжлэхгүй.
                </p>
              </div>
              <div className="bg-dental-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Циркон бүрээс хийлгэсний дараа ямар арчилгаа хийх вэ?</h3>
                <p className="text-gray-600">
                  Циркон бүрээс нь байгалийн шүдтэй адил арчилгаа шаарддаг. Өдөрт 2 удаа шүд угаах, шүдний утсаар цэвэрлэх, тогтмол шүдний эмчид үзүүлэх нь чухал.
                </p>
              </div>
              <div className="bg-dental-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Циркон бүрээс хийлгэхэд хэр удаж вэ?</h3>
                <p className="text-gray-600">
                  Циркон бүрээс хийх бүх процесс нь ерөнхийдөө 1-2 долоо хоног үргэлжилдэг. Эхний үзлэг, хэв авах, бүрээс хийх, тавих гэсэн үе шаттай.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-dental-500 to-[#86EFAC] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Циркон бүрээсний талаар илүү ихийг мэдэхийг хүсч байна уу?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Циркон бүрээсний талаар дэлгэрэнгүй мэдээлэл авах, үнийн санал авахыг хүсвэл бидэнтэй холбогдоорой.
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