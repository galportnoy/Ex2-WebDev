const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Category', categorySchema);