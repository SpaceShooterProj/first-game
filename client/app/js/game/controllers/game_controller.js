var angular = require('angular');

module.exports = function(app) {
  app.controller('GameController', ['$scope', '$ocLazyLoad' , '$compile' , function($scope , $ocLazyLoad , $compile) {

    $scope.alertSomething = function() {
      var promise = modals.open(
        "alert",
        {
          message: "I think you are kind of beautiful!"
        }
      );
      promise.then(
				function handleResolve( response ) {
					console.log( "Alert resolved." );
				},
				function handleReject( error ) {
					console.warn( "Alert rejected!" );
				}
			);
    }
  }]);
};
