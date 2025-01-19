import express from 'express';
import { verifyToken } from '../utils/VerifyUser.js';
import { signout, updateUser, deleteUser, getUser, getUsers, updateUserStatus } from '../controllers/user.controller.js';

const router = express.Router();

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.patch('/:userId/status', verifyToken, updateUserStatus);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);

export default router;
