const Model = require('./model');

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
    getList,
    add,
    update,
    find,
    drop,
};
