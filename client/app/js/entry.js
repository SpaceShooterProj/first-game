const angular = require('angular');
require('angular-route');
//Animations
require('angular-animate');

//Used to run game.js
require('angular-local-storage');
require('oclazyload');

const gameApp = angular.module('gameApp', ['ngRoute' , 'oc.lazyLoad', 'LocalStorageModule' , 'ngAnimate']);

require('./services')(gameApp);
require('./game')(gameApp);
require('./auth')(gameApp);


gameApp.config(['$ocLazyLoadProvider' , '$routeProvider', 'localStorageServiceProvider', function($ocLazyLoadProvider , routes , localStorageServiceProvider) {
  $ocLazyLoadProvider.config({
    loadedModules: ['gameApp'] , modules: [
      {
        name: 'displayGame',
        files: ['game.js']
      }
    ]
  }); //end

  routes
    .when('/', {
      templateUrl: '/views/home.html'
    })
    .when('/modal', {
      controller: 'GameController',
      templateUrl: '/views/menu_modal_view.html'
    })
    .when('/signup', {
      controller: 'SignupController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .when('/signin', {
      controller: 'SigninController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .when('/game' , {
      controller: 'GameController',
      templateUrl: '/views/game_main.html',
      resolve: {
        loadModule: ['$ocLazyLoad' , function ($ocLazyLoad) {
          return $ocLazyLoad.load('displayGame');
        }]
      }
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });//end

}]);
