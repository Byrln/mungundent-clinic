"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Award,
  CheckCircle,
  ChevronRight,
  Heart,
  Star,
  Stethoscope,
  MapPin,
  Baby,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Facebook,
} from "lucide-react";
// Import our modular sections
import ContactSection from "@/components/sections/ContactSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // Refs for intersection observer
  const heroRef = useRef(null);
  const doctorRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const galleryRef = useRef(null);
  const blogRef = useRef(null);

  // State to track if sections are in view
  const [isInView, setIsInView] = useState({
    hero: false,
    doctor: false,
    services: false,
    testimonials: false,
    gallery: false,
    blog: false,
  });

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetId =
            entry.target.id ||
            (entry.target === heroRef.current
              ? "hero"
              : entry.target === doctorRef.current
              ? "doctor"
              : entry.target === servicesRef.current
              ? "services"
              : entry.target === testimonialsRef.current
              ? "testimonials"
              : entry.target === galleryRef.current
              ? "gallery"
              : entry.target === blogRef.current
              ? "blog"
              : null);

          if (targetId) {
            setIsInView((prev) => ({
              ...prev,
              [targetId]: entry.isIntersecting,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (doctorRef.current) observer.observe(doctorRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (galleryRef.current) observer.observe(galleryRef.current);
    if (blogRef.current) observer.observe(blogRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (doctorRef.current) observer.unobserve(doctorRef.current);
      if (servicesRef.current) observer.unobserve(servicesRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
      if (galleryRef.current) observer.unobserve(galleryRef.current);
      if (blogRef.current) observer.unobserve(blogRef.current);
    };
  }, []);

  // Hero section data
  const heroData = {
    title: "Таны инээмсэглэл бидний бахархал",
    description:
      "Мөнгөндент шүдний эмнэлэг нь хүүхэд, насанд хүрэгчдэд зориулсан шүдний иж бүрэн үйлчилгээг үзүүлж байна. Бид олон улсын стандартад нийцсэн тоног төхөөрөмж, материал ашиглан, өндөр чанартай үйлчилгээг санал болгодог.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
    primaryButtonText: "Цаг захиалах",
    primaryButtonLink: "/booking",
    secondaryButtonText: "Бидэнтэй холбогдох",
    secondaryButtonLink: "/contact",
  };

  // Doctor profile data
  const doctorData = {
    name: "Эмч Мөнгөнзул",
    title: "Шүдний их эмч, Эмнэлгийн захирал",
    description:
      "20+ жилийн туршлагатай, хүүхдэд ээлтэй, өндөр мэдрэмжтэй эмч. Монгол Улсын Анагаахын Шинжлэх Ухааны Их Сургуулийг төгссөн бөгөөд хүүхдийн шүдний эмчилгээ, циркон бүрээсний чиглэлээр мэргэшсэн.",
    image:
      "/images/portrait1.jpg",
    buttonText: "Дэлгэрэнгүй унших",
    buttonLink: "/mungunzul",
  };

  // Services data
  const services = [
    {
      title: "Хүүхдийн найрсаг эмчилгээ",
      description: "Стрессгүй, тайван орчинд хийгддэг хүүхдийн шүдний эмчилгээ",
      icon: <Baby className="text-dental-600" size={24} />,
      link: "/services/children-dentistry",
    },
    {
      title: "Циркон бүрээс",
      description: "Байгалийн мэт цагаан өнгө, бат бөх чанартай циркон бүрээс",
      icon: <Stethoscope className="text-dental-600" size={24} />,
      link: "/services/zircon",
    },
    {
      title: "Бусад үйлчилгээ",
      description: "Шүдний цэвэрлэгээ, цооролын эмчилгээ гэх мэт",
      icon: <Sparkles className="text-dental-600" size={24} />,
      link: "/services",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Батболд Д.",
      text: "Хүүхэд маань айхгүй, сэтгэл хангалуун гарсан! Эмч нар маш мэргэжлийн, тоног төхөөрөмж нь орчин үеийн.",
      rating: 5,
      date: "2023-10-15",
    },
    {
      name: "Оюунчимэг Б.",
      text: "Цагтаа эхэлдэг, эмчилгээ маш мэргэжлийн. Хүүхдийн шүдний эмчилгээ хийлгэсэн, маш сайн үйлчилсэн.",
      rating: 5,
      date: "2023-09-22",
    },
    {
      name: "Ганбаатар Т.",
      text: "Циркон бүрээс хийлгэсэн, үр дүн маш сайн байна. Байгалийн шүдтэй адилхан харагдаж байна.",
      rating: 5,
      date: "2023-11-05",
    },
  ];

  // Gallery data
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=2069&auto=format&fit=crop",
      alt: "Үзлэгийн өрөө",
      title: "Үзлэгийн өрөө",
    },
    {
      src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop",
      alt: "Тоног төхөөрөмж",
      title: "Орчин үеийн тоног төхөөрөмж",
    },
    {
      src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop",
      alt: "Хүлээлгийн өрөө",
      title: "Тав тухтай хүлээлгийн өрөө",
    },
    {
      src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=1970&auto=format&fit=crop",
      alt: "Хүүхдийн өрөө",
      title: "Хүүхдэд ээлтэй орчин",
    },
    {
      src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=2070&auto=format&fit=crop",
      alt: "Багийн гишүүд",
      title: "Мэргэжлийн баг",
    },
    {
      src: "https://images.unsplash.com/photo-1571772996211-2f02974a9f91?q=80&w=2070&auto=format&fit=crop",
      alt: "Эмчилгээний өрөө",
      title: "Эмчилгээний өрөө",
    },
  ];

  // Blog posts data
  const blogPosts = [
    {
      title: "Шүдний арчилгааны зөвлөгөө",
      excerpt:
        "Өдөр бүр шүдээ зөв арчих нь шүдний эрүүл мэндийг хадгалах хамгийн чухал алхам юм.",
      image:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop",
      link: "/blog/dental-care-tips",
    },
    {
      title: "Хүүхдийн шүдний эрүүл мэнд",
      excerpt:
        "Хүүхдийн шүдний эрүүл мэндийг хэрхэн хамгаалах вэ? Энэхүү нийтлэлд хүүхдийн шүдний арчилгааны талаар зөвлөгөө өгөх болно.",
      image:
        "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=1970&auto=format&fit=crop",
      link: "/blog/children-dental-health",
    },
    {
      title: "Циркон бүрээсний давуу тал",
      excerpt:
        "Циркон бүрээс нь байгалийн шүдтэй адил харагдах, удаан эдэлгээтэй байх зэрэг олон давуу талтай.",
      image:
        "https://images.unsplash.com/photo-1571772996211-2f02974a9f91?q=80&w=2070&auto=format&fit=crop",
      link: "/blog/zircon-crowns",
    },
  ];

  // CTA section data
  const ctaData = {
    title: "Шүдний эрүүл мэнд бол таны гэр бүлийн үнэт зүйл",
    description:
      "Мөнгөндент эмнэлэгт хандаж, мэргэжлийн зөвлөгөө авахыг хүсвэл одоо цаг захиалаарай.",
    primaryButtonText: "Цаг захиалах",
    primaryButtonLink: "/booking",
    secondaryButtonText: "Холбоо барих",
    secondaryButtonLink: "/contact",
    backgroundImage:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop",
  };

  // Contact section data
  const contactData = {
    subtitle: "Холбоо барих",
    title: "Бидэнтэй холбогдох",
    description:
      "Та манай эмнэлэгтэй доорх хаягаар холбогдох боломжтой. Бид таны асуултад хариулахад үргэлж бэлэн байна.",
    clinicInfo: {
      address:
        "Улаанбаатар хот, Хан-Уул дүүрэг, Маршал хотхон, King Tower-125",
      phone: "+976 7720 0888",
      email: "mungundent@gmail.com",
      hours: "Даваа-Баасан: 09:00-18:00, Бямба: 10:00-15:00, Ням: Амарна",
    },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d504.94960863510994!2d106.92938761763024!3d47.8941491859986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96932b21a25bbf%3A0xf22271ea8319a1ec!2sMungun%20Dent%20-%20Family%20Dental!5e1!3m2!1smn!2smn!4v1745940598158!5m2!1smn!2smn",
  };

  return (
    <>
      {/* 1. Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative py-20 md:py-28 overflow-hidden bg-dental-50"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-dental-100/50 rounded-bl-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-dental-100/30 rounded-tr-[100px]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              className="order-2 md:order-1"
            >
              <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
                Мөнгөндент Шүдний Эмнэлэг
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dental-800">
                {heroData.title}
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                {heroData.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-dental-100 p-2 rounded-full">
                    <CheckCircle className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <p className="text-gray-600">Мэргэжлийн баг</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-dental-100 p-2 rounded-full">
                    <CheckCircle className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <p className="text-gray-600">Орчин үеийн тоног төхөөрөмж</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-dental-100 p-2 rounded-full">
                    <CheckCircle className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <p className="text-gray-600">Хүүхдэд ээлтэй орчин</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link
                    href={heroData.primaryButtonLink}
                    className="flex items-center justify-center"
                  >
                    {heroData.primaryButtonText}{" "}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link
                    href={heroData.secondaryButtonLink}
                    className="flex items-center justify-center"
                  >
                    {heroData.secondaryButtonText}{" "}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="order-1 md:order-2"
            >
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={heroData.image}
                  alt="Мөнгөндент шүдний эмнэлэг"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-sm rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-dental-100 p-2 rounded-full">
                      <MapPin className="text-dental-600 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dental-800">
                        Улаанбаатар хот
                      </h3>
                      <p className="text-sm text-gray-600">Хан-Уул дүүрэг, Маршал хотхон, King Tower-125</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. About Dr. Мөнгөнзул */}
      <section id="doctor" ref={doctorRef} className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={isInView.doctor ? "visible" : "hidden"}
              variants={fadeInLeft}
            >
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={doctorData.image}
                  alt={doctorData.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-sm rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-dental-100 p-2 rounded-full">
                      <Stethoscope className="text-dental-600 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dental-800">
                        {doctorData.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {doctorData.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isInView.doctor ? "visible" : "hidden"}
              variants={fadeInRight}
            >
              <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
                Эмчийн танилцуулга
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dental-800">
                {doctorData.name}
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                {doctorData.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-dental-100 p-2 rounded-full">
                    <GraduationCap className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-dental-800 mb-1">
                      Өндөр боловсролтой
                    </h3>
                    <p className="text-gray-600">
                      Монгол Улсын Анагаахын Шинжлэх Ухааны Их Сургуулийг
                      төгссөн
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-dental-100 p-2 rounded-full">
                    <Award className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-dental-800 mb-1">
                      Мэргэшсэн
                    </h3>
                    <p className="text-gray-600">
                      Хүүхдийн шүдний эмчилгээ, циркон бүрээсний чиглэлээр
                      мэргэшсэн
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-dental-100 p-2 rounded-full">
                    <Heart className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-dental-800 mb-1">
                      Хүүхдэд ээлтэй
                    </h3>
                    <p className="text-gray-600">
                      Хүүхдүүдтэй ажиллах өндөр ур чадвартай, тэднийг тайвшруулж
                      чаддаг
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild>
                <Link
                  href={doctorData.buttonLink}
                  className="flex items-center justify-center"
                >
                  {doctorData.buttonText}{" "}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Our Services Overview */}
      <section
        id="services"
        ref={servicesRef}
        className="py-20 md:py-32 bg-dental-50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              Үйлчилгээ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-800">
              Бидний үйлчилгээ
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Бид хүүхэд, насанд хүрэгчдэд зориулсан шүдний иж бүрэн үйлчилгээг
              үзүүлж байна.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate={isInView.services ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-dental-100 rounded-full flex items-center justify-center mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-dental-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Link
                      href={service.link}
                      className="text-dental-600 font-medium inline-flex items-center hover:text-dental-700"
                    >
                      Дэлгэрэнгүй <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link
                href="/services"
                className="flex items-center justify-center"
              >
                Бүх үйлчилгээг харах <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Testimonials / Сэтгэгдэл */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        className="py-20 md:py-32"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              Сэтгэгдэл
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-800">
              Үйлчлүүлэгчдийн сэтгэгдэл
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Манай үйлчлүүлэгчдийн сэтгэгдлийг уншаарай.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate={isInView.testimonials ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="text-yellow-400 h-5 w-5 fill-current"
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(testimonial.date).toLocaleDateString("mn-MN")}
                      </div>
                    </div>
                    <div className="mb-4">
                      <MessageCircle className="text-dental-600 h-8 w-8 mb-2" />
                      <p className="text-gray-600 italic">
                        "{testimonial.text}"
                      </p>
                    </div>
                    <div className="font-bold text-dental-800">
                      {testimonial.name}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Call to Action (Mid-page) */}
      <section className="py-16 md:py-24 bg-dental-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {ctaData.title}
            </h2>
            <p className="text-lg mb-8 text-white/80">{ctaData.description}</p>
            <Button
              asChild
              size="lg"
              className="bg-white text-dental-600 hover:bg-white/90"
            >
              <Link href={ctaData.primaryButtonLink}>
                {ctaData.primaryButtonText}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Image Gallery / Clinic Preview */}
      <section id="gallery" ref={galleryRef} className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              Зургийн цомог
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-800">
              Эмнэлгийн орчин
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Манай эмнэлгийн орчин, тоног төхөөрөмж, багийн гишүүдтэй танилцана
              уу.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate={isInView.gallery ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="relative h-64 rounded-lg overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold">{image.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Blog or Social Proof Section */}
      <section
        id="blog"
        ref={blogRef}
        className="py-20 md:py-32 bg-dental-50/50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              Зөвлөгөө
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-800">
              Шүдний арчилгааны зөвлөгөө
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Шүдний эрүүл мэндийн талаар хамгийн сүүлийн үеийн мэдээлэл,
              зөвлөгөөг уншаарай.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate={isInView.blog ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {blogPosts.map((post, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-dental-800">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link
                      href={post.link}
                      className="text-dental-600 font-medium inline-flex items-center hover:text-dental-700"
                    >
                      Дэлгэрэнгүй унших <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link
                href="https://www.facebook.com/mongondent"
                className="flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook хуудсаар зочлох <Facebook className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Contact & Map Section */}
      <ContactSection {...contactData} />
    </>
  );
}
