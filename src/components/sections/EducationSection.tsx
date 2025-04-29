"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import { 
  AnimatedTimeline,
  AnimatedTimelineItem,
  TimelineIcon,
  TimelineContent
} from "@/components/ui/timeline";

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  description: string;
  icon: ReactNode;
}

interface EducationSectionProps {
  subtitle: string;
  title: string;
  description: string;
  educationItems: EducationItem[];
}

export default function EducationSection({
  subtitle,
  title,
  description,
  educationItems
}: EducationSectionProps) {
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
    <section ref={sectionRef} className="py-20 md:py-32 bg-dental-50/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-dental-100/50 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-dental-100/30 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="max-w-2xl mb-8 md:mb-0">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-dental-100 text-dental-600 font-medium text-sm">
              {subtitle}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-800">{title}</h2>
            <p className="text-gray-600">
              {description}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatedTimeline>
            {educationItems.map((item, index) => (
              <AnimatedTimelineItem key={index} isActive={isInView}>
                <TimelineIcon isActive={isInView}>
                  {item.icon}
                </TimelineIcon>
                <TimelineContent>
                  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-bold text-xl mb-2 text-dental-800">{item.degree}</h3>
                        <p className="text-gray-600 mb-2">{item.institution}</p>
                      </div>
                      <div className="inline-flex px-4 py-2 rounded-full bg-dental-50 text-dental-600 font-medium text-sm">
                        {item.year}
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm border-t border-gray-100 pt-3 mt-2">{item.description}</p>
                  </div>
                </TimelineContent>
              </AnimatedTimelineItem>
            ))}
          </AnimatedTimeline>
        </div>
      </div>
    </section>
  );
}