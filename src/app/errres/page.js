import { readdir } from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

export default async function Errres(){

    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const imagePaths = [];

    // Leer archivos en errres subdirectorios
    const errresSubdirs = [
        {dir: '001', text: 'Tank top', price: '60€'},
        {dir: '002', text: 'T-shirt', price: '70€'},
        {dir: '003', text: 'Dress', price: '90€'},
        {dir: '004', text: 'Dress', price: '90€'},
        {dir: '005', text: 'Skirt', price: '90€'},
        {dir: '006', text: 'Sweater', price: '90€'},
    ];
    for (const sub of errresSubdirs) {
        try {
            const files = await readdir(path.join(imagesDir, 'errres', sub.dir));
            imagePaths.push({
                src: '/images/errres/' + sub.dir + '/' + files[0],
                secondSrc: files[1] ? '/images/errres/' + sub.dir + '/' + files[1] : null, 
                info: sub
            });
        } catch (e) {}
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 w-full px-8 md:px-0 md:w-1/2 mx-auto justify-items-center items-end gap-8 md:gap-20 mt-20">
                {imagePaths.map((item, index) => (
                    <Link className='w-full' key={index} href={`/errres/${item.info.dir}`}>
                        <div className="relative group text-center flex flex-col gap-2 cursor-pointer">
                            <div className="h-[300px] relative">
                                <Image src={item.src} alt={`Foto ${index + 1}`} fill objectFit='cover' className="relative group-hover:opacity-0 transition-opacity" />
                                {item.secondSrc && (
                                    <Image src={item.secondSrc} alt={`Foto ${index + 1} hover`} fill objectFit='cover' className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                            </div>
                            <span className='text-xs hover:underline mb-20'>{item.info.dir} {item.info.text} - {item.info.price}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}