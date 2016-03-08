const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const jsonParser = require('body-parser').json();
const User = require(__dirname + '/../models/user');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

const router = module.exports = exports = express.Router();

router.get('/currentuser', jsonParser, jwtAuth, (req, res) => {
  // console.log(req)
  User.findOne({_id: req.user.id}, (err, data) => {

    if (err) return handleDBError(err, res);

    res.json( {username: data.username} );
  });
});
