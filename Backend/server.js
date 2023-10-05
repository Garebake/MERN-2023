require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./Routes/workouts');
const teamRoutes = require('./Routes/teams');


// initialize express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/teams', teamRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB... Listening on port:", process.env.PORT);
        });
    }).catch((error) => {
        console.log(error);
    })

