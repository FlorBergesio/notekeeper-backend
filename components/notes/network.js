const express = require('express');
const response = require('../../network/response');
const router = express.Router();

router.get('/', ( req, res ) => {
    response.success( req, res, 'List of notes', 'Displaying list of notes' );
});

router.post('/', ( req, res ) => {
    response.success( req, res, 'Created successfully', `Note created succesfully with the text "${req.body.text}"`, 201 );
});

router.delete('/', ( req, res ) => {
    if(req.query.error == "ok") {
        response.error( req, res, 'ERROR', 'Simulating error', 400 );
    } else {
        response.success( req, res, 'Note deleted', 'Note deleted successfully' );

    }
});

module.exports = router;