const mongoose = require('mongoose');
const notesSchema = new mongoose.Schema({
  subject: { type: String, required: true},
  fileId: { type: String, required: true},
  createdAt: { type: Date, default: Date.now},                             
})
module.exports = mongoose.model('notes', notesSchema);