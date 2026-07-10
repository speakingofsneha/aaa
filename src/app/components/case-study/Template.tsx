/**
 * Main template component for case study pages.
 * Renders the complete page structure including hero image, project info, sections, and screenshots.
 * Accepts a config object that defines the project name, hero image, project metadata, and content sections.
 */
'use client';

import React, { useEffect, useRef } from 'react';
import Footer from '../Footer';
import ScreenshotToggle from './ScreenshotToggle';
import BackButton from './BackButton';
import CaseStudySidebar from './CaseStudySidebar';
import './styles.css';

interface CaseStudyConfig {
  projectName: string;
  heroImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  projectInfo: {
    roles: string[];
    timeline: string;
    link?: string;
  };
  sections: CaseStudySection[];
}

interface CaseStudySection {
  id: string;
  title: string;
  content: React.ReactNode;
  screenshotImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  screenshotImageToggle?: {
    desktop: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    mobile: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  };
  fullWidthScreenshot?: boolean;
}

interface CaseStudyTemplateProps {
  config: CaseStudyConfig;
}

export default function CaseStudyTemplate({ config }: CaseStudyTemplateProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const navSections = config.sections.map((section, index) => ({
    id: `section-${index + 1}`,
    title: section.title,
  }));

  useEffect(() => {
    // Fix html/body overflow to enable sticky positioning
    const style = document.createElement('style');
    style.id = `${config.projectName}-sticky-fix`;
    style.textContent = `
      html, body {
        overflow-x: hidden !important;
        overflow-y: visible !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(`${config.projectName}-sticky-fix`);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [config.projectName]);

  return (
    <div className={`case-study case-study-${config.projectName.toLowerCase()} min-h-screen`}>
      {/* Back Button - Fixed at top */}
      <div className="back-button-container">
        <BackButton href="/" />
      </div>

      {/* Hero Image */}
      {config.heroImage && (
        <section className="hero-image">
          <div className="hero-image-wrapper">
            <img
              src={config.heroImage.src}
              alt={config.heroImage.alt}
              width={config.heroImage.width}
              height={config.heroImage.height}
              className="hero-image-img"
              loading="eager"
            />
          </div>
        </section>
      )}

      <CaseStudySidebar
        sections={navSections}
        contentRef={contentRef}
        footerRef={footerRef}
      />

      {/* Main Content */}
      <div className="content-with-sidebar" ref={contentRef}>
        <div className="main-column">

          {/* Project Info */}
          <section className="section project-info">
            <div className="content">
              <div className="text-container">
                <div className="info-grid">
                  <span className="info-item">
                    {config.projectInfo.roles.join(', ')}
                  </span>
                  <span className="info-separator">•</span>
                  <span className="info-item">
                    {config.projectInfo.timeline}
                  </span>
                  {config.projectInfo.link && (
                    <>
                      <span className="info-separator">•</span>
                      <a 
                        href={config.projectInfo.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="info-link"
                      >
                        view project
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Sections */}
          {config.sections.map((section, index) => (
            <section 
              key={`${section.id}-${index}`}
              id={`section-${index + 1}`}
              className="section" 
              data-section={section.id}
            >
              <div className="content">
                <div className="text-container">
                  <h2 className="header">{section.title}</h2>
                  {section.content}
                </div>
                {section.screenshotImageToggle && (
                  <div className={`screenshot-image-wrapper ${section.fullWidthScreenshot ? 'full-width' : ''}`}>
                    <ScreenshotToggle
                      desktopImage={section.screenshotImageToggle.desktop}
                      mobileImage={section.screenshotImageToggle.mobile}
                      fullWidth={section.fullWidthScreenshot}
                    />
                  </div>
                )}
                {section.screenshotImage && !section.screenshotImageToggle && (
                  <div className={`screenshot-image-wrapper ${section.fullWidthScreenshot ? 'full-width' : ''}`}>
                    <img
                      src={section.screenshotImage.src}
                      alt={section.screenshotImage.alt}
                      width={section.screenshotImage.width}
                      height={section.screenshotImage.height}
                      className="screenshot-image"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
