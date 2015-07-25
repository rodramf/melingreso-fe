(function() {
  'use strict';

  angular
  .module('app.clima')
  .factory('Settings', Settings)
  .factory('Planetas', Planetas)
  .factory('Pronostico', Pronostico)
  .factory('Clima', Clima)
  .factory('ClimaPlanetas', ClimaPlanetas);

  Settings.$inject = ['$resource'];
  Planetas.$inject = ['$resource'];
  Pronostico.$inject = ['$http', '$q'];
  Clima.$inject = ['$resource'];
  ClimaPlanetas.$inject = ['$resource'];

  /* @ngInject */
  function Settings($resource) {
    return $resource('http://localhost:8080/melingreso/api/clima/settings', null, 
    {
      get: {method:'GET'},
      update: {method:'PUT'}
    });
  }

  function Planetas($resource) {
    return $resource('http://localhost:8080/melingreso/api/planetas/:planetaId', null, 
    {
      get: {method:'GET'},
      update: {method:'PUT'}
    });
  }

  function Pronostico($http, $q) {

    var service = {
      ejecutar: function() {
        return $http.get('http://localhost:8080/melingreso/api/pronostico')
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
         console.log("error al consumir el servicio de pronostico");
       });
      },
      generar: function() {
        return $http.post('http://localhost:8080/melingreso/api/pronostico/generate')
        .then(function(response) {
          console.log(response);
          return response.data;
        })
        .catch(function(error) {
         console.log("error al consumir el servicio de pronostico");
       });
      }
    };
    return service;
  }

   function Clima($resource) {
    return $resource('http://localhost:8080/melingreso/api/clima/:climaId?max=:max&offset=:offset&clima=:clima', null, 
    {
      get: {method:'GET'},
      update: {method:'PUT'}
    });
  }

function ClimaPlanetas($resource) {
    return $resource('http://localhost:8080/melingreso/api/clima/:climaId/planetas/:planetaId?max=:max&offset=:offset&search=:search', null, 
    {
      get: {method:'GET'},
      update: {method:'PUT'}
    });
  }


})();