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
    { dir: '01', height: 212, width: 282, position: {top: -32, left: -205} },
    { dir: '02', height: 225, width: 300, position: {top: -32, left: 400}  },
    { dir: '03', height: 173, width: 233, position: {top: -150, right: 400}  },
    { dir: '04', height: 217, width: 310, position: {top: -118, left: 160}  },
    { dir: '05', height: 286, width: 380, position: {top: -200, right: 200}  },
    { dir: '06', height: 185, width: 247, position: {top: -140, left: 230}  },
    { dir: '07', height: 261, width: 348, position: {top: -111, left: -165}  },
    { dir: '08', height: 229, width: 305, position: {top: -90, left: 350}  },
    { dir: '09', height: 232, width: 293, position: {top: -100, right: 300}  },
    { dir: '10', height: 225, width: 282, position: {top: -100, left: 100}  },
    { dir: '11', height: 225, width: 278, position: {top: -100, right: 200}  },
    { dir: '12', height: 229, width: 305, position: {top: -140, left: 260}  },
    { dir: '13', height: 199, width: 263, position: {top: -50, right: 100}  },
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