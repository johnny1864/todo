const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SEND USER TO INDEX PAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});


// GET ALL TASKS FROM DB
app.get('/tasks', (req, res) => {
    console.log('pinged tasks');
    Task.find(function(err, data) {
        if (err) {
            res.send(data);
        }
        res.send((data));
    })
});

// POST A TASKS INTO DB
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

// UPDATE A TASKS 
app.put('/:id', (req, res) => {
    const todoID = req.params.id;
    const userInput = req.body;

    console.log('put pinged', todoID);
    db.collection(collection)
        .findOneAndUpdate({ _id: todoID }, { $set: { todo: userInput.todo } }, { returnOriginal: false }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                //console.log(result)
                res.json(result);
            }
        });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, _ => console.log('Server running on port', PORT));
