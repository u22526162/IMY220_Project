import express from 'express';
import jwt from 'jsonwebtoken';
import { getDB } from '../config/database.js';
import {
  getUserProfile,
  updateUserProfile,
  searchUsers,
  getFriends,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend
} from '../controllers/userController.js';

const userRouter = express.Router();

router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);
router.get('/search', searchUsers);
router.get('/:id/friends', getFriends);
router.post('/:id/friend-request', sendFriendRequest);
router.put('/friend-requests/:requestId/accept', acceptFriendRequest);

export default userRouter;