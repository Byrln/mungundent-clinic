"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ReactNode, useRef, useState, useEffect } from "react";

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface SpecialtyItem {
  name: string;
  description: string;
  icon: ReactNode;
  slug: string;
}

interface SpecialtiesSectionProps {
  subtitle: string;
  title: string;
  description: string;
  specialties: SpecialtyItem[];
  isInView?: boolean;
}

export default function SpecialtiesSection({
  subtitle,
  title,
  description,
  specialties,
  isInView: externalIsInView
}: SpecialtiesSectionProps) {
  const [internalIsInView, setInternalIsInView] = useState(false);
  const isInView = externalIsInView !== undefined ? externalIsInView : internalIsInView;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only set up the observer if we're not using an external isInView prop
    if (externalIsInView !== undefined) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInternalIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [externalIsInView]);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-dental-50/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-dental-100/50 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-dental-100/30 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
            {subtitle}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-800">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {specialties.map((specialty, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 bg-dental-100 rounded-full flex items-center justify-center mb-4">
                  {specialty.icon}
                </div>
                <h3 className="font-bold text-xl mb-2 text-dental-800">{specialty.name}</h3>
                <p className="text-gray-600 flex-grow">{specialty.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link href={`/services/${specialty.slug}`} className="text-dental-600 font-medium flex items-center hover:text-dental-700 transition-colors">
                    Дэлгэрэнгүй <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}