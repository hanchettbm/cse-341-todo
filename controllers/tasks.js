const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({ 
      task:{
        type: String,
        required: true
    },
    location:  {
      type: String,
      required: true
    },
    startTime:  {
      type: String,
      required: true
    },
    startDate:  {
        type: String,
        required: true
    },
    user:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },
    deadlineDate:  {
      type: String,
      required: true
    },
    deadlineTime: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: false,
        default:'public',
        enum: ['public', 'private']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: false
  }
});

module.exports = mongoose.model('Tasks', TasksSchema);