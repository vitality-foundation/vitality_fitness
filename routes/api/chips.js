const express = require('express');
const router = express.Router();

const validateToken = require('../../middleware/auth');
const { handleFreeChipsRequest } = require('../../controllers/chips');

/**
 * @route   GET /api/chips/free
 * @desc    Request free chips (requires authentication)
 * @access  Private
 */
router.get('/free', validateToken, handleFreeChipsRequest);

module.exports = router;
