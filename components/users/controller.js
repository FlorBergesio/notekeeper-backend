const store = require('./store');

const getList = () => {
    return store.getList();
};

const add = ( name ) => {
    return new Promise( ( resolve, reject ) => {
        if ( !name ) {
            return reject('Required data missing');
        }
        const user = {
            name: name,
        };

        store.add(user);
        return resolve(user);
    });
};

const update = ( id, name ) => {
    return new Promise( async ( resolve, reject ) => {
        if ( !id || !name ) {
            return reject('Required data missing');
        }
        const updated = await store.update( id, name );
        return resolve(updated);
    });
}

const drop = ( id ) => {
    return new Promise( async ( resolve, reject ) => {
        if ( !id ) {
            return reject('Invalid id');
        }
        exists = await store.find( id );
        if ( exists ) {
            store.drop( id )
            .then( () => {
                resolve('User deleted successfully');
            })
            .catch( e => {
                reject( e );
            });
        } else {
            reject('Could not find user');
        }
    });
}

module.exports = {
    add,
    getList,
    update,
    drop,
};