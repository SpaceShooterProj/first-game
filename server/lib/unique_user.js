const User = require(__dirname + '/../models/user');

module.exports = exports = function(req, res, next) {
  if (!((req.body.email || '').length && (req.body.password || '').length > 7)) {
    return res.status(400).json({msg: 'invalid username or password'});
  }
  User.findOne({'authentication.email': req.body.email}, function(err, user) {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'Could not authenticate'});
    }
    if (user) {
      return res.status(409).json({msg: 'User already exists'});
    }
    return next();
  });
};
