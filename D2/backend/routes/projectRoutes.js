import express from 'express';
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  addProjectMember,
  removeProjectMember,
  uploadFile,
  downloadFile
} from '../controllers/projectController.js';

const projectRouter = express.Router();

router.get('/', getProjects);
router.post('/', createProject);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.post('/:id/members', addProjectMember);
router.delete('/:id/members/:memberId', removeProjectMember);
router.post('/:id/files', uploadFile);
router.get('/:id/files/:fileId', downloadFile);

export default projectRouter;