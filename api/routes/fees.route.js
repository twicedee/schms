import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createFeeStructure } from '../controllers/feeStructure.controller.js';

const router = express.Router();

router.post("/create-fee-structure", verifyToken, createFeeStructure)
// router.post("/get-fee-structure", verifyToken, createFeeStructure)
// router.post("/fee-structure-create", verifyToken, createFeeStructure)
// router.post("/fee-structure-create", verifyToken, createFeeStructure)


export default router;