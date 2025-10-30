// Amadeus Fidos u22526162
import express from 'express';
import {
  getCheckins,
  createCheckin,
  updateCheckin,
  deleteCheckin,
  getProjectCheckins,
  getUserCheckins,
  getFeed
} from '../controllers/checkinController.js';

const checkinRouter = express.Router();

checkinRouter.post('/', createCheckin);
checkinRouter.get('/project/:projectId', getProjectCheckins);
checkinRouter.get('/user/:userId', getUserCheckins);
checkinRouter.get('/feed', getFeed);

//extra routes - use if needed
checkinRouter.get('/', getCheckins);
checkinRouter.get('/:id', getCheckins);
checkinRouter.put('/:id', updateCheckin);
checkinRouter.delete('/:id', deleteCheckin);

export default checkinRouter;