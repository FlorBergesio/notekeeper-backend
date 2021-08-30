const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', ( req, res ) => {
    const filter = req.query.user || null;
    controller.getList(filter)
        .then( list => {
            response.success( req, res, list, 'Displaying list of notebooks' );
        })
        .catch( e => {
            response.error( req, res, 'Could not get list of notebooks', e );
        });
});

router.post('/', ( req, res ) => {
    controller.add( req.body.user, req.body.name )
        .then( notebook => {
            response.success( req, res, notebook, `Notebook created succesfully: "${req.body.name}"`, 201 );
        })
        .catch( e => {
            response.error( req, res, 'Could not be created', e, 400 );
        });
});

router.patch('/:id', ( req, res ) => {
    controller.update( req.params.id, req.body.name )
        .then( data => {
            response.success( req, res, data, `Notebook updated succesfully: "${req.body.name}"` );
        })
        .catch( e => {
            response.error( req, res, 'Could not be updated', e );
        });
});

router.delete('/:id', ( req, res ) => {
    controller.drop( req.params.id )
        .then( data => {
            response.success( req, res, data, `Notebook deleted succesfully: "${req.params.id}"` );
        })
        .catch( e => {
            response.error( req, res, 'Could not be deleted', e );
        });
});

module.exports = router;