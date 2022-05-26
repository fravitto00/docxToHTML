var config = require('./config.json');
const express = require('express'),
      cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const port = config.server.port; // Listening port

app.post('/' + config.server.endpoint, (req, res) => {
    const mammoth = require("mammoth");

    var docx = req.body.docx.data; // Node Buffer containing .docx data
    // Custom Styling Map
    var options = {styleMap: 
        ["p[style-name='Section Title'] => h1:fresh","p[style-name='Subsection Title'] => h2:fresh"], includeDefaultStyleMap: false
    };

    // Conversion docx to HTML
    mammoth.convertToHtml({buffer: docx}, options)
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion

        if (messages.length) console.log(messages);
        console.log(html);

        res.status(200).json(html); // Returns the html within a 200 OK status code
    })
    .catch(err => { console.log(err); })
    .done();
});

// Endpoint listening on configured port 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})