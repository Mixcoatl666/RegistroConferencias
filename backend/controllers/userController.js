import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrarU = async (req,res) =>{
    //----------
    const { email } = req.body; // estraer email
    const existsusuario = await Usuario.findOne({email}); // buscar por email || {email:email}
    //----------
    //  Evitar registros duplicados
    try{
        if(existsusuario){
            const err = new Error("El email ya esta registrado"); // crear error
            return res.json({msg:err.message}); // enviar error
        }else{
            // Relizar registro
            const newUser = new Usuario(req.body); //   crear nuevo objeto usando el modelo
            newUser.token = generarId(); // agregar token
            const savedUser = await newUser.save(); //  registroo en db
            return res.status(200).json({msg:"Usuario creado correctamente",nwuser:savedUser});
        }
    }catch(error){
        const err =  new Error("Faltan Datos");
        return res.status(404).json({msg:err.message});
    }
};

const autenticarUsuario = async (req,res) => {
    //----------
    const {email,pass} = req.body;
    //----------
    try {
        const logUser = await Usuario.findOne({email});
        if(!logUser){
            return res.json({msg:"El usuario no existe"});
        }else{
            if(logUser.pass !== pass){
                return res.json({msg:"La contraseña es incorrecta"});
            }else{
                return res.status(200).json({
                    msg:"Ingresando...",
                    lgUser:{
                        id:logUser._id,
                        nombre:logUser.nombre,
                        email:logUser.email,
                        token: generarJWT(logUser._id,logUser.sexo),
                        rol: logUser.rol
                    }});

            }
        }
    } catch (error) {
        const err = new Error("Faltan Datos");
        return res.status(404).json({msg:err.message});
    }
}

const mostrarPerfil = async (req,res) =>{
    const { usuario } = req;
    res.json({usuario});
    console.log('hola desde controller')
}



export {
    registrarU,
    autenticarUsuario,
    mostrarPerfil,
};