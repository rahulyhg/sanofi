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
          $scope.loginData = {};
        $scope.showAlert();
        }
    });
  }
  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Error!',
     template: 'Incorrect User name or Password'
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
.controller('FilterRewardCtrl', function($scope,$stateParams,MyServices) {
    var profile = $.jStorage.get('profile');
    $scope.catlougeIdFilter = $stateParams.catalogueId;
    $scope.categoryIdFilter = $stateParams.categoryId;
  var dataToSend = {catalogueId:$stateParams.catalogueId,categoryId:$stateParams.categoryId };

  MyServices.filters(dataToSend, function(data) {
     console.log(data);
     $scope.getfliter = data;
     $scope.getfliter = _.chunk(data,2);
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
.controller('AboutCtrl', function($scope) {


})
.controller('RewardCategoryCtrl', function($scope,MyServices) {

  var profile = $.jStorage.get('profile');
  $scope.catlougeId0 = profile.catalogueId;
  console.log('$scope.catlougeId0',$scope.catlougeId0);
var id ={id:profile.id};
  MyServices.rewardcategory(id, function(data) {
     console.log(data);
     $scope.getRewardCatData = data[0];
     $scope.getRewardCategoryData = data.slice(1);
     $scope.getRewardCategoryData = _.chunk($scope.getRewardCategoryData,2);
 });
})

.controller('KpiCtrl', function($scope, $stateParams,MyServices) {
  $scope.getData = [];


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

       $scope.shownGroup = $scope.getData[0];
       console.log($scope.shownGroup);
   });

})

.controller('RewardCtrl', function($scope, $stateParams,MyServices,$state) {
  $scope.goBackHandler = function()
   {
       window.history.back();                          //This works
   }
   $scope.setColor = function (){

   }
  // $scope.groups = [];
  // var id ={id:$stateParams.id};
  console.log('ffffffffffffffffffffff',$stateParams.catalogueId);
  var profile = $.jStorage.get('profile');

  var dataToSend = {catalogueId:$stateParams.catalogueId,categoryId:$stateParams.categoryId,filterId:$stateParams.filterId};
  MyServices.reward(dataToSend, function(data) {
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
   $scope.goFilter = function(){
     $state.go('app.filter-reward',{catalogueId:$stateParams.catalogueId,categoryId:$stateParams.categoryId});
   }
  // var id ={id:$stateParams.id};
    //  MyServices.rewardcategory(dataToSend, function(data) {
    //     console.log(data);
    //     $scope.getData = data;
    //
    // });
});
