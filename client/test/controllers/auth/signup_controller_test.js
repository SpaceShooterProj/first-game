var angular = require('angular');

describe('Signup controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;
  var user;

  beforeEach(angular.mock.module('gameApp'));

  beforeEach(angular.mock.inject(($rootScope, $controller) => {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a signup controller', () => {
    var signupController = $ControllerConstructor('SignupController', {$scope});
    expect(typeof signupController).toBe('object');
    expect(typeof $scope.submit).toBe('function');
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('SignupController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/signup and receive an error', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/signup').respond(409);
      $scope.submit(user);
      $httpBackend.flush();
      expect($scope.userExists).toBe(true);
    });

    it('should make a get request to /api/signup', () => {
      var user = {
        username: 'test123',
        email: 'test123@test.com',
        password: 'foobar123',
        token: 'testtoken'
      };

      $httpBackend.expectPOST('http://localhost:3000/api/signup').respond(200, user);
      $scope.submit(user);
      $httpBackend.flush();
      expect($scope.userExists).toBe(null);
    });
  });

});
