/*

* This function tests the capability of the service to convert a "docx" file.

* The expected output is: the correctly generated HTML written in the local output file

* If something goes wrong, the outcome will be:
    "ENOENT: no such file or directory" if there isn't the configured docx input file, 
    ECONNREFUSED [host]:[port] in case the server is not up,
    ERR_BAD_REQUEST (404) in case server fields in config.json are mistyped (e.g. special or not allowed chars)
*/

var config = require('./config.json');
const fs = require('fs'),
      axios = require('axios');

// Reading docx from filesystem (since no char encoding is specified, the data is inserted in a Node Buffer)
fs.readFile(config.test.docxFilename + '.docx', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Sending the docx data to the endpoint
    var protocol = config.server.https ? 'https://' : 'http://'; 
    axios.post(protocol + config.server.host + ':' + config.server.port + '/' + config.docxToHTML.endpoint, {'docx': data})
    .catch(err => { console.log(err); })
    .then(res => {
        var html = res.data;

        // Writing the resulting HTML inside the local output file
        fs.writeFile(config.test.htmlFilename + '.html', html, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
});

