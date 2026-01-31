'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const project = projects.find(p => p.id === params.id);

    useEffect(() => {
        async function loadImages() {
            try {
                const response = await fetch(`/api/project-images?id=${params.id}`);
                const data = await response.json();
                setImages(data.images || []);
            } catch (error) {
                console.error('Error loading images:', error);
            } finally {
                setLoading(false);
            }
        }
        loadImages();
    }, [params.id]);

    if (!project) {
        return <div className="flex justify-center items-center h-screen">Proyecto no encontrado</div>;
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }

    if (images.length === 0) {
        return <div className="flex justify-center items-center h-screen">No hay imágenes disponibles</div>;
    }
    return (
        <>
            <div className="flex flex-col items-center mt-10">
                <Image
                    src={images[0]}
                    alt="portada"
                    width={860}
                    height={2000}
                />
                <div className='text-[14px] self-start ml-50 mt-10'>
                    <p><i>{project.title}</i></p>
                    <p className='mt-4'>{project.text}</p>
                    <p><i>{project.date}</i></p>
                </div>

                <div className='mt-20'>
                    {project.youtubeVideo && (
                        <div className="mb-10">
                            <iframe
                                width="860"
                                height="500"
                                src={project.youtubeVideo}
                                title={project.title}
                                allowFullScreen
                            />
                        </div>
                    )}
                    {images.slice(1).map((src, index) => (
                        <div key={index} className="mb-10">
                            <Image
                                src={src}
                                alt={`image-${index}`}
                                width={860}
                                height={2000}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
