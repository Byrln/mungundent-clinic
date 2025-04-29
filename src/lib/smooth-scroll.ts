/**
 * Smoothly scrolls to the specified element ID with customizable options
 * 
 * @param elementId - The ID of the element to scroll to (without the # prefix)
 * @param options - Optional configuration for the scroll behavior
 */
export function smoothScrollTo(
  elementId: string,
  options: {
    offset?: number;  // Offset from the top of the element (in pixels)
    duration?: number; // Duration of the animation (in milliseconds)
    callback?: () => void; // Function to call after scrolling completes
  } = {}
) {
  // Prevent default behavior if called from an event handler
  if (event) {
    event.preventDefault();
  }

  const {
    offset = 0,
    duration = 800,
    callback
  } = options;

  // Get the target element
  const targetElement = document.getElementById(elementId);
  
  if (!targetElement) {
    console.warn(`Element with id "${elementId}" not found.`);
    return;
  }

  // Calculate the target position
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  // Easing function for smooth animation
  function easeInOutCubic(t: number): number {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Animation function
  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition + distance * easeProgress);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      // Call the callback function if provided
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Hook up smooth scrolling to all anchor links that point to IDs on the page
 * This should be called once when the page loads
 */
export function initSmoothScroll(offset = 80) {
  if (typeof window === 'undefined') return;

  // Function to handle click events on anchor links
  const handleAnchorClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    
    if (!anchor) return;
    
    const href = anchor.getAttribute('href');
    
    // Only handle links that start with # or have a hash fragment
    if (!href) return;
    
    // Handle both #section and /page#section formats
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;
    
    const hash = href.substring(hashIndex + 1);
    
    // Check if the hash exists on the current page
    if (!hash || !document.getElementById(hash)) return;
    
    // If it's a same-page link, use smooth scroll
    if (hashIndex === 0 || window.location.pathname === href.substring(0, hashIndex)) {
      e.preventDefault();
      smoothScrollTo(hash, { offset });
    }
  };

  // Add event listener to the document
  document.addEventListener('click', handleAnchorClick);
  
  // Return a cleanup function
  return () => {
    document.removeEventListener('click', handleAnchorClick);
  };
}