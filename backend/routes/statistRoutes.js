import  express from "express";
import { soldOut,statistics } from "../controllers/statistController.js";
import identi from '../middlewares/identi.js';

//------------
const ROUTER = express.Router();
//------------
ROUTER.get('/out',soldOut);
ROUTER.get('/',identi,statistics);
//------------

//------------
export default ROUTER;