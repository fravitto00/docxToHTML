# Docx to HTML conversion
The module is designed to serve an endpoint to which send a .docx document and receive in response the converted HTML version.
The actual conversion is based on [mammoth](https://www.npmjs.com/package/mammoth), a npm module that produces simple and clean HTML by using semantic information in the document, such as styles (e.g. Heading 1).

## Client
sendDocx.js is a little module created for testing purposes, which reads a .docx local file, places it in a [Node Buffer](https://nodejs.org/api/buffer.html#class-buffer), and sends it to the server via an [axios](https://www.npmjs.com/package/axios) POST ajax call.
It then receives back the corresponding HTML and writes it in a local file for review.

## Server
docxToHTML.js is the module that takes care of the conversion, it uses [express](https://www.npmjs.com/package/express) to set up the router for receiving HTTP requests on the designed endpoint.
It receives the .docx document from the POST request body and calls mammoth **convertToHTML** function for conversion, passing an extra options argument with a custom Styling Map, a mammoth feature that allows customizing how the HTML is generated from the docx semantic.
This is the one being used:
`var options = {styleMap: 
        ["p[style-name='Section Title'] => h1:fresh","p[style-name='Subsection Title'] => h2:fresh"], includeDefaultStyleMap: false
    };`
It then sends back the generated HTML wrapping it inside a 200 OK status code.

## Config
The module comes with a config file (config.json) which allows customizing:
- Server-related:
  - host -> localhost in this case
  - port -> the port on which the server listens for requests, defaults to 3000
  - https -> true/false in order to build the endpoint for the HTTP call, defaults to false for localhost
  - endpoint -> the path where the endpoint is served at, defaults to docxToHTML
- Client-related:
  - docxFilename -> the filename of the .docx document to be read (without extension), defaults to docxIn
  - htmlFilename -> same as above but for the HTML output, defaults to htmlOut

## Build
In order to build and execute the module, these are the steps to be made:
1. `git pull` this repo on your local machine
2. Run `npm install` inside the directory to install the dependencies
3. *Optional: edit config.json to customize the execution*
4. Run `nodemon ./docxToHTML.js` to start the server
5. Run `node ./sendDocx.js` to test the conversion module