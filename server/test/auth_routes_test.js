//Tests for Authorization
const chai = require('chai').use(require('chai-http'));
const expect = chai.expect;
const request = chai.request;
// Load Server
require( __dirname + '/../server');

//Set Up Test Database
var User = require(__dirname + '/../models/user');
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost:/game_test_integration';

//Route Stuff
var HOST = 'localhost:3000';

describe('Auth Route Tests' , () => {

  //Erase DB once tests are ended
  // after( (done) => {
  //   mongoose.connection.db.dropDatabase( () => {} );
  //   done();
  // });

  describe( 'POST to /signup' , () => {
    it('SUCCESS: POST to /signup should generate a token' , (done) => {
    var testProfile = {
      username: 'MerlinMan',
      email: 'ArthurIsDumb@camelot.com',
      password: 'Lance1233123'
    };
    request(HOST)
      .post('/api/signup')
      .send( testProfile )
      .end( (err , res) => {
        expect( res.status ).to.eql(200);
        expect( res.body.token ).to.exist;
        done();
      });
    });

    it('ERROR: POST to /signup should respond error to bad data' , (done) => {
      var testProfile = {
        username: 'Mer',
        email: 'xXArthurIsDumbXx@camelot.com',
        password: 'L'
      };
      request(HOST)
        .post('/api/signup')
        .send(testProfile)
        .end( (err , res) => {
          expect( res.status ).to.eql(400);
          done();
        });
    });
  });

  describe('GET to /signin' , () => {

    before( (done) => {
      var testUser = new User();
      testUser.username = 'SmokersLung';
      testUser.authentication.email = 'inflammation@trachea.com';
      testUser.hashPassword('testpass');
      testUser.save( (err , data) => {
        if (err) return console.log('Error on creating test profile');
        console.log('User saved');
        done();
      });

    })

    it('SUCCESS: should generate a token on succesful login' , (done) => {
      request(HOST)
        .get('/api/signin')
        .auth('inflammation@trachea.com' , 'testpass')
        .end( (err , res) => {
          expect(res.status).to.eql(200);
          expect(res.body.token).to.exist;
          expect(res.body.token).to.have.length.above(0);
          done();
        });
    });

    it("ERROR: should fail if the user doesn't exist" , (done) => {
      request(HOST)
        .get('/api/signin')
        .auth('doesntExist' , 'testpass')
        .end( (err , res) => {
          expect(res.status).to.eql(401);
          expect(res.body.msg).to.eql('no such user');
          done();
        });
    });

    it("ERROR: should fail if passwords don't match" , (done) => {
      request(HOST)
        .get('/api/signin')
        .auth('inflammation@trachea.com' , 'wrongpass')
        .end( (err , res) => {
          expect(res.status).to.eql(401);
          expect(res.body.msg).to.eql('Password doesnt match');
          done();
        });
    });

      // res.json({token: user.generateToken()});
  });

});
