const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  cost: {
    transport: {
      type: Number,
      required: true,
      min: 0
    },
    accommodation: {
      type: Number,
      required: true,
      min: 0
    },
    food: {
      type: Number,
      required: true,
      min: 0
    },
    other: {
      type: Number,
      required: true,
      min: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  heritageSites: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  }],
  placesToVisit: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  }]
}, {
  timestamps: true
});

// Middleware для автоматического подсчета общей стоимости
travelSchema.pre('save', function(next) {
  const cost = this.cost;
  cost.total = cost.transport + cost.accommodation + cost.food + cost.other;
  next();
});

module.exports = mongoose.model('Travel', travelSchema); 