'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BackButton from '../components/case-study/BackButton';
import '../components/case-study/styles.css';

export default function About() {
  return (
    <motion.main className="min-h-screen flex items-center justify-center py-8 relative">
      {/* Back Button - Fixed at top */}
      <div className="back-button-container">
        <BackButton href="/" />
      </div>

      <div className="w-full max-w-md lg:max-w-6xl mx-auto px-4 lg:px-8">
        {/* Mobile: Stacked layout, Desktop: Side by side */}
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          {/* Image */}
          <div className="flex justify-center lg:flex-1 lg:justify-center order-1 lg:order-1">
            <div className="relative w-full max-w-xs lg:max-w-lg">
              <Image
                src="/aboutme.png"
                alt="sneha standing in a garden"
                width={600}
                height={600}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center lg:flex-1 order-2 lg:order-2 w-full">
            <div className="text-[#4B4A4A] text-base leading-relaxed text-left">
              <p className="mt-6 mb-6">
                I&apos;m currently in my senior year at usyd, majoring in interaction design &amp; psychological science.
                I'm not sure what I am yet- an artist, designer, writer... developer 🤢 ? 
              </p>

              <p className="mb-6">
                What I do know is that pixels, &quot;words&quot;, &lt;code&gt;, and their interactions are mediums through which I make sense of the world today and find clarity. 
              </p>

              <p className="mb-6">
                What sets me apart is my curiosity beyond the world of design; understanding human limitation (cog sci), diving into code, prototyping with LLMs and extensively documenting decisions are a regular part of my process.
              </p>  

              {/* 
              <p className="mb-6">
                Not to conform to sterotupers, but i come from a family of engineers. Growing up, anthing stem related appalled me, and i was always drawn towards the arts. 
                The only thing i remember about highschool mathematics was drawing through the class to keep myself awake. In highschool, 
              </p> 
              */}   
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
