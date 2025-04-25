import express from 'express';
import { verifyToken } from '../utils/VerifyUser.js';
import { createFeeStructure, getFeeStructures, bulkUpdateStudentFees } from '../controllers/feeStructure.controller.js';

const router = express.Router();

router.post("/create-fee-structure", verifyToken, createFeeStructure)
router.get("/get-fee-structure", getFeeStructures)
router.put("/update-fees", verifyToken, bulkUpdateStudentFees);

export default router;