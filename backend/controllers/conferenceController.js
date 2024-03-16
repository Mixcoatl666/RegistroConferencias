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

//----Lista todas las conferencias por expositor
const listarConfs = async (req,res) => {
    const {id} = req.usuario;
    const confers = await Conferencia.find().where('Horario.Expositor._id').equals(id);
    if(confers.length >=  0){
        res.json(confers);
    }else{
        res.json({msg:"No se encontraron conferencias"});
    };
};
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
    listarConfs,
    infoConfer,
    todaysConfs
};