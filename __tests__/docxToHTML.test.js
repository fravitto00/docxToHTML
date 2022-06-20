const request = require('supertest'),
      server = require('../server.js'),
      config = require('../config.json'),
      fs = require('fs');

describe('docxToHTML', () => {
    afterAll(() => {
        server.close();
    })
    
    it('should return the correct HTML', (done) => {
        const docxBuffer = fs.readFileSync(config.test.docxFilename + '.docx');
        request(server)
            .post('/' + config.docxToHTML.endpoint)
            .send({'docx': docxBuffer})
            .expect(200)
            .end((err, res) => {
            if (err) return done(err);
            console.log(res.body)
            // expect(res.body.type).toEqual('text/html')
            done();
        })
    })
});

