(function() {
    'use strict';

angular
.module('app', [
  'ngResource',
  'ui.router',
  'app.core',
  'ui.bootstrap',
  'app.clima'
  ])
.config(config);  

function config($urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/home");
  
}



})();
