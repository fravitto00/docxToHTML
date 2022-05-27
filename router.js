var config = require('./config.json'),
    express = require('express'),
    docxToHTML = require('./converters/docxToHTML.js');

var router = express.Router();

// docxToHTML route
router.use('/' + config.docxToHTML.endpoint, docxToHTML.router);

// Exports router to be used on ./server.js
module.exports = router;