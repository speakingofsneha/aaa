/**
 * Wrapper component that uses IntersectionObserver to track when children enter the viewport.
 * Passes an `isVisible` prop to child components when they become visible, enabling
 * scroll-triggered animations or lazy loading. Only passes the prop to React components,
 * not plain DOM elements, to avoid React warnings.
 */
'use client';

import React, { useRef, useState, useEffect, ReactNode } from 'react';

interface IntersectionWrapperProps {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export default function IntersectionWrapper({ 
  children, 
  fullWidth = false,
  className = ''
}: IntersectionWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5, rootMargin: '-100px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Only pass isVisible to components (not DOM elements like div, img, etc.)
          const isDOMElement = typeof child.type === 'string';
          if (!isDOMElement) {
            return React.cloneElement(child as React.ReactElement<{ isVisible?: boolean }>, { isVisible });
          }
        }
        return child;
      })}
    </div>
  );
}
