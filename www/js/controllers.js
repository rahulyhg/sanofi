angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,MyServices,$state) {

})

.controller('LoginCtrl', function($scope,MyServices,$state) {
  $scope.loginData = {};
  $scope.submitLoginForm = function(userdata) {
    MyServices.login(userdata, function(data) {
        console.log(data.status);
        if(data.status == 'Login Success'){
          $state.go('total-point',{id:data.id});
        }else{
          //Error popup
        }
    });
  }
})
.controller('TotalPointCtrl', function($scope,$stateParams,MyServices) {
  $.jStorage.set('id',$stateParams.id);
  var id ={id:$stateParams.id};
  MyServices.profile(id, function(data) {
        console.log(data);
        $scope.getData = data;
      
    });
})
.controller('HomeMenuCtrl', function($scope) {
  $scope.getID = $.jStorage.get('id');
  
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

.controller('KpiCtrl', function($scope, $stateParams,MyServices) {
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
     var id ={id:$stateParams.id};
     MyServices.kpis(id, function(data) {
        console.log(data);
        $scope.getData = data;
    });
})

.controller('RewardCtrl', function($scope, $stateParams,MyServices) {
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
  var id ={id:$stateParams.id};
     MyServices.rewardcategory(id, function(data) {
        console.log(data);
        $scope.getData = data;
      
    });
});
