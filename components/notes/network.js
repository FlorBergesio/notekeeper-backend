const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', ( req, res ) => {
    controller.getList()
        .then( list => {
            response.success( req, res, list, 'Displaying list of notes' );
        })
        .catch( e => {
            response.error( req, res, 'Could not get list of notes', e );
        });
});

router.post('/', ( req, res ) => {
    controller.add( req.body.user, req.body.text )
        .then( note => {
            response.success( req, res, note, `Note created succesfully: "${req.body.text}"`, 201 );
        })
        .catch( e => {
            response.error( req, res, 'Could not be created', e, 400 );
        });
});

router.delete('/', ( req, res ) => {
    if(req.query.error == "ok") {
        response.error( req, res, 'ERROR', 'Simulating error', 400 );
    } else {
        response.success( req, res, 'Note deleted', 'Note deleted successfully' );

    }
});

module.exports = router;