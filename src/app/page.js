'use client';

import { useMemo, useState } from 'react';
import { useTheme } from '../components/ThemeContext';

export default function Home() {
  const { textColor, setTextColor } = useTheme();

  // Definición de imágenes (añadimos mobileRotate: 90 o -90)
  const images = useMemo(
    () => [
      {
        src: '/images/home/1.jpg',
        theme: 'light',
        objectFit: 'cover',
        objectPosition: '100% 100%',
        mobileRotate: 90,
      },
      {
        src: '/images/home/2.jpg',
        theme: 'dark',
        objectFit: 'cover',
        objectPosition: '50% 50%',
        mobileRotate: 90,
      },
      {
        src: '/images/home/3.jpg',
        theme: 'light',
        objectFit: 'cover',
        objectPosition: '100% 100%',
        mobileRotate: -90,
      },
      {
        src: '/images/home/04.png',
        theme: 'dark',
        objectFit: 'cover',
        objectPosition: '50% 50%',
        mobileRotate: 90,
      },
      {
        src: '/images/home/5.jpg',
        theme: 'light',
        objectFit: 'cover',
        objectPosition: '50% 50%',
        mobileRotate: -90,
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  const nextImage = () => {
    const nextIndex = (index + 1) % images.length;
    const next = images[nextIndex];

    if (next.theme === 'light') setTextColor('text-stone-50');
    else setTextColor('text-black');

    setIndex(nextIndex);
  };

  const current = images[index];

  return (
    <>
      {/* Layer de fondo (fijo, detrás de todo) */}
      <div
        className="home-bg cursor-pointer"
        onClick={nextImage}
        role="button"
        aria-label="Change background"
        style={{
          // Desktop / general
          backgroundImage: `url(${current.src})`,
          backgroundSize: current.objectFit,
          backgroundPosition: current.objectPosition,
          // Variable para móvil
          ['--mobile-rotate']: `${current.mobileRotate}deg`,
        }}
      />

      {/* Contenido encima */}
      <div
        id="homeText"
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 left-[15%] ${textColor}`}
      >
        <p className="text-xs text-center">
          Transforming a concept into form is where art and craftsmanship truly meet,
          <br />
          becoming one of their most refined expressions.
        </p>
      </div>
    </>
  );
}
