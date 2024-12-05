import { Comment } from '../models/commentSchema.js';

export const addComment = async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    const newComment = new Comment({ name, message, rating });
    await newComment.save();
    res.status(201).json({ message: 'Comment added successfully!', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
};
