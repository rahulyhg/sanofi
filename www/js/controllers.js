angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,MyServices,$state) {
  $scope.profile = $.jStorage.get('profile');

})

.controller('LoginCtrl', function($scope,MyServices,$state, $ionicPopup) {
  $scope.loginData = {};
  $scope.submitLoginForm = function(userdata) {
    MyServices.login(userdata, function(data) {
        console.log(data.status);
        if(data.status == 'Login Success'){
          $state.go('total-point',{id:data.id});
          $.jStorage.set('profile',data);
        }else{
        $scope.showAlert();
        }
    });
  }
  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Error!',
     template: 'Your username and password do not match'
   });

   alertPopup.then(function(res) {

    //  console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
})
.controller('TotalPointCtrl', function($scope,$stateParams,MyServices) {
  // $.jStorage.set('id',$stateParams.id);
  var id ={id:$stateParams.id};
  // var profile = $.jStorage.get('profile');

  MyServices.profile(id, function(data) {
        console.log(data);
        $scope.getData = data;

    });
})
.controller('HomeMenuCtrl', function($scope) {
  var profile = $.jStorage.get('profile');

  $scope.getID = profile.id;

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
  // var id ={id:$stateParams.id};
  var profile = $.jStorage.get('profile');
  var catlougeId = {catalogueId:profile.catalogueId};
  MyServices.reward(catlougeId, function(data) {
     console.log(data);
     $scope.getRewardData = data;
     $scope.getRewardData = _.chunk(data,2);
 });
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
  // var id ={id:$stateParams.id};
  //    MyServices.rewardcategory(id, function(data) {
  //       console.log(data);
  //       $scope.getData = data;
  //
  //   });
});
