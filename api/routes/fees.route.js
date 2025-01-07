import express from 'express';
import { verifyToken } from '../utils/VerifyUser.js';
import { createFeeStructure, getFeeStructures } from '../controllers/feeStructure.controller.js';
import { bulkUpdateStudentFees, getStudentFees } from '../controllers/fee.controller.js';

const router = express.Router();

router.post("/create-fee-structure", verifyToken, createFeeStructure)
router.get("/get-fee-structure", getFeeStructures)
router.get("/get-student-fee", getStudentFees)

router.put("/update-fees", verifyToken, bulkUpdateStudentFees);

export default router;