import express from 'express';
import upload from '../middlewares/upload.js';
import Image from '../models/Image.js';
import path from 'path'; // Importa el módulo 'path'

const router = express.Router();

// Obtiene la ruta del directorio actual
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Configura Express para servir archivos estáticos desde el directorio de uploads
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Subir imagen
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Debe seleccionar un archivo.' });
        }

        const { filename, path } = req.file;
        const newImage = new Image({ filename, path });
        await newImage.save();

        return res.status(200).json({ message: 'Imagen subida exitosamente.', image: newImage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al subir la imagen.' });
    }
});

// Borrar imagen
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedImage = await Image.findByIdAndDelete(id);

        if (!deletedImage) {
            return res.status(404).json({ message: 'No se encontró la imagen.' });
        }

        return res.status(200).json({ message: 'Imagen borrada exitosamente.', image: deletedImage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al borrar la imagen.' });
    }
});

// Endpoint para obtener todas las imágenes
router.get('/', async (req, res) => {
    try {
        const images = await Image.find();
        return res.status(200).json(images);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las imágenes.' });
    }
});

export default router;
