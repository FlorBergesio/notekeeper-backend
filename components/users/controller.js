const store = require('./store');
const crypto = require('crypto');

const encript = ( clean_password ) => {
    // Salt
    const length = 16;
    const salt =  crypto.randomBytes( Math.ceil( length / 2 ) )
                    .toString( 'hex' ) 
                    .slice( 0, length ); 
    // Hash
    const hash = crypto.createHmac( 'sha512', salt );
    hash.update ( clean_password );
    
    return {
      salt: salt,
      hash: hash.digest( 'hex' )
    };
};

const validatePassword = ( password, hashed_password, salt ) => {
    const hash = crypto.createHmac( 'sha512', salt );
    hash.update( password );
    userpass = hash.digest( 'hex' );
    return userpass == hashed_password;
};

const getList = () => {
    return store.getList();
};

const add = ( name, username, password ) => {
    return new Promise( async ( resolve, reject ) => {
        if ( !name || !username || !password ) {
            return reject('Required data missing');
        }

        const exists = await store.findUsername( username );
        if ( !exists ) {
            const hashed_password = encript( password );
            const user = {
                name: name,
                username: username,
                password: hashed_password.hash,
                salt: hashed_password.salt
            };
            
            await store.add(user)
                .then( resp => {
                    const clean_user = {
                        _id: resp._id,
                        name: user.name,
                        username: user.username
                    };
                    resolve( clean_user );
                })
                .catch( e => {
                    reject('User could not be created');
                });
        } else {
            reject('Username already in use');
        }
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

const login = ( username, password ) => {
    return new Promise( async ( resolve, reject ) => {
        if ( !username || !password ) {
            return reject('Required data missing');
        }

        user = await store.findUsername( username );
        if ( user ) {
            const fullUser = await store.findFullUser( user._id );
            const validated = validatePassword( password, fullUser.password, fullUser.salt );
            if ( validated === true ) {
                resolve( user );
            } else {
                reject('Wrong password');
            }
        } else {
            reject('User does not exist');
        }
    });
};

module.exports = {
    add,
    getList,
    update,
    drop,
    login,
};