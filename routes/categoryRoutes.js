const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/getAllCategories', categoryController.getAllCategories);

router.post('/addCategory', categoryController.addCategory);

router.delete('/deleteCategory/:name', categoryController.deleteCategory);

module.exports = router;