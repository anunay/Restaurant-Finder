// angular.module is a global place for creating, registering and retrieving Angular modules
// 'restaurantModule' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array or 'requires'
// 'restaurantModule.services' is found in services.js
// 'restaurantModule.controllers' is found in controllers.js
//
function initCall() {
  console.log("Google maps api initialized.");
  angular.bootstrap(document.getElementById("map"), ['restaurantModule']);
}

angular.module('restaurantModule', ['ionic', 'ngRoute', 'ngAnimate', 'restaurantModule.services', 'restaurantModule.controllers','ui.map','ui.event',"leaflet-directive"])

.config(function ($compileProvider){
  // Needed for routing to work
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function($routeProvider, $locationProvider) {

  // Set up the initial routes that our app will respond to.
  // These are then tied up to our nav router which animates and
  // updates a navigation bar
  $routeProvider.when('/list', {
    templateUrl: '/list.html',
    controller: 'RestaurantIndexCtrl'
  });

  // if the url matches something like /Restaurant/88 then this route
  // will fire off the RestaurantDetailCtrl (controllers.js)
  $routeProvider.when('/restaurant/:restaurantId', {
    templateUrl: '/details.html',
    controller: 'RestaurantDetailCtrl'
  });

  $routeProvider.when('/map/:restaurantId/', {
    templateUrl: '/map.html',
    controller: 'MapCtrl',
    disableCache: true
  });

  $routeProvider.when('/menu/:restaurantId/', {
    templateUrl: '/details.html',
    controller: 'RestaurantMenuCtrl'
  });

  // if none of the above routes are met, use this fallback
  $routeProvider.otherwise({
    redirectTo: '/list'
  });






});

