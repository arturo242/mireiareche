import { readdir } from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import ProjectsGridClient from './ProjectsGridClient';

export default async function Projects() {

  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const imagePaths = [];

  // Leer archivos en projects subdirectorios
  const projectsSubdir = [
    { dir: '01', height: 212, width: 282, sizeMobile: 0.6, position: { top: -32, left: -205 }, positionMobile: { top: -20, left: -175 } },
    { dir: '02', height: 225, width: 300, sizeMobile: 0.40, position: { top: -32, left: 400 }, positionMobile: { top: 0, left: 50 } },
    { dir: '03', height: 173, width: 233, sizeMobile: 0.5, position: { top: -150, right: 400 }, positionMobile: { top: -20, right: 40 } },
    { dir: '04', height: 217, width: 310, sizeMobile: 0.5, position: { top: -190, left: 140 }, positionMobile: { top: -50, left: 30 } },
    { dir: '05', height: 286, width: 380, sizeMobile: 0.4, position: { top: -200, right: 200 }, positionMobile: { top: -50, right: 45 } },
    { dir: '06', height: 185, width: 247, sizeMobile: 0.7, position: { top: -140, left: 230 }, positionMobile: { top: -50, left: -80 } },
    { dir: '07', height: 261, width: 348, sizeMobile: 0.40, position: { top: -111, left: -165 }, positionMobile: { top: 0, left: -155 } },
    { dir: '08', height: 229, width: 305, sizeMobile: 0.5, position: { top: -90, left: 350 }, positionMobile: { top: -50, left: 30 } },
    { dir: '09', height: 232, width: 293, sizeMobile: 0.5, position: { top: -100, right: 300 }, positionMobile: { top: -50, right: 50 } },
    { dir: '10', height: 225, width: 282, sizeMobile: 0.5, position: { top: -100, left: 100 }, positionMobile: { top: -50, left: 30 } },
    { dir: '11', height: 225, width: 278, sizeMobile: 0.45, position: { top: -144, right: 474 }, positionMobile: { top: -40, right: 50 } },
    { dir: '12', height: 229, width: 305, sizeMobile: 0.4, position: { top: -140, left: 260 }, positionMobile: { top: -30, left: 50 } },
    { dir: '13', height: 199, width: 263, sizeMobile: 0.6, position: { top: -50, right: 100 }, positionMobile: { top: -30, left: -60 } },
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

  return <ProjectsGridClient imagePaths={imagePaths} projects={projectsSubdir} />;
}