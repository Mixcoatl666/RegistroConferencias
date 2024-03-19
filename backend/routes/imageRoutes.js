import express from 'express';
import upload from '../middlewares/upload.js';
import Image from '../models/Image.js';

const router = express.Router();

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

export default router;
