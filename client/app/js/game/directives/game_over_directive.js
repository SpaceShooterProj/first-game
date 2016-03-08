module.exports = function(app) {
  app.directive('gameOver', function() {
    return {
      restrict: 'E',
      templateUrl: '/templates/game/directives/game_over.html',
      scope: true
    };
  });
};
