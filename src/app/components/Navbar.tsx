'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  if (pathname !== '/') {
    return null;
  }

  return (
    <nav className="absolute left-0 right-0 top-5 z-[100] pl-4 pr-6">
      <div className="flex w-full justify-end">
        <Link
          href="/about"
          className="rounded-full bg-[rgba(139,139,150,0.5)] px-6 py-2.5 text-[0.85rem] leading-none text-white backdrop-blur-xl transition-colors hover:bg-[rgba(139,139,150,0.6)]"
        >
          about
        </Link>
      </div>
    </nav>
  );
}
