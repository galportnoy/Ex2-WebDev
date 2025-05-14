const Category = require('../models/category');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');


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

        res.status(200).json(savedCategory);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add category', details: err.message });
    }
}