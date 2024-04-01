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

//----------------- routing
APP.use(cors(corsOptions));
//  Para cada solicitud al path:'localhost:4000/' 
APP.use('/app/user',userRoutes);    // para las rutas de usuario
APP.use('/app/confer',conferenceRoutes);    //  para las rutas de conferencia
APP.use('/app/assist',assistRoutes);    //  rutas para asistir a una conferencia
APP.use('/app/statist',statistRoutes);    //  rutas para las estadisticas
APP.use('/app/images', imageRoutes);


const PORT = process.env.PORT || 4000;
APP.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
