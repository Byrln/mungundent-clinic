"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
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

interface TestimonialItem {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

interface TestimonialsSectionProps {
  subtitle: string;
  title: string;
  description: string;
  testimonials: TestimonialItem[];
}

export default function TestimonialsSection({
  subtitle,
  title,
  description,
  testimonials
}: TestimonialsSectionProps) {
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
    <section ref={sectionRef} className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-dental-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic flex-grow">"{testimonial.quote}"</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}