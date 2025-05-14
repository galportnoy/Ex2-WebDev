const mongoose = require('mongoose');

// Define the Bookmark schema
const bookmarkSchema = new mongoose.Schema({
    title: { type: String, required: true},
    url: { type: String, required: true },
    description: { type: String, required: false },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
}, { versionKey: false });

module.exports = mongoose.model('Bookmark', bookmarkSchema);