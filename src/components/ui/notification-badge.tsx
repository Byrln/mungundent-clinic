"use client";

import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count: number;
  className?: string;
  max?: number;
}

export function NotificationBadge({ 
  count, 
  className, 
  max = 9 
}: NotificationBadgeProps) {
  if (count <= 0) return null;
  
  const displayCount = count > max ? `${max}+` : count.toString();
  
  return (
    <span 
      className={cn(
        "flex items-center justify-center min-w-[1.25rem] h-5 px-1 bg-red-500 text-white text-xs font-medium rounded-full",
        className
      )}
    >
      {displayCount}
    </span>
  );
}