'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getWorkExperience } from './work';

export default function WorkSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const workExperience = getWorkExperience();

  const categories = ['all', 'product', 'frontend', 'misc'];

  // Filter work experience based on active category
  const filteredWork = activeCategory === 'all' 
    ? workExperience 
    : workExperience.filter(work => 
        work.categories.includes(activeCategory as 'product' | 'frontend'| 'misc')
      );

  // Helper function to create SVG placeholder
  const createPlaceholder = (width: number, height: number, text: string) => {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#E5E7EB"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#9CA3AF" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>`;
    // Encode SVG for data URI (browser-compatible)
    const encoded = encodeURIComponent(svg);
    return `data:image/svg+xml,${encoded}`;
  };

  // Map work projects to their multiple images
  const getWorkImages = (workId: string) => {
    const imageMap: { [key: string]: string[] } = {
      reframe: [
        createPlaceholder(800, 600, 'Main'),
        createPlaceholder(400, 600, ' 1'),
        createPlaceholder(400, 600, ' 2')
      ],
      atmos: [
        createPlaceholder(800, 600, ' Main'),
        createPlaceholder(400, 600, ' 1'),
        createPlaceholder(400, 600, ' 2')
      ],
      olympal: [
        createPlaceholder(800, 600, ' Main'),
        createPlaceholder(400, 600, ' 1'),
        createPlaceholder(400, 600, ' 2')
      ],
      anu: [
        createPlaceholder(700, 600, ' Main'),
        createPlaceholder(500, 400, ' 1'),
        createPlaceholder(500, 400, ' 2')
      ],
      litbox: [
        createPlaceholder(700, 600, ' Main'),
        createPlaceholder(500, 400, ' 1'),
        createPlaceholder(500, 400, ' 2')
      ],
      cobot: [
        createPlaceholder(600, 600, ' 1'),
        createPlaceholder(600, 600, ' 2')
      ]
    };
    return imageMap[workId] || ['/card-images/apps.jpg'];
  };


  // Reusable ImageContainer component
  const ImageContainer = ({ 
    workId, 
    imageIndex, 
    className, 
    imageClassName, 
    containerClassName = "work-image-container-4-3",
    alt, 
    sizes 
  }: {
    workId: string;
    imageIndex: number;
    className: string;
    imageClassName: string;
    containerClassName?: string;
    alt: string;
    sizes: string;
  }) => {
    const imageSrc = getWorkImages(workId)[imageIndex];
    const isPlaceholder = imageSrc.startsWith('data:image/svg+xml');
    
    // For placeholders, use regular img tag since Next.js Image has issues with data URIs
    const imageElement = isPlaceholder ? (
      <div className={`w-full relative ${containerClassName}`}>
        <img 
          src={imageSrc} 
          alt={alt} 
          className={`absolute inset-0 w-full h-full ${imageClassName}`}
          draggable={false}
        />
      </div>
    ) : (
      <div className={`w-full relative ${containerClassName}`}>
        <Image 
          src={imageSrc} 
          alt={alt} 
          fill 
          className={imageClassName} 
          draggable={false} 
          sizes={sizes}
        />
      </div>
    );

    return <div className={className}>{imageElement}</div>;
  };

  return (
    <section id="portfolio-grid" className="py-4 px-4 bg-lightgray">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Header */}
        <div className="mb-20">
          <div className="flex flex-row justify-center">
            {categories.map((category, index) => (
              <span key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`hover:text-gray-800 transition-colors lowercase max-[402px]:text-sm ${
                    activeCategory === category ? 'text-gray-800' : 'text-gray-500'
                  }`}
                >
                  {category}
                </button>
                {index < categories.length - 1 && <span className="mx-2 max-[402px]:mx-1 text-gray-400 max-[402px]:text-sm">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Work Projects */}
        <div className="space-y-20">
          {filteredWork.map((work) => (
            <div key={work.id} className="group">
              {/* Project Title */}
              <h3 className="text-base mb-2 font-sans text-gray-500">
                {work.title}
              </h3>
              
              {/* Project Description */}
                <p 
                  className="text-base leading-normal mb-4 font-detail text-gray-700"
                  dangerouslySetInnerHTML={{ __html: work.description }}
                />

              {/* Project Images - Custom Layout per Project */}
              {(work.id === 'reframe' || work.id === 'atmos' || work.id === 'olympal') && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                  <ImageContainer
                    workId={work.id}
                    imageIndex={0}
                    className="md:col-span-8 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center"
                    imageClassName="object-contain work-image-scale-85"
                    alt={`${work.title} - Main`}
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  <div className="md:col-span-4 flex flex-row md:flex-col gap-2">
                    <ImageContainer
                      workId={work.id}
                      imageIndex={1}
                      className="rounded-lg overflow-hidden border border-gray-50 flex-1"
                      imageClassName="object-cover"
                      alt={`${work.title} - Stats`}
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <ImageContainer
                      workId={work.id}
                      imageIndex={2}
                      className="rounded-lg overflow-hidden border border-gray-50 flex-1"
                      imageClassName="object-cover"
                      alt={`${work.title} - Image 2`}
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </div>
              )}


              {(work.id === 'anu' || work.id === 'litbox') && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                  <ImageContainer
                    workId={work.id}
                    imageIndex={0}
                    className="md:col-span-7 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center"
                    imageClassName="object-contain work-image-scale-85"
                    alt={`${work.title} - Main`}
                    sizes="(max-width: 768px) 100vw, 58vw"
                  />
                  <div className="md:col-span-5 flex flex-row md:flex-col sm:flex-row gap-2">
                    <ImageContainer
                      workId={work.id}
                      imageIndex={1}
                      className="bg-black rounded-lg overflow-hidden flex items-center justify-center flex-1"
                      imageClassName="object-contain work-image-scale-90"
                      containerClassName="work-image-container-16-9"
                      alt={`${work.title} - Image 1`}
                      sizes="(max-width: 768px) 50vw, 42vw"
                    />
                    <ImageContainer
                      workId={work.id}
                      imageIndex={2}
                      className="bg-black rounded-lg overflow-hidden flex items-center justify-center flex-1"
                      imageClassName="object-contain work-image-scale-80"
                      containerClassName="work-image-container-16-9"
                      alt={`${work.title} - Image 2`}
                      sizes="(max-width: 768px) 50vw, 42vw"
                    />
                  </div>
                </div>
              )}

              {work.id === 'cobot' && (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <ImageContainer
                    workId={work.id}
                    imageIndex={0}
                    className="sm:col-span-6 rounded-lg overflow-hidden"
                    imageClassName="object-cover"
                    containerClassName="work-image-container-1-1"
                    alt={`${work.title} - Image 1`}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <ImageContainer
                    workId={work.id}
                    imageIndex={1}
                    className="bg-white sm:col-span-6 rounded-lg overflow-hidden border border-gray-50 flex items-center justify-center"
                    imageClassName="object-contain work-image-scale-85"
                    containerClassName="work-image-container-1-1"
                    alt={`${work.title} - Image 2`}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}