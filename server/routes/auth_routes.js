const express = require('express');
const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const basicHTTP = require(__dirname + '/../lib/basic_http');
const uniqueHTTP = require(__dirname + '/../lib/unique_user');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, uniqueHTTP, (req, res) => {
  var newUser = new User();

  newUser.username = req.body.username || req.body.email;
  newUser.authentication.email = req.body.email;
  newUser.hashPassword(req.body.password);
  newUser.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({token: data.generateToken()});
	});
});

authRouter.get('/signin', basicHTTP, (req, res) => {
  User.findOne({'authentication.email': req.basicHTTP.email}, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'invalid HTTP'});
    }

    if (!user) return res.status(401).json({msg: 'no such user'});
    if (!user.comparePassword(req.basicHTTP.password)) return res.status(401).json({msg: 'Password doesnt match'});

    res.json({token: user.generateToken()});
  });
});
