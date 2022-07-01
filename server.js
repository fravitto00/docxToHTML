var config = require('./config.json'),
    router = require('./router.js');

const express = require('express'),
      cors = require('cors');
      
const app = express();

app.use(cors()); // Enable Access-Control-Allow-Origin
app.use(express.json({limit: '50mb'})); // Enable JSON body parsing
app.use('/', router); // Router is defined inside router.js

const port = config.server.port; // Listening port

// Endpoint listening on configured port 
const server = app.listen(port, () => {
    console.log(`Server listening on port ${server.address().port}`)
})

module.exports = server;