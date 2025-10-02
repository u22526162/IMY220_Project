import express from 'express';
import {
  getCheckins,
  createCheckin,
  updateCheckin,
  deleteCheckin,
  getProjectCheckins,
  getUserCheckins
} from '../controllers/checkinController.js';

const router = express.Router();

router.post('/', createCheckin);
router.get('/project/:projectId', getProjectCheckins);
router.get('/user/:userId', getUserCheckins);

//extra routes
router.get('/', getCheckins);
router.get('/:id', getCheckins);
router.put('/:id', updateCheckin);
router.delete('/:id', deleteCheckin);

export default router;