import mongoose from "mongoose";

const conectarDB = async () =>{
    try{
        const conection = await mongoose.connect(process.env.MONGO_URI);
        let url = `${conection.connection.host}:${conection.connection.port}`;
        console.log(`MongoDB Conectado en: ${url}`);
    }catch(error){
        console.log(`error: ${error}`);
        process.exit(1); // Para forzar que el proceso termine
    }
};

export default conectarDB;