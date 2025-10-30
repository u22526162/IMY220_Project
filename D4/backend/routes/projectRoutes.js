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

projectRouter.get('/', getProjects);
projectRouter.post('/', createProject);
projectRouter.get('/:id', getProjectById);
projectRouter.put('/:id', updateProject);
projectRouter.delete('/:id', deleteProject);
projectRouter.post('/:id/members', addProjectMember);
projectRouter.delete('/:id/members/:memberId', removeProjectMember);
projectRouter.post('/:id/files', uploadFile);
projectRouter.get('/:id/files/:fileId', downloadFile);

export default projectRouter;