import { ObjectId } from 'mongodb';
import { requireAuth } from '../utils/password.js';
import { 
  findUserProjects,
  createProject as createProjectDB,
  findProjectById,
  updateProject as updateProjectDB,
  deleteProject as deleteProjectDB,
  findUserById,
  hasProjectAccess,
  isProjectOwner,
  addProjectEditor as addProjectEditorDB,
  removeProjectEditor as removeProjectEditorDB,
  addFileToProject,
  generateId,
  handleControllerError,
  COLLECTIONS
} from '../utils/fileStorage.js';

export const getProjects = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const projects = await findUserProjects(authUser.id);
    res.json(projects);
  } catch (error) {
    return handleControllerError(error, res, 'Get projects');
  }
};

export const createProject = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const { name, description, hashtags } = req.body;

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    const project = {
      name: name.trim(),
      description: description?.trim() || '',
      hashtags: hashtags || [],
      ownerId: new ObjectId(authUser.id),
      editorIds: [new ObjectId(authUser.id)],
      checkinIds: [],
      files: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await createProjectDB(project);
    
    // Add project to user's projectIds
    const db = getDB();
    await db.collection(COLLECTIONS.USERS).updateOne(
      { _id: new ObjectId(authUser.id) },
      { $addToSet: { projectIds: result.insertedId } }
    );
    
    res.status(201).json({
      id: result.insertedId,
      ...project
    });
  } catch (error) {
    return handleControllerError(error, res, 'Create project');
  }
};

export const getProjectById = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const projectId = req.params.id;

    const hasAccess = await hasProjectAccess(projectId, authUser.id);
    if (!hasAccess) {
      return res.status(404).json({ error: 'Project not found or access denied' });
    }

    const project = await findProjectById(projectId);
    res.json(project);
  } catch (error) {
    return handleControllerError(error, res, 'Get project');
  }
};

export const updateProject = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const projectId = req.params.id;
    const { name, description, hashtags } = req.body;

    // Check if user owns the project
    const isOwner = await isProjectOwner(projectId, authUser.id);
    if (!isOwner) {
      return res.status(404).json({ error: 'Project not found or not authorized' });
    }

    const project = await findProjectById(projectId);
    const updateData = {
      name: name || project.name,
      description: description || project.description,
      hashtags: hashtags || project.hashtags
    };

    await updateProjectDB(projectId, updateData);
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    return handleControllerError(error, res, 'Update project');
  }
};

export const deleteProject = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const projectId = req.params.id;

    // Check if user owns the project
    const isOwner = await isProjectOwner(projectId, authUser.id);
    if (!isOwner) {
      return res.status(404).json({ error: 'Project not found or not authorized' });
    }

    await deleteProjectDB(projectId);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return handleControllerError(error, res, 'Delete project');
  }
};

export const addProjectMember = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const projectId = req.params.id;
    const { userId } = req.body;

    // Check if user owns the project
    const isOwner = await isProjectOwner(projectId, authUser.id);
    if (!isOwner) {
      return res.status(404).json({ error: 'Project not found or not authorized' });
    }

    // Check if user exists
    const userToAdd = await findUserById(userId);
    if (!userToAdd) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add user to project editors
    await addProjectEditorDB(projectId, userId);
    res.json({ message: 'Editor added to project' });
  } catch (error) {
    return handleControllerError(error, res, 'Add project editor');
  }
};

export const uploadFile = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const projectId = req.params.id;
    const { fileName, fileUrl, fileSize } = req.body;

    // Check if user has access to project
    const hasAccess = await hasProjectAccess(projectId, authUser.id);
    if (!hasAccess) {
      return res.status(404).json({ error: 'Project not found or access denied' });
    }

    const file = {
      id: generateId(),
      name: fileName,
      url: fileUrl,
      size: fileSize,
      uploadedBy: new ObjectId(authUser.id),
      uploadedAt: new Date()
    };

    await addFileToProject(projectId, file);
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (error) {
    return handleControllerError(error, res, 'Upload file');
  }
};

export const removeProjectMember = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const projectId = req.params.id;
    const memberId = req.params.memberId;

    // Check if user owns the project
    const isOwner = await isProjectOwner(projectId, authUser.id);
    if (!isOwner) {
      return res.status(404).json({ error: 'Project not found or not authorized' });
    }

    // Remove user from project editors
    await removeProjectEditorDB(projectId, memberId);
    res.json({ message: 'Editor removed from project' });
  } catch (error) {
    return handleControllerError(error, res, 'Remove project editor');
  }
};

export const downloadFile = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const projectId = req.params.id;
    const fileId = req.params.fileId;

    // Check if user has access to project
    const hasAccess = await hasProjectAccess(projectId, authUser.id);
    if (!hasAccess) {
      return res.status(404).json({ error: 'Project not found or access denied' });
    }

    const project = await findProjectById(projectId);
    const file = project.files.find(f => f.id.toString() === fileId);
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json({ file });
  } catch (error) {
    return handleControllerError(error, res, 'Download file');
  }
};