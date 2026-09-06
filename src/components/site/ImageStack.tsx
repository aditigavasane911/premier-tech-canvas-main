import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ImageStack({ 
  images, 
  className,
  reverse = false 
}: { 
  images: string[]; 
  className?: string;
  reverse?: boolean;
}) {
  const [orderedImages, setOrderedImages] = useState(images);
  const [animating, setAnimating] = useState(false);

  // Allow dynamic updates if props change
  useEffect(() => {
    setOrderedImages(images);
  }, [images]);

  const handleClick = () => {
    if (animating || orderedImages.length <= 1) return;
    setAnimating(true);
    
    // Wait for the 'slide out' animation to complete before reordering
    setTimeout(() => {
      setOrderedImages((prev) => {
        const next = [...prev];
        const first = next.shift();
        if (first) next.push(first);
        return next;
      });
      setAnimating(false);
    }, 300); 
  };

  return (
    <div 
      className={cn("relative mx-auto cursor-pointer select-none", className)} 
      onClick={handleClick}
    >
      {orderedImages.map((src, i) => {
        const isFront = i === 0;
        const isAnimatingOut = animating && isFront;
        
        let styleClasses = "absolute inset-0 w-full h-full object-cover rounded-xl border-[4px] border-white shadow-[0_4px_20px_rgb(0,0,0,0.12)] transition-all duration-400 ease-in-out ";
        
        if (isAnimatingOut) {
            styleClasses += reverse 
              ? " z-50 -translate-x-[110%] -rotate-6 opacity-0 " 
              : " z-50 translate-x-[110%] rotate-6 opacity-0 ";
        } else if (i === 0) {
            styleClasses += " z-40 translate-x-0 translate-y-0 rotate-0 scale-100 ";
        } else if (i === 1) {
            styleClasses += reverse
              ? " z-30 -translate-x-3 -translate-y-2 -rotate-3 scale-[0.96] "
              : " z-30 translate-x-3 -translate-y-2 rotate-3 scale-[0.96] ";
        } else if (i === 2) {
            styleClasses += reverse
              ? " z-20 -translate-x-6 -translate-y-4 -rotate-6 scale-[0.92] "
              : " z-20 translate-x-6 -translate-y-4 rotate-6 scale-[0.92] ";
        } else {
            styleClasses += reverse
              ? " z-10 -translate-x-6 -translate-y-4 -rotate-6 scale-[0.92] opacity-0 "
              : " z-10 translate-x-6 -translate-y-4 rotate-6 scale-[0.92] opacity-0 ";
        }

        return (
          <img 
            key={`${src}-${i}`} 
            src={src} 
            alt="Stack item" 
            className={styleClasses}
            style={{ transitionDuration: '400ms' }}
          />
        );
      })}
    </div>
  );
}
