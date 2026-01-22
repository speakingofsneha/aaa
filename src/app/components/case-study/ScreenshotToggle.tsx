/**
 * Toggle component for switching between desktop and mobile screenshot views.
 * Displays a button overlay on desktop screens that allows users to switch between
 * desktop and mobile versions of the same screenshot. On mobile devices, automatically
 * shows the mobile version. Maintains consistent image dimensions regardless of view.
 */
'use client';

import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

interface ScreenshotToggleProps {
  desktopImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  mobileImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  fullWidth?: boolean;
}

export default function ScreenshotToggle({ 
  desktopImage, 
  mobileImage,
  fullWidth = false 
}: ScreenshotToggleProps) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const isMobile = window.innerWidth < 768;
    setIsMobileScreen(isMobile);
    setIsMobileView(isMobile);

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileScreen(isMobile);
      if (isMobile) {
        setIsMobileView(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleView = () => {
    setIsMobileView(!isMobileView);
  };

  const currentImage = isMobileView ? mobileImage : desktopImage;
  // Use desktop image dimensions for both (same canvas size)
  const imageWidth = desktopImage.width;
  const imageHeight = desktopImage.height;

  return (
    <div className={`screenshot-image-wrapper ${fullWidth ? 'full-width' : ''}`} style={{ position: 'relative' }}>
      {isClient && !isMobileScreen && (
        <button 
          className="screenshot-toggle" 
          onClick={handleToggleView} 
          style={{ 
            position: 'absolute', 
            bottom: '0.5rem', 
            right: '0.5rem', 
            zIndex: 10 
          }}
          aria-label="Toggle between desktop and mobile view"
        >
          <div className="screenshot-toggle-switch">
            <div className={`screenshot-toggle-option ${!isMobileView ? 'active' : ''}`}>
              <Monitor size={16} strokeWidth={1.5} />
            </div>
            <div className={`screenshot-toggle-option ${isMobileView ? 'active' : ''}`}>
              <Smartphone size={16} strokeWidth={1.5} />
            </div>
          </div>
        </button>
      )}
      <img
        src={currentImage.src}
        alt={currentImage.alt}
        width={imageWidth}
        height={imageHeight}
        className="screenshot-image"
        loading="lazy"
        style={{
          objectFit: 'cover',
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
}
