import Conferencia from '../models/Conferencia.js';
//------------AQU VOY 

//------------
//  Mostrar confs con cupo lleno segun la fecha especifica
const soldOut = async (req,res) => {
    try {
        const {fecha} = req.body;
        console.log(`statist contrllr -> req: ${fecha}`)
        const confer = await Conferencia.aggregate([
            {$project:{'Titulo':1,'Horario':1,'TRegistrados':{$size:"$Horario.AsistentesRegistrados"}}},
            {$match:{
                $and:[
                    { 'Horario.Fecha':{$eq:new Date(fecha)} },
                    { $expr: {$gte:[{$size:"$Horario.AsistentesRegistrados"},"$Horario.CupoTotal"]} }
                    ]
            }},
            {$project:{'_id':0,'Titulo':1,'Horario.Lugar':1,'Horario.HoraInicio':1,'TRegistrados':1,'Horario.Fecha':1}}
          ]);
        console.log(confer);
        return res.status(200).json({confer})
    } catch (error) {
        const err = new Error("Hubo un error");
        console.log(err.message);
        return res.status(404).json({msg:err.message});
    }
}
//  Mostrar estadsticas de las conferencias 
const statistics = async (req,res) => {
    try {
        const data = await Conferencia.aggregate([
            { $project:{
              'Titulo':1,
              'Horario':1,
              'LugDisp':{$subtract:['$Horario.CupoTotal',{$size:'$Horario.AsistentesRegistrados'}]},
              } },
            { $group:{
              '_id':'$Titulo',
              'Registrados':{$push:{
                'Asist':{$size:'$Horario.AsistentesRegistrados'},
                'horario':'$Horario.HoraInicio',
                'LugsD':'$LugDisp',
                'DisponProm':{$multiply: [ { $divide: ['$LugDisp','$Horario.CupoTotal'] }, 100 ]}
              }}
            } }
          ]);
        console.log(data);
        return res.status(200).json({data});
    } catch (error) {
        const err = new Error("Hubo un error y no se cual es ajaja");
        console.log(err.message);
        return res.status(500).json({msg:err.message});
    }
}


//------------
export{
    soldOut,
    statistics,
}