'use client';

import { useState, useEffect, useRef } from 'react';
import { getWorkExperience } from './work';

function WorkCard({ title }: { title: string }) {
  return (
    <div
      role="img"
      aria-label={title}
      className="relative w-full overflow-hidden rounded-[5px] border border-[rgb(227,227,227)] bg-[#EDEEF2]"
      style={{ aspectRatio: '16/9' }}
    />
  );
}

export default function WorkSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const workExperience = getWorkExperience();
  const categories = ['all', 'product', 'frontend', 'misc'];
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentIdxRef = useRef(0);

  const filteredWork = activeCategory === 'all' 
    ? workExperience 
    : workExperience.filter(work => 
        work.categories.includes(activeCategory as 'product' | 'frontend' | 'misc')
      );

  // Reset current index when filter changes
  useEffect(() => { currentIdxRef.current = 0; }, [filteredWork]);

  useEffect(() => {
    let isSnapping = false;
    let lastSnapTime = 0;
    const COOLDOWN = 920;

    // Fast-scroll bypass — accumulate |deltaY| over a rolling window;
    // if high velocity, release the section and let the browser scroll freely.
    let wheelHistory: { t: number; d: number }[] = [];
    let lastBypassTime = 0;
    const VELOCITY_WINDOW  = 130;  // ms rolling window
    const VELOCITY_THRESH  = 300;  // accumulated |deltaY| that counts as "fast"
    const BYPASS_LINGER    = 650;  // ms of free scroll after going fast (momentum tail)

    const snapToIndex = (idx: number) => {
      const total = itemRefs.current.length;
      const clamped = Math.max(0, Math.min(idx, total - 1));
      const el = itemRefs.current[clamped];
      if (!el) return;
      isSnapping = true;
      currentIdxRef.current = clamped;
      const top =
        el.getBoundingClientRect().top + window.scrollY
        + el.offsetHeight / 2
        - window.innerHeight / 2;
      window.scrollTo({ top, behavior: 'smooth' });
      setTimeout(() => { isSnapping = false; }, 620);
    };

    const getNearestIdx = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let bestIdx = 0, bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const elMid = el.getBoundingClientRect().top + window.scrollY + el.offsetHeight / 2;
        const d = Math.abs(mid - elMid);
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

      // Update rolling velocity history
      wheelHistory.push({ t: now, d: e.deltaY });
      wheelHistory = wheelHistory.filter(v => now - v.t < VELOCITY_WINDOW);
      const velocity = wheelHistory.reduce((s, v) => s + Math.abs(v.d), 0);

      // Fast scroll → bypass snap, scroll freely through the section
      if (velocity > VELOCITY_THRESH) {
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

      currentIdxRef.current = getNearestIdx();
      const scrollingDown = e.deltaY > 0;
      const next = currentIdxRef.current + (scrollingDown ? 1 : -1);
      const total = itemRefs.current.length;

      // At section boundaries → release so hero/footer scroll freely
      if (next < 0 || next >= total) return;

      // Centre current item first if it's off-centre
      const nearest = itemRefs.current[currentIdxRef.current];
      if (nearest) {
        const elMid = nearest.getBoundingClientRect().top + nearest.offsetHeight / 2;
        const offCentre = Math.abs(elMid - window.innerHeight / 2);
        if (offCentre > window.innerHeight * 0.12) {
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
      // Fast swipe (> 1 px/ms) → free scroll
      if (speed > 1.0 || Math.abs(dy) < 40) return;
      const now = Date.now();
      if (isSnapping || now - lastSnapTime < COOLDOWN) return;
      currentIdxRef.current = getNearestIdx();
      const next = currentIdxRef.current + (dy > 0 ? 1 : -1);
      const total = itemRefs.current.length;
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
  }, [filteredWork]);

  return (
    <section id="portfolio-grid" className="bg-lightgray">

      {/* Sticky category filter */}
      <div className="sticky top-0 z-50 flex justify-center gap-1 py-3 px-4 bg-lightgray/85 backdrop-blur-sm">
        {categories.map((category, i) => (
          <span key={category} className="flex items-center">
                <button
                  onClick={() => setActiveCategory(category)}
              className={`text-xs font-mono uppercase tracking-widest transition-colors ${
                activeCategory === category ? 'text-slate' : 'text-accentgray hover:text-slate'
                  }`}
                >
                  {category}
                </button>
            {i < categories.length - 1 && (
              <span className="mx-2 text-accentgray text-xs">·</span>
            )}
              </span>
            ))}
      </div>

      {/* Work items — each is exactly one viewport tall; overflow hidden prevents bleed */}
      {filteredWork.map((work, idx) => (
        <div
          key={work.id}
          ref={el => { itemRefs.current[idx] = el; }}
          className="flex flex-col items-center justify-center h-screen overflow-hidden px-4"
        >
          <div className="w-full max-w-5xl">
            <WorkCard title={work.title} />
            <p className="mt-3 text-xs font-mono text-accentgray tracking-wide text-center">
              {work.description}
            </p>
          </div>
        </div>
      ))}

    </section>
  );
}
