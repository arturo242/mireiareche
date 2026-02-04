'use client';

import { useState, useEffect, use, useRef } from 'react';
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
    const [loading, setLoading] = useState(true);

    // Estados y Referencias para el Drag
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

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

    // --- LÓGICA DE ARRASTRE (DRAG) ---

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // El * 2 es la velocidad del arrastre
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    // ----------------------------------

    if (!product) return <div className="flex justify-center items-center h-screen">Producto no encontrado</div>;
    if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    if (images.length === 0) return <div className="flex justify-center items-center h-screen">No hay imágenes disponibles</div>;

    return (
        <>
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 6px;
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 0px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #000;
                    border-radius: 0px;
                    cursor: pointer;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #333;
                }
                /* Ocultar selección de texto al arrastrar */
                .no-select {
                    user-select: none;
                    -webkit-user-select: none;
                }
            `}</style>

            <div className="w-full relative -top-[36px]">
                <div
                    ref={sliderRef}
                    // Eventos del mouse
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    
                    className={`
                        w-full h-auto overflow-x-auto flex custom-scrollbar no-select
                        ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}
                    `}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 w-full md:w-1/3 aspect-[3/4] md:aspect-[4/5] max-h-[85vh] snap-start"
                        >
                            <Image
                                src={image}
                                alt={`${product.text} ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                style={{ objectFit: "cover" }}
                                className="pointer-events-none"
                                priority={index < 3}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className='text-[14px] w-3/4 mx-auto mt-10'>
                <p>{product.id} {product.text}. Wool 100% - {product.price}</p>
                <p className='mt-4'>
                    We work sustainably by making items to order. Choose your favorite pieze, size, and color and we´ll create it for you.<br />
                    All this products are made by hand with 100% cotton.
                </p>
                <p className='mt-4'>
                    <Link href="mailto:errres.info@gmail.com" className="hover:underline">
                        errres.info@gmail.com
                    </Link>
                </p>
            </div>
        </>
    );
}