import Conferencia from '../models/Conferencia.js';

//-----------------
//----Registra una nueva conferenciaa
const nuevaConf = async (req,res) => {
    try {
        const confer = new Conferencia(req.body);
        confer.Horario.Expositor._id = req.usuario._id;
        confer.Horario.Expositor.Nombre = req.usuario.nombre;
        const conferToSave = await confer.save();   //  Almacena en DB
        res.json({msg:"Conferencia Registrada con Exito",confer:conferToSave});
    } catch (error) {
        const err =  new Error("Registro fallido");
        res.json({msg:err.message});
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
    //console.log('List metd');
    try {
        const confers = await Conferencia.find();
        if(confers.length > 0){
            res.json(confers);
        }
    } catch (error) {
        res.json({msg:"No hay conferencias"})
    }
}

//----Detalle de una conferencia por expositor
const detailConf = async (req,res) => {
    const { id } = req.params;
    try {
        const conf = await Conferencia.findById(id).where('Horario.Expositor._id').equals(req.usuario._id);
        res.json(conf);
        //console.log(conf);
    } catch (error) {
        res.json({msg:"No se encontro la conferencia"});
        //console.log("No se encontraro conferencia")
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
        //console.log(data); 
    } catch (error) {
        res.json({msg:"Fallo el update"});
    }
}

//----Modificar conferencias
const modifConf = async (req,res) => {
    const { id } = req.params;
    //console.log(req);
    try {
        const confer = await Conferencia.findById(id);
        //console.log(confer);
        confer.Titulo = req.body.titulo || confer.Titulo;
        confer.Descripcion = req.body.descrip || confer.Descripcion;
        confer.Horario.Lugar = req.body.lugar || confer.Horario.Lugar;
        confer.Horario.Fecha = req.body.fecha || confer.Horario.Fecha;
        confer.Horario.HoraInicio = req.body.horaInicio || confer.Horario.HoraInicio;
        confer.Horario.HoraFin = req.body.horaFin || confer.Horario.HoraFin;
        confer.Horario.CupoTotal = req.body.cupo || confer.Horario.CupoTotal;
        confer.Horario.Expositor.Semblanza = req.body.semblanza || confer.Expositor.Semblanza;
        const editedConfe = await confer.save();
        //console.log(confer);
        //console.log(editedConfe);
        return res.json({msg:"Actualizacion exitosa"})
    } catch (error) {
        return res.json({msg:"Faltan datos"})
        //console.log("Error Mio jaja ")
    }
}

// Muestra lugares y horarios de una conferencia elegida por titulo
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
                id:conf._id,
                Expositor:conf.Horario.Expositor._id,
                Foto:conf.Horario.Expositor.Foto,
                Semblanza:conf.Horario.Expositor.Semblanza,
                Descripcion:conf.Descripcion,
                HoraInicio:conf.Horario.HoraInicio,
                HoraFin:conf.Horario.HoraFin,
                Lugar: conf.Horario.Lugar
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
    const { date } = req.query;
    try {
        //console.log(req);
        // Buscar coincidencias
        const confers = await Conferencia.find({'Horario.Fecha':date});
        //console.log(confers);
        res.json(confers);
    } catch (error) {
        res.json({msg:"No se encontraron conferencias"})
    }
}

//-----Eliminar proyecto
const deleteOneConf = async (req,res) => {
    try {
        const { id } = req.params;
        const confer = await Conferencia.findById(id);
        await confer.deleteOne();
        res.json({msg:"Proyecto Eliminado"});
    } catch (error) {
        res.json({msg:"Proyecto No Eliminado"});
    }
}


const groupConfers = async (req,res) => {
    try {
        const titles = await Conferencia.aggregate([
            {$group:{'_id':'$Titulo'}},
            {$project:{'Titulos':'$_id'}}
        ]);
        //console.log(titles);
        res.json(titles);
    } catch (error) {
        const err = new Error("Error en la consulta");
        //console.log(err.message);
        res.json({msg:err.message});
    }
}

//
//----Lista  conferencias por expositor
const listarConfsAssist = async (req,res) => {
    const {id} = req.usuario;
    const confers = await Conferencia.find().where('Horario.AsistentesRegistrados._id').equals(id);
    if(confers.length >=  0){
        res.json(confers);
    }else{
        res.json({msg:"No se encontraron conferencias"});
    };
};


export {
    nuevaConf,
    listarConfsExp,
    listConfsAdmin,
    detailConf,
    listConfsDisp,
    switchStatus,
    modifConf,
    infoConfer,
    todaysConfs,
    deleteOneConf,
    groupConfers,
    listarConfsAssist
};