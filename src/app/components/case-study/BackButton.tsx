/**
 * Back button component for case study and other pages.
 * Displays a left arrow and "back" text with a purple/accent color hover effect.
 * Uses Next.js Link for client-side navigation.
 */
'use client';

import React from 'react';
import Link from 'next/link';
import { Undo2 } from 'lucide-react';

interface BackButtonProps {
  href?: string;
  className?: string;
}

export default function BackButton({ 
  href = '/',
  className = '' 
}: BackButtonProps) {
  return (
    <Link 
      href={href}
      className={`back-button ${className}`}
      aria-label="Go back"
    >
      <Undo2 size={14} strokeWidth={2} />
      <span>back</span>
    </Link>
  );
}
