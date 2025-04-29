"use client";

import { GraduationCap, Calendar, Award, Users, Stethoscope, Star, CheckCircle } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

// Import our modular sections
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import MissionSection from "@/components/sections/MissionSection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SpecialtiesSection from "@/components/sections/SpecialtiesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import CTASection from "@/components/sections/CTASection";

export default function DoctorMungunzulPage() {
  // Initialize smooth scrolling
  useSmoothScroll(80);

  // Hero section data
  const heroData = {
    title: "Мөнгөнзул Эмч",
    subtitle: "Ерөнхий эмч, Эзэмшигч",
    description: "Мөнгөнзул эмч нь 10 гаруй жилийн туршлагатай, хүүхдийн шүдний эмчилгээ болон циркон бүрээсний чиглэлээр мэргэшсэн шүдний их эмч юм. Тэрээр Монгол Улсын Анагаахын Шинжлэх Ухааны Их Сургууль, Солонгос, Японд суралцаж, мэргэжил дээшлүүлсэн.",
    features: [
      "Хүүхдийн шүдний эмчилгээний мэргэшил",
      "Циркон бүрээсний мэргэшил",
      "10 гаруй жилийн туршлага"
    ],
    imageSrc: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Мөнгөнзул эмч",
    location: {
      city: "Улаанбаатар хот",
      district: "Сүхбаатар дүүрэг"
    },
    primaryButtonText: "Цаг захиалах",
    primaryButtonLink: "/booking",
    secondaryButtonText: "Боловсрол харах",
    secondaryButtonLink: "#education"
  };

  // Stats section data
  const statsData = {
    stats: [
      {
        icon: Users,
        value: "1000+",
        label: "Үйлчлүүлэгч"
      },
      {
        icon: Stethoscope,
        value: "10+",
        label: "Жилийн туршлага"
      },
      {
        icon: Star,
        value: "5+",
        label: "Мэргэшил"
      },
      {
        icon: Calendar,
        value: "2019",
        label: "Эмнэлэг нээсэн"
      }
    ]
  };

  // Mission section data
  const missionData = {
    subtitle: "Миний зорилго",
    title: "Эрүүл шүд, гоё инээмсэглэл",
    description: "Миний зорилго бол хүн бүрт чанартай, хүртээмжтэй шүдний эмчилгээг хүргэх явдал юм. Би үйлчлүүлэгч бүрт тав тухтай, айдасгүй орчинд шүдний эмчилгээ хийлгэх боломжийг олгодог.",
    features: [
      {
        title: "Чанартай үйлчилгээ",
        description: "Би олон улсын стандартад нийцсэн, өндөр чанартай материал, тоног төхөөрөмж ашиглан үйлчилгээ үзүүлдэг."
      },
      {
        title: "Хүүхдэд ээлтэй орчин",
        description: "Хүүхдүүд шүдний эмчээс айдаггүй, тав тухтай орчинд эмчилгээ хийлгэх боломжийг бүрдүүлдэг."
      },
      {
        title: "Тасралтгүй суралцах",
        description: "Би шинэ технологи, арга барил, материалуудын талаар тасралтгүй суралцаж, мэргэжлээ дээшлүүлдэг."
      }
    ],
    imageSrc: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Мөнгөнзул эмчийн зорилго",
    imageCaption: {
      title: "Таны инээмсэглэл миний зорилго",
      subtitle: "Би таны эрүүл мэндэд анхаардаг"
    }
  };

  // Education section data
  const educationData = {
    subtitle: "Боловсрол",
    title: "Мэргэжлийн боловсрол",
    description: "Би дотоод, гадаадын нэр хүндтэй их сургуулиудад суралцаж, мэргэжлийн өндөр түвшинд хүрсэн.",
    educationItems: [
      {
        degree: "Шүдний их эмч",
        institution: "Монгол Улсын Анагаахын Шинжлэх Ухааны Их Сургууль",
        year: "2010-2015",
        description: "Шүдний анагаах ухааны бакалавр, магистрын зэрэг",
        icon: <GraduationCap className="h-6 w-6" />
      },
      {
        degree: "Хүүхдийн шүдний эмчилгээний мэргэшил",
        institution: "Сөүлийн Их Сургууль, БНСУ",
        year: "2016-2017",
        description: "Хүүхдийн шүдний эмчилгээний тусгай мэргэшил",
        icon: <GraduationCap className="h-6 w-6" />
      },
      {
        degree: "Циркон бүрээсний мэргэшил",
        institution: "Токиогийн Шүдний Анагаахын Их Сургууль, Япон",
        year: "2018",
        description: "Циркон бүрээс, шүдний эстетик сэргээх эмчилгээний мэргэшил",
        icon: <GraduationCap className="h-6 w-6" />
      },
    ]
  };

  // Experience section data
  const experienceData = {
    subtitle: "Туршлага",
    title: "Ажлын туршлага",
    description: "Би олон жилийн турш төрийн болон хувийн эмнэлгүүдэд ажиллаж, өргөн туршлага хуримтлуулсан.",
    experienceItems: [
      {
        position: "Ерөнхий шүдний эмч",
        institution: "Улсын Нэгдүгээр Төв Эмнэлэг",
        year: "2015-2017",
        description: "Ерөнхий шүдний эмчилгээ, яаралтай тусламж үзүүлэх",
        icon: <Calendar className="h-6 w-6" />
      },
      {
        position: "Хүүхдийн шүдний эмч",
        institution: "Хүүхдийн Төв Эмнэлэг",
        year: "2017-2019",
        description: "Хүүхдийн шүдний эмчилгээ, урьдчилан сэргийлэх үйлчилгээ",
        icon: <Calendar className="h-6 w-6" />
      },
      {
        position: "Ерөнхий эмч, Эзэмшигч",
        institution: "Мөнгөндент шүдний эмнэлэг",
        year: "2019-одоог хүртэл",
        description: "Эмнэлгийн үйл ажиллагааг удирдах, шүдний тусгай эмчилгээ хийх",
        icon: <Calendar className="h-6 w-6" />
      },
    ]
  };

  // Specialties section data
  const specialtiesData = {
    subtitle: "Мэргэшил",
    title: "Мэргэшсэн чиглэлүүд",
    description: "Би шүдний эмчилгээний олон чиглэлээр мэргэшсэн бөгөөд ялангуяа хүүхдийн шүдний эмчилгээ, циркон бүрээсний чиглэлээр өндөр ур чадвартай.",
    specialties: [
      {
        name: "Хүүхдийн шүдний эмчилгээ",
        description: "Хүүхдийн шүдний өвчин, гажиг засал, урьдчилан сэргийлэх үйлчилгээ",
        icon: <Award className="text-dental-600" size={20} />,
        slug: "children-dentistry"
      },
      {
        name: "Циркон бүрээс",
        description: "Өндөр чанартай, байгалийн шүдтэй адил харагдах циркон бүрээс",
        icon: <Award className="text-dental-600" size={20} />,
        slug: "zircon"
      },
      {
        name: "Шүдний цэвэрлэгээ",
        description: "Мэргэжлийн гүн цэвэрлэгээ, өнгө арилгах үйлчилгээ",
        icon: <Award className="text-dental-600" size={20} />,
        slug: "cleaning"
      },
      {
        name: "Шүдний ломбо",
        description: "Өндөр чанартай, удаан эдэлгээтэй ломбоны материал",
        icon: <Award className="text-dental-600" size={20} />,
        slug: "filling"
      },
      {
        name: "Шүдний гажиг засал",
        description: "Шүдний эгнээ засах, гажиг засах эмчилгээ",
        icon: <Award className="text-dental-600" size={20} />,
        slug: "orthodontics"
      },
      {
        name: "Шүдний суулгац",
        description: "Орчин үеийн технологи ашиглан шүдний суулгац хийх",
        icon: <Award className="text-dental-600" size={20} />,
        slug: "implants"
      },
    ]
  };

  // Testimonials section data
  const testimonialsData = {
    subtitle: "Сэтгэгдэл",
    title: "Үйлчлүүлэгчдийн сэтгэгдэл",
    description: "Миний үйлчлүүлэгчдийн сэтгэгдлийг уншиж, үйлчилгээний чанарыг мэдэрнэ үү.",
    testimonials: [
      {
        name: "Болормаа Д.",
        role: "Үйлчлүүлэгч",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
        quote: "Мөнгөнзул эмч маш мэргэжлийн өндөр түвшинд үйлчилгээ үзүүлдэг. Миний хүүхдийн шүдийг эмчилсэн, хүүхэд маань огт айгаагүй.",
        rating: 5
      },
      {
        name: "Баатар Б.",
        role: "Үйлчлүүлэгч",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
        quote: "Циркон бүрээс хийлгэсэн, үр дүн маш сайн байна. Байгалийн шүдтэй ялгаагүй харагддаг.",
        rating: 5
      },
      {
        name: "Оюунчимэг Т.",
        role: "Үйлчлүүлэгч",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
        quote: "Шүдний цэвэрлэгээ хийлгэсэн, маш сайн үйлчилгээ байсан. Эмч нарийн тайлбарлаж, зөвлөгөө өгсөн.",
        rating: 5
      },
    ]
  };

  // Contact section data
  const contactData = {
    subtitle: "Холбоо барих",
    title: "Надтай холбогдох",
    description: "Та надтай доорх хаягаар холбогдох боломжтой. Би таны асуултад хариулахад үргэлж бэлэн байна.",
    clinicInfo: {
      address: "Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Чингисийн өргөн чөлөө 15, 301 тоот",
      phone: "+976 9911 2233",
      email: "info@mongondent.mn",
      hours: "Даваа-Баасан: 09:00-18:00, Бямба: 10:00-15:00"
    },
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d504.94960863510994!2d106.92938761763024!3d47.8941491859986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96932b21a25bbf%3A0xf22271ea8319a1ec!2sMungun%20Dent%20-%20Family%20Dental!5e1!3m2!1smn!2smn!4v1745940598158!5m2!1smn!2smn"
  };

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

  return (
    <>
      {/* Hero Section */}
      <HeroSection {...heroData} />
      
      {/* Stats Section */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <StatsSection {...statsData} />
      </div>

      {/* Mission Section */}
      <MissionSection {...missionData} />

      {/* Education Section */}
      <section id="education">
        <EducationSection {...educationData} />
      </section>

      {/* Experience Section */}
      <ExperienceSection {...experienceData} />

      {/* Specialties Section */}
      <SpecialtiesSection {...specialtiesData} />

      {/* Testimonials Section */}
      <TestimonialsSection {...testimonialsData} />

      {/* Contact Section */}
      <ContactSection {...contactData} />

      {/* CTA Section */}
      <CTASection {...ctaData} />
    </>
  );
}