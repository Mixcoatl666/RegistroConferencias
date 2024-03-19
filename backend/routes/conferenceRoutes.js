import express,{ json } from 'express';
import { 
    nuevaConf,
    listarConfsExp,
    listConfsAdmin,
    listConfsDisp,
    switchStatus,
    infoConfer,
    todaysConfs,
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
//  Registrar, listar conferencias por expositor
ROUTER.route('/')
        .post(identi,nuevaConf)
        .get(identi,listarConfsExp)
;
// rutas adm Listar conferencias para el admin
ROUTER.route('/adm')
        .get(listConfsAdmin)
        .put(switchStatus)
;
// listar confs aprovadas
ROUTER.route('/pbl')
        .get(listConfsDisp)
;
// obtener confeencia por titulo
ROUTER.route('/title/:titulo')
        .get(infoConfer)
;

ROUTER.get('/date/:fecha',todaysConfs);

export default ROUTER;