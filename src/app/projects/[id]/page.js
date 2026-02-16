'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';

const projects = [
    { id: '01', title: 'SCUFFERS-HER', text: ' Styling and ecommerce.', date: '2025' },
    { id: '02', title: 'ALTAGAMA - Rusowsky', text: 'Styling next to Adrián Guillén.', date: 'March 2025', youtubeVideo: 'https://www.youtube.com/embed/3N88XszkcMQ' },
    { id: '03', title: 'WAX-ERRRES.', text: 'Art direction next to Irene Blanco and Felipe Huertas.', date: 'July 2025' },
    { id: '04', title: 'ARCHIPEL FILM.', text: 'Costumes for the short film Archipel', date: 'To be released in 2026.' },
    { id: '05', title: 'CAROLINA DURANTE', text: 'Styling next to Adrián Guillén.', date: 'November 2025' },
    { id: '06', title: 'PUNTA CANA', text: 'Styling for Zel Hotel with Studio Brillante.', date: 'December 2024' },
    { id: '07', title: 'KOTA IN ISHIDA', text: 'Styling and Production.', date: 'April 2024, Japan.' },
    { id: '08', title: 'BAMBI BALI.', text: 'Styling for Bambi Bali collection FW24', date: 'April 2024' },
    { id: '09', title: 'ERRRES', text: 'Styling and Collection.', date: 'May 2025' },
    { id: '10', title: 'ERRRES SS25', text: 'Styling and Collection.', date: 'May 2025' },
    { id: '11', title: 'ERRRES SS23', text: 'Styling and Art Direction.', date: 'July 2023' },
    { id: '12', title: 'ERRRES FW24', text: 'Styling and Collection.', date: 'May 2025' },
    { id: '13', title: 'CATALINA SARTOR', text: 'Styling and Production.', date: 'February 2023' },
];

export default function ProjectDetail({ params: paramsPromise }) {
    const params = use(paramsPromise);

    const [media, setMedia] = useState([]); // [{type:'image'|'video', src:'...'}]
    const [loading, setLoading] = useState(true);

    const project = projects.find((p) => p.id === params.id);

    useEffect(() => {
        async function loadMedia() {
            try {
                const response = await fetch(`/api/project-images?id=${params.id}`);
                const data = await response.json();

                const rawList = data.media || data.images || [];

                const normalized = rawList.map((item) => {
                    // Si ya tiene tipo (formato nuevo), lo usamos
                    if (typeof item === 'object' && item.type) return item;

                    // Si es un string o no tiene tipo, detectamos por extensión
                    const src = typeof item === 'string' ? item : item.src;
                    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
                    const isVideo = videoExtensions.some(ext => src.toLowerCase().endsWith(ext));

                    return {
                        type: isVideo ? 'video' : 'image',
                        src: src
                    };
                });

                setMedia(normalized);
            } catch (error) {
                console.error('Error loading media:', error);
            } finally {
                setLoading(false);
            }
        }
        loadMedia();
    }, [params.id]);

    if (!project) {
        return <div className="flex justify-center items-center h-screen">Proyecto no encontrado</div>;
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }

    if (media.length === 0) {
        return <div className="flex justify-center items-center h-screen">No hay contenido disponible</div>;
    }

    const cover = media[0];
    const rest = media.slice(1);

    return (
        <div className="flex flex-col items-center mt-10 md:p-0 p-4 mb-15">
            {/* Portada (puede ser imagen o video) */}
            <div className="w-full max-w-[860px]">
                {cover.type === 'image' ? (
                    <Image
                        src={cover.src}
                        alt="portada"
                        width={860}
                        height={2000}
                        className="w-full h-auto"
                        priority
                    />
                ) : (
                    <video
                        className="w-full h-auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                    >
                        <source src={cover.src} />
                        Tu navegador no soporta vídeo.
                    </video>
                )}
            </div>

            {/* Texto alineado con el ancho */}
            <div className="text-[14px] self-start md:ml-50 mt-10 w-full max-w-[860px] mx-auto">
                <p><i>{project.title}</i></p>
                <p className="mt-4">{project.text}</p>
                <p><i>{project.date}</i></p>
            </div>

            {/* YouTube opcional (como lo tienes ahora) */}
            <div className="mt-10 w-full max-w-[860px]">
                {project.youtubeVideo && (
                    <div className="mb-10 w-full">
                        <div className="w-full aspect-video bg-black">
                            <iframe
                                className="w-full h-full"
                                src={project.youtubeVideo}
                                title={project.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}

                {/* Resto de media (mantiene orden) */}
                {rest.map((item, index) => (
                    <div key={`${item.type}-${item.src}-${index}`} className="mb-10 w-full">
                        {item.type === 'image' ? (
                            <Image
                                src={item.src}
                                alt={`image-${index}`}
                                width={860}
                                height={2000}
                                className="w-full h-auto"
                            />
                        ) : (
                            <video
                                className="w-full h-auto"
                                autoPlay
                                loop
                                muted
                                preload="metadata"
                            >
                                <source src={item.src} />
                                Tu navegador no soporta vídeo.
                            </video>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
