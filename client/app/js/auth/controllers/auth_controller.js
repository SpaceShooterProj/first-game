module.exports = function(app) {
  app.controller('authController', ['$scope', 'userAuth', function($scope, userAuth) {
    $scope.username = null;

    $scope.updateUsername = function() {
      userAuth.getUsername(function(res) {
        console.log(res);
        $scope.username = res.data.username;
      });
    };

    $scope.logout = function() {
      userAuth.signOut(function() {
        $scope.username = null;
        localStorage.clear();
      });
    };
  }]);
};
