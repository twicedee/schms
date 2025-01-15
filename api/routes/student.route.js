import express from "express"
import { admitStudent, getStudents, updateStudent, deleteStudent } from "../controllers/student.controller.js"
import { verifyToken } from "../utils/VerifyUser.js"

const router = express.Router();


router.post("/admit-student", verifyToken, admitStudent)
router.get("/get-students", getStudents)
router.put("/update-student/:admNumber", verifyToken, updateStudent)
router.delete("/delete-student/:admNumber", verifyToken, deleteStudent)


export default router;