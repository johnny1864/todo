const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchma = new Schema({
    task: String,
    isDone: Boolean
})

module.exports = mongoose.model('Tasks', taskSchma);
