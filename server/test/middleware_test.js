//Removed from Project Scope

// //Testing framework
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// const expect = chai.expect;
// const request = chai.request;
// //DB resources
// const mongoose = require('mongoose');
// const User = require(__dirname + '/../models/user');
// process.env.MONGOLAB_URI = 'mongodb://localhost/middleware_test';
//
// //Lib modules to tests
// const httpBasic = require(__dirname + '/../lib/basic_http');
// const jwtAuth = require(__dirname + '/../lib/jwt_auth');
// const uniqueUser = require(__dirname + '/../lib/unique_user');
//
// describe('HTTP Basic' , () => {
//   it('should be able to parse authorization', () => {
//     var req = {
//       headers: {
//         authorization: 'Basic ' + (new Buffer('testing1:passwordintest').toString('base64'))
//       }
//     };
//     httpBasic(req, {}, () => {
//       expect(typeof req.basicHTTP).to.eql('object');
//       expect(req.basicHTTP.email).to.eql('testing1');
//       expect(req.basicHTTP.password).to.eql('passwordintest');
//     });
//   });
// });
//
// // Needs edits
// describe('JSON Web Token Auth' , () => {
//   it('SUCCESS: should create a token' , () => {
//     var successReq = {
//       headers: {
//         token: {}
//       }
//     };
//     jwtAuth()
//   });
//   it('ERROR: should error if user does not exist ' , () => {
//     // return res.status(401).json({msg: 'authentication failed'});
//   });
//   it('ERROR: should error if token is invalid' , () => {
//
//   });
// });
//
// describe('Unique User Unit Test' , () => {
//   it('should successfully verify a unique user' , () => {
//     var testReq = {
//       body: {
//         email: "",
//         password: ""
//       }
//     };
//     var testRes = {
//       status: 0
//     };
//
//
//     expect( typeof uniqueUser() ).to.be('function');
//   });
//   it('should error if checked user already exists' , () => {
//
//     before()
//
//   });
// })
