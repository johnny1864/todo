const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const Task = require("./models/task");

// CONNECT TO DATA BASE
mongoose.connect('mongodb://johnny:johnny123@ds113522.mlab.com:13522/todo-app');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connect to data base');
});

// NAME OF COLLECTION IN DB
const collection = 'tasks';

const app = express();

app.use(bodyParser.json());

// GET ALL TASKS
app.get('/tasks', (req, res) => {
    console.log('pinged tasks');
    Task.find(function(err, data) {
        if (err) {
            res.send(data);
        }
        res.send((data));
    })
});

// POST A TASKS
app.post('/tasks', (req, res) => {
    const taskEntered = req.body;
    const task = new Task(taskEntered);

    task.save((err) => {
        if (err) {
            res.send(err);
        }

        res.json({ message: 'Task created!' });
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, _ => console.log('Server running on port', PORT));
