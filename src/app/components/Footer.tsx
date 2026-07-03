'use client';

import { useState } from 'react';
import './goose-footer.css';

export default function Footer() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('snku6524@uni.sydney.edu.au');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <footer className="footer-sky relative z-0 pb-28 sm:pb-24 px-4 sm:px-4">
      <div className="footer-sky-bg" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto pt-48 xl:pt-56 2xl:pt-64 3xl:pt-72 sm:pt-28 lg:pt-32">
        <div className="flex w-full min-h-[16rem] items-start gap-8 lg:gap-16 sm:min-h-[18rem]">
          {/* Left: geese gif, quote */}
          <div className="w-full max-w-md min-w-0">
            <div className="footer-goose-gif" aria-hidden="true">
              <img
                src="/media/GIF%20image.gif"
                alt=""
                className="footer-goose-gif__image"
              />
            </div>

            <div className="mb-10 text-lg text-[#797979] font-medium footer-signature">
              meanwhile the wild geese, high in the clean blue air, are heading home again...
            </div>
          </div>

          {/* Right: links, kaapi */}
          <div className="ml-auto flex shrink-0 self-center flex-col items-end gap-6 text-xs font-mono text-accentgray uppercase" style={{ opacity: 0.8 }}>
            <div className="text-right space-y-2">
              <div>
                <a 
                  href="https://www.are.na/sneha-vembu/channels"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accentgray hover:text-slate transition-colors"
                >
                  Are.na <span className="text-slate">[2]</span>
                </a>
              </div>
              <div>
                <button 
                  onClick={handleEmailCopy}
                  className="text-accentgray hover:text-slate transition-colors"
                  title={emailCopied ? "Email copied!" : "Copy email address"}
                >
                  EMAIL <span className="text-slate">[{emailCopied ? 'COPIED!' : '3'}]</span>
                </button>
              </div>
              <div>
                <a 
                  href="https://www.linkedin.com/in/sneha-kumar-a06275327/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accentgray hover:text-slate transition-colors"
                >
                  LINKEDIN <span className="text-slate">[4]</span>
                </a>
              </div>
            </div>
            <div className="inline-flex items-center gap-1">
              <span>made w love & lots of filter kaapi</span>
              <img
                src="/media/filter%20kaapi%20icon.svg"
                alt=""
                className="footer-kaapi-icon h-[0.9em] w-auto shrink-0"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
