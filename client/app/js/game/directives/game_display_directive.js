module.exports = function(app) {
  app.directive('gameDisplay', function() {
    return {
      restrict: 'E',
      templateUrl: '/templates/game/directives/game_display.html',
      scope: true
    };
  });
};
