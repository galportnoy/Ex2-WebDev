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

    db.categories.insert({ category }, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add category' });
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
