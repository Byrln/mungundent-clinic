"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Heart } from "lucide-react";
import { useRef, useState, useEffect } from "react";

// Animation variants
const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

interface MissionFeature {
  title: string;
  description: string;
}

interface MissionSectionProps {
  subtitle: string;
  title: string;
  description: string;
  features: MissionFeature[];
  imageSrc: string;
  imageAlt: string;
  imageCaption: {
    title: string;
    subtitle: string;
  };
  isInView?: boolean;
}

export default function MissionSection({
  subtitle,
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  imageCaption,
  isInView: externalIsInView
}: MissionSectionProps) {
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
    <section ref={sectionRef} className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInLeft}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
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
                  <Heart className="text-dental-600 h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-dental-800">{imageCaption.title}</h3>
                  <p className="text-sm text-gray-600">{imageCaption.subtitle}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInRight}
          >
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              {subtitle}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dental-800">{title}</h2>
            <p className="text-gray-600 mb-6 text-lg">
              {description}
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 bg-dental-100 p-2 rounded-full">
                    <CheckCircle className="text-dental-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-dental-800 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}