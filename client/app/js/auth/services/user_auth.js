var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  }
};

var handleFailure = function(callback) {
  return function(res) {
    callback(res);
  }
};

module.exports = function(app) {
  app.factory('userAuth', ['$http', '$window', function($http, $window) {
    var token;
    var user;
    var baseURL = function() {
      if (window.location.href.indexOf('/', 9) !== -1) return window.location.href.substr(0, window.location.href.indexOf('/', 9));
      return window.location.href;
    }();
    var auth = {
      createUser: function(user, callback) {
        callback = callback || function() {};
        $http.post((baseURL + '/api/signup').toString(), user)
        .then(function(res) {
          token = $window.localStorage.token = res.data.token;
          callback(null, res);
        }, function(res) {
          callback(res)
        });
      },
      signIn: function(user, callback) {
        callback = callback || function() {};
        $http({
          method: 'GET',
          url: (baseURL + '/api/signin').toString(),
          headers: {
            'Authorization': 'Basic ' + btoa((user.email + ':' + user.password))
          }
        })
        .then(function(res) {
          token = $window.localStorage.token = res.data.token;
          callback(null, res);
        }, function(res) {
          callback(res);
        });
      },
      getToken: function() {
        token = token || $window.localStorage.token;
        return token;
      },
      signOut: function(callback) {
        $window.localStorage.token = null;
        token = null;
        user = null;
        if(callback) callback();
      },
      getUsername: function(callback) {
        callback = callback || function() {};
        $http({
          method: 'GET',
          url: (baseURL + '/api/currentuser').toString(),
          headers: {
            token: auth.getToken()
          }
        })
        .then(function(res) {
          user = res.data.username;
          callback(res);
        }, function(res) {
          callback(res);
        });
      },
      username: function() {
        if(!user) auth.getUsername();
        return user;
      }
    };
    return auth;
  }]);
};
