import Post from '../models/Post.js';

const allPosts = async(req,res) => {
    try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const singlePost = async(req,res) => {
    try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createPost = async(req,res) => {
    try {
    const { title, author, content, image } = req.body;

    if (!title || !author || !content) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const post = await Post.create({
      title,
      author,
      authorId: req.user._id,
      content,
      image: image || ''
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updatePost = async(req,res) => {
    try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this post' });
    }

    const { title, content, image } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    if (image !== undefined) {
      post.image = image;
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deletePost = async(req,res) =>{
    try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
    allPosts,
    singlePost,
    createPost,
    updatePost,
    deletePost
}