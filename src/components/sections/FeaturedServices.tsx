"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

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

type FeaturedService = {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  link: string;
};

type FeaturedServicesProps = {
  services: FeaturedService[];
  isInView: boolean;
};

export default function FeaturedServices({ services, isInView }: FeaturedServicesProps) {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-dental-50/50 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-dental-50/30 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
            Онцлох үйлчилгээнүүд
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-dental-800">
            Манай эмнэлгийн онцлох үйлчилгээнүүд
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Бид таны шүдний эрүүл мэндийг хамгаалах, гоо үзэмжийг нэмэгдүүлэх шилдэг үйлчилгээнүүдийг санал болгож байна.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
                <Link href={service.link} className="block h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      {service.icon}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-dental-800 group-hover:text-dental-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <div className="flex items-center text-dental-600 text-sm font-medium">
                      <span>Дэлгэрэнгүй</span>
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}