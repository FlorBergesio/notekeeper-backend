const store = require('./store');

const getList = () => {
    return new Promise(( resolve, reject ) => {
        return resolve(store.getList());
    });
};

const add = ( user, text ) => {
    return new Promise( ( resolve, reject ) => {
        if ( !user || !text ) {
            return reject('Required data missing');
        }
        const note = {
            user: user,
            text: text,
            date: new Date(),
        };

        store.add(note);
        return resolve(note);
    });
};

module.exports = {
    add,
    getList,
};