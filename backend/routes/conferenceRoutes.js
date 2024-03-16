import express,{ json } from 'express';
import { 
    nuevaConf,
    listarConfs,
    infoConfer,
    todaysConfs
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
//  Registrar, listar conferencias
ROUTER.route('/')
        .post(identi,nuevaConf)
        .get(identi,listarConfs)
;
// obtener confeencia por titulo
ROUTER.route('/title/:titulo')
        .get(infoConfer)
;

ROUTER.get('/date/:fecha',todaysConfs);

export default ROUTER;