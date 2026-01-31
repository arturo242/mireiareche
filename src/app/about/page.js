import Link from "next/link";

export default function About() {
    return (
        <>
            <div className='flex flex-col md:flex-row justify-center text-[14px] mt-10'>
                <div className="p-10 md:p-40 md:pb-10 flex-1">
                    <p className="indent-[40px]">Mireia Reche is a Spain-based stylist and creative professional working out of Madrid. She works as a stylist and art director, and leads her personal project, ERRRES, where she explores the connections between textiles, art, and identity. Deeply rooted in the textile world, her practice spans everything from garment creation to concept development and the final shaping of a product. For her, fashion is a language—one that gives form to ideas, emotions, and identity.</p>

                    <p className="mt-4">Throughout her career, she has worked across diverse contexts, from tailoring and handcrafted processes to e-commerce and visual projects for streetwear brands. This range of experience has given her a broad understanding of the industry and allows her to approach each project with both creativity and a strong practical sense. As a stylist, she focuses on aligning garments with the essence of a person or brand, building visual narratives that feel honest, thoughtful, and meaningful.</p>

                    <p className="mt-4">Her work is guided by a strong commitment to sustainable fashion, craftsmanship, and slower ways of making. These values are at the heart of ERRRES, a project that gives garments a second life through small capsule collections connected by ideas, textures, and knitted fabrics. Each piece is carefully selected and reworked, celebrating handmade processes and the uniqueness of clothing as an alternative to fast, mass production.</p>

                    <p className="mt-4">She is also the founder and creative director of WAX, a creative agency that operates as a production platform, talent management, and casting agency, collaborating with brands and creatives across disciplines.</p>

                    <p className="mt-4">With a background that blends design, sustainability, creative direction, and styling, Mireia works with intuition, curiosity, and close attention to detail. She sees every project as an opportunity to connect ideas, materials, and people transforming small inspirations into clear, strong concepts.</p>
                </div>
                <div className="flex-1 pt-40 pr-4">
                    <p>Education</p>
                    <div className="flex mt-6">
                        <span className="w-28 flex-none text-left">2024 - 2025</span>
                        <span>Master’s Degree in Teacher Training (Secondary Education). UAM</span>
                    </div>
                    <div className="flex">
                        <span className="w-28 flex-none text-left">2021 - 2022</span>
                        <span>Master’s Degree in Design and Art Direction. ESDESIGN</span>
                    </div>
                    <div className="flex">
                        <span className="w-28 flex-none text-left">2019</span>
                        <span>Advanced Diploma in Fashion Design (Burg Giebichenstein University of Art and Design, Germany)</span>
                    </div>
                    <div className="flex">
                        <span className="w-28 flex-none text-left">2019</span>
                        <span>Intensive course in Marketing and Web Design.</span>
                    </div>
                    <div className="flex">
                        <span className="w-28 flex-none text-left">2019</span>
                        <span>Training in artisanal techniques such as embroidery, manual domestic knitting machine, and macramé. </span>
                    </div>
                    <div className="flex">
                        <span className="w-28 flex-none text-left">2016 - 2020</span>
                        <span>Advanced Diploma in Fashion Design (EASD Alcoi)</span>
                    </div>
                    <div className="flex">
                        <span className="w-28 flex-none text-left">2013 - 2016</span>
                        <span>Advanced Diploma in Styling (EASD Alcoi)</span>
                    </div>
                    <div className="flex">
                        <span className="w-28 flex-none text-left">2011 - 2013</span>
                        <span>Arts Baccalaureate (EASD Alcoi)</span>
                    </div>

                    <p className="mt-15">Awards</p>
                    <div className="flex mt-6">
                        <span className="w-16 flex-none text-left">2022</span>
                        <span>Award for Best Academic Record in the Valencian Community</span>
                    </div>
                    <div className="flex">
                        <span className="w-16 flex-none text-left">2016</span>
                        <span>Award for Best Children’s Collection</span>
                    </div>

                    <p className="mt-15">Selected Pop-Ups, Showrooms & Exhibitions</p>
                    <div className="flex mt-6">
                        <span className="w-46 flex-none text-left">2025</span>
                        <span>Spain Gallery</span>
                    </div>
                    <div className="flex">
                        <span className="w-46 flex-none text-left">September 2024</span>
                        <span>Pop-Up, Berlín</span>
                    </div>
                    <div className="flex">
                        <span className="w-46 flex-none text-left">May 2024</span>
                        <span>Pop-Up, London (next to Alterist Marketplace)</span>
                    </div>
                    <div className="flex">
                        <span className="w-46 flex-none text-left">Feb 2024 – Feb 2025</span>
                        <span>Showroom Studio, Mexico City (next to Rumor)</span>
                    </div>
                    <div className="flex">
                        <span className="w-46 flex-none text-left">November 2023</span>
                        <span>Pop-Up, Barcelona (next to Somos Sitio)</span>
                    </div>
                    <div className="flex">
                        <span className="w-46 flex-none text-left">July 2023</span>
                        <span>Pop-Up, Madrid (next to The Edition Hotel)</span>
                    </div>
                    <div className="flex">
                        <span className="w-46 flex-none text-left">March 2023</span>
                        <span>Pop-Up, Madrid (next to Espíritu Club)</span>
                    </div>
                </div>
            </div>
            <div className="text-[14px] ml-10 md:ml-40">
                <p>More about:</p>
                <p className="mt-5">Founder of <Link className="hover:underline" target="_blank" href="https://www.instagram.com/wax.departamento">@wax.departamento</Link></p>
                <p>Founder of <Link className="hover:underline" target="_blank" href="https://www.instagram.com/errr3s">@errr3s</Link></p>
                <p>Personal <Link className="hover:underline" target="_blank" href="https://www.instagram.com/mireiareche">@mireiareche</Link></p>
            </div>
        </>
    )
}