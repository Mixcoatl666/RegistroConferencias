import Conferencia from '../models/Conferencia.js';
import Usuario from '../models/Usuario.js';
//------------AQU VOY 

//------------
//  Mostrar confs con cupo lleno segun la fecha especifica
const soldOut = async (req,res) => {
  //console.log('before try...');
  try {
    //console.log('try...');
    const {date} = req.query;
    //console.log(date);
    const confs = await Conferencia.find(
      {$and:[{'Horario.Fecha':date},{'Horario.CupoTotal':0}]}
    );
    res.json(confs);
  } catch (error) {
    res.json({msg:"No hay conferencias"})
  }
}
//  Mostrar confs con cupo lleno segun la fecha especifica
const soldOut2 = async (req,res) => {
    try {
        const {fecha} = req.body;
        //console.log(`statist contrllr -> req: ${fecha}`)
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
        //console.log(confer);
        return res.status(200).json({confer})
    } catch (error) {
        const err = new Error("Hubo un error");
        //console.log(err.message);
        return res.json({msg:err.message});
    }
}
//  Mostrar estadsticas de las conferencias 
const statistics2 = async (req,res) => {
    try {
        const data = await Conferencia.aggregate([
            { $project:{
              'Titulo':1,
              'Horario':1,
              'LugDisp':{$subtract:['$Horario.CupoTotal',{$size:'$Horario.AsistentesRegistrados'}]},
              } 
            },
            { $group:{
              '_id':'$Titulo',
              'Registrados':{$push:{
                'Asist':{$size:'$Horario.AsistentesRegistrados'},
                'horario':'$Horario.HoraInicio',
                'LugsD':'$LugDisp',
                'DisponProm':{$multiply: [ { $divide: ['$LugDisp','$Horario.CupoTotal'] }, 100 ]}
              }}
              } 
            }
          ]);
        //console.log(data);
        return res.status(200).json({data});
    } catch (error) {
        const err = new Error("Hubo un error y no se cual es ajaja");
        //console.log(err.message);
        return res.status(500).json({msg:err.message});
    }
}
// Mostrar estadisticas de las conferencias
const statistics = async (req,res) => {
  try {
    // conferencias
    const dataConfs = await Conferencia.aggregate([
      {
        $project:{
          'Titulo':1,
          'Horario':1,
          'TRegist':{$size:'$Horario.AsistentesRegistrados'},
          'Total':{$sum:['$Horario.CupoTotal',{$size:'$Horario.AsistentesRegistrados'}]},
        }
      },
      {
        $group:{
          '_id':'$Titulo',
          'Registrados':{ 
            $push:{
              'Asist':{$size:'$Horario.AsistentesRegistrados'},
              'Fecha':'$Horario.Fecha',
              'Inicio':'$Horario.HoraInicio',
              'Resgistrados':{$size:'$Horario.AsistentesRegistrados'},
              'Disponibles':'$Horario.CupoTotal',
              'PromDisp': {$multiply: [ { $divide: ['$Horario.CupoTotal','$Total'] }, 100 ]},
              'Gen':'$Horario.AsistentesRegistrados.sexo',
              'Foto':'$Horario.Expositor.Foto'
            }
          }
        }
      }
    ]);
    //console.log(dataConfs);
    res.json(dataConfs);
  } catch (error) {
    //console.log('Error en consulta');
    res.json({msg:"Error en el servidor"});
  }
}

//------------
export{
    soldOut,
    statistics,
}