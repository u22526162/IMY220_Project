import { ObjectId } from 'mongodb';
import { 
  hashPassword, 
  comparePassword, 
  generateToken,
  validatePassword,
  validateEmail,
  validateUsername
} from '../utils/password.js';
import { 
  findUserByEmailOrUsername, 
  findUserByEmail, 
  createUser,
  handleControllerError 
} from '../utils/fileStorage.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (usernameError) return res.status(400).json({ error: usernameError });
    if (emailError) return res.status(400).json({ error: emailError });
    if (passwordError) return res.status(400).json({ error: passwordError });

    // Check existing user
    const existingUser = await findUserByEmailOrUsername(email, username);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user (store plaintext password per project requirement)
    const user = {
      username,
      email,
      password: password,
      profile: { 
        name: username, 
        bio: '', 
        avatar: '' 
      },
      friendIds: [],
      projectIds: [],
      checkinIds: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await createUser(user);
    
    // Generate token
    const token = generateToken({ id: result.insertedId.toString(), username });

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
    return handleControllerError(error, res, 'Registration');
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ id: user._id.toString(), username: user.username });

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
    return handleControllerError(error, res, 'Login');
  }
};

export const logout = async (req, res) => {
  try {
    // In a real app, you might blacklist the token
    // For now, just return success - client will remove token
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    return handleControllerError(error, res, 'Logout');
  }
};