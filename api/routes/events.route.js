import express from "express";
import {
    setEventDates,
    getEventDates,
} from "../controllers/events.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router = express.Router();

router.post("/set-event-dates", verifyToken, setEventDates);
router.get("/get-event-dates", getEventDates);

export default router;