import Conferencia from "../models/Conferencia.js";

//-----------

//-----------cd 
const assistConference = async (req,res) => {
    const {id} = req.params;

    console.log(req.usuario);
    try {
        //conferencia.Horario.AsistentesRegistrados.push({'_id':req.usuario._id});
        const assist = await Conferencia.updateOne(
            {'_id':id},
            {$push:{'Horario.AsistentesRegistrados':req.usuario.id}}
        );
        console.log(assist);
        return res.status(200).json({msg:"Registro Exitoso"})
    } catch (error) {
        return res.status(403).json({msg:'Fallo el registro'})
    }
};
//-----------
export {
    assistConference,
}