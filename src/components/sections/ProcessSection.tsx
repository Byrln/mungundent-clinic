"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, LucideIcon } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type ProcessStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ProcessSectionProps = {
  title: string;
  description: string;
  steps: ProcessStep[];
  ctaLink?: string;
  ctaText?: string;
};

export default function ProcessSection({
  title,
  description,
  steps,
  ctaLink = "/booking",
  ctaText = "Цаг захиалах",
}: ProcessSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-dental-50/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-dental-100/30 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-dental-100/20 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
            Таны аюулгүй байдал бидний тэргүүн зорилго
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dental-800">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {description}
          </p>
        </div>

        {/* Desktop Process Steps - Hidden on Mobile */}
        <div className="hidden md:grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-dental-100 hover:border-dental-200 group hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-full bg-dental-500 flex items-center justify-center text-white mb-4 mx-auto group-hover:bg-dental-600 transition-colors">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dental-600 text-white flex items-center justify-center font-bold text-sm">{index + 1}</div>
                  <h3 className="text-xl font-bold mb-3 text-dental-800 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-dental-500 to-dental-300 transform -translate-y-1/2 z-0"></div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Process Steps - Visible only on Mobile */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-xl shadow-lg p-5 border border-dental-100 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dental-600 text-white flex items-center justify-center font-bold text-sm shadow-md">{index + 1}</div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-full bg-dental-500 flex-shrink-0 flex items-center justify-center text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-dental-800">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm ml-[4.5rem]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {ctaLink && ctaText && (
          <div className="mt-16 text-center">
            <Button asChild className="bg-dental-600 hover:bg-dental-700 shadow-lg shadow-dental-500/20">
              <Link href={ctaLink} className="flex items-center">
                {ctaText} <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}