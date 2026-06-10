"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimateOnScroll({ 
  children, 
  className = "", 
  delay = 0,
  animation = "fade-up" // "fade-up" or "fade-in"
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  animation?: "fade-up" | "fade-in";
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it comes into view
      }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Determine initial styles based on animation type
  const baseStyle = {
    transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)",
    transitionDelay: `${delay}ms`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible 
      ? "translateY(0)" 
      : (animation === "fade-up" ? "translateY(30px)" : "translateY(0)")
  };

  return (
    <div ref={domRef} className={className} style={baseStyle}>
      {children}
    </div>
  );
}
