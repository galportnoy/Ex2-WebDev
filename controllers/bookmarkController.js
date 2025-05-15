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

// delete a bookmark
exports.deleteBookmark = async (req, res) => {
    const bookmarkId = req.params.id;
    try {
        // Check if the bookmark exists
        const bookmark = await Bookmark.findById({_id: bookmarkId});

        if (!bookmark) {
            return res.status(404).json({ error: 'Bookmark not found' });
        }  
        // Delete the bookmark
        await Bookmark.deleteOne({ _id: bookmarkId });
        res.status(200).json({ message: 'Bookmark deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete bookmark', details: err.message });
    }
}

// get a bookmark
exports.getBookmark = async (req, res) => {
    const categoryId = req.params.id;
    try {
        // Check if the bookmark exists
        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        // Get the bookmarks for the category
        const bookmarks = await Bookmark.find({ category_id: categoryId }); 
        if (bookmarks.length === 0) {
            return res.status(404).json({ error: 'No bookmarks found for this category' });
        }
        res.status(200).json(bookmarks);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch bookmark', details: err.message });
    }
}

exports.updateBookmark = async (req, res) => {
    const bookmarkId = req.params.id;
    const { title, url, description, category_id } = req.body;

    try {
        // Check if the bookmark exists
        const bookmark = await Bookmark.findById(bookmarkId);
        if (!bookmark) {
            return res.status(404).json({ error: 'Bookmark not found' });
        }

        // Check if the category exists
        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(400).json({ error: 'Category not found' });
        }

        // Update the bookmark
        bookmark.title = title;
        bookmark.url = url;
        bookmark.description = description;
        bookmark.category_id = category_id;

        const updatedBookmark = await bookmark.save();
        res.status(200).json(updatedBookmark);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update bookmark', details: err.message });
    }
}
