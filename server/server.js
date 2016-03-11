const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/Spacecataz');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

const authRouter = require(__dirname + '/routes/auth_routes');
const publicRouter = require(__dirname + '/routes/public_routes');

app.use(express.static(__dirname + '/build'));

app.use('/api' , authRouter);
app.use('/api' , publicRouter);


var PORT = process.env.PORT || 3000;
module.exports.server = app.listen(PORT, () => console.log('server up on port: ' + PORT));
