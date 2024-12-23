import express from "express"
import { admitStudent, getStudents } from "../controllers/student.controller.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router();


router.post("/admit-student", verifyToken, admitStudent)
router.get("get-students", verifyToken, getStudents)


export default router;