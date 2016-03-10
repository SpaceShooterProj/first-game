var angular = require('angular');

describe('Karma test', () => {
  it('should work after a build', () => {
    expect(true).toBe(true);
  });
});

describe('Style controller', () => {
  var $httpBackend;//takes parameters from user such a GET request and returns a promise
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('gameApp'));

  beforeEach(angular.mock.inject(($rootScope, $controller) => {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a style controller', () => {
    var styleController = $ControllerConstructor('StyleController', {$scope});
    expect(typeof styleController).toBe('object');
    expect($scope.mainstyle).toBe(true);
    expect(typeof $scope.isMain).toBe('function');
    $scope.isGame();
    expect($scope.mainstyle).toBe(false);

  });

});
