module.exports = function(app) {
  app.directive('gameMainMenu', function() {
    return {
      restrict: 'E',
      templateUrl: '/templates/game/directives/game_main_menu.html',
      scope: true
    };
  });
};
