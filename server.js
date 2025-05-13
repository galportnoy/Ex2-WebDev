const express = require('express');
const app = express();
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});



const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})
