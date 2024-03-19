import  express  from "express";
import identi from "../middlewares/identi.js";
import { registrarU, autenticarUsuario, mostrarPerfil } from "../controllers/userController.js";
//-----------
const ROUTER = express.Router(); // Para metodos http
//-----------
ROUTER.post('/register',registrarU);    // registro usuario
ROUTER.post('/auth',autenticarUsuario);
ROUTER.get('/profile',identi,mostrarPerfil)

export default ROUTER;