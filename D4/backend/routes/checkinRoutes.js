import express from 'express';
import {
  getCheckins,
  createCheckin,
  updateCheckin,
  deleteCheckin,
  getProjectCheckins,
  getUserCheckins
} from '../controllers/checkinController.js';

const checkinRouter = express.Router();

checkinRouter.post('/', createCheckin);
checkinRouter.get('/project/:projectId', getProjectCheckins);
checkinRouter.get('/user/:userId', getUserCheckins);

//extra routes - use if needed
checkinRouter.get('/', getCheckins);
checkinRouter.get('/:id', getCheckins);
checkinRouter.put('/:id', updateCheckin);
checkinRouter.delete('/:id', deleteCheckin);

export default checkinRouter;