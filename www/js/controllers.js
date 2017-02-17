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
  // var id ={id:$stateParams.id};
  var profile = $.jStorage.get('profile');
  var id = profile.id;

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
.controller('HomeMenuCtrl', function($scope,$state) {
  var profile = $.jStorage.get('profile');

  $scope.getID = profile.id;
  $scope.logout =function(){
    $.jStorage.set('profile',null);
    $.jStorage.deleteKey('profile');
    $.jStorage.flush();

    // if($.jStorage.get('profile')=== null){
      $state.go('login')

  }

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
.controller('SplashCtrl', function($scope , $ionicSlideBoxDelegate) {
  $scope.nextSlide = function() {
     $ionicSlideBoxDelegate.next();
   }

})
.controller('TermsCtrl', function($scope) {


})
.controller('ProfileCtrl', function($scope,MyServices) {
  var profile = $.jStorage.get('profile');

  $scope.id = profile.id;
  MyServices.profile($scope.id, function(data) {
     console.log(data);
     $scope.data= data;
 });
})
.controller('ManagementCtrl', function($scope) {


})
.controller('ContactCtrl', function($scope,MyServices,$ionicPopup,$state) {
  $scope.contactForm = {};
  var profile = $.jStorage.get('profile');
  $scope.contactForm.id = profile.id;
  $scope.name = profile.name;

  $scope.showAlert = function(title,template) {
  var alertPopup = $ionicPopup.alert({
    title: title,
    template: template
  });
  alertPopup.then(function(res) {

  });
};
  $scope.contactus =function(contactForm){
    console.log("contactForm",contactForm)
    MyServices.contactus(contactForm, function(data) {
       console.log(data);
       if(data.status === "SUCCESS"){
    $scope.showAlert("Feedback Success","Thank you for your Feedback");
       }else{
         $scope.showAlert("Feedback Failed","Sorry ! We din\'t recieve your Feedback");
       }
   });

  };


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
  var id = {id:$.jStorage.get("profile").id};
  console.log(id);
  MyServices.performance(id, function(data) {
     console.log(data);
     $scope.getData = data;

     $scope.shownGroup = $scope.getData.Quarters.Quarter1;
     $scope.shownGroupIn  = $scope.getData.Quarters.Quarter1[0];
     console.log($scope.shownGroup);
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
  $scope.toggleGroupIn  = function(groupIn ) {
      if ($scope.isGroupShownIn (groupIn )) {
        $scope.shownGroupIn  = null;
      } else {
        $scope.shownGroupIn  = groupIn;
      }
    };
    $scope.isGroupShownIn  = function(groupIn ) {
      return $scope.shownGroupIn  === groupIn ;
    };
    // var id ={id:$stateParams.id};


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
