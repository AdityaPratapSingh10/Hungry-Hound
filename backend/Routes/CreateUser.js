const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecret="zxcvbnmasdfghjkl";

// POST /api/users/createuser
router.post(
  '/createuser',
  [
    // Validation middleware for req.body fields
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Destructure fields from req.body
      const { name, password, email, geolocation } = req.body;

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new User instance with hashed password
      const newUser = new User({ name, password: hashedPassword, email, geolocation });

      // Save the new user to the database
      await newUser.save();

      // Respond with success message and user details
      res.json({
        success: true,
        message: 'User created successfully',
        user: newUser
      });
    } catch (error) {
      console.error('Error creating user:', error);

      // Respond with error message if user creation fails
      res.status(500).json({
        success: false,
        message: 'Failed to create user'
      });
    }
  }
);

// POST /api/users/loginuser
router.post(
  '/loginuser',
  [
    // Validation middleware for req.body fields
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Compare hashed passwords
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const data={
        user:{
             id:user.id
        }
      }

      // Respond with success message
      const authToken= jwt.sign(data,jwtSecret)
      res.json({ success: true, authToken:authToken });
    } catch (error) {
      console.error('Error in login user:', error);

      // Respond with error message if login fails
      res.status(500).json({
        success: false,
        message: 'Failed to login user'
      });
    }
  }
);

module.exports = router;