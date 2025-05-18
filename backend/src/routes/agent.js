const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const User = require('../models/User');

router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const agent = new User({ name, email, mobile, password, role: 'agent' });
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', adminAuth, async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' });
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;