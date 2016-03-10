module.exports = function(app) {
  app.controller('StyleController', ['$scope', function($scope) {
    $scope.mainstyle = true;

    $scope.isMain = function() {
      $scope.mainstyle = true;
    };

    $scope.isGame = function() {
      $scope.mainstyle = false;
    };

  }]);
};
