const Category = require('../models/category');
const Bookmark = require('../models/bookmark');
const mongoose = require('mongoose');

// Get all categories
exports.getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
}

// add a new category
exports.addCategory = async (req, res) => {
    const category_name = req.body.name;

    try {
        const existingCategory = await Category.findOne({ name: category_name });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        
        const category = new Category({ name: category_name });
        const savedCategory = await category.save();

        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add category', details: err.message });
    }
}



// delete a category and check if it has bookmarks
exports.deleteCategory = async (req, res) => {
    const category_name = req.params.name;

    try {
        // Check if the category exists
        const category = await Category.findOne({ name: category_name });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        } 

        // Check if the category has bookmarks
        const bookmarks = await Bookmark.find({ category_id: category._id });
        if (bookmarks.length > 0) {
            return res.status(400).json({ error: 'Category has bookmarks, cannot delete' });
        }
        
        await Category.deleteOne({ name: category_name });
        res.status(200).json({ message: 'Category deleted successfully' }); 
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete category', details: err.message });
    }
}