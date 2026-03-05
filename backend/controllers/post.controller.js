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
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }, // increase views by 1
      { new: true } // return updated post
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createPost = async(req,res) => {
  console.log("triggered")
    try {
    const { title, author, content, image } = req.body;

    console.log("Content received:", content);

    if (!title || !author || !content) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Remove HTML tags if content comes from TinyMCE
    const plainText = content.replace(/<[^>]*>/g, "");

    console.log("Plain text:", plainText);

    // Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = plainText.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    console.log("Reading time:", readingTime);

    const post = await Post.create({
      title,
      author,
      authorId: req.user._id,
      content,
      image: image || '',
      readingTime,
      views: 0
    });

    console.log("Saved post:", post);

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