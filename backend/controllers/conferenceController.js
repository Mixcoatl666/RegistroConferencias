import Conferencia from '../models/Conferencia.js';

//-----------------
//----Registra una nueva conferenciaa
const nuevaConf = async (req,res) => {
    try {
        const confer = new Conferencia(req.body);
        confer.Horario.Expositor._id = req.usuario._id;
        const conferToSave = await confer.save();   //  Almacena en DB
        res.json({msg:"Conferencia Registrada con Exito",confer:conferToSave});
    } catch (error) {
        const err =  new Error("Registro fallido");
        return res.status(404).json({msg:err.message});
    }
};

//----Lista  conferencias por expositor
const listarConfsExp = async (req,res) => {
    const {id} = req.usuario;
    const confers = await Conferencia.find().where('Horario.Expositor._id').equals(id);
    if(confers.length >=  0){
        res.json(confers);
    }else{
        res.json({msg:"No se encontraron conferencias"});
    };
};

//----Listar todas las conferencias
const listConfsAdmin = async (req,res) => {
    try {
        const confers = await Conferencia.find();
        if(confers.length > 0){
            res.status(200).json(confers);
        }
    } catch (error) {
        res.json({msg:"No hay conferencias"})
    }
}

//----Listar todas las conferencias habilitadas
const listConfsDisp = async (req,res) => {
    try {
        const confs = await Conferencia.find().where('Status').equals(true);
        if(confs.length >0 ){
            res.status(200).json(confs);
        }
    } catch (error) {
        res.json({msg:"No hay conferencias disponibles"});
    }
}

//----Cambiar status
const switchStatus = async (req,res) => {
    //const { id } = req.params;
    const { id,status } = req.query
    try {
        const  data  = await Conferencia.updateOne({'_id':id},{'Status':status});
        res.json({msg:"Conferencia habilitada"});
        console.log(data); 
    } catch (error) {
        res.json({msg:"Fallo el update"});
    }
}

//----Modificar conferencias
const modifConf = async (req,res) => {
    const { id } = req.params;
    try {
        const confer = await Conferencia.findById(id).where('Horario.Expositor._id').equals(req.usuario._id);
        console.log(confer);
    } catch (error) {
        console.log("Error Mio jaja ")
    }
}

// Muestra lugares y horarios de una conferencia elegida
const infoConfer = async (req,res) => {
    // obtener nombre de la conferencia
    const { titulo } = req.params;
    // buuscar conferencia por titulo
    try {
        //  Obtener coincidencias
        const confer = await Conferencia.find().where('Titulo').equals(titulo);
        let filterData; //  Para filtrar datos  
        let dataToShare = [];   //  Almacenar datos a enviar
        confer.forEach(conf => {
            //  Seleccionar datos
            filterData = {
                HoraInicio:conf.Horario.HoraInicio,
                HoraFin:conf.Horario.HoraFin,
                Lugar: conf.Horario.HoraFin
            };
            //  Acumular datos 
            dataToShare.push(filterData)
        });
        //  Enviar horarios por conferencia
        res.json({titulo,horarios:dataToShare});
    } catch (error) {
        res.json({msg:"Proyecto no encontrado"});
    }
};

//----Lista conferencias por fecha
const todaysConfs = async (req,res) => {
    // obtener fecha
    const { fecha } = req.params;
    try {
        // Buscar coincidencias
        const confers = await Conferencia.find().where('Horario.Fecha').equals(fecha);
        let filterData; //  Para filtrar datos  
        let dataToShare = [];   //  Almacenar datos a enviar
        confers.forEach(conf=>{
            dataToShare.push(conf.Titulo);
        });
        res.json({conferences:dataToShare});
    } catch (error) {
        res.json({msg:"No se encontraron conferencias"})
    }
}


export {
    nuevaConf,
    listarConfsExp,
    listConfsAdmin,
    listConfsDisp,
    switchStatus,
    modifConf,
    infoConfer,
    todaysConfs,
};