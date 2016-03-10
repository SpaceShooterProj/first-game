var angular = require('angular');

module.exports = function(app) {
  app.controller('GameController', ['$scope', '$compile', '$window', '$location', function($scope, $compile, $window, $location) {

    if (!$window.localStorage.token) $location.url('/');
      else {
        $location.url('/game');
      }
  }]);
};
