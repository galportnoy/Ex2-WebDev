const express = require('express');
const app = express();

const mongojs = require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/todolistDB', ['categories', 'bookmarks']);

app.use(express.json()); 

app.get('/', (req, res) => {
    res.json('Hello World!');
});

app.post('/addCategory', (req, res) => {
    const category_name = req.body.name;
    const category = {
        name: category_name,
    }
    // Check if the category already exists
    db.categories.findOne({ name: category_name }, (err, existingCategory) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to check for existing category' });
        }
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }
    });
    
    db.categories.insert({ category }, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add category' });
        } else {
            res.status(200).json(data);
        }
    });
},);

app.post('/addBookmarks', (req, res) => {
    const bookmark_title = req.body.title;
    const bookmark_url = req.body.url;
    const bookmark_description = req.body.description;
    const bookmark_category_id = req.body.category_id;
    const bookmark = {
        title: bookmark_title,
        url: bookmark_url,
        description: bookmark_description,
        category_id: bookmark_category_id,
    }

    // Check if the category exists
    db.categories.findOne({ _id: mongojs.ObjectId(bookmark_category_id) }, (err, category) => {
        if (err || !category) {
            return res.status(400).json({ error: 'Category not found' });
        }
    });

    // Insert the bookmark into the database
    db.bookmarks.insert({ bookmark }, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add bookmark' });
        } else {
            res.status(200).json(data);
        }
    });   
},);

const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})
