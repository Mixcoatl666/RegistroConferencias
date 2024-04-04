import Conferencia from "../models/Conferencia.js";

//-----------

//-----------cd 
const assistConference = async (req,res) => {
    const {id} = req.params;
    const confers = await Conferencia.find({'_id':id}).where('Horario.AsistentesRegistrados._id').equals(req.usuario._id);

    try {
        console.log("on try...");
        console.log(confers.length);
        if(confers.length===0){
            const assist = await Conferencia.updateOne(
                {'_id':id},
                {
                    $push:{'Horario.AsistentesRegistrados':{'_id':req.usuario._id,'sexo':req.usuario.sexo}},
                    $inc:{'Horario.CupoTotal':-1}
                }
            );
            return res.json({msg:"Registro Exitoso"})
        }else{
            return res.json({msg:"Ya esres participante"});
        }
        //conferencia.Horario.AsistentesRegistrados.push({'_id':req.usuario._id});
        //console.log(assist);
    } catch (error) {
        //console.log("Error back...");
        return res.json({msg:'Error en el servidor'})
    }   
    
};


const unAssistConference = async (req,res) => {
    const {id} = req.params;
    //console.log(id);
    //console.log(req.usuario);
    try {
        //console.log("on try...");

        //conferencia.Horario.AsistentesRegistrados.push({'_id':req.usuario._id});
        const assist = await Conferencia.updateOne(
            {'_id':id},
            {
                $pull:{'Horario.AsistentesRegistrados':{'_id':req.usuario.id}},
                $inc:{'Horario.CupoTotal':1}
            }
        );
        //console.log(assist);
        return res.json({msg:"Registro Exitoso"})
    } catch (error) {
        //console.log("Error back...");
        return res.json({msg:'Fallo el registro'})
    }
};
//-----------
export {
    assistConference,
    unAssistConference
}