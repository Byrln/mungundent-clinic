"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

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

type ProcessStepProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  stepNumber: number;
  isLastStep: boolean;
};

export function ProcessStep({ 
  title, 
  description, 
  icon, 
  stepNumber, 
  isLastStep 
}: ProcessStepProps) {
  return (
    <motion.div 
      variants={fadeIn}
      className="flex items-start gap-4 mb-8 relative"
    >
      {!isLastStep && (
        <div className="absolute left-6 top-12 w-0.5 h-full -z-10 bg-dental-100"></div>
      )}
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-dental-100 flex items-center justify-center shadow-sm">
        {icon ? icon : <span className="font-bold text-dental-600">{stepNumber}</span>}
      </div>
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex-grow">
        <h3 className="font-semibold text-lg mb-2 text-dental-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

type ProcessTimelineProps = {
  steps: {
    title: string;
    description: string;
    icon?: ReactNode;
  }[];
  isInView: boolean;
};

export function ProcessTimeline({ steps, isInView }: ProcessTimelineProps) {
  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="max-w-4xl mx-auto"
    >
      {steps.map((step, index) => (
        <ProcessStep
          key={index}
          title={step.title}
          description={step.description}
          icon={step.icon}
          stepNumber={index + 1}
          isLastStep={index === steps.length - 1}
        />
      ))}
    </motion.div>
  );
}