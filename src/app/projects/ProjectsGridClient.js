"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectsGridClient({ imagePaths = [], projects = [] }) {
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        if (hovered) {
            document.body.style.backgroundImage = `url(${hovered})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center center';
            document.body.style.backgroundAttachment = 'fixed';
        } else {
            document.body.style.backgroundImage = 'none';
        }
    }, [hovered]);
    return (
        <div className="">
            <div className="projects-bg flex flex-col items-center justify-center pt-[12px] pb-[150px] relative">
                <div className="flex flex-col items-center justify-center mt-[40px] gap-[265px]">
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
                                        width: element.width,
                                        height: element.height,
                                        top: element.position?.top,
                                        left: element.position?.left,
                                        right: element.position?.right,
                                        bottom: element.position?.bottom,
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
