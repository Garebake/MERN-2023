require('dotenv').config();

const express = require('express');

// initialize express app
const app = express();

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to the app'});
    console.log('Received GET.');
});

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port 4000.');
});