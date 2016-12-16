angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('LoginCtrl', function($scope) {

})
.controller('TotalPointCtrl', function($scope) {

})
.controller('HomeMenuCtrl', function($scope) {
$scope.menu=[
  'img/f1.png',
  'img/f2.png',
  'img/f3.png',
  'img/f4.png',
  'img/f5.png',
  'img/f6.png',
  'img/f7.png'
]
})

.controller('KpiCtrl', function($scope, $stateParams) {
  // $scope.groups = [];
   $scope.toggleGroup = function(group) {
     if ($scope.isGroupShown(group)) {
       $scope.shownGroup = null;
     } else {
       $scope.shownGroup = group;
     }
   };
   $scope.isGroupShown = function(group) {
     return $scope.shownGroup === group;
   };
})

.controller('RewardCtrl', function($scope, $stateParams) {
  // $scope.groups = [];
   $scope.toggleGroup = function(group) {
     if ($scope.isGroupShown(group)) {
       $scope.shownGroup = null;
     } else {
       $scope.shownGroup = group;
     }
   };
   $scope.isGroupShown = function(group) {
     return $scope.shownGroup === group;
   };
});
