"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsGridClient({ imagePaths = [], projects = [] }) {
  const [hoveredSrc, setHoveredSrc] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // (opcional) Para evitar “parpadeos” al hover, precargamos (en desktop)
  const preload = useMemo(() => {
    if (isMobile) return [];
    return imagePaths.map((p) => p?.src).filter(Boolean);
  }, [imagePaths, isMobile]);

  return (
    <div className="w-full overflow-x-hidden relative mb-10">
      {/* ✅ Fondo optimizado (WebP/AVIF) */}
      {hoveredSrc && (
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <Image
            src={hoveredSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "100% 100%",
            }}
          />
        </div>
      )}

      {/* (opcional) preload silencioso en desktop */}
      {!isMobile && preload.length > 0 && (
        <div className="hidden">
          {preload.map((src) => (
            <Image key={src} src={src} alt="" width={1} height={1} priority />
          ))}
        </div>
      )}

      <div className="projects-bg flex flex-col items-center justify-center pt-[12px] pb-[150px] relative">
        <div className="flex flex-col items-center justify-center mt-[40px] gap-[38vw] md:gap-[265px]">
          {projects.map((element, index) => {
            const img = imagePaths[index];

            return (
              <div
                key={element.dir}
                className="relative"
                onMouseEnter={() => img?.src && setHoveredSrc(img.src)}
                onMouseLeave={() => setHoveredSrc(null)}
              >
                <Link
                  className="absolute z-20"
                  style={{
                    width: isMobile
                      ? element.width * element.sizeMobile
                      : element.width,
                    height: isMobile
                      ? element.height * element.sizeMobile
                      : element.height,
                    top: isMobile ? element.positionMobile?.top : element.position?.top,
                    left: isMobile ? element.positionMobile?.left : element.position?.left,
                    right: isMobile ? element.positionMobile?.right : element.position?.right,
                    bottom: isMobile ? element.positionMobile?.bottom : element.position?.bottom,
                  }}
                  href={`/projects/${element.dir}`}
                >
                  {img?.src && (
                    <Image
                      src={img.src}
                      alt={element.dir}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </Link>

                <Link href={`/projects/${element.dir}`}>
                  <span className="z-30 text-[15px] hover:underline relative">
                    {element.dir}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
