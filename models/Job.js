const mongoose = require('mongoose')
const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please Provide company Name'],
    maxlength: 50,
  },
  position: {
    type: String,
    required:[true, 'Please Provide Position '],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ['interview', 'decline', 'pending'],
    default: 'pending',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please Provide user']
  },

},
{timestamps: true }
)

const Job = mongoose.model("Job", JobSchema);

module.exports= Job