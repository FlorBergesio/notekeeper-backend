const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'Users',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: Date,
});

const model = mongoose.model('Notebooks', mySchema);
module.exports = model;