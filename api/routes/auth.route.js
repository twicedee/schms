import express from 'express';
import { google, signin, signup } from '../controllers/auth.controller.js';
import { sendInvite } from '../controllers/invite.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/send-invite', verifyToken, sendInvite);
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google)

export default router;