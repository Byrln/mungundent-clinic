import { useEffect } from 'react';
import { initSmoothScroll } from '@/lib/smooth-scroll';

/**
 * Hook to initialize smooth scrolling on the page
 * @param offset - Offset from the top of the target element (default: 80px)
 */
export function useSmoothScroll(offset = 80) {
  useEffect(() => {
    // Initialize smooth scrolling
    const cleanup = initSmoothScroll(offset);
    
    // Clean up event listener on component unmount
    return cleanup;
  }, [offset]);
}