'use client';

import React, { useEffect, useRef } from 'react';

// Small p5 sketch rendered in a 380x380 WEBGL canvas
export default function KolamSketch() {
  const containerRef = useRef(null);
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    function ensureP5Loaded() {
      return new Promise((resolve) => {
        if (typeof window !== 'undefined' && window.p5) {
          resolve(window.p5);
          return;
        }
        const existing = document.querySelector('script[data-p5-cdn="true"]');
        if (existing) {
          existing.addEventListener('load', () => resolve(window.p5));
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.3/p5.min.js';
        script.async = true;
        script.defer = true;
        script.setAttribute('data-p5-cdn', 'true');
        script.addEventListener('load', () => resolve(window.p5));
        document.head.appendChild(script);
      });
    }

    function createSketch(p) {
      const CANVAS_SIZE = 380;
      p.setup = function setup() {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE, p.WEBGL);
        p.rectMode(p.CENTER);
      };

      p.draw = function draw() {
        p.clear(); // Transparent background
        p.stroke(255, 255, 255);
        p.strokeWeight(1.75);
        p.noFill();

        const sizeP = 4 * Math.sqrt(70);
        p.push();
        p.scale(0.6); // Increased scale to make it slightly bigger
        p.rotate(p.PI / 2);
        p.rect(0, 0, sizeP, sizeP);

        p.push();
        p.translate(0, 0);
        kolam1(2, sizeP);
        kolam2(3, sizeP);
        kolam3(4, sizeP);
        p.pop();
        p.pop();
      };

      function kolamHalf(x, sizeP) {
        p.rotateX(p.frameCount / 1000);
        p.rect(sizeP, sizeP, sizeP, sizeP, 0, x * sizeP, x * sizeP, x * sizeP);
        p.rect(-sizeP, sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, x * sizeP);
        p.rect(-sizeP, -sizeP, sizeP, sizeP, x * sizeP, x * sizeP, 0, x * sizeP);
        p.rect(sizeP, -sizeP, sizeP, sizeP, x * sizeP, x * sizeP, x * sizeP, 0);
      }

      function kolam1(x, sizeP) {
        p.rotateX(p.frameCount / 800);
        p.push();
        p.rect(x * sizeP - x * sizeP, x * sizeP, sizeP, sizeP, 0, x * sizeP, x * sizeP, x * sizeP);
        p.rect(-x * sizeP, x * sizeP - x * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, x * sizeP);
        p.rect(-x * sizeP + x * sizeP, -x * sizeP, sizeP, sizeP, x * sizeP, x * sizeP, 0, x * sizeP);
        p.rect(x * sizeP, -x * sizeP + x * sizeP, sizeP, sizeP, x * sizeP, x * sizeP, x * sizeP, 0);
        p.pop();

        p.rect(sizeP, sizeP, sizeP, sizeP, 0, 0, x * sizeP, x * sizeP);
        p.rect(-sizeP, sizeP, sizeP, sizeP, x * sizeP, 0, 0, x * sizeP);
        p.rect(-sizeP, -sizeP, sizeP, sizeP, x * sizeP, x * sizeP, 0, 0);
        p.rect(sizeP, -sizeP, sizeP, sizeP, 0, x * sizeP, x * sizeP, 0);
      }

      function kolam2(x, sizeP) {
        p.rotateX(p.frameCount / 400);
        p.push();
        p.rect(-x * sizeP + sizeP, x * sizeP - sizeP, sizeP, sizeP, x * sizeP, x * sizeP, 0, x * sizeP);
        p.rect(-x * sizeP + sizeP, -x * sizeP + sizeP, sizeP, sizeP, x * sizeP, x * sizeP, x * sizeP, 0);
        p.rect(x * sizeP - sizeP, -x * sizeP + sizeP, sizeP, sizeP, 0, x * sizeP, x * sizeP, x * sizeP);
        p.rect(x * sizeP - sizeP, x * sizeP - sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, x * sizeP);
        p.pop();

        p.rect(sizeP, sizeP, sizeP, sizeP, 0, 0, x * sizeP, x * sizeP);
        p.rect(-sizeP, sizeP, sizeP, sizeP, x * sizeP, 0, 0, x * sizeP);
        p.rect(-sizeP, -sizeP, sizeP, sizeP, x * sizeP, x * sizeP, 0, 0);
        p.rect(sizeP, -sizeP, sizeP, sizeP, 0, x * sizeP, x * sizeP, 0);

        p.rect(x * sizeP - 3 * sizeP, x * sizeP + 1 * sizeP, sizeP, sizeP, 0, 0, x * sizeP, x * sizeP);
        p.rect(-x * sizeP - sizeP, x * sizeP - 3 * sizeP, sizeP, sizeP, x * sizeP, 0, 0, x * sizeP);
        p.rect(-x * sizeP + 3 * sizeP, -x * sizeP - 1 * sizeP, sizeP, sizeP, x * sizeP, x * sizeP, 0, 0);
        p.rect(x * sizeP + 1 * sizeP, -x * sizeP + 3 * sizeP, sizeP, sizeP, 0, x * sizeP, x * sizeP, 0);

        p.rect(x * sizeP - 6 * sizeP, x * sizeP - 2 * sizeP, sizeP, sizeP, 0, 0, x * sizeP, x * sizeP);
        p.rect(-x * sizeP + 2 * sizeP, x * sizeP - 6 * sizeP, sizeP, sizeP, x * sizeP, 0, 0, x * sizeP);
        p.rect(-x * sizeP + 6 * sizeP, -x * sizeP + 2 * sizeP, sizeP, sizeP, x * sizeP, x * sizeP, 0, 0);
        p.rect(x * sizeP - 2 * sizeP, -x * sizeP + 6 * sizeP, sizeP, sizeP, 0, x * sizeP, x * sizeP, 0);

        p.rect(x * sizeP - 1 * sizeP, x * sizeP - 3 * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, 0);
        p.rect(-x * sizeP + 1 * sizeP, x * sizeP - 3 * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, 0);
        p.rect(-x * sizeP + 3 * sizeP, -x * sizeP + 1 * sizeP, sizeP, sizeP, 0, x * sizeP, 0, x * sizeP);
        p.rect(x * sizeP - 3 * sizeP, -x * sizeP + 5 * sizeP, sizeP, sizeP, 0, x * sizeP, 0, x * sizeP);

        p.rect(x * sizeP - 6 * sizeP, x * sizeP - 4 * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, 0);
        p.rect(-x * sizeP + 4 * sizeP, x * sizeP - 6 * sizeP, sizeP, sizeP, 0, x * sizeP, 0, x * sizeP);
        p.rect(-x * sizeP + 6 * sizeP, -x * sizeP + 4 * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, 0);
        p.rect(x * sizeP - 4 * sizeP, -x * sizeP + 6 * sizeP, sizeP, sizeP, 0, x * sizeP, 0, x * sizeP);
      }

      function kolam3(x, sizeP) {
        p.rotateX(p.frameCount / 600);
        p.rect(x * sizeP - 7 * sizeP, x * sizeP - 3 * sizeP, sizeP, sizeP, 0, 0, x * sizeP, x * sizeP);
        p.rect(-x * sizeP + 3 * sizeP, x * sizeP - 7 * sizeP, sizeP, sizeP, x * sizeP, 0, 0, x * sizeP);
        p.rect(-x * sizeP + 7 * sizeP, -x * sizeP + 3 * sizeP, sizeP, sizeP, x * sizeP, x * sizeP, 0, 0);
        p.rect(x * sizeP - 3 * sizeP, -x * sizeP + 7 * sizeP, sizeP, sizeP, 0, x * sizeP, x * sizeP, 0);

        p.rect(x * sizeP - 2 * sizeP, x * sizeP - 4 * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, 0);
        p.rect(-x * sizeP + 2 * sizeP, x * sizeP - 4 * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, 0);
        p.rect(-x * sizeP + 4 * sizeP, -x * sizeP + 2 * sizeP, sizeP, sizeP, 0, x * sizeP, 0, x * sizeP);
        p.rect(x * sizeP - 4 * sizeP, -x * sizeP + 6 * sizeP, sizeP, sizeP, 0, x * sizeP, 0, x * sizeP);

        p.rect(x * sizeP - 7 * sizeP, x * sizeP - 5 * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, 0);
        p.rect(-x * sizeP + 5 * sizeP, x * sizeP - 7 * sizeP, sizeP, sizeP, 0, x * sizeP, 0, x * sizeP);
        p.rect(-x * sizeP + 7 * sizeP, -x * sizeP + 5 * sizeP, sizeP, sizeP, x * sizeP, 0, sizeP, 0);
        p.rect(x * sizeP - 5 * sizeP, -x * sizeP + 7 * sizeP, sizeP, sizeP, 0, x * sizeP, 0, x * sizeP);

        p.push();
        p.rect(-x * sizeP + 8 * sizeP, x * sizeP - 6 * sizeP, sizeP, sizeP, x * sizeP, x * sizeP, 0, x * sizeP);
        p.rect(-x * sizeP + 6 * sizeP, -x * sizeP + 8 * sizeP, sizeP, sizeP, x * sizeP, x * sizeP, x * sizeP, 0);
        p.rect(x * sizeP - 8 * sizeP, -x * sizeP + 6 * sizeP, sizeP, sizeP, 0, x * sizeP, x * sizeP, x * sizeP);
        p.rect(x * sizeP - 6 * sizeP, x * sizeP - 8 * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, x * sizeP);
        p.pop();

        p.push();
        p.translate(2 * sizeP, -6 * sizeP);
        p.rect(x * sizeP - 4 * sizeP, x * sizeP + 0 * sizeP, sizeP, sizeP, 0, 0, x * sizeP, x * sizeP);
        p.rect(x * sizeP - 3 * sizeP, -x * sizeP + 7 * sizeP, sizeP, sizeP, 0, x * sizeP, x * sizeP, 0);
        p.rect(x * sizeP - 4 * sizeP, -x * sizeP + 6 * sizeP, sizeP, sizeP, 0, x * sizeP, 0, x * sizeP);
        p.pop();

        p.push();
        p.translate(6 * sizeP, 2 * sizeP);
        p.rect(-x * sizeP - 0 * sizeP, x * sizeP - 4 * sizeP, sizeP, sizeP, x * sizeP, 0, 0, x * sizeP);
        p.rect(x * sizeP - 7 * sizeP, x * sizeP - 3 * sizeP, sizeP, sizeP, 0, 0, x * sizeP, x * sizeP);
        p.rect(-x * sizeP + 2 * sizeP, x * sizeP - 4 * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, 0);
        p.pop();

        p.push();
        p.translate(-2 * sizeP, 6 * sizeP);
        p.rect(-x * sizeP + 4 * sizeP, -x * sizeP - 0 * sizeP, sizeP, sizeP, x * sizeP, x * sizeP, 0, 0);
        p.rect(-x * sizeP + 3 * sizeP, x * sizeP - 7 * sizeP, sizeP, sizeP, x * sizeP, 0, 0, x * sizeP);
        p.rect(-x * sizeP + 4 * sizeP, -x * sizeP + 2 * sizeP, sizeP, sizeP, 0, x * sizeP, 0, x * sizeP);
        p.pop();

        p.push();
        p.translate(-6 * sizeP, -2 * sizeP);
        p.rect(x * sizeP + 0 * sizeP, -x * sizeP + 4 * sizeP, sizeP, sizeP, 0, x * sizeP, x * sizeP, 0);
        p.rect(-x * sizeP + 7 * sizeP, -x * sizeP + 3 * sizeP, sizeP, sizeP, x * sizeP, x * sizeP, 0, 0);
        p.rect(x * sizeP - 2 * sizeP, x * sizeP - 4 * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, 0);
        p.pop();

        p.rect(-x * sizeP + 3 * sizeP, -x * sizeP + 9 * sizeP, sizeP, sizeP, 0, x * sizeP, 0, x * sizeP);
        p.rect(x * sizeP + 1 * sizeP, x * sizeP - 3 * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, 0);
        p.rect(-x * sizeP - 1 * sizeP, x * sizeP - 5 * sizeP, sizeP, sizeP, x * sizeP, 0, x * sizeP, 0);
        p.rect(x * sizeP - 3 * sizeP, -x * sizeP - 1 * sizeP, sizeP, sizeP, 0, x * sizeP, 0, x * sizeP);
        p.rect(-x * sizeP + 5 * sizeP, -x * sizeP + 9 * sizeP, sizeP, sizeP, sizeP, 0, sizeP, 0);
        p.rect(x * sizeP + 1 * sizeP, x * sizeP - 5 * sizeP, sizeP, sizeP, 0, sizeP, 0, sizeP);
        p.rect(-x * sizeP - 1 * sizeP, x * sizeP - 3 * sizeP, sizeP, sizeP, 0, sizeP, 0, sizeP);
        p.rect(x * sizeP - 5 * sizeP, -x * sizeP - 1 * sizeP, sizeP, sizeP, sizeP, 0, sizeP, 0);

        p.rect(x * sizeP - 4 * sizeP, x * sizeP + 2 * sizeP, sizeP, sizeP, 0, 0, x * sizeP, x * sizeP);
        p.rect(-x * sizeP - 2 * sizeP, x * sizeP - 4 * sizeP, sizeP, sizeP, x * sizeP, 0, 0, x * sizeP);
        p.rect(-x * sizeP + 4 * sizeP, -x * sizeP - 2 * sizeP, sizeP, sizeP, x * sizeP, x * sizeP, 0, 0);
        p.rect(x * sizeP + 2 * sizeP, -x * sizeP + 4 * sizeP, sizeP, sizeP, 0, x * sizeP, x * sizeP, 0);
      }
    }

    ensureP5Loaded().then((p5Lib) => {
      if (!isMounted || !containerRef.current) return;
      const sketch = (p) => createSketch(p);
      p5InstanceRef.current = new p5Lib(sketch, containerRef.current);
    });

    return () => {
      isMounted = false;
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-[380px] h-[380px] mx-auto md:ml-auto" />
  );
}
