const store = require('./store');

const getList = ( filter ) => {
    return new Promise( ( resolve, reject ) => {
        return resolve( store.getList( filter ) );
    });
};

const add = ( user, name ) => {
    return new Promise( ( resolve, reject ) => {
        console.log(user,name);
        if ( !user || !name ) {
            return reject('Required data missing');
        }
        const notebook = {
            user: user,
            name: name,
            date: new Date(),
        };

        store.add(notebook);
        return resolve(notebook);
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
                resolve('Notebook deleted successfully');
            })
            .catch( e => {
                reject( e );
            });
        } else {
            reject('Could not find notebook');
        }
    });
}

module.exports = {
    add,
    getList,
    update,
    drop,
};