import { Router } from 'express';
import Post from '../models/Post';
import User from '../models/User';

const router = Router();

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { author, content } = req.body;
    const post = new Post({ author, content });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Get all posts (feed)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Like a post
router.post('/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error liking post' });
  }
});

export default router;