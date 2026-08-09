const express = require('express');
const { check } = require('express-validator');

const { register } = require('../../controllers/users');

const router = express.Router();

/**
 * @route   POST /api/users
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  register
);

module.exports = router;
