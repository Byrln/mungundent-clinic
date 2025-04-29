"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

interface StatItemProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

function StatItem({ icon: Icon, value, label }: StatItemProps) {
  return (
    <motion.div variants={scaleIn} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-dental-100 rounded-full flex items-center justify-center mb-4">
          <Icon className="text-dental-600 h-6 w-6" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-dental-800 mb-1">{value}</h3>
        <p className="text-gray-600 text-sm">{label}</p>
      </div>
    </motion.div>
  );
}

interface StatsSectionProps {
  stats: {
    icon: LucideIcon;
    value: string;
    label: string;
  }[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 md:mt-24"
    >
      {stats.map((stat, index) => (
        <StatItem 
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
        />
      ))}
    </motion.div>
  );
}