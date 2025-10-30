// Amadeus Fidos u22526162
import express from 'express';
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

userRouter.get('/:id', getUserProfile);
userRouter.put('/:id', updateUserProfile);
userRouter.get('/search', searchUsers);
userRouter.get('/:id/friends', getFriends);
userRouter.post('/:id/friend-request', sendFriendRequest);
userRouter.put('/friend-requests/:requestId/accept', acceptFriendRequest);
userRouter.delete('/:id/friends', removeFriend);

export default userRouter;