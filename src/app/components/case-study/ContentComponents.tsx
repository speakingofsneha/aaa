/**
 * Reusable content components for case study pages.
 * Provides standardized components for text (Body, Emphasis), headings (Header),
 * images with captions (ImageWithCaption), callouts (Callout), and links (Link).
 * All components match the styling system defined in styles.css.
 */
'use client';

import React from 'react';

/* Reusable paragraph component */
export function Body({ 
  children, 
  large = false, 
  className = '' 
}: { 
  children: React.ReactNode; 
  large?: boolean; 
  className?: string;
}) {
  return (
    <p className={`${large ? 'body-large' : 'body'} ${className}`}>
      {children}
    </p>
  );
}

/* Reusable emphasis text */
export function Emphasis({ children }: { children: React.ReactNode }) {
  return <span className="body-emphasis">{children}</span>;
}

/* Reusable heading */
export function Header({ 
  level = 2, 
  children 
}: { 
  level?: 2 | 3; 
  children: React.ReactNode;
}) {
  const Tag = level === 2 ? 'h2' : 'h3';
  const className = level === 2 ? 'header' : 'subheading';
  return <Tag className={className}>{children}</Tag>;
}

/* Reusable image with caption */
export function ImageWithCaption({ 
  src, 
  alt, 
  width, 
  height, 
  caption, 
  narrow = false,
  className = ''
}: { 
  src: string; 
  alt: string; 
  width?: number; 
  height?: number; 
  caption?: string;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div className={`${narrow ? 'image-container-narrow' : 'image-container'} ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        className="image"
        loading="lazy"
      />
      {caption && (
        <p className="image-caption">{caption}</p>
      )}
    </div>
  );
}

/* Research callout component */
export function Callout({ 
  header, 
  quote 
}: { 
  header: string; 
  quote: string;
}) {
  return (
    <div className="research-callout">
      <div className="quote-header">{header}</div>
      <div className="quote">{quote}</div>
    </div>
  );
}

/* Link component - Exact reframe styling */
export function Link({ 
  href, 
  children, 
  external = false 
}: { 
  href: string; 
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        color: 'var(--color-black)',
        textDecoration: 'none',
        fontFamily: 'var(--font-compagnon), monospace',
        letterSpacing: '.05em',
        transition: 'color 200ms ease'
      }}
      onMouseEnter={(e) => { 
        e.currentTarget.style.color = 'var(--color-accentgray)'; 
      }}
      onMouseLeave={(e) => { 
        e.currentTarget.style.color = 'var(--color-black)'; 
      }}
    >
      {children}
    </a>
  );
}
