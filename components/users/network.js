const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', ( req, res ) => {
    controller.getList()
        .then( list => {
            response.success( req, res, list, 'Displaying list of users' );
        })
        .catch( e => {
            response.error( req, res, 'Could not get list of users', e );
        });
});

router.post('/', ( req, res ) => {
    controller.add( req.body.name, req.body.username, req.body.password )
        .then( user => {
            response.success( req, res, user, `User created succesfully: "${req.body.name}" (${req.body.username})`, 201 );
        })
        .catch( e => {
            response.error( req, res, e, e, 400 );
        });
});

router.patch('/:id', ( req, res ) => {
    controller.update( req.params.id, req.body.name )
        .then( data => {
            response.success( req, res, data, `User updated succesfully: "${req.body.name}"` );
        })
        .catch( e => {
            response.error( req, res, 'Could not be updated', e );
        });
});

router.delete('/:id', ( req, res ) => {
    controller.drop( req.params.id )
        .then( data => {
            response.success( req, res, data, `User deleted succesfully: "${req.params.id}"` );
        })
        .catch( e => {
            response.error( req, res, 'Could not be deleted', e );
        });
});

router.post('/login', ( req, res ) => {
    controller.login( req.body.username, req.body.password )
        .then( message => {
            response.success( req, res, message, 'Log in successfull' );
        })
        .catch( e => {
            response.error( req, res, 'Could not login. Check credentials and try again later', e );
        });
});

module.exports = router;