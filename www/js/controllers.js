angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices, $state) {
  // $scope.profile = $.jStorage.get('profile');

})

.controller('LoginCtrl', function($scope, MyServices, $state, $ionicPopup) {
    $scope.loginData = {};
    $scope.profile = $.jStorage.get('profile');
    $scope.submitLoginForm = function(userdata) {
      MyServices.login(userdata, function(data) {
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
  .controller('TotalPointCtrl', function($scope, $stateParams, MyServices) {
    // $.jStorage.set('id',$stateParams.id);
    // var id ={id:$stateParams.id};
    var profile = $.jStorage.get('profile');
    var id = profile.id;
    $scope.profile = $.jStorage.get('profile');
    MyServices.profile(id, function(data) {
      console.log(data);
      $scope.getData = data;

    });
  })
  .controller('FilterRewardCtrl', function($scope, $stateParams, MyServices) {
    $scope.profile = $.jStorage.get('profile');
    var profile = $.jStorage.get('profile');
    $scope.catlougeIdFilter = $stateParams.catalogueId;
    $scope.categoryIdFilter = $stateParams.categoryId;
    var dataToSend = {
      catalogueId: $stateParams.catalogueId,
      categoryId: $stateParams.categoryId
    };

    MyServices.filters(dataToSend, function(data) {
      console.log(data);
      $scope.getfliter = data;
      $scope.getfliter = _.chunk(data, 2);
    });
  })
  .controller('HomeMenuCtrl', function($scope, $state) {
    var profile = $.jStorage.get('profile');
    $scope.profile = $.jStorage.get('profile');
    $scope.getID = profile.id;
    $scope.designation = profile.designation;
    $scope.logout = function() {
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
  .controller('AboutCtrl', function($scope) {

    $scope.profile = $.jStorage.get('profile');

  })
  .controller('ProductDetailCtrl', function($scope, $stateParams, $state, MyServices, $ionicPopup) {
    $scope.profile = $.jStorage.get('profile');

    console.log($scope.productId);
    var profile = $.jStorage.get('profile');
    $scope.detail = {};
    $scope.detail.productId = $stateParams.productId;
    $scope.detail.id = profile.id;
    $scope.detail.sessionId = profile.sessionId;

    $scope.showAlert = function(text, state, title) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: text
      });

      alertPopup.then(function(res) {
        $state.go(state);
        //  console.log('Thank you for not eating my delicious ice cream cone');
      });
    };


    MyServices.productdetails($scope.detail, function(data) {
      console.log(data);
      $scope.productdata = data;
    });
    $scope.addToCart = function() {
      MyServices.addtocart($scope.detail, function(data) {
        console.log(data);
        if (data.status == 'OK') {
          $state.go('app.mycart');
        } else if (data.status == 'INVALID DATA') {
          $.jStorage.set('profile', null);
          $.jStorage.deleteKey('profile');
          $.jStorage.flush();
          $scope.showAlert(data.status, 'login', 'Error');
        } else {
          $scope.showAlert(data.status, 'app.mycart', 'Error Message');
        }

      });
    }


  })
  .controller('SplashCtrl', function($scope, $ionicSlideBoxDelegate) {
    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    }

  })
  .controller('TermsCtrl', function($scope) {

    $scope.profile = $.jStorage.get('profile');

  })
  .controller('ProfileCtrl', function($scope, $cordovaCamera, $ionicActionSheet, $cordovaFileTransfer, $ionicPopup, MyServices, $cordovaImagePicker) {
    $scope.profilepic = {};
    $scope.profile = $.jStorage.get('profile');
    var profile = $.jStorage.get('profile');
    $scope.id = profile.id;
    MyServices.profile($scope.id, function(data) {
      console.log(data);
      $scope.data = data;
    });
    $scope.update = function(formdata) {
      console.log(formdata);
      $scope.data.id = $scope.id;
      $scope.data = formdata;
      MyServices.updateprofile($scope.data, function(data) {
        console.log(data);
        $scope.data = data;
        if (data.status === "Update Success") {
          $scope.showAlert();
          MyServices.profile($scope.id, function(data) {
            console.log(data);
            $scope.data = data;
          });
        }

      });
    }
    $scope.showActionsheet = function() {
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
        cancel: function() {
          console.log('CANCELLED');
        },
        buttonClicked: function(index) {
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
        destructiveButtonClicked: function() {
          console.log('DESTRUCT');
          return true;
        }
      });
    };
    $scope.remove = function() {
      var profile = $.jStorage.get('profile');
      $scope.id = profile.id;
      $scope.data.id = profile.id;
      $scope.data.image = "http://ilead.mypride.co.in/ProfilePics/201703301054044284_ProfileDummy.png";
      MyServices.updateprofile($scope.data, function(data) {
        $scope.pic = data;
        $scope.id = profile.id;
        MyServices.profile($scope.id, function(data) {
          console.log(data);
          $scope.data = data;
        });
      });
    };
    //take image from camera --------------------------------------------------------
    $scope.openCamera = function() {
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
      $cordovaCamera.getPicture(cameraOptions).then(function(imageData) {
        $scope.imageSrc = "data:image/jpeg;base64," + imageData;
        console.log($scope.imageSrc);
        $scope.uploadImage($scope.imageSrc);
      }, function(err) {

        console.log(err);
      });
    };
    //cordovaImagePicker function------------------------------------------------------
    $scope.getImageSaveContact = function() {
      // Image picker will load images according to these settings
      var options = {
        maximumImagesCount: 1, // Max number of selected images
        width: 800,
        height: 800,
        quality: 80 // Higher is better
      };
      $cordovaImagePicker.getPictures(options).then(function(results) {
        console.log(results);
        $scope.uploadImage(results[0]);
      }, function(error) {
        console.log('Error: ' + JSON.stringify(error)); // In case of error
      });
    };


    $scope.uploadImage = function(imageURI) {
      console.log('imageURI', imageURI);
      $cordovaFileTransfer.upload(adminurl + 'UpdateProfilePic', imageURI)
        .then(function(result) {

          result.response = JSON.parse(result.response);
          console.log(result.response.image);
          var profile = $.jStorage.get('profile');
          $scope.id = profile.id;
          $scope.data.id = profile.id;
          $scope.data.image = result.response.image;
          MyServices.updateprofile($scope.data, function(data) {
            console.log(data);
            MyServices.profile($scope.id, function(data) {
              console.log(data);
              $scope.data = data;

            });
          });
          // result.response = JSON.parse(result.response);
          // console.log(result.response.data[0]);
        }, function(err) {
          // Error
        }, function(progress) {
          // constant progress updates
        });
    };

    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Thank you',
        template: 'Your profile has updated successfully.'
      });

      alertPopup.then(function(res) {

        //  console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
  })
  .controller('ManagementCtrl', function($scope) {
    $scope.profile = $.jStorage.get('profile');


  })
  .controller('ContactCtrl', function($scope, MyServices, $ionicPopup, $state) {
    $scope.contactForm = {};
    var profile = $.jStorage.get('profile');
    $scope.contactForm.id = profile.id;
    $scope.name = profile.name;
    $scope.profile = $.jStorage.get('profile');

    $scope.showAlert = function(title, template) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: template
      });
      alertPopup.then(function(res) {

      });
    };
    $scope.contactus = function(contactForm) {
      console.log("contactForm", contactForm)
      MyServices.contactus(contactForm, function(data) {
        console.log(data);
        if (data.status === "SUCCESS") {
          $scope.showAlert("Feedback Success", "Thank you for your Feedback");
        } else {
          $scope.showAlert("Feedback Failed", "Sorry ! We din\'t recieve your Feedback");
        }
      });

    };


  })
  .controller('RewardCategoryCtrl', function($scope, MyServices) {
    $scope.profile = $.jStorage.get('profile');

    var profile = $.jStorage.get('profile');
    $scope.catlougeId0 = profile.catalogueId;
    console.log('$scope.catlougeId0', $scope.catlougeId0);
    var id = {
      id: profile.id
    };
    MyServices.rewardcategory(id, function(data) {
      console.log(data);
      $scope.getRewardCatData = data;
      //  $scope.getRewardCatData = data[0];
      //  $scope.getRewardCategoryData = data.slice(1);
      //  $scope.getRewardCategoryData = _.chunk($scope.getRewardCategoryData,2);
    });
  })

.controller('KpiCtrl', function($scope, $stateParams, MyServices) {
  $scope.getData = [];
  $scope.profile = $.jStorage.get('profile');

  var id = {
    id: $.jStorage.get("profile").id
  };
  console.log(id);
  MyServices.kpis(id, function(data) {
    console.log(data);
    $scope.getData = data;

    $scope.shownGroup = $scope.getData[0];
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

  // var id ={id:$stateParams.id};


})

.controller('MyCartCtrl', function($scope, MyServices, $state, $ionicPopup) {
  console.log($scope.productId);
  var profile = $.jStorage.get('profile');
  $scope.detail = {};
  $scope.detail.id = profile.id;
  $scope.detail.sessionId = profile.sessionId;
  $scope.quantity = [1, 2, 3, 4, 5];
  $scope.profile = $.jStorage.get('profile');

  $scope.showAlert = function(text, state, title) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: text
    });

    alertPopup.then(function(res) {
      $state.go(state);
      MyServices.cart($scope.detail, function(data) {
        console.log(data);
        $scope.cart = data;
        $scope.grandTotal = 0;

        _.forEach($scope.cart, function(value) {
          $scope.grandTotal = $scope.grandTotal + (value.points * value.quantity);

        });
      });
    });
  };


  MyServices.cart($scope.detail, function(data) {
    console.log(data);
    $scope.cart = data;
    $scope.grandTotal = 0;

    _.forEach($scope.cart, function(value) {
      $scope.grandTotal = $scope.grandTotal + (value.points * value.quantity);

    });
  });
  $scope.updateqty = function(carts) {
    $scope.update = {};
    $scope.update.cartId = carts.cartId;
    $scope.update.qty = carts.quantity;
    MyServices.updateqty($scope.update, function(data) {
      console.log(data);
      if (data.status == 'UPDATE SUCCESS') {
        MyServices.cart($scope.detail, function(data) {
          console.log(data);
          $scope.cart = data;
          $scope.grandTotal = 0;

          _.forEach($scope.cart, function(value) {
            $scope.grandTotal = $scope.grandTotal + (value.points * value.quantity);

          });

        });
      } else if (data.status == ' STOCK EXCEEDED') {

        $scope.showAlert(data.status, 'app.mycart', 'Error');
      } else {
        $scope.showAlert(data.status, 'app.mycart', 'Error Message');
      }

    });
  }
  $scope.deletecartitem = function(carts) {
    var profile = $.jStorage.get('profile');
    $scope.delete = {};
    $scope.delete.sessionId = profile.sessionId;
    $scope.delete.cartId = carts.cartId;

    MyServices.deletecartitem($scope.delete, function(data) {
      console.log(data);
      if (data.status == 'OK') {
        MyServices.cart($scope.detail, function(data) {
          console.log(data);
          $scope.cart = data;
          $scope.grandTotal = 0;

          _.forEach($scope.cart, function(value) {
            $scope.grandTotal = $scope.grandTotal + (value.points * value.quantity);

          });
        });
      } else {
        $.jStorage.set('profile', null);
        $.jStorage.deleteKey('profile');
        $.jStorage.flush();
        $scope.showAlert(data.status, 'login', 'Error');
      }

    });
  }

})

.controller('ShippingDetailsCtrl', function($scope, MyServices, $state, $ionicPopup) {
  var profile = $.jStorage.get('profile');
  $scope.shipping = {};
  $scope.shipping.id = profile.id;
  $scope.shipping.sessionId = profile.sessionId;
  $scope.profile = $.jStorage.get('profile');

  $scope.showAlert = function(text, state, title) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: text
    });

    alertPopup.then(function(res) {
      $state.go(state);
    });
  };
  MyServices.shippingdetails($scope.shipping, function(data) {
    console.log(data);
    $scope.shipping = data;
    $scope.shipping.sessionId = profile.sessionId;
  });
  $scope.addshipping = function() {
    MyServices.addshipping($scope.shipping, function(data) {
      console.log(data);
      if (data.status == "OK") {
        $state.go('app.confirmorder');
      } else {
        $.jStorage.set('profile', null);
        $.jStorage.deleteKey('profile');
        $.jStorage.flush();
        $scope.showAlert(data.status, 'login', 'Error Message');
      }
    });
  }

})

.controller('ConfirmOrderCtrl', function($scope, MyServices, $ionicPopup, $state) {
  var profile = $.jStorage.get('profile');
  $scope.confirm = {};
  $scope.confirm.id = profile.id;
  $scope.confirm.sessionId = profile.sessionId;
  $scope.userotp = "";
  $scope.otpValidate = true;
  $scope.profile = $.jStorage.get('profile');

  $scope.showAlert = function(text, state, title) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: text
    });

    alertPopup.then(function(res) {
      $state.go(state);
    });
  };
  MyServices.summary($scope.confirm, function(data) {
    console.log(data);
    $scope.confirm = data;
    $scope.details = data.shipping;
    $scope.confirm.sessionId = profile.sessionId;
    $scope.grandTotal = 0;
    _.forEach($scope.confirm.items, function(value) {
      $scope.grandTotal = $scope.grandTotal + (value.points * value.quantity);

    });
  });
  $scope.otpGet = function() {
    $scope.otp = {};
    $scope.otp.id = profile.id;
    $scope.otpDetail = {};
    MyServices.otp($scope.otp, function(data) {
      $scope.otpDetail = data;
      console.log(data, $scope.otpDetail);

      if (data.status == "SUCCESS") {
        $scope.otpValidate = false;
      } else {
        $scope.otpValidate = true;
      }
    });
  }
  $scope.transaction = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Get OTP',
      cssClass: 'confirmOTP',

      buttons: [{
        text: '<button class="confirmOTP" ng-click="otpGet()">Click here to generate OTP</button>',
        onTap: function(e) {
          $scope.otpGet();
        }
      }]
    });
    alertPopup.then(function(res) {});
  }
  $scope.validotp = function(userotp) {
    console.log(userotp, $scope.otpDetail.otp);
    $scope.userotp = userotp;
    if (_.isEqual($scope.otpDetail.otp, userotp)) {
      // if ($scope.otpDetail.otp===userotp) {
      $scope.place = {};
      $scope.place.grandtotal = $scope.grandTotal;
      $scope.place.id = profile.id;
      $scope.place.sessionId = profile.sessionId;
      MyServices.placeorder($scope.place, function(data) {
        console.log(data);
        if (data.status == 'ORDER SUCCESS') {
          var profile = $.jStorage.get('profile');
          profile.points = data.balance;
          $.jStorage.set('profile', profile);
          $scope.showAlert('Thank you for placing the Order.Your order has been successfully placed', 'app.reward-category', 'SUCCESS');
        } else if (data.status == 'ORDER FAILURE') {

          $scope.showAlert(data.status, 'app.mycart', 'Error FAILURE');
        } else if (data.status == 'INSUFFICIENT BALANCE') {
          $scope.showAlert(data.status, 'app.mycart', 'Error Message');
        }
      });
    } else {
      $scope.showAlert('You have entered wrong otp', 'app.confirmorder', 'Wrong otp');
    }
  }
})

.controller('OtpValidationCtrl', function($scope) {
  $scope.profile = $.jStorage.get('profile');

})

.controller('PerformanceCtrl', function($scope, $stateParams, MyServices) {
  $scope.getData = [];
  var id = {
    id: $.jStorage.get("profile").id
  };
  $scope.profile = $.jStorage.get('profile');

  console.log(id);
  MyServices.performance(id, function(data) {
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
  $scope.toggleGroupIn = function(groupIn) {
    if ($scope.isGroupShownIn(groupIn)) {
      $scope.shownGroupIn = null;
    } else {
      $scope.shownGroupIn = groupIn;
    }
  };
  $scope.isGroupShownIn = function(groupIn) {
    return $scope.shownGroupIn === groupIn;
  };
  // var id ={id:$stateParams.id};


})

.controller('RewardCtrl', function($scope, $stateParams, MyServices, $state) {
  $scope.goBackHandler = function() {
    window.history.back(); //This works
  }
  $scope.profile = $.jStorage.get('profile');

  $scope.setColor = function() {

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
  MyServices.reward(dataToSend, function(data) {
    console.log(data);
    $scope.getRewardData = data;
    $scope.getRewardData = _.chunk(data, 2);
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
  $scope.goFilter = function() {
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
