import express from "express"
import { admitStudent, getStudents, updateStudent } from "../controllers/student.controller.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router();


router.post("/admit-student", verifyToken, admitStudent)
router.get("/get-students", getStudents)
router.put("/update-student", verifyToken, updateStudent)


export default router;