import { ObjectId } from 'mongodb';
import { getDB } from '../config/database.js';

// Collection constants
export const COLLECTIONS = {
  USERS: 'users',
  PROJECTS: 'projects',
  CHECKINS: 'checkins',
  FRIEND_REQUESTS: 'friend_requests'
};

export const generateId = () => {
  return new ObjectId();
};

export const findUserById = async (userId, excludePassword = true) => {
  const db = getDB();
  const projection = excludePassword ? { password: 0 } : {};
  return await db.collection(COLLECTIONS.USERS).findOne(
    { _id: new ObjectId(userId) },
    { projection }
  );
};

export const findUserByEmail = async (email) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.USERS).findOne({ email });
};

export const findUserByEmailOrUsername = async (email, username) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.USERS).findOne({
    $or: [{ email }, { username }]
  });
};

export const createUser = async (userData) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.USERS).insertOne(userData);
};

export const updateUser = async (userId, updateData) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.USERS).updateOne(
    { _id: new ObjectId(userId) },
    { $set: { ...updateData, updatedAt: new Date() } }
  );
};

export const findProjectById = async (projectId) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.PROJECTS).findOne({
    _id: new ObjectId(projectId)
  });
};

export const findUserProjects = async (userId) => {
  const db = getDB();
  const user = await db.collection(COLLECTIONS.USERS).findOne(
    { _id: new ObjectId(userId) },
    { projection: { projectIds: 1 } }
  );
  
  if (!user || !user.projectIds || user.projectIds.length === 0) {
    return [];
  }

  return await db.collection(COLLECTIONS.PROJECTS)
    .find({ _id: { $in: user.projectIds } })
    .sort({ createdAt: -1 })
    .toArray();
};

export const createProject = async (projectData) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.PROJECTS).insertOne(projectData);
};

export const updateProject = async (projectId, updateData) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.PROJECTS).updateOne(
    { _id: new ObjectId(projectId) },
    { $set: { ...updateData, updatedAt: new Date() } }
  );
};

export const deleteProject = async (projectId) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.PROJECTS).deleteOne({
    _id: new ObjectId(projectId)
  });
};

export const createCheckin = async (checkinData) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.CHECKINS).insertOne(checkinData);
};

export const findProjectCheckins = async (projectId) => {
  const db = getDB();
  const project = await db.collection(COLLECTIONS.PROJECTS).findOne(
    { _id: new ObjectId(projectId) },
    { projection: { checkinIds: 1 } }
  );
  
  if (!project || !project.checkinIds || project.checkinIds.length === 0) {
    return [];
  }

  return await db.collection(COLLECTIONS.CHECKINS)
    .find({ _id: { $in: project.checkinIds } })
    .sort({ createdAt: -1 })
    .toArray();
};

export const searchUsers = async (searchTerm, limit = 20) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.USERS)
    .find({
      $or: [
        { username: { $regex: searchTerm, $options: 'i' } },
        { 'profile.name': { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } }
      ]
    })
    .project({ password: 0 })
    .limit(limit)
    .toArray();
};

// Authorization helpers
export const hasProjectAccess = async (projectId, userId) => {
  const project = await findProjectById(projectId);
  if (!project) return false;
  
  return project.ownerId.toString() === userId || 
         project.editorIds.some(editorId => editorId.toString() === userId);
};

export const isProjectOwner = async (projectId, userId) => {
  const project = await findProjectById(projectId);
  return project && project.ownerId.toString() === userId;
};

// Error handling helpers
export const handleAuthError = (error, res) => {
  if (error.message === 'Authentication required') {
    return res.status(401).json({ error: 'Authentication required' });
  }
  console.error('Auth error:', error);
  return res.status(500).json({ error: 'Server error' });
};

export const handleControllerError = (error, res, operation = 'operation') => {
  if (error.message === 'Authentication required') {
    return res.status(401).json({ error: 'Authentication required' });
  }
  console.error(`${operation} error:`, error);
  return res.status(500).json({ error: 'Server error' });
};

// Additional project helpers
export const addProjectEditor = async (projectId, userId) => {
  const db = getDB();
  const result = await db.collection(COLLECTIONS.PROJECTS).updateOne(
    { _id: new ObjectId(projectId) },
    { $addToSet: { editorIds: new ObjectId(userId) } }
  );
  
  // Also add project to user's projectIds
  if (result.modifiedCount > 0) {
    await db.collection(COLLECTIONS.USERS).updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { projectIds: new ObjectId(projectId) } }
    );
  }
  
  return result;
};

export const removeProjectEditor = async (projectId, userId) => {
  const db = getDB();
  const result = await db.collection(COLLECTIONS.PROJECTS).updateOne(
    { _id: new ObjectId(projectId) },
    { $pull: { editorIds: new ObjectId(userId) } }
  );
  
  // Also remove project from user's projectIds
  if (result.modifiedCount > 0) {
    await db.collection(COLLECTIONS.USERS).updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { projectIds: new ObjectId(projectId) } }
    );
  }
  
  return result;
};

export const addFileToProject = async (projectId, fileData) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.PROJECTS).updateOne(
    { _id: new ObjectId(projectId) },
    { 
      $push: { files: fileData },
      $set: { updatedAt: new Date() }
    }
  );
};

// Checkin helpers with new data structure
export const addCheckinToProject = async (projectId, checkinId) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.PROJECTS).updateOne(
    { _id: new ObjectId(projectId) },
    { $addToSet: { checkinIds: new ObjectId(checkinId) } }
  );
};

export const addCheckinToUser = async (userId, checkinId) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.USERS).updateOne(
    { _id: new ObjectId(userId) },
    { $addToSet: { checkinIds: new ObjectId(checkinId) } }
  );
};

// Checkin helpers
export const getAllCheckinsWithDetails = async (userId) => {
  const db = getDB();
  const user = await db.collection(COLLECTIONS.USERS).findOne(
    { _id: new ObjectId(userId) },
    { projection: { checkinIds: 1 } }
  );
  
  if (!user || !user.checkinIds || user.checkinIds.length === 0) {
    return [];
  }

  return await db.collection(COLLECTIONS.CHECKINS)
    .aggregate([
      {
        $match: { _id: { $in: user.checkinIds } }
      },
      {
        $lookup: {
          from: 'projects',
          localField: 'projectId',
          foreignField: '_id',
          as: 'project'
        }
      },
      {
        $unwind: '$project'
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          'user.password': 0
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ])
    .toArray();
};

// Friend request helpers
export const createFriendRequest = async (fromUserId, toUserId) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.FRIEND_REQUESTS).insertOne({
    fromUser: new ObjectId(fromUserId),
    toUser: new ObjectId(toUserId),
    status: 'pending',
    createdAt: new Date()
  });
};

export const findFriendRequest = async (requestId, toUserId) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.FRIEND_REQUESTS).findOne({
    _id: new ObjectId(requestId),
    toUser: new ObjectId(toUserId),
    status: 'pending'
  });
};

export const updateFriendRequest = async (requestId, updateData) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.FRIEND_REQUESTS).updateOne(
    { _id: new ObjectId(requestId) },
    { $set: updateData }
  );
};

export const addFriendToUser = async (userId, friendId) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.USERS).updateOne(
    { _id: new ObjectId(userId) },
    { $addToSet: { friendIds: new ObjectId(friendId) } }
  );
};

export const removeFriendFromUser = async (userId, friendId) => {
  const db = getDB();
  return await db.collection(COLLECTIONS.USERS).updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { friendIds: new ObjectId(friendId) } }
  );
};

export const getUserFriends = async (userId) => {
  const db = getDB();
  const user = await db.collection(COLLECTIONS.USERS).findOne(
    { _id: new ObjectId(userId) },
    { projection: { friendIds: 1 } }
  );

  if (!user || !user.friendIds || user.friendIds.length === 0) {
    return [];
  }

  return await db.collection(COLLECTIONS.USERS)
    .find({ _id: { $in: user.friendIds } })
    .project({ password: 0 })
    .toArray();
};