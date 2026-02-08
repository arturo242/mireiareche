'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTheme } from '../components/ThemeContext';

export default function Home() {
  const { textColor, setTextColor } = useTheme();

  const images = useMemo(
    () => [
      { src: '/images/home/1.jpg', theme: 'light', objectFit: 'cover', objectPosition: '100% 100%', mobileRotate: 90 },
      { src: '/images/home/2.jpg', theme: 'dark',  objectFit: 'cover', objectPosition: '50% 50%',  mobileRotate: 90 },
      { src: '/images/home/3.jpg', theme: 'light', objectFit: 'cover', objectPosition: '100% 100%', mobileRotate: -90 },
      { src: '/images/home/04.png', theme: 'light', objectFit: 'cover', objectPosition: '50% 50%',  mobileRotate: 90 },
      { src: '/images/home/5.jpg', theme: 'light', objectFit: 'cover', objectPosition: '50% 50%',  mobileRotate: -90 },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const current = images[index];

  const nextImage = () => {
    const nextIndex = (index + 1) % images.length;
    const next = images[nextIndex];
    setTextColor(next.theme === 'light' ? 'text-stone-50' : 'text-black');
    setIndex(nextIndex);
  };

  return (
    <>
      {/* Fondo */}
      <div
        className="fixed inset-0 cursor-pointer overflow-hidden"
        onClick={nextImage}
        role="button"
        aria-label="Change background"
      >
        {/* ✅ Desktop / tablet: normal */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={current.src}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: current.objectFit,
              objectPosition: current.objectPosition,
            }}
          />
        </div>

        {/* ✅ Mobile: lienzo con dimensiones intercambiadas + rotación */}
        <div className="md:hidden absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              width: '100vh',
              height: '100vw',
              transform: `translate(-50%, -50%) rotate(${current.mobileRotate}deg)`,
              transformOrigin: 'center',
            }}
          >
            <Image
              src={current.src}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: current.objectFit,
                objectPosition: current.objectPosition,
              }}
            />
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div
        id="homeText"
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 left-[15%] ${textColor}`}
      >
        <p className="text-xs">
          Transforming a concept into form is where art and craftsmanship truly meet,
          <br />
          becoming one of their most refined expressions.
        </p>
      </div>
    </>
  );
}
