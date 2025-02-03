import express from 'express';

import { setTermDates, setEventDates, getEventDates, getTermDates } from "../controllers/events.controller.js";
import { verifyToken } from '../utils/VerifyUser.js';


const router = express.Router();

router.post("/set-term-dates" ,setTermDates)
router.post("/set-event-date" ,setTermDates, verifyToken)
router.get("/get-term-dates", getTermDates)
router.get("/get-event-dates", getEventDates)


export default router