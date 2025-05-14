const express = require('express');
const mongoose = require('mongoose');
const categoryRoutes = require('./routes/categoryRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB').then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

const app = express();
app.use(express.json()); 

// route to category and bookmark
app.use("/category", categoryRoutes);
app.use("/bookmark", bookmarkRoutes);


const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})
