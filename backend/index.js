import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import conectarDB from './config/db.js';
import conferenceRoutes from './routes/conferenceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import assistRoutes from './routes/assistRoutes.js';
import statistRoutes from './routes/statistRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

const APP = express();
dotenv.config();
conectarDB();
APP.use(express.json());
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Error de CORS"));
        };
    }
};
APP.use(cors(corsOptions));

APP.use('/app/user', userRoutes);
APP.use('/app/confer', conferenceRoutes);
APP.use('/app/assist', assistRoutes);
APP.use('/app/statist', statistRoutes);
APP.use('/app/images', imageRoutes);

const PORT = process.env.PORT || 4000;
APP.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
