'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { getWorkExperience } from './work';

function WorkCard({ title, href, image }: { title: string; href?: string; image?: string }) {
  const card = (
    <div
      role="img"
      aria-label={title}
      className="relative w-full overflow-hidden rounded-[5px] border border-[rgb(227,227,227)] bg-[#EDEEF2]"
      style={{ aspectRatio: '16/9' }}
    >
      {image && (
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover !border-none"
        />
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label={`View ${title} case study`}>
        {card}
      </Link>
    );
  }

  return (
    card
  );
}

export default function WorkSection() {
  const workExperience = getWorkExperience();
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentIdxRef = useRef(0);

  useEffect(() => {
    let isSnapping = false;
    let lastSnapTime = 0;
    const COOLDOWN = 920;

    // Fast-scroll bypass — accumulate |deltaY| over a rolling window;
    // if high velocity, release the section and let the browser scroll freely.
    let wheelHistory: { t: number; d: number }[] = [];
    let lastBypassTime = 0;
    const VELOCITY_WINDOW  = 180;  // ms rolling window
    const VELOCITY_THRESH  = 200;  // accumulated |deltaY| that counts as "fast"
    const FLICK_THRESH     = 50;   // single wheel event large enough to bypass
    const BYPASS_LINGER    = 1000; // ms of free scroll after going fast (momentum tail)

    const isFastScroll = (abs: number, now: number) => {
      if (abs >= FLICK_THRESH) return true;

      wheelHistory.push({ t: now, d: abs });
      wheelHistory = wheelHistory.filter(v => now - v.t < VELOCITY_WINDOW);
      const velocity = wheelHistory.reduce((s, v) => s + v.d, 0);
      return velocity > VELOCITY_THRESH;
    };

    const isLeavingSection = (idx: number, scrollingDown: boolean, total: number) => {
      const atFirst = idx === 0;
      const atLast = idx === total - 1;
      return (atFirst && !scrollingDown) || (atLast && scrollingDown);
    };

    const getContentCenterY = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return rect.top + rect.height / 2;
    };

    const getScrollTopForCenteredContent = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
    };

    const snapToIndex = (idx: number) => {
      const total = contentRefs.current.length;
      const clamped = Math.max(0, Math.min(idx, total - 1));
      const el = contentRefs.current[clamped];
      if (!el) return;
      isSnapping = true;
      currentIdxRef.current = clamped;

      const targetTop = Math.max(0, getScrollTopForCenteredContent(el));
      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      // Correct any undershoot after smooth scroll finishes
      setTimeout(() => {
        const correction = Math.max(0, getScrollTopForCenteredContent(el));
        if (Math.abs(getContentCenterY(el) - window.innerHeight / 2) > 2) {
          window.scrollTo({ top: correction, behavior: 'auto' });
        }
        isSnapping = false;
      }, 680);
    };

    const getNearestIdx = () => {
      const viewportMid = window.innerHeight / 2;
      let bestIdx = 0, bestDist = Infinity;
      contentRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = Math.abs(getContentCenterY(el) - viewportMid);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      return bestIdx;
    };

    const isInSection = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      return itemRefs.current.some(el => {
        if (!el) return false;
        const top = el.getBoundingClientRect().top + window.scrollY;
        return mid >= top && mid <= top + el.offsetHeight;
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (!isInSection()) return;
      const abs = Math.abs(e.deltaY);
      if (abs < 8) return;

      const now = Date.now();
      const total = itemRefs.current.length;
      currentIdxRef.current = getNearestIdx();
      const scrollingDown = e.deltaY > 0;

      // Never intercept when scrolling out toward hero or footer
      if (isLeavingSection(currentIdxRef.current, scrollingDown, total)) {
        lastBypassTime = now;
        return;
      }

      // Fast scroll → bypass snap, scroll freely through the section
      if (isFastScroll(abs, now)) {
        lastBypassTime = now;
        return;
      }
      // Momentum tail after a fast scroll → keep bypassing
      if (now - lastBypassTime < BYPASS_LINGER) return;

      // Deliberate slow scroll — apply one-by-one snap
      if (isSnapping || now - lastSnapTime < COOLDOWN) {
        e.preventDefault();
        return;
      }

      const next = currentIdxRef.current + (scrollingDown ? 1 : -1);

      // At section boundaries → release so hero/footer scroll freely
      if (next < 0 || next >= total) return;

      // Centre current work card first if it's off-centre
      const nearest = contentRefs.current[currentIdxRef.current];
      if (nearest) {
        const offCentre = Math.abs(getContentCenterY(nearest) - window.innerHeight / 2);
        if (offCentre > window.innerHeight * 0.08) {
          e.preventDefault();
          lastSnapTime = now;
          snapToIndex(currentIdxRef.current);
          return;
        }
      }

      e.preventDefault();
      lastSnapTime = now;
      snapToIndex(next);
    };

    // Touch: slow swipe = snap one item; fast swipe = free scroll
    let touchStartY = 0;
    let touchStartTime = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isInSection()) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      const elapsed = Date.now() - touchStartTime;
      const speed = Math.abs(dy) / Math.max(elapsed, 1);
      const now = Date.now();
      const total = itemRefs.current.length;
      currentIdxRef.current = getNearestIdx();
      const scrollingDown = dy > 0;

      // Fast swipe or exit intent → free scroll
      if (speed > 0.8 || Math.abs(dy) < 40) return;
      if (isLeavingSection(currentIdxRef.current, scrollingDown, total)) return;
      if (now - lastBypassTime < BYPASS_LINGER) return;
      if (isSnapping || now - lastSnapTime < COOLDOWN) return;

      const next = currentIdxRef.current + (scrollingDown ? 1 : -1);
      if (next < 0 || next >= total) return;
      lastSnapTime = now;
      snapToIndex(next);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <section id="portfolio-grid" className="relative bg-lightgray">
      {/* Work items — each is exactly one viewport tall; overflow hidden prevents bleed */}
      {workExperience.map((work, idx) => (
        <div
          key={work.id}
          ref={el => { itemRefs.current[idx] = el; }}
          className="flex flex-col items-center justify-center h-screen overflow-hidden px-4"
        >
          <div className="relative z-10 w-full max-w-5xl">
            <div ref={el => { contentRefs.current[idx] = el; }}>
              <WorkCard
                title={work.title}
                href={'href' in work ? work.href : undefined}
                image={'image' in work ? work.image : undefined}
              />
            </div>
            <p className="mt-6 text-sm font-sans text-slate tracking-wide text-center">
              {work.description}
            </p>
          </div>
        </div>
      ))}

    </section>
  );
}
