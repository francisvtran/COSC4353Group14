const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('C:\\Users\\julie\\Documents\\GitHub\\chrome\\COSC4353Group14\\frontend\\server.js'); // Replace with the path to your Express app file

chai.use(chaiHttp);
const expect = chai.expect;

describe('Express Backend', () => {
  describe('POST /ClientPostPageSubmit', () => {
    it('should return a 200 status and success message when valid form is submitted', (done) => {
      const validFormData = {
        fullName: 'John Doe',
        address1: '9605 St Margarets Rd',
        address2: '9605 St Margarets Rd',
        city: 'Ashland',
        state: 'OH',
        zipcode: '44805',
      };

      chai.request(app)
        .post('/ClientPostPageSubmit')
        .send(validFormData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Clean form submitted!');
          done();
        });
    });

    it('should return a 400 status and error message when invalid form with no city or zipcode is submitted', (done) => {
      const invalidFormData = {
        fullName: 'John Doe',
        address1: '9605 St Margarets Rd',
        address2: '9605 St Margarets Rd',
        city: '',
        state: 'OH',
        zipcode: '',
      };

      chai.request(app)
        .post('/ClientPostPageSubmit')
        .send(invalidFormData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.text).to.contain('Invalid request');
          done();
        });
    });

    it('should return a 200 status and success message when valid form with optional address2 is submitted', (done) => {
      const invalidFormData = {
        fullName: 'John Doe',
        address1: '9605 St Margarets Rd',
        address2: '',
        city: 'Columbus',
        state: 'OH',
        zipcode: '77777',
      };

      chai.request(app)
        .post('/ClientPostPageSubmit')
        .send(invalidFormData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.contain('Clean form submitted!');
          done();
        });
    });
  });

  describe('GET /exampleFormData', () => {
    it('should return a 200 status and prepopulated form data', (done) => {
      chai.request(app)
        .get('/exampleFormData')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            fullName: 'John Doe',
            address1: '9605 St Margarets Rd',
            address2: '9605 St Margarets Rd',
            city: 'Ashland',
            state: 'OH',
            zipcode: '44805',
          });
          done();
        });
    });
  });
});
