(function() {
  'use strict';

  angular
  .module('app.clima')
  .config(config);

  function config($stateProvider, $urlRouterProvider) {


    $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "clima/views/home.html",
      //controller: 'HomeCtrl'
  })
    .state('settings', {
      url: "/settings",
      templateUrl: "clima/views/settings.html",
      controller: 'SettingsCtrl'
  })
    .state('generacion', {
      url: "/generacion",
      templateUrl: "clima/views/generacion.html",
      controller: 'GeneracionCtrl'
  })
  .state('pronostico', {
      url: "/pronostico",
      templateUrl: "clima/views/pronostico.html",
      controller: 'PronosticoCtrl'
  })
  .state('pronostico.show', {
      url: "/:climaId",
      templateUrl: "clima/views/pronosticodia.html",
      controller: 'PronosticoDiaCtrl'
  });
 

}


})();

