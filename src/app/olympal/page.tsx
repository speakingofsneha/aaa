'use client';

import React from 'react';
import CaseStudyTemplate from '../components/case-study/Template';
import { 
  Body, 
  Emphasis, 
  Header,
  ImageWithCaption,
  Callout,
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
      link: 'https://olympal.com' // optional
    },
    sections: [
      {
        id: 'Context',
        title: 'Context',
        content: (
          <>
            <Body large>
              Over four months, we designed and shipped a platform that helps athletes track their performance. 
              I focused on creating an experience that was intuitive and motivating.
            </Body>
          </>
        )
      },
      {
        id: 'problem',
        title: 'The Problem',
        content: (
          <>
            <Body>
              Athletes struggle to track their performance across multiple metrics and platforms.
              Existing solutions are fragmented and don&apos;t provide a holistic view of progress.
            </Body>
            <Callout
              header="We asked"
              quote="Can we create a unified platform that helps athletes understand their performance holistically?"
            />
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
            <Header level={3}> Key Features</Header>
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
        id: 'impact',
        title: 'Impact',
        content: (
          <>
            <Body>
              Olympal reached <Emphasis>5K users</Emphasis> in its first quarter, 
              with <Emphasis>78% of users reporting improved performance tracking</Emphasis>.
            </Body>
            <ImageWithCaption
              src="https://placehold.co/900x600"
              alt="Placeholder"
              caption="Feedback from Olympal users"
            />
          </>
        )
      },
      {
        id: 'reflection',
        title: 'Reflection',
        content: (
          <>
            <Body>
              Building Olympal taught me the importance of understanding user workflows and creating 
              seamless integrations between different data sources.
            </Body>
            <Body large>
              <Emphasis>
                The key was making complex data feel simple and actionable, not overwhelming.
              </Emphasis>
            </Body>
          </>
        )
      }
    ]
  };

  return <CaseStudyTemplate config={config} />;
}
