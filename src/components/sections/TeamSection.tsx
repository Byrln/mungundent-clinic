"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

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

interface TeamMember {
  name: string;
  role: string;
  image: string;
  specialties: string[];
  slug?: string;
}

interface TeamSectionProps {
  subtitle: string;
  title: string;
  description: string;
  teamMembers: TeamMember[];
}

export default function TeamSection({
  subtitle,
  title,
  description,
  teamMembers
}: TeamSectionProps) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="py-20 md:py-32 bg-dental-50/50 relative overflow-hidden">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-80">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-1 text-dental-800">{member.name}</h3>
                <p className="text-dental-600 mb-3">{member.role}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.specialties.map((specialty, i) => (
                    <span key={i} className="bg-dental-50 text-dental-600 text-xs px-3 py-1 rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full border-dental-200 text-dental-700 hover:bg-dental-50">
                  {member.slug ? (
                    <Link href={`/doctors/${member.slug}`} className="flex items-center justify-center">
                      Дэлгэрэнгүй <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  ) : (
                    <Link href="/booking" className="flex items-center justify-center">
                      Цаг захиалах <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}