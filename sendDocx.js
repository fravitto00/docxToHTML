var config = require('./config.json');
const fs = require('fs'),
      axios = require('axios');

// Reading docx from filesystem (since no char encoding is specified, the data is inserted in a Node Buffer)
fs.readFile(config.client.docxFilename + '.docx', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Sending the docx data to the endpoint
    var protocol = config.server.https ? 'https://' : 'http://'; 
    axios.post(protocol + config.server.host + ':' + config.server.port + '/' + config.server.endpoint , {'docx': data})
    .catch(err => { console.log(err); })
    .then(res => {
        var html = res.data;

        // Writing the resulting HTML inside the local output file
        fs.writeFile(config.client.htmlFilename + '.html', html, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
});

