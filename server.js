const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
const categoryRoutes = require('./routes/categoryRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');

const app = express();
app.use(express.json()); 

app.use("/category", categoryRoutes);
app.use("/bookmark", bookmarkRoutes);


const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})
