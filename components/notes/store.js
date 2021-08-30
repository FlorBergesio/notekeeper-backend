const Model = require('./model');

const db = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
 
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTERS}/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-3rhyxh-shard-0&authSource=admin&retryWrites=true&w=majority`;

db.Promise = global.Promise;
db.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => console.log('BD connected successfully'))
    .catch( e => console.error('BD', e));


const getList = async ( filterUser ) => {
    let filter = {};
    if ( filterUser !== null ) {
        filter = {
            user: filterUser,
        }
    }
    const list = await Model.find( filter );
    return list;
};

const add = note => {
    const newNote = new Model(note);
    newNote.save();
};

const update = async ( id, text ) => {
    const note = await Model.findOne({
        _id: id
    });
    note.text = text;
    const updated = await note.save();
    return updated;
};

const find = async ( id ) => {
    const note = await Model.exists({
        _id: id
    });
    return note;
};

const drop = ( id ) => {
    return Model.deleteOne({
        _id: id
    });
};

module.exports = {
    getList: getList,
    add: add,
    update: update,
    find: find,
    drop: drop,
};