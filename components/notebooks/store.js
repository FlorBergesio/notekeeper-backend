const Model = require('./model');

const getList = async ( filterUser ) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if ( filterUser !== null ) {
            filter = {
                user: filterUser,
            }
        }
        Model.find(filter)
            .populate('user')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
    });
};

const add = notebook => {
    const newNotebook = new Model(notebook);
    newNotebook.save();
};

const update = async ( id, name ) => {
    const notebook = await Model.findOne({
        _id: id
    });
    notebook.name = name;
    const updated = await notebook.save();
    return updated;
};

const find = async ( id ) => {
    const notebook = await Model.exists({
        _id: id
    });
    return notebook;
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
