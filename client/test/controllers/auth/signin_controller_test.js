var angular = require('angular');

describe('Signin controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;
  var user;
  var baseURL = function() {
    if (window.location.href.indexOf('/', 9) !== -1) return window.location.href.substr(0, window.location.href.indexOf('/', 9));
    return window.location.href;
  }();

  beforeEach(angular.mock.module('gameApp'));

  beforeEach(angular.mock.inject(($rootScope, $controller) => {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a signin controller', () => {
    var signinController = $ControllerConstructor('SigninController', {$scope});
    expect(typeof signinController).toBe('object');

    expect(typeof $scope.submit).toBe('function');
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('SigninController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/signin and receive an error', () => {
      var user = {
        email: 'test123@test.com'
      };

      $httpBackend.expectGET(baseURL + '/api/signin').respond(401, user);
      $scope.submit(user);
      $httpBackend.flush();
      expect($scope.userWrong).toBe(true);
    });

    it('should make a get request to /api/signin', () => {
      var user = {
        username: 'test123',
        email: 'test123@test.com',
        password: 'foobar123',
        token: 'testtoken'
      };

      $httpBackend.expectGET(baseURL + '/api/signin').respond(200, user);
      $scope.submit(user);
      $httpBackend.flush();
      expect($scope.userWrong).toBe(null);
    });
  });

});
