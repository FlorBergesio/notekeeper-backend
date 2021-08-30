const express = require('express');
const notes = require('../components/notes/network');
const users = require('../components/users/network');
const notebooks = require('../components/notebooks/network');

const routes = function (server) {
    server.use('/notes', notes);
    server.use('/users', users);
    server.use('/notebooks', notebooks);
}

module.exports = routes;