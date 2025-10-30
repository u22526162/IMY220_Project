import { ObjectId } from 'mongodb';
import { getDB } from '../config/database.js';
import { requireAuth } from '../utils/password.js';
import { 
  findUserById,
  updateUser,
  searchUsers as searchUsersDB,
  createFriendRequest,
  findFriendRequest,
  updateFriendRequest,
  addFriendToUser,
  removeFriendFromUser,
  getUserFriends,
  handleControllerError,
  COLLECTIONS
} from '../utils/fileStorage.js';

export const getUserProfile = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    return handleControllerError(error, res, 'Get user profile');
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const userId = req.params.id;
    const { name, bio, avatar } = req.body;

    // Authorization check
    if (authUser.id !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this profile' });
    }

    // Validation
    if (name && name.length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }

    const updateData = {
      'profile.name': name,
      'profile.bio': bio,
      'profile.avatar': avatar
    };

    const result = await updateUser(userId, updateData);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    return handleControllerError(error, res, 'Update profile');
  }
};

export const searchUsers = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const { q: searchTerm } = req.query;

    if (!searchTerm || searchTerm.length < 2) {
      return res.status(400).json({ error: 'Search term must be at least 2 characters' });
    }

    const users = await searchUsersDB(searchTerm);
    res.json(users);
  } catch (error) {
    return handleControllerError(error, res, 'Search users');
  }
};

export const getFriends = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const userId = req.params.id;

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const friends = await getUserFriends(userId);
    res.json(friends);
  } catch (error) {
    return handleControllerError(error, res, 'Get friends');
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const toUserId = req.params.id;

    // Prevent self-friending
    if (authUser.id === toUserId) {
      return res.status(400).json({ error: 'Cannot send friend request to yourself' });
    }

    // Check if users exist
    const [fromUser, toUser] = await Promise.all([
      findUserById(authUser.id, false), // Include password for friends check
      findUserById(toUserId)
    ]);

    if (!fromUser || !toUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already friends
    if (fromUser.friendIds && fromUser.friendIds.some(friendId => friendId.toString() === toUserId)) {
      return res.status(400).json({ error: 'Already friends' });
    }

    // Check if request already exists
    const db = getDB();
    const existingRequest = await db.collection(COLLECTIONS.FRIEND_REQUESTS).findOne({
      fromUser: new ObjectId(authUser.id),
      toUser: new ObjectId(toUserId),
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    // Create friend request
    await createFriendRequest(authUser.id, toUserId);
    res.json({ message: 'Friend request sent successfully' });
  } catch (error) {
    return handleControllerError(error, res, 'Send friend request');
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const requestId = req.params.requestId;

    // Find and update friend request
    const request = await findFriendRequest(requestId, authUser.id);
    if (!request) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    // Update request status
    await updateFriendRequest(requestId, { 
      status: 'accepted', 
      acceptedAt: new Date() 
    });

    // Add to each other's friends list
    await Promise.all([
      addFriendToUser(request.fromUser.toString(), request.toUser.toString()),
      addFriendToUser(request.toUser.toString(), request.fromUser.toString())
    ]);

    res.json({ message: 'Friend request accepted' });
  } catch (error) {
    return handleControllerError(error, res, 'Accept friend request');
  }
};

export const removeFriend = async (req, res) => {
  try {
    const authUser = requireAuth(req);
    const friendId = req.params.id;

    // Remove from both friends lists
    await Promise.all([
      removeFriendFromUser(authUser.id, friendId),
      removeFriendFromUser(friendId, authUser.id)
    ]);

    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    return handleControllerError(error, res, 'Remove friend');
  }
};