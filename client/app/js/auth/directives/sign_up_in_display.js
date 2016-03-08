module.exports = function(app) {
  app.directive('signUp', function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/game/directives/signup_directive.html',
      scope: {
        buttonText: '@'

      }
    };
  });
};
