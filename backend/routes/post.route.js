import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  allPosts,
  singlePost,
  createPost,
  updatePost,
  deletePost
} from '../controllers/post.controller.js'

const router = express.Router();

console.log("post.route.js loaded");

router.route('/').get(allPosts)
router.route('/:id').get(singlePost)
router.route('/').post(protect,createPost)
router.route('/:id').put(protect,updatePost)
router.route('/:id').delete(protect,deletePost)

export default router;

