import { ObjectId } from 'mongodb';
import { getDB } from '../config/database.js';
import { requireAuth } from '../utils/password.js';
import { 
  createCheckin as createCheckinDB,
  findProjectCheckins,
  getAllCheckinsWithDetails,
  hasProjectAccess,
  addCheckinToProject,
  addCheckinToUser,
  generateId,
  handleControllerError,
  COLLECTIONS
} from '../utils/fileStorage.js';

export const getCheckins = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const checkins = await getAllCheckinsWithDetails(authUser.id);
    res.json(checkins);
  } catch (error) {
    return handleControllerError(error, res, 'Get checkins');
  }
};

export const createCheckin = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const { projectId, message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Check-in message is required' });
    }

    // Verify project exists and user has access
    const hasAccess = await hasProjectAccess(projectId, authUser.id);
    if (!hasAccess) {
      return res.status(404).json({ error: 'Project not found or access denied' });
    }

    const checkin = {
      projectId: new ObjectId(projectId),
      userId: new ObjectId(authUser.id),
      message: message.trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await createCheckinDB(checkin);
    
    // Add checkin to project and user
    await Promise.all([
      addCheckinToProject(projectId, result.insertedId),
      addCheckinToUser(authUser.id, result.insertedId)
    ]);
    
    // Update project's last updated time
    const db = getDB();
    await db.collection(COLLECTIONS.PROJECTS).updateOne(
      { _id: new ObjectId(projectId) },
      { $set: { updatedAt: new Date() } }
    );

    res.status(201).json({
      id: result.insertedId,
      ...checkin
    });
  } catch (error) {
    return handleControllerError(error, res, 'Create checkin');
  }
};

export const getProjectCheckins = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const projectId = req.params.projectId;

    // Verify project access
    const hasAccess = await hasProjectAccess(projectId, authUser.id);
    if (!hasAccess) {
      return res.status(404).json({ error: 'Project not found or access denied' });
    }

    const checkins = await findProjectCheckins(projectId);
    res.json(checkins);
  } catch (error) {
    return handleControllerError(error, res, 'Get project checkins');
  }
};

export const getUserCheckins = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const userId = req.params.userId;

    // For now, return all checkins for the authenticated user
    // In a real app, you might want to check if the user can see other users' checkins
    if (authUser.id !== userId) {
      return res.status(403).json({ error: 'Not authorized to view this user\'s checkins' });
    }

    const checkins = await getAllCheckinsWithDetails(userId);
    res.json(checkins);
  } catch (error) {
    return handleControllerError(error, res, 'Get user checkins');
  }
};

export const updateCheckin = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const checkinId = req.params.id;
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Check-in message is required' });
    }

    const db = getDB();
    const result = await db.collection(COLLECTIONS.CHECKINS).updateOne(
      { 
        _id: new ObjectId(checkinId),
        userId: new ObjectId(authUser.id) // Only allow users to update their own checkins
      },
      { 
        $set: { 
          message: message.trim(),
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Check-in not found or not authorized' });
    }

    res.json({ message: 'Check-in updated successfully' });
  } catch (error) {
    return handleControllerError(error, res, 'Update checkin');
  }
};

export const deleteCheckin = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const checkinId = req.params.id;

    const db = getDB();
    const result = await db.collection(COLLECTIONS.CHECKINS).deleteOne({
      _id: new ObjectId(checkinId),
      userId: new ObjectId(authUser.id) // Only allow users to delete their own checkins
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Check-in not found or not authorized' });
    }

    res.json({ message: 'Check-in deleted successfully' });
  } catch (error) {
    return handleControllerError(error, res, 'Delete checkin');
  }
};
};