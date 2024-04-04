import express,{ Router, json } from 'express';
import { 
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
} from '../controllers/conferenceController.js'
import identi from '../middlewares/identi.js';

//-----------------
const ROUTER = express.Router();   //  Para usar los metodos http

//-----------------
/*
 * '/' -> indica que se usara la misma url que hay en index('/api/usuarios')
 * ej. router.get('/',usuarios);
 * ej. router.post('/',crearUsuario);
*/
// listar confs aprovadas
ROUTER.route('/pbl')
        .get(listConfsDisp)
;
// listar titulos
ROUTER.route('/titles')
        .get(groupConfers)
;
// listar por fechas
ROUTER.route('/date')
        .get(todaysConfs)
;
// rutas adm Listar conferencias para el admin
ROUTER.route('/adm')
        .get(listConfsAdmin)
        .put(switchStatus)
;
// obtener confeencia por titulo
ROUTER.route('/title/:titulo')
        .get(infoConfer)
;
// obtener conferencias a las que asistire
ROUTER.route('/asist')
        .get(identi,listarConfsAssist)
;
//  Registrar, listar conferencias por expositor
ROUTER.route('/')
        .post(identi,nuevaConf)
        .get(identi,listarConfsExp)
;
ROUTER.route('/:id')
        .get(identi,detailConf)
        .put(identi,modifConf)
        .delete(deleteOneConf)
;


export default ROUTER;