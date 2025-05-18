const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const List = require('../models/List');
const User = require('../models/User'); // Add this import
const multer = require('multer');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const { Readable } = require('stream');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', adminAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let lists = [];
    const buffer = req.file.buffer;
    
    if (req.file.mimetype === 'text/csv') {
      // Process CSV
      const results = await new Promise((resolve, reject) => {
        const stream = require('stream').Readable.from(buffer.toString());
        const results = [];
        stream
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', reject);
      });
      lists = results;
    } else {
      // Process Excel
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      lists = xlsx.utils.sheet_to_json(worksheet);
    }

    // Validate data
    const validLists = lists
      .map(item => ({
        firstName: item.firstName || item.FirstName || '',
        phone: String(item.phone || item.Phone || ''),
        notes: item.notes || item.Notes || ''
      }))
      .filter(item => item.firstName && item.phone);

    if (validLists.length === 0) {
      return res.status(400).json({ error: 'No valid records found' });
    }

    // Distribute to agents (example for 5 agents)
    const agents = await User.find({ role: 'agent' }).limit(5);
    const distributedLists = [];
    
    validLists.forEach((item, index) => {
      const agentIndex = index % agents.length;
      distributedLists.push({
        ...item,
        assignedTo: agents[agentIndex]._id
      });
    });

    // Save to database
    const savedLists = await List.insertMany(distributedLists);
    
    res.json({
      message: `Distributed ${validLists.length} items to ${agents.length} agents`,
      distributedLists: savedLists,
      totalItems: validLists.length
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', adminAuth, async (req, res) => {
  try {
    const lists = await List.find().populate('assignedTo', 'name email');
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;