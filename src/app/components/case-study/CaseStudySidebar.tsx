'use client';

import { useCallback, useEffect, useRef, type RefObject } from 'react';

export interface NavSection {
  id: string;
  title: string;
}

interface CaseStudySidebarProps {
  sections: NavSection[];
  contentRef: RefObject<HTMLElement | null>;
  footerRef: RefObject<HTMLElement | null>;
}

const HOVER_CLASSES = [
  'hovered',
  'nearby-1',
  'nearby-2',
  'nearby-3',
  'nearby-4',
  'nearby-5',
  'nearby-6',
] as const;

export default function CaseStudySidebar({
  sections,
  contentRef,
  footerRef,
}: CaseStudySidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToSection = useCallback((targetId: string, offset = 45) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const bars = barsRef.current.filter(
      (bar): bar is HTMLDivElement => bar !== null
    );
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (!sidebar || bars.length === 0) return;

    let mouseY = -1;
    let hoveredIndex = -1;
    let isHoveringOverSidebar = false;

    const clearAllHover = () => {
      bars.forEach((bar) => {
        bar.classList.remove(...HOVER_CLASSES);
      });
    };

    const updateHoverEffects = () => {
      if (!isHoveringOverSidebar) return;

      const sidebarRect = sidebar.getBoundingClientRect();
      let closestBar: HTMLDivElement | null = null;
      let closestDistance = Infinity;

      for (let index = 0; index < bars.length; index += 1) {
        const bar = bars[index]!;
        const rect = bar.getBoundingClientRect();
        const barCenter = rect.top + rect.height / 2;
        const distance = Math.abs(mouseY - (barCenter - sidebarRect.top));

        if (distance < closestDistance) {
          closestDistance = distance;
          closestBar = bar;
          hoveredIndex = index;
        }
      }

      clearAllHover();

      if (closestBar === null) return;

      closestBar.classList.add('hovered');

      for (let offset = 1; offset <= 6; offset += 1) {
        const className = `nearby-${offset}` as (typeof HOVER_CLASSES)[number];
        if (bars[hoveredIndex - offset]) {
          bars[hoveredIndex - offset]!.classList.add(className);
        }
        if (bars[hoveredIndex + offset]) {
          bars[hoveredIndex + offset]!.classList.add(className);
        }
      }
    };

    const findClosestBar = (clickY: number) => {
      let closestBar: HTMLDivElement | null = null;
      let closestDistance = Infinity;

      for (const bar of bars) {
        const rect = bar.getBoundingClientRect();
        const barCenter = rect.top + rect.height / 2;
        const distance = Math.abs(clickY - barCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestBar = bar;
        }
      }

      return closestBar;
    };

    const onMouseEnter = () => {
      isHoveringOverSidebar = true;
      updateHoverEffects();
    };

    const onMouseLeave = () => {
      isHoveringOverSidebar = false;
      clearAllHover();
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = sidebar.getBoundingClientRect();
      mouseY = event.clientY - rect.top;
      updateHoverEffects();
    };

    const onSidebarClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).classList.contains('bar')) return;

      const closestBar = findClosestBar(event.clientY);
      const targetId = closestBar?.getAttribute('data-target');
      if (targetId) scrollToSection(targetId, 45);
    };

    const barClickHandlers = bars.map((bar) => {
      const handler = () => {
        const targetId = bar.getAttribute('data-target');
        if (targetId) scrollToSection(targetId, 45);
      };
      bar.addEventListener('click', handler);
      return { bar, handler };
    });

    const updateVisibility = () => {
      const content = contentRef.current;
      const footer = footerRef.current;
      if (!content) {
        sidebar.classList.add('is-visible');
        return;
      }

      const viewportCenter = window.scrollY + window.innerHeight / 2;
      const contentTop =
        content.getBoundingClientRect().top + window.scrollY;
      const footerTop = footer
        ? footer.getBoundingClientRect().top + window.scrollY
        : Number.POSITIVE_INFINITY;

      const isInBody =
        viewportCenter >= contentTop && viewportCenter < footerTop;

      sidebar.classList.toggle('is-visible', isInBody);
    };

    const onScroll = () => {
      updateVisibility();

      let current = '';

      sectionElements.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 2) {
          current = section.getAttribute('id') ?? '';
        }
      });

      bars.forEach((bar) => {
        bar.classList.remove('active');
        if (bar.getAttribute('data-target') === current) {
          bar.classList.add('active');
        }
      });
    };

    sidebar.addEventListener('mouseenter', onMouseEnter);
    sidebar.addEventListener('mouseleave', onMouseLeave);
    sidebar.addEventListener('mousemove', onMouseMove);
    sidebar.addEventListener('click', onSidebarClick);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateVisibility);
    updateVisibility();
    onScroll();

    return () => {
      sidebar.removeEventListener('mouseenter', onMouseEnter);
      sidebar.removeEventListener('mouseleave', onMouseLeave);
      sidebar.removeEventListener('mousemove', onMouseMove);
      sidebar.removeEventListener('click', onSidebarClick);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateVisibility);
      barClickHandlers.forEach(({ bar, handler }) => {
        bar.removeEventListener('click', handler);
      });
      clearAllHover();
    };
  }, [sections, scrollToSection, contentRef, footerRef]);

  return (
    <div className="sidebar" id="sidebar" ref={sidebarRef}>
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(element) => {
            barsRef.current[index] = element;
          }}
          className="bar"
          data-target={section.id}
          data-label={section.title}
        />
      ))}
    </div>
  );
}
