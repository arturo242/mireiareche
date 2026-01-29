'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const products = [
    { id: '001', text: 'Tank top', price: '60€' },
    { id: '002', text: 'T-shirt', price: '70€' },
    { id: '003', text: 'Dress', price: '90€' },
    { id: '004', text: 'Dress', price: '90€' },
    { id: '005', text: 'Skirt', price: '90€' },
    { id: '006', text: 'Sweater', price: '90€' },
];

export default function ProductDetail({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const product = products.find(p => p.id === params.id);

    useEffect(() => {
        async function loadImages() {
            try {
                const response = await fetch(`/api/product-images?id=${params.id}`);
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

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 3));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    if (!product) {
        return <div className="flex justify-center items-center h-screen">Producto no encontrado</div>;
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }

    if (images.length === 0) {
        return <div className="flex justify-center items-center h-screen">No hay imágenes disponibles</div>;
    }

    return (
        <>
            <div className="w-full h-[600px] relative">
                <div className="flex w-full h-full absolute -top-8">
                    {/* Grid de 3 imágenes */}
                    <div className="flex w-full h-full">
                        {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
                            <div key={currentIndex + index} className="relative flex-1 h-full overflow-hidden">
                                <Image
                                    src={image}
                                    alt={`${product.text} ${currentIndex + index + 1}`}
                                    fill
                                    objectFit="cover"
                                    className="transition-opacity duration-300"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Controles del slider */}
                    {images.length > 3 && (
                        <>
                            {
                                currentIndex !== 0 && (
                                    <button
                                        onClick={prevSlide}
                                        className="absolute cursor-pointer left-25 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-black/50 hover:bg-black/75 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-2 rounded-full transition-colors"
                                        aria-label="Anterior"
                                    >
                                        ←
                                    </button>)
                            }
                            {
                                currentIndex !== images.length - 3 && (
                                    <button
                                        onClick={nextSlide}
                                        className="absolute cursor-pointer right-25 top-1/2 transform -translate-y-1/2 translate-x-12 bg-black/50 hover:bg-black/75 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-2 rounded-full transition-colors"
                                        aria-label="Siguiente"
                                    >
                                        →
                                    </button>
                                )
                            }

                        </>
                    )}

                    {/* Indicadores */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {Array.from({ length: images.length - 2 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
                                    }`}
                                aria-label={`Ir a grupo ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className='text-[14px] w-3/4 mx-auto mt-10'>
                <p>{product.id} {product.text}. Wool 100% - {product.price}</p>
                <p className='mt-4'>We work sustainably by making items to order. Choose your favorite pieze, size, and color and we´ll create it for you.<br />
                    All this products are made by hand with 100% cotton.

                </p>
                <p className='mt-4'><Link href="mailto:errres.info@gmail.com">errres.info@gmail.com</Link></p>
            </div>
        </>
    );
}
