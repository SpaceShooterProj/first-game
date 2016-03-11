module.exports = function(app) {
  app.controller('SignupController', ['$scope', '$location', 'userAuth', function($scope, $location, auth) {
    $scope.signup = true;
    $scope.userExists = null;
    $scope.submit = function(user) {
      auth.createUser(user, function(err, res) {
        if (err) {
          $scope.userExists = true;
          return console.log(err);
        }
        $location.path('/game');
      });
    };
  }]);
};
