'use client';
import Link from "next/link";
import { useTheme } from './ThemeContext';

export default function Footer() {
  const { textColor } = useTheme();

    return (
        <footer className={`footer mt-auto py-8 z-1 text-xs w-full ${textColor}`}>
          <div className="flex justify-between px-[200px]">
              <div className="w-1/3">
                <ul className="flex justify-between">
                  <li>
                    <Link href="/about">contact</Link>
                  </li>
                  <li>
                    <Link target="_blank" href="https://www.instagram.com/mireiareche/">social</Link>
                  </li>
                  <li>
                    <Link target="_blank" href="https://waxdepartamento.com/">wax</Link>
                  </li>
                </ul>
              </div>
              <div className="w-2/3">
                <p className="text-center">© 2023 ERRRES</p>
              </div>
          </div>
        </footer>
      );
}