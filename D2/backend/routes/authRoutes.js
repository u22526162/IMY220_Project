import express from 'express';

const authRouter = express.Router();

router.post('/signup', register);
router.post('/login', login);

export default authRouter; 