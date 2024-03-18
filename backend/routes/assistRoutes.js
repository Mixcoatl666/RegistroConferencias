import  express  from "express";
import { assistConference } from "../controllers/assistController.js";
import identi from "../middlewares/identi.js";
//-----------
//-----------
const ROUTER = express.Router();
//-----------
ROUTER.post('/:id',identi,assistConference);
//-----------
export default ROUTER;
