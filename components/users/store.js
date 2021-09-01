const Model = require('./model');

const getList = async () => {
    const list = await Model.find();
    return list;
};

const add = user => {
    const newUser = new Model(user);
    newUser.save();
};

const update = async ( id, name ) => {
    const user = await Model.findOne({
        _id: id
    });
    user.name = name;
    const updated = await user.save();
    return updated;
};

const find = async ( id ) => {
    const user = await Model.exists({
        _id: id
    });
    return user;
};

const drop = ( id ) => {
    return Model.deleteOne({
        _id: id
    });
};

const findUsername = async ( username ) => {
    const user = await Model.findOne( { username: username } );
    return user;
};

const findFullUser = async ( id ) => {
    const user = await Model.findOne({
        _id: id
    }).select("+password").select("+salt");
    return user;
};

module.exports = {
    getList,
    add,
    update,
    find,
    drop,
    findUsername,
    findFullUser,
};
