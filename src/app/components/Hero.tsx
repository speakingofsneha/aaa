'use client';

import Link from 'next/link';
import { useState } from 'react';
import KolamSketch from './KolamSketch';


export default function Hero() {

  return (
    <section className="pt-35 sm:pt-45 relative">
      <div className="relative" style={{ zIndex: 40 }}>
        <KolamSketch />
      </div>
      <div className="max-w-6xl px-4 mx-auto relative z-20">
        {/* Intro text */}
        <div className="max-w-[600px] mx-auto text-start mb-16">
          <div className="text-[1rem] leading-relaxed font-detail text-white">
            <p>hello there! I&apos;m sneha.</p>
            <p className="mt-3">I&apos;m a design engineer drawn to complex, ambigious problems that demand a high bar for craft to (hopefully) change our lives for the better ✦</p>
          </div>
        </div>
        
        {/* Section title */}
        <div className="flex justify-center">
          <div className="font-detail text-base flex items-center text-white" style={{ opacity: 0.5 }}>
           {/* {/* <span>works</span> */}
          </div>
        </div>
      </div>
      
      {/* Progressive blur overlay from top - positioned above content to blur it */}
      <div 
        className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none"
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(200, 50, 70, 0.21)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 15%, rgba(0, 0, 0, 0.9) 30%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.1) 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 15%, rgba(0, 0, 0, 0.9) 30%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.1) 85%, transparent 100%)',
          zIndex: 35
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
            opacity: 0.3
          }}
        ></div>
      </div>
      
      {/* Full-width card stack and envelope container with gradient background */}
      <div 
        className="w-full px-4 relative overflow-hidden -mt-180 pt-180"
        style={{
          background: 'linear-gradient(rgba(140, 140, 170, 0) 0%,rgba(140, 140, 170, 0.85) 75%, rgba(85, 100, 130, 0.9) 98%, #3D4F6C 100%)'
        }}
      >
        {/* Progressive blur overlay - starts transparent and increases */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.8) 80%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.8) 80%, black 100%)'
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay',
              opacity: 0.3
            }}
          ></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-20">
        </div>
      </div>
          </section>
  );
}
