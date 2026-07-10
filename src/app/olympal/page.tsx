'use client';

import React from 'react';
import CaseStudyTemplate from '../components/case-study/Template';
import { 
  Body, 
  Emphasis, 
  ImageWithCaption,
  Link
} from '../components/case-study/ContentComponents';

export default function OlympalCaseStudy() {
  const config = {
    projectName: 'olympal',
    heroImage: {
      src: '/work-images/olympal-hero.webp',
      alt: 'Olympal hero',
      width: 1920,
      height: 800
    },
    projectInfo: {
      roles: ['designer', 'developer'],
      timeline: 'jan - mar 2024',
    },
    sections: [
      {
        id: 'problem',
        title: 'The Problem',
        content: (
          <>
            <Body>
              Athletes struggle to track their performance across multiple metrics and platforms.
              Existing solutions are fragmented and don&apos;t provide a holistic view of progress.
            </Body>
          </>
        )
      },
      {
        id: 'solution',
        title: 'The Solution',
        content: (
          <>
            <Body>
              We built Olympal as a comprehensive performance tracking platform that aggregates data 
              from multiple sources and provides actionable insights
            </Body>
            <Body>
              The platform includes real-time tracking, historical analysis, and personalized recommendations 
              based on performance patterns.
            </Body>
          </>
        ),
        screenshotImageToggle: {
          desktop: {
            src: '/work-images/olympal-demo-desktop.webp',
            alt: 'Olympal dashboard screenshot - desktop',
            width: 840,
            height: 600
          },
          mobile: {
            src: '/work-images/olympal-demo-mobile.webp',
            alt: 'Olympal dashboard screenshot - mobile',
            width: 840,
            height: 600
          }
        }
      },
      {
        id: 'problem',
        title: 'Research',
        content: (
          <>
            <Body>
              Athletes struggle to track their performance across multiple metrics and platforms.
              Existing solutions are fragmented and don&apos;t provide a holistic view of progress.
            </Body>
          </>
        )
      },
      {
        id: 'impact',
        title: 'Impact',
        content: (
          <>
            <Body>
              Olympal reached 5K users in its first quarter, 
              with 78% of users reporting improved performance tracking
            </Body>
            <ImageWithCaption
              src="/work-images/olympal-impact.webp"
              alt="Olympal impact"
              width={900}
              height={600}
            />
          </>
        )
      },
      {
        id: 'problem',
        title: 'Reflection',
        content: (
          <>
            <Body>
              Athletes struggle to track their performance across multiple metrics and platforms.
              Existing solutions are fragmented and don&apos;t provide a holistic view of progress.
            </Body>
          </>
        )
      },
    ]
  };

  return <CaseStudyTemplate config={config} />;
}
