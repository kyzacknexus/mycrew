import { Router } from 'express';
import Bet from '../models/Bet';

const router = Router();

// Place a bet
router.post('/', async (req, res) => {
  try {
    const { userId, opponent, amount } = req.body;
    const bet = new Bet({ userId, opponent, amount });
    await bet.save();
    res.status(201).json(bet);
  } catch (error) {
    res.status(500).json({ message: 'Error placing bet' });
  }
});

// Get all bets
router.get('/', async (req, res) => {
  try {
    const bets = await Bet.find().populate('userId opponent', 'username');
    res.json(bets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bets' });
  }
});

export default router;