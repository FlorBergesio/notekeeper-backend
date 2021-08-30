const list = [];

const getList = () => {
    return list;
};

const add = note => {
    list.push(note);
};

module.exports = {
    getList: getList,
    add: add,
};