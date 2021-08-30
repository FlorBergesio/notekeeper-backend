const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    notebook: {
        type: Schema.ObjectId,
        ref: 'Notebooks',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: Date,
});

const model = mongoose.model('Notes', mySchema);
module.exports = model;