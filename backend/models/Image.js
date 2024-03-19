import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    filename: String,
    path: String,
    // Otros campos que puedas necesitar
});

const Image = mongoose.model('Image', imageSchema);

export default Image;