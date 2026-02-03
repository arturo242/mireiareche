'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '../components/ThemeContext';

export default function Home() {
  const { textColor, setTextColor } = useTheme();
  const [imageSrc, setImageSrc] = useState('/images/home/1.jpg');
  const [object, setObject] = useState({objectFit: 'cover', objectPosition: '100% 100%'});

  const nextImage = () => {
    const images = [
      ['/images/home/1.jpg', 'light', {objectFit: 'cover', objectPosition: '100% 100%'}],
      ['/images/home/2.jpg', 'dark', {objectFit: 'cover', objectPosition: ''}],
      ['/images/home/3.jpg', 'light', {objectFit: 'cover', objectPosition: '100% 100%'}],
      ['/images/home/04.png', 'dark', {objectFit: 'cover', objectPosition: '50% 50%'}],
      ['/images/home/5.jpg', 'light', {objectFit: 'cover', objectPosition: '50%'}],
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
    setObject(images[nextIndex][2]);
  }

  return (
    <>
      <Image
        className='cursor-pointer'
        src={imageSrc}
        alt="Home Image"
        fill
        objectFit={object.objectFit}
        objectPosition={object?.objectPosition}
        onClick={nextImage}
      />
      <div id="homeText" className={`absolute top-1/2 transform -translate-y-1/2 left-[15%] ${textColor}`}>
        <p className="text-xs text-center">Transforming a concept into form is where art and craftsmanship truly meet, <br/> becoming one of their most refined expressions.</p>
      </div>
    </>
  )
}