(function() {
  'use strict';

  angular
  .module('app.clima')
  .controller('SettingsCtrl', SettingsCtrl)
  .controller('GeneracionCtrl', GeneracionCtrl)
  .controller('PronosticoCtrl', PronosticoCtrl)
  .controller('PronosticoDiaCtrl', PronosticoDiaCtrl);

  SettingsCtrl.$inject = ['$scope', '$rootScope', 'Settings', 'Planetas'];
  GeneracionCtrl.$inject = ['$scope', '$rootScope', 'Settings', 'Planetas', 'Pronostico'];
  PronosticoCtrl.$inject = ['$scope', '$rootScope', 'Settings', 'Clima'];
  PronosticoDiaCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'Settings', 'Clima', 'ClimaPlanetas'];

  /* @ngInject */
  function SettingsCtrl($scope,$rootScope, Settings, Planetas) {
    Settings.get({}, function(settings) {
     $scope.settings = settings;
   });

    Planetas.get({}, function(planetas) {
     $scope.planetas = planetas;
   });

    $scope.saveSettings = saveSettings;
    $scope.savePlanetas = savePlanetas;

    function saveSettings(){

      Settings.update({}, $scope.settings, function(data) {

        $rootScope.$broadcast('setAlert', { type: 'success', msg: 'Las configuraciones generales fueron guardadas'  });
        $rootScope.$broadcast('setAlert', { type: 'warning', msg: 'Recuerde realizar el proceso de Generación para que se reflejen los datos en la sección Pronóstico' });

      }, function(error) {
        $rootScope.$broadcast('setAlert', { type: 'danger', msg: 'Ocurrio un error al guardar las configuraciones'  });
      });

    }

    function savePlanetas(){

      var planeta;
      for (var i = 0; i < $scope.planetas.data.length; i++) {
        planeta = $scope.planetas.data[i];

        Planetas.update({planetaId: planeta.id}, planeta, function(data) {

         $rootScope.$broadcast('setAlert', { type: 'success', msg: 'El planeta ' + data.data.nombre + ' fue guardado' });

       }, function(error) {
        $rootScope.$broadcast('setAlert', { type: 'danger', msg: 'Ocurrio un error al guardar el planeta ' + planeta.nombre  });
      });

      };

      $rootScope.$broadcast('setAlert', { type: 'warning', msg: 'Recuerde realizar el proceso de Generación para que se reflejen los datos en la sección Pronóstico' });
    }
  }

  function GeneracionCtrl($scope, $rootScope, Settings, Planetas, Pronostico) {
    Settings.get({}, function(settings) {
     $scope.settings = settings;
   });

    Planetas.get({}, function(planetas) {
     $scope.planetas = planetas;
   });

    $scope.ejecutarPronostico = ejecutarPronostico;
    $scope.generarPronostico = generarPronostico;
    
    $scope.msg = null;
    $scope.msgGenerar = null;
    $scope.result = false;

    function ejecutarPronostico(){
      $scope.msg = "Ejecutando consulta del pronóstico..."
      Pronostico.ejecutar().then(function(pronostico) {
       $scope.pronostico = pronostico;
       $scope.msg = null
       $scope.result = true;
     });
    }

    function generarPronostico(){
      $scope.msgGenerar = "Generando pronóstico....";
      Pronostico.generar().then(function(pronostico) {
       $scope.msgGenerar = null;
       $rootScope.$broadcast('setAlert', { type: 'success', msg: "El pronóstico se generó exitosamente!!!" });
     }, function(error){
      $rootScope.$broadcast('setAlert', { type: 'danger', msg: "Ocurrio un error al generar el pronóstico en la base" });

    });
    }
  }


  function PronosticoCtrl($scope, $rootScope, Settings, Clima) {
    getPage(0);
    $scope.getPage = getPage;
    $scope.loading = false;
    
    $scope.getNumber = function(num) {
      return new Array(num);   
    }

    $scope.pageChanged = pageChanged;

    function pageChanged(){

      var page = (($scope.paginateCurrentPage-1) * $scope.climas.metadata.psize);
      getPage(page);
    }

    function getPage(page){
      $scope.climas = Clima.get({max: 10, offset: page, clima:$scope.searchClima}, function(climas) {
        $scope.loading = true;
        if(!climas.empty){
          $scope.paginateTotal = climas.metadata.total;
          $scope.paginateCurrentPage = Math.floor(climas.metadata.offset/climas.metadata.psize) + 1;
          $scope.paginateMaxSize = 3;
          $scope.paginateNumPages = Math.floor(climas.metadata.total/climas.metadata.psize);
        }
        
      });
    }
  }


  function PronosticoDiaCtrl($scope, $rootScope, $stateParams, Settings, Clima, ClimaPlanetas) {

    Clima.get({climaId:$stateParams.climaId}, function(clima) {
     $scope.clima = clima.data;

   });

    ClimaPlanetas.get({climaId:$stateParams.climaId}, function(planetas) {
     $scope.planetas = planetas.data;
   });
  }

})();