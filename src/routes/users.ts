import { Router } from 'express';
import User from '../models/User';

const router = Router();

// Get user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

export default router;

// Hall of Fame: Top 10 users by points
router.get('/halloffame', async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 }).limit(10);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hall of fame' });
  }
});