const store = require('./store');

const getList = ( filter ) => {
    return new Promise( ( resolve, reject ) => {
        return resolve( store.getList( filter ) );
    });
};

const add = ( notebook, text ) => {
    return new Promise( ( resolve, reject ) => {
        if ( !notebook || !text ) {
            return reject('Required data missing');
        }
        const note = {
            notebook: notebook,
            text: text,
            date: new Date(),
        };

        store.add(note);
        return resolve(note);
    });
};

const update = ( id, text ) => {
    return new Promise( async ( resolve, reject ) => {
        if ( !id || !text ) {
            return reject('Required data missing');
        }
        const updated = await store.update( id, text );
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
                resolve('Note deleted successfully');
            })
            .catch( e => {
                reject( e );
            });
        } else {
            reject('Could not find note');
        }
    });
}

module.exports = {
    add,
    getList,
    update,
    drop,
};