"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronRight, LucideIcon, MapPin } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
  location: {
    city: string;
    district: string;
  };
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  features,
  imageSrc,
  imageAlt,
  icon: Icon,
  location,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: HeroSectionProps) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="pt-28 pb-12 md:pt-40 md:pb-24 bg-dental-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.8),transparent_60%)]"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-dental-100/50 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-dental-100/30 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              {subtitle}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-dental-800">
              {title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-dental-600">
                {title.split(" ").slice(-1)}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm"
                >
                  <CheckCircle className="text-dental-500" size={16} />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link
                  href={primaryButtonLink}
                  className="flex items-center justify-center"
                >
                  {primaryButtonText} <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-dental-200 text-dental-700 hover:bg-dental-50"
              >
                <a href={secondaryButtonLink} className="flex items-center">
                  {secondaryButtonText}{" "}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="relative h-[250px] sm:h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl order-1 md:order-2 mb-6 md:mb-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-sm rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-dental-100 p-2 rounded-full">
                  <Icon className="w-5 h-5 text-dental-600" />
                </div>
                <div>
                  <h3 className="font-bold text-dental-800">{location.city}</h3>
                  <p className="text-sm text-gray-600">{location.district}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
