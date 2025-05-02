const express = require('express');
const router = express.Router();
const Travel = require('../models/Travel');

// GET /api/travels
// Получение списка путешествий с сортировкой и пагинацией
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
    const skip = (page - 1) * limit;

    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const travels = await Travel.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Travel.countDocuments();

    res.json({
      travels,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/travels
// Создание новой записи о путешествии
router.post('/', async (req, res) => {
  try {
    const travel = new Travel(req.body);
    const savedTravel = await travel.save();
    res.status(201).json(savedTravel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 