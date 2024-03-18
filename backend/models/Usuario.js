import mongoose from "mongoose";

//schema
const usuarioEschema = mongoose.Schema({
    nombre:{type:String,required:true,trim:true},
    sexo:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    pass:{type:String,required:true,trim:true},
    token:{type:String,required:true,trim:true},
    rol:{type:String}
});

const Usuario = mongoose.model("usuario",usuarioEschema);
export default Usuario;// para hacerlo disponible en la aplicacion