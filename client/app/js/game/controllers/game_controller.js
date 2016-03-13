var angular = require('angular');
module.exports = function(app) {
  app.controller('GameController', ['$window', '$location', function($window, $location) {
    if (!$window.localStorage.token) $location.url('/');
    if ($window.localStorage.token) $location.url('/game');
  }]);
};
