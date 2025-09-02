import express from "express"
import { admitStudent, getStudents, updateStudent, deleteStudent, uploadStudentImage } from "../controllers/student.controller.js"
import { verifyToken } from "../utils/VerifyUser.js"
import { uploadStudentPhoto } from '../utils/fileUpload.js';


const router = express.Router();

router.post('/upload', verifyToken, uploadStudentPhoto.single('image'), uploadStudentImage);
router.post("/admit-student", verifyToken, admitStudent)
router.get("/get-students", getStudents)
router.put("/update-student/:admNumber", verifyToken, updateStudent)
router.delete("/delete-student/:admNumber/:userId", verifyToken, deleteStudent)


export default router;