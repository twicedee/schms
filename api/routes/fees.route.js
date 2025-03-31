import express from 'express';
import { verifyToken } from '../utils/VerifyUser.js';
import { createFeeStructure, getFeeStructures } from '../controllers/feeStructure.controller.js';
import { addFeeRecord, bulkUpdateStudentFees, confirmPayment, getStudentFees } from '../controllers/fee.controller.js';

const router = express.Router();

router.post("/create-fee-structure", verifyToken, createFeeStructure)
router.get("/get-fee-structure", getFeeStructures)
router.get("/get-student-fee", getStudentFees)
router.post("/pay-fees/:studentId", verifyToken, confirmPayment)
router.post("/update-student-fees/:studentId", verifyToken, addFeeRecord)
router.put("/update-fees", verifyToken, bulkUpdateStudentFees);

export default router;