angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, MyServices, $state) {
  $scope.profile = $.jStorage.get('profile');

})

.controller('LoginCtrl', function ($scope, MyServices, $state, $ionicPopup) {
    $scope.loginData = {};
    $scope.submitLoginForm = function (userdata) {
      MyServices.login(userdata, function (data) {
        console.log(data.status);
        if (data.status == 'Login Success') {
          $state.go('total-point', {
            id: data.id
          });
          $.jStorage.set('profile', data);
        } else {
          $scope.loginData = {};
          $scope.showAlert();
        }
      });
    }
    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'Incorrect User name or Password'
      });

      alertPopup.then(function (res) {

        //  console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
  })
  .controller('TotalPointCtrl', function ($scope, $stateParams, MyServices) {
    // $.jStorage.set('id',$stateParams.id);
    // var id ={id:$stateParams.id};
    var profile = $.jStorage.get('profile');
    var id = profile.id;

    MyServices.profile(id, function (data) {
      console.log(data);
      $scope.getData = data;

    });
  })
  .controller('FilterRewardCtrl', function ($scope, $stateParams, MyServices) {
    var profile = $.jStorage.get('profile');
    $scope.catlougeIdFilter = $stateParams.catalogueId;
    $scope.categoryIdFilter = $stateParams.categoryId;
    var dataToSend = {
      catalogueId: $stateParams.catalogueId,
      categoryId: $stateParams.categoryId
    };

    MyServices.filters(dataToSend, function (data) {
      console.log(data);
      $scope.getfliter = data;
      $scope.getfliter = _.chunk(data, 2);
    });
  })
  .controller('HomeMenuCtrl', function ($scope, $state) {
    var profile = $.jStorage.get('profile');

    $scope.getID = profile.id;
    $scope.designation = profile.designation;
    $scope.logout = function () {
      $.jStorage.set('profile', null);
      $.jStorage.deleteKey('profile');
      $.jStorage.flush();
      $scope.designation = null;

      // if($.jStorage.get('profile')=== null){
      $state.go('login')

    }

    $scope.menu = [
      'img/f1.png',
      'img/f2.png',
      'img/f3.png',
      'img/f4.png',
      'img/f5.png',
      'img/f6.png',
      'img/f7.png'
    ]

  })
  .controller('AboutCtrl', function ($scope) {


  })
  .controller('SplashCtrl', function ($scope, $ionicSlideBoxDelegate) {
    $scope.nextSlide = function () {
      $ionicSlideBoxDelegate.next();
    }

  })
  .controller('TermsCtrl', function ($scope) {


  })
  .controller('ProfileCtrl', function ($scope, $cordovaCamera, $ionicActionSheet, $cordovaFileTransfer, $ionicPopup, MyServices, $cordovaImagePicker) {
    $scope.profilepic = {};
    var profile = $.jStorage.get('profile');
    $scope.id = profile.id;
    MyServices.profile($scope.id, function (data) {
      console.log(data);
      $scope.data = data;
    });
    $scope.update = function (formdata) {
      console.log(formdata);
      $scope.data.id = $scope.id;
      $scope.data = formdata;
      MyServices.updateprofile($scope.data, function (data) {
        console.log(data);
        $scope.data = data;
        if (data.status === "Update Success") {
          $scope.showAlert();
          MyServices.profile($scope.id, function (data) {
            console.log(data);
            $scope.data = data;
          });
        }

      });
    }
    $scope.showActionsheet = function () {
      $ionicActionSheet.show({
        //  titleText: 'choose option',
        buttons: [{
          text: '<i class="icon ion-close"></i> Remove'
        }, {
          text: '<i class="icon ion-ios-camera-outline"></i> Choose from gallery'
        }, {
          text: '<i class="icon ion-images"></i> Take from camera'
        }, ],
        //  destructiveText: 'Delete',
        cancelText: 'Cancel',
        cancel: function () {
          console.log('CANCELLED');
        },
        buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index);
          if (index == 0) {
            $scope.remove();
          } else if (index == 1) {
            $scope.getImageSaveContact();
          } else {
            $scope.openCamera();
          }
          return true;
        },
        destructiveButtonClicked: function () {
          console.log('DESTRUCT');
          return true;
        }
      });
    };
    $scope.remove = function () {
      var profile = $.jStorage.get('profile');
      $scope.id = profile.id;
      $scope.data.id = profile.id;
      $scope.data.image = "http://ilead.mypride.co.in/ProfilePics/201703301054044284_ProfileDummy.png";
      MyServices.updateprofile($scope.data, function (data) {
        $scope.pic = data;
        $scope.id = profile.id;
        MyServices.profile($scope.id, function (data) {
          console.log(data);
          $scope.data = data;
        });
      });
    };
    //take image from camera --------------------------------------------------------
    $scope.openCamera = function () {
      var cameraOptions = {
        quality: 90,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: 0,
        targetWidth: 1200,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation: true
      };
      $cordovaCamera.getPicture(cameraOptions).then(function (imageData) {
        $scope.imageSrc = "data:image/jpeg;base64," + imageData;
        console.log($scope.imageSrc);
        $scope.uploadImage($scope.imageSrc);
      }, function (err) {

        console.log(err);
      });
    };
    //cordovaImagePicker function------------------------------------------------------
    $scope.getImageSaveContact = function () {
      // Image picker will load images according to these settings
      var options = {
        maximumImagesCount: 1, // Max number of selected images
        width: 800,
        height: 800,
        quality: 80 // Higher is better
      };
      $cordovaImagePicker.getPictures(options).then(function (results) {
        console.log(results);
        $scope.uploadImage(results[0]);
      }, function (error) {
        console.log('Error: ' + JSON.stringify(error)); // In case of error
      });
    };


    $scope.uploadImage = function (imageURI) {
      console.log('imageURI', imageURI);
      $cordovaFileTransfer.upload(adminurl + 'UpdateProfilePic', imageURI)
        .then(function (result) {

          result.response = JSON.parse(result.response);
          console.log(result.response.image);
          var profile = $.jStorage.get('profile');
          $scope.id = profile.id;
          $scope.data.id = profile.id;
          $scope.data.image = result.response.image;
          MyServices.updateprofile($scope.data, function (data) {
            console.log(data);
            MyServices.profile($scope.id, function (data) {
              console.log(data);
              $scope.data = data;

            });
          });
          // result.response = JSON.parse(result.response);
          // console.log(result.response.data[0]);
        }, function (err) {
          // Error
        }, function (progress) {
          // constant progress updates
        });
    };

    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Thank you',
        template: 'Your profile has updated successfully.'
      });

      alertPopup.then(function (res) {

        //  console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
  })
  .controller('ManagementCtrl', function ($scope) {


  })
  .controller('ContactCtrl', function ($scope, MyServices, $ionicPopup, $state) {
    $scope.contactForm = {};
    var profile = $.jStorage.get('profile');
    $scope.contactForm.id = profile.id;
    $scope.name = profile.name;

    $scope.showAlert = function (title, template) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: template
      });
      alertPopup.then(function (res) {

      });
    };
    $scope.contactus = function (contactForm) {
      console.log("contactForm", contactForm)
      MyServices.contactus(contactForm, function (data) {
        console.log(data);
        if (data.status === "SUCCESS") {
          $scope.showAlert("Feedback Success", "Thank you for your Feedback");
        } else {
          $scope.showAlert("Feedback Failed", "Sorry ! We din\'t recieve your Feedback");
        }
      });

    };


  })
  .controller('RewardCategoryCtrl', function ($scope, MyServices) {

    var profile = $.jStorage.get('profile');
    $scope.catlougeId0 = profile.catalogueId;
    console.log('$scope.catlougeId0', $scope.catlougeId0);
    var id = {
      id: profile.id
    };
    MyServices.rewardcategory(id, function (data) {
      console.log(data);
      $scope.getRewardCatData = data;
      //  $scope.getRewardCatData = data[0];
      //  $scope.getRewardCategoryData = data.slice(1);
      //  $scope.getRewardCategoryData = _.chunk($scope.getRewardCategoryData,2);
    });
  })

.controller('KpiCtrl', function ($scope, $stateParams, MyServices) {
  $scope.getData = [];
  var id = {
    id: $.jStorage.get("profile").id
  };
  console.log(id);
  MyServices.kpis(id, function (data) {
    console.log(data);
    $scope.getData = data;

    $scope.shownGroup = $scope.getData[0];
    console.log($scope.shownGroup);
  });

  $scope.toggleGroup = function (group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function (group) {
    return $scope.shownGroup === group;
  };

  // var id ={id:$stateParams.id};


})

.controller('MyCartCtrl', function ($scope) {

})

.controller('ShippingDetailsCtrl', function ($scope) {

})

.controller('ConfirmOrderCtrl', function ($scope) {

})

.controller('OtpValidationCtrl', function ($scope) {

})

.controller('PerformanceCtrl', function ($scope, $stateParams, MyServices) {
  $scope.getData = [];
  var id = {
    id: $.jStorage.get("profile").id
  };
  console.log(id);
  MyServices.performance(id, function (data) {
    console.log(data);
    $scope.getData = data;
    //  var q1 = $scope.getData.Quarters.Quarter1;
    var enroll = {
      "kpiID": 1,
      "KpiDesc": "Enrollment Bonus",
      "performance": {
        "month1": "-",
        "month2": "-",
        "month3": "-",
        "quarter": "0"
      },
      "Score": {
        "month1": 250,
        "month2": 0,
        "month3": 0,
        "quarter": 0
      }
    };
    //for static enroll
    $scope.getData.Quarters.Quarter1.unshift(enroll);
    //  console.log(q1);
    $scope.shownGroup = $scope.getData.Quarters.Quarter1;
    $scope.shownGroupIn = $scope.getData.Quarters.Quarter1[0];
    console.log($scope.shownGroup);
  });

  $scope.toggleGroup = function (group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function (group) {
    return $scope.shownGroup === group;
  };
  $scope.toggleGroupIn = function (groupIn) {
    if ($scope.isGroupShownIn(groupIn)) {
      $scope.shownGroupIn = null;
    } else {
      $scope.shownGroupIn = groupIn;
    }
  };
  $scope.isGroupShownIn = function (groupIn) {
    return $scope.shownGroupIn === groupIn;
  };
  // var id ={id:$stateParams.id};


})

.controller('RewardCtrl', function ($scope, $stateParams, MyServices, $state) {
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  }
  $scope.setColor = function () {

    }
    // $scope.groups = [];
    // var id ={id:$stateParams.id};
  console.log('ffffffffffffffffffffff', $stateParams.catalogueId);
  var profile = $.jStorage.get('profile');

  var dataToSend = {
    catalogueId: $stateParams.catalogueId,
    categoryId: $stateParams.categoryId,
    filterId: $stateParams.filterId
  };
  MyServices.reward(dataToSend, function (data) {
    console.log(data);
    $scope.getRewardData = data;
    $scope.getRewardData = _.chunk(data, 2);
  });
  $scope.toggleGroup = function (group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function (group) {
    return $scope.shownGroup === group;
  };
  $scope.goFilter = function () {
      $state.go('app.filter-reward', {
        catalogueId: $stateParams.catalogueId,
        categoryId: $stateParams.categoryId
      });
    }
    // var id ={id:$stateParams.id};
    //  MyServices.rewardcategory(dataToSend, function(data) {
    //     console.log(data);
    //     $scope.getData = data;
    //
    // });
});
