import express from 'express';
import cors from 'cors';
import { connectDB, getDB } from './config/database.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import checkinRoutes from './routes/checkinRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

//route declarations - these are base routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/checkins', checkinRoutes);

async function main() {
  await connectDB();
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();