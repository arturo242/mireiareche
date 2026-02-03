'use client'
import Link from 'next/link';
import { useTheme } from './ThemeContext';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Nav() {
  const { textColor, setTextColor } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      setTextColor('text-stone-50');
    } else {
      setTextColor('text-black');
    }
  }, [pathname, setTextColor]);

  return (
    <nav className={`nav mt-4 relative z-1 text-sm md:text-xs ${textColor}`}>
      <div className="nav-container px-8 md:px-[200px]">
        <ul className="nav-menu flex justify-between">
          <li>
            <Link href="/">MIREIA</Link>
          </li>
          <li>
            <Link href="/errres">ERRRES</Link>
          </li>
          <li>
            <Link href="/projects">PROJECTS</Link>
          </li>
          <li>
            <Link href="/about">ABOUT</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}