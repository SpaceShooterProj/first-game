const express = require('express');
var port = 5000;

express().use(express.static(__dirname + '/build')).listen(port, () => console.log('server up on port ' + port));
