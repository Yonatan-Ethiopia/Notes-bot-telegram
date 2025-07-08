const mongoose = require('mongoose');
const midExamSchema = new mongoose.Schema({
  subject: { type: String, required: true},
  fileId: { type: String, required: true},
  createdAt: { type: Date, default: Date.now}
});
module.exports = mongoose.model('midExam', midExamSchema);