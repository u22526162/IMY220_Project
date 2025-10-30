// Amadeus Fidos u22526162
import express from 'express';
import cors from 'cors';
import { connectDB, getDB } from './config/database.js';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import checkinRoutes from './routes/checkinRoutes.js';

const app = express();

// Configure CORS including preflight and Authorization header
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

//route declarations - these are base routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/checkins', checkinRoutes);

// health check for dev only, delete later
app.get('/api/health', async (req, res) => {
  try {
    const db = getDB();
    await db.command({ ping: 1 });
    return res.json({ status: 'ok', db: 'connected', uptime: process.uptime() });
  } catch (e) {
    return res.status(500).json({ status: 'error', db: 'disconnected', message: e?.message || 'unknown' });
  }
});

async function main() {
  await connectDB();
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();