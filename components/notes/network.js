const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', ( req, res ) => {
    const filter = req.query.notebook || null;
    controller.getList(filter)
        .then( list => {
            response.success( req, res, list, 'Displaying list of notes on notebook' );
        })
        .catch( e => {
            response.error( req, res, 'Could not get list of notes', e );
        });
});

router.post('/', ( req, res ) => {
    controller.add( req.body.notebook, req.body.text )
        .then( note => {
            response.success( req, res, note, `Note created succesfully: "${req.body.text}"`, 201 );
        })
        .catch( e => {
            response.error( req, res, 'Could not be created', e, 400 );
        });
});

router.patch('/:id', ( req, res ) => {
    controller.update( req.params.id, req.body.text )
        .then( data => {
            response.success( req, res, data, `Note updated succesfully: "${req.body.text}"` );
        })
        .catch( e => {
            response.error( req, res, 'Could not be updated', e );
        });
});

router.delete('/:id', ( req, res ) => {
    controller.drop( req.params.id )
        .then( data => {
            response.success( req, res, data, `Note deleted succesfully: "${req.params.id}"` );
        })
        .catch( e => {
            response.error( req, res, 'Could not be deleted', e );
        });
});

module.exports = router;