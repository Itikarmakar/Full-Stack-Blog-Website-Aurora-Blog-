import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const signupUser = async(req,res) =>{
    try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password
    });

    if (user) {
      const token = generateToken(user._id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,       // Render uses HTTPS → MUST be true
        sameSite: "none",   // REQUIRED for cross-origin cookies
        path: "/",          // Ensure cookie is accessible everywhere
        maxAge: 30 * 24 * 60 * 60 * 1000 
      });
      

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async(req,res) =>{
    try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    //   maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    // });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,       // Render uses HTTPS → MUST be true
      sameSite: "none",   // REQUIRED for cross-origin cookies
      path: "/",          // Ensure cookie is accessible everywhere
      maxAge: 30 * 24 * 60 * 60 * 1000 
    });
    

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async(req,res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        });
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const userProfile = async(req,res) =>{
    try {
    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
    signupUser,
    loginUser,
    logoutUser,
    userProfile
}