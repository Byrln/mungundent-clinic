"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface ProductImage {
  url: string;
  alt?: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  mainImage?: string;
}

export default function ProductImageGallery({ images, mainImage }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Combine main image with additional images
  const allImages = mainImage 
    ? [{ url: mainImage, alt: "Product main image" }, ...images.filter(img => img.url !== mainImage)]
    : images;
  
  // If no images provided, use a placeholder
  const finalImages = allImages.length === 0 
    ? [{ 
        url: "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?q=80&w=1974&auto=format&fit=crop", 
        alt: "Product placeholder" 
      }] 
    : allImages;
  
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? finalImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === finalImages.length - 1 ? 0 : prev + 1));
  };
  
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };
  
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative w-full h-[400px] mb-4 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={finalImages[currentIndex].url}
          alt={finalImages[currentIndex].alt || "Product image"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
          priority
        />
        
        {/* Navigation arrows */}
        {finalImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </>
        )}
        
        {/* Fullscreen button */}
        <button
          onClick={handleFullscreenToggle}
          className="absolute right-2 top-2 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
          aria-label="View fullscreen"
        >
          <ZoomIn className="h-5 w-5 text-gray-700" />
        </button>
      </div>
      
      {/* Thumbnails */}
      {finalImages.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {finalImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                index === currentIndex ? "ring-2 ring-dental-500" : "ring-1 ring-gray-200"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || `Thumbnail ${index + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-5xl p-0 bg-black">
          <div className="relative w-full h-[80vh]">
            <Image
              src={finalImages[currentIndex].url}
              alt={finalImages[currentIndex].alt || "Product image"}
              fill
              sizes="100vw"
              className="object-contain"
            />
            
            {/* Navigation arrows */}
            {finalImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-80 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-900" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-80 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6 text-gray-900" />
                </button>
              </>
            )}
            
            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute right-4 top-4 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-80 transition-all"
              aria-label="Close fullscreen"
            >
              <X className="h-6 w-6 text-gray-900" />
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {finalImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}