import express,{ json } from 'express';
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
    deleteOneConf
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
// rutas adm Listar conferencias para el admin
ROUTER.route('/adm')
        .get(listConfsAdmin)
        .put(switchStatus)
;
// obtener confeencia por titulo
ROUTER.route('/title/:titulo')
        .get(infoConfer)
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

ROUTER.get('/date/:fecha',todaysConfs);

export default ROUTER;