'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '../components/ThemeContext';

export default function Home() {
  const { textColor, setTextColor } = useTheme();
  const [imageSrc, setImageSrc] = useState('/images/home/1.jpg');

  const nextImage = () => {
    const images = [
      ['/images/home/1.jpg', 'light'],
      ['/images/home/2.jpg', 'dark'],
      ['/images/home/3.jpg', 'light'],
      ['/images/home/4.png', 'dark'],
      ['/images/home/5.jpg', 'light'],
    ];

    const currentIndex = images.findIndex(image => image[0] === imageSrc);
    const nextIndex = (currentIndex + 1) % images.length;
    console.log(images[nextIndex][1])
    if(images[nextIndex][1] === 'light') {
      setTextColor('text-stone-50');
    } else {
      setTextColor('text-black');
    }
    setImageSrc(images[nextIndex][0]);
  }

  return (
    <>
      <Image
        className='cursor-pointer'
        src={imageSrc}
        alt="Home Image"
        fill
        objectFit="cover"
        objectPosition="100% 100%"
        onClick={nextImage}
      />
      <div id="homeText" className={`absolute top-1/2 transform -translate-y-1/2 left-[15%] ${textColor}`}>
        <p className="text-xs text-center">Transforming a concept into form is where art and craftsmanship truly meet, <br/> becoming one of their most refined expressions.</p>
      </div>
    </>
  )
}