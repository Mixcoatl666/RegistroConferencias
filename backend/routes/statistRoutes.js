import  express from "express";
import { soldOut,statistics } from "../controllers/statistController.js";
//------------
const ROUTER = express.Router();
//------------
ROUTER.post('/',soldOut);
ROUTER.get('/',statistics);
//------------

//------------
export default ROUTER;