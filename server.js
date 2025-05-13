const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON body

const categories = require('./categories.json'); // Import the data from "./tasks.json"
const { json } = require('stream/consumers');

// GET route to fetch all categories and their tasks from the “tasks.json” file
app.get('/categories', (req, res) => {
    res.json(categories);
});
  
// GET route to fetch a all the tasks inside a specific category
app.get('/categories/:category_id', (req, res) => {
    const catag_id = req.params.category_id;
    const exist = categories.find(c =>(c.category_id == catag_id));
    if (exist) {
        res.json(categories[catag_id - 1]);
    }
    else{
        res.status(404).json("Not Found!");
    }
});

// POST request to add new task to a category
app.post('/categories/:category_id/tasks', (req, res) => {
    const categ_id = req.params.category_id;
    const newTask = {
            task_id: req.body.task_id,
            name: req.body.name,
            is_completed: req.body.is_completed
        };

    const exist = categories.find(c =>(c.category_id == categ_id));
    if (exist) {
        categories[categ_id - 1].tasks.push(newTask);
        res.status(201).json("Successfully added!");
    }
    else{
        res.status(404).json("Not Found category id");
    }});

// PUT request to update a given task (name, is_completed)
app.put('/categories/:category_id/tasks/:task_id', (req, res) => {

});

// DELETE request to delete a specific task inside a category
app.delete('/categories/:category_id/tasks/:task_id', (req, res) => {

});

const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})
