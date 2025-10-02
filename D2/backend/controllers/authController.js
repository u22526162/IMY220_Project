import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/database.js';

const USER_COLLECTION = 'users';

// Helper function INSIDE controller (not separate util)
const validatePassword = (password) => {
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
};

const getUserFromToken = (req) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const register = async (req, res) => {
  try {
    const db = getDB();
    const { username, email, password } = req.body;

    // Validation directly in controller
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    validatePassword(password);

    // Check existing user
    const existingUser = await db.collection(USER_COLLECTION).findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = {
      username,
      email,
      password: hashedPassword,
      profile: { name: username, bio: '', avatar: '' },
      friends: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection(USER_COLLECTION).insertOne(user);
    
    // Generate token
    const token = jwt.sign(
      { id: result.insertedId, username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: { 
        id: result.insertedId, 
        username, 
        email,
        profile: user.profile
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const db = getDB();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await db.collection(USER_COLLECTION).findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email,
        profile: user.profile
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};