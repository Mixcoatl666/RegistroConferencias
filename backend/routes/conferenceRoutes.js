import express,{ json } from 'express';
import { 
    nuevaConf,
    listarConfsExp,
    listConfsAdmin,
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
//  Registrar, listar conferencias por exp
ROUTER.route('/')
        .post(identi,nuevaConf)
        .get(identi,listarConfsExp)
;
// Listar conferencias 
ROUTER.route('/adm')
        .get(listConfsAdmin)
;
// obtener confeencia por titulo
ROUTER.route('/title/:titulo')
        .get(infoConfer)
;

ROUTER.get('/date/:fecha',todaysConfs);

export default ROUTER;