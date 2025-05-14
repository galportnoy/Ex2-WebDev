const Bookmark = require('../models/bookmark');
const Category = require('../models/category');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');


// Get all bookmarks
exports.getAllBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find().populate('category_id', 'name');
        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookmarks', error });
    }
}

// add a new bookmark
exports.addBookmark = async (req, res) => {
    const { title, url, description, category_id } = req.body;

    try {
        // Check if the category exists
        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(400).json({ error: 'Category not found' });
        }

        const bookmark = new Bookmark({
            title,
            url,
            description,
            category_id,
        });

        // save the bookmark
        const savedBookmark = await bookmark.save();
        res.status(200).json(savedBookmark);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add bookmark', details: err.message });
    }
}