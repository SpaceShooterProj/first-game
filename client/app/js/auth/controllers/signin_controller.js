module.exports = function(app) {
  app.controller('SigninController', ['$scope', 'userAuth', '$location', function($scope, auth, $location) {
    $scope.signin = true;
    $scope.userWrong = null;
    
    $scope.submit = function(user) {
      auth.signIn(user, function(err, res) {
        if(err) {
          $scope.userWrong = true;
          return console.log(err);
        }
        $location.path('/game');
      });
    };
  }]);
};
