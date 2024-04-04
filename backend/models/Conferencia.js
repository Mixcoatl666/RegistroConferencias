import mongoose from "mongoose";


//----------------- Schema 
const USER_SCHEMA = mongoose.Schema(
{
    Titulo:{type:String, required:true, trim:true},
    Descripcion:{type:String, required:true, trim:true},
    Horario:
        {
            Lugar:{type:String, required:true, trim:true},
            Fecha:{type:Date},
            HoraInicio:{type:String, required:true, trim:true},
            HoraFin:{type:String, required:true, trim:true},
            Expositor:
                {
                    _id:{type:mongoose.Schema.Types.ObjectId, ref:"usuario"},
                    Nombre:{type:String},
                    Semblanza:{type:String, required:true, trim:true},
                    Foto:{type:String},
                },
            CupoTotal:{type:Number,required:true},
            AsistentesRegistrados:
                [
                    {
                        _id:{type: mongoose.Schema.Types.ObjectId, ref:"usuario" },
                        sexo:{type:String,required:true,trim:true}
                    }

                ]
        },
    Status:{type:Boolean,required:true}
}
);

// convertir el esquema a modelo para poderlo trabajar
const Conferencia = mongoose.model("Conferencia",USER_SCHEMA);
// Para hacerlo disponible en la aplicacion
export default Conferencia;
