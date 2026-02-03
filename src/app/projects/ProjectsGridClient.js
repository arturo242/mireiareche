"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectsGridClient({ imagePaths = [], projects = []}) {
    const [hovered, setHovered] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setIsMobile(true);
            else setIsMobile(false);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if (hovered) {
            document.body.style.backgroundImage = `url(${hovered})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = '100% 100%';
            document.body.style.backgroundAttachment = 'fixed';
        } else {
            document.body.style.backgroundImage = 'none';
        }
        return () => {
            document.body.style.backgroundImage = 'none';
        }
    }, [hovered]);
    return (
        <div className="w-full overflow-x-hidden">
            <div className="projects-bg flex flex-col items-center justify-center pt-[12px] pb-[150px] relative">
                <div className="flex flex-col items-center justify-center mt-[40px] gap-[27vw] md:gap-[265px]">
                    {projects.map((element, index) => {
                        const img = imagePaths[index];
                        return (
                            <div
                                key={element.dir}
                                className="relative"
                                onMouseEnter={() => img?.src && setHovered(img.src)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <Link
                                    className={`absolute z-2`}
                                    style={{
                                        width: isMobile ? element.width * element.sizeMobile : element.width,
                                        height: isMobile ? element.height * element.sizeMobile : element.height,
                                        top: isMobile ? element.positionMobile?.top : element.position?.top,
                                        left: isMobile ? element.positionMobile?.left : element.position?.left,
                                        right: isMobile ? element.positionMobile?.right : element.position?.right,
                                        bottom: isMobile ? element.positionMobile?.bottom : element.position?.bottom,
                                    }}
                                    href={`/projects/${element.dir}`}
                                >
                                    {img?.src && (
                                        <Image className={``} src={img.src} alt={element.dir} fill />
                                    )}
                                </Link>

                                <Link href={`/projects/${element.dir}`}>
                                    <span className="z-3 text-[15px] hover:underline relative">{element.dir}</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
