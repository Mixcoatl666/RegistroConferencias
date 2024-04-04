import  express  from "express";
import { assistConference, unAssistConference } from "../controllers/assistController.js";
import identi from "../middlewares/identi.js";
//-----------
//-----------
const ROUTER = express.Router();
//-----------
ROUTER.post('/:id',identi,assistConference);
ROUTER.put('/unas/:id',identi,unAssistConference);
//-----------
export default ROUTER;
