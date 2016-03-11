var angular = require('angular');

describe('resource service', () => {

  var testService;
  var $httpBackend;
  var baseURL = function() {
    if (window.location.href.indexOf('/', 9) !== -1) return window.location.href.substr(0, window.location.href.indexOf('/', 9));
    return window.location.href;
  }();

  beforeEach(angular.mock.module('gameApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_ , userAuth, $window) {
    $httpBackend = _$httpBackend_;
    testService = userAuth;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should handle create User', () => {
    var userSignup = {username: 'created user'};
    $httpBackend.expectPOST(baseURL + '/api/signup', userSignup).respond(200, userSignup);
    testService.createUser(userSignup, (err, res) => {
      expect(err).toBe(null);
      expect(res.data.username).toBe('created user');
    });
    $httpBackend.flush();
  });

  it('should handle sign in', () => {
    var userSignin = {email: 'test@email.com'};
    $httpBackend.expectGET(baseURL + '/api/signin').respond(200, userSignin);
    testService.signIn(userSignin, (err, res) => {
      expect(err).toBe(null);
      expect(res.data.email).toBe('test@email.com');
    });
    $httpBackend.flush();
  });

  it('should get token', () => {
    expect(testService.getToken()).toBeDefined();
  });

  it('should handle get username', () => {
    var userName = {username: 'test'};
    $httpBackend.expectGET(baseURL + '/api/currentuser').respond(200, userName);
    testService.getUsername( (res) => {
      console.log(res);
      expect(res.data.username).toBe('test');
    });
    $httpBackend.flush();
  });

});
