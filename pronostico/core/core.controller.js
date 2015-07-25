(function() {
  'use strict';

  angular
  .module('app.core')
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope',  '$timeout'];

  function MainCtrl($scope,  $timeout) {

    $scope.alerts = [];
    var timeout = null;
    $scope.$on('setAlert', function(event, data) {
      var idx = $scope.alerts.length;
      $scope.alerts.push(data);
      timeout = $timeout(function() {closeAlert(idx)}, 4000);
    });

    $scope.addAlert = function() {
      $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = closeAlert;

    function closeAlert(index) {
      
      $scope.alerts = []
    };
  }

})();
