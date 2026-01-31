import { readdir } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Project ID is required' });
    }

    try {
        const imagesDir = path.join(process.cwd(), 'public', 'images', 'projects', id);
        const files = await readdir(imagesDir);

        // Filtrar solo archivos de imagen
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const images = files
            .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
            .map(file => `/images/projects/${id}/${file}`)
            .sort();

        res.status(200).json({ images });
    } catch (error) {
        console.error('Error reading images:', error);
        res.status(500).json({ error: 'Failed to load images' });
    }
}
