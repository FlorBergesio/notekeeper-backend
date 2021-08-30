const Model = require('./model');

const getList = async ( filterNotebook ) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if ( filterNotebook !== null ) {
            filter = {
                notebook: filterNotebook,
            }
        }
        Model.find(filter)
            .populate('notebook')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
    });
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
