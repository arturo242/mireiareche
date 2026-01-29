import { readdir } from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

export default async function Projects() {

  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const imagePaths = [];

  // Leer archivos en projects subdirectorios
  const projectsSubdir = [
    { dir: '01', height: 212, width: 300 },
    { dir: '02', height: 212, width: 300 },
    { dir: '03', height: 212, width: 300 },
    { dir: '04', height: 212, width: 300 },
    { dir: '05', height: 212, width: 300 },
    { dir: '06', height: 212, width: 300 },
    { dir: '07', height: 212, width: 300 },
    { dir: '08', height: 212, width: 300 },
    { dir: '09', height: 212, width: 300 },
    { dir: '10', height: 212, width: 300 },
    { dir: '11', height: 212, width: 300 },
    { dir: '12', height: 212, width: 300 },
    { dir: '13', height: 212, width: 300 },
  ];
  for (const sub of projectsSubdir) {
    try {
      const files = await readdir(path.join(imagesDir, 'projects', sub.dir));
      imagePaths.push({
        src: '/images/projects/' + sub.dir + '/' + files[0],
        secondSrc: files[1] ? '/images/projects/' + sub.dir + '/' + files[1] : null,
        info: sub
      });
    } catch (e) { }
  }

  return (
    <>
      <div className="projects-bg flex flex-col items-center justify-center pt-20 pb-20 mb-20">
        <div className="flex flex-col items-center justify-center gap-[280px]">
          {projectsSubdir.map((element, index) => (
            <div key={index}>
              <Link href={`/projects/${element.dir}`}>
                <span className='text-[15px] hover:underline relative'>{element.dir}</span>
              </Link>
                {/* <Link className={`absolute inset-0 w-[${element.width}px] h-[${element.height}px]`} href={`/projects/${element.dir}`}>
                  <Image className={``} src={imagePaths[index]?.src} alt={element.dir} fill/>
                </Link> */}
            </div>

          ))}
        </div>
      </div>
    </>
  )
}