# Docx to HTML conversion
The module is designed to serve an endpoint to which send a HTTP POST request containing a .docx document and receive in response the converted HTML version.   
The actual conversion is based on [mammoth](https://www.npmjs.com/package/mammoth), a well-maintained npm module that produces simple and clean HTML by using semantic information in the document, such as styles (e.g. Heading 1).

## Server
./server.js and ./router.js host the service, listening on the configured port (config.json), receiving and routing the HTTP requests towards the several (future) services, redirecting the requests to the right service using [express](https://www.npmjs.com/package/express) routers. 

## Docx to HTML converter
./converters/docxToHTML.js is the module that takes care of the conversion, providing the handler function for the configured endpoint.   
It retrieves the .docx document from the POST request body and calls mammoth **convertToHTML** function for the conversion, passing an extra "options" argument with a custom Styling Map, a mammoth feature that allows customizing how the HTML is generated from the docx semantic.   
This is the one being used:   
`var options = {styleMap: 
        ["p[style-name='Section Title'] => h1:fresh","p[style-name='Subsection Title'] => h2:fresh"], includeDefaultStyleMap: false
    };`  
It means that every paragraph with the style "Section Title" will be converted to an h1 tag, and every paragraph with the style "Subsection Title" will be converted to an h2 tag. The ":fresh" tag means that even if there going to be several concatenated paragraph with the same style, they will be converted in separate HTML tags. Also, the default style map will not be used.   
The handler then sends back the generated HTML in JSON form wrapping it inside a 200 OK status code.

## Client (test)
./test.js is a little module created for testing purposes, which reads a .docx local file, places it in a [Node Buffer](https://nodejs.org/api/buffer.html#class-buffer), and sends it to the server via an [axios](https://www.npmjs.com/package/axios) POST ajax call.   
It then receives back the corresponding HTML and writes it in a local file for review.

## Test script
./__tests__/docxToHTML.test.js is a script that tests the conversion module, written using [jest](https://www.npmjs.com/package/jest) together with [supertest](https://www.npmjs.com/package/supertest). Jest is a framework for JavaScript testing, and supertest is a library for testing HTTP requests, allowing to run a server in a testing environment.   
By running the script, executing `node test`, you can test the conversion module by sending a .docx file to the server, the document filename is the one configured in config.json, and then check the 200 result code, which stands for the correct execution of the module as explained above.   

## Config
The module comes with a config file (config.json) which allows customizing:
- server:
  - host -> localhost in this case
  - port -> the port on which the server listens for requests, defaults to 3000
  - https -> true/false in order to build the endpoint for the HTTP call, defaults to false for localhost
- docxToHTML
  - endpoint -> the path where the endpoint is served at, defaults to docxToHTML
- test:
  - docxFilename -> the filename of the .docx document to be read (without extension), defaults to docxIn
  - htmlFilename -> same as above but for the HTML output, defaults to htmlOut

## Build
In order to build and execute the module, these are the steps to be made:
1. `git pull` this repo on your local machine
2. Run `npm install` inside the directory to install the dependencies
3. *Optional: edit config.json to customize the execution*
4. Run `nodemon ./server.js` to start the server
5. Run `node ./test.js` to test the conversion module
