"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-0", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, children, isActive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative flex gap-6", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ className, children, isActive = false, ...props }, ref) => {
    return (
      <div ref={ref} className="relative" {...props}>
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-[2px] bg-border",
            isActive ? "bg-dental-500" : "bg-gray-200"
          )}
        />
        <div
          className={cn(
            "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-background shadow-md",
            isActive
              ? "border-dental-500 bg-dental-50 text-dental-600"
              : "border-gray-200 bg-gray-50 text-gray-500"
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);
TimelineIcon.displayName = "TimelineIcon";

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 pt-1 pb-10", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineContent.displayName = "TimelineContent";

// Animated Timeline components
interface AnimatedTimelineProps extends TimelineProps {
  isInView?: boolean;
}

const AnimatedTimeline = ({ children, className, isInView = true, ...props }: AnimatedTimelineProps) => {
  return (
    <Timeline className={className} {...props}>
      {children}
    </Timeline>
  );
};

interface AnimatedTimelineItemProps extends TimelineItemProps {
  index?: number;
}

const AnimatedTimelineItem = ({ 
  children, 
  className, 
  isActive = false,
  index = 0,
  ...props 
}: AnimatedTimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
    >
      <TimelineItem className={cn("relative", className)} isActive={isActive} {...props}>
        {children}
      </TimelineItem>
    </motion.div>
  );
};

export {
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineContent,
  AnimatedTimeline,
  AnimatedTimelineItem,
};