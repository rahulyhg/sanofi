angular.module('starter.controllers', ['ngCordova','ionic', 'ionic-ratings'])

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
  .controller('TotalPointCtrl', function($scope, $stateParams, MyServices, $state) {
    // $.jStorage.set('id',$stateParams.id);
    // var id ={id:$stateParams.id};
    var profile = $.jStorage.get('profile');
   console.log("pendingshow",  profile.pending_feedbacks.length)
    var id = profile.id;
    $scope.profile = $.jStorage.get('profile');
    MyServices.profile(id, function(data) {
      console.log(data);
      $scope.getData = data;

    });
    $scope.pendingFeedbacks= function(){
      if (profile.pending_feedbacks.length == 0){
        $state.go('home-menu')

      }else{
        $state.go('app.feedback')
      }
    }
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
  .controller('HomeMenuCtrl', function($scope, $state, $ionicPlatform) {

    $ionicPlatform.registerBackButtonAction(function (e) {
      if ($state.current.name == 'home-menu') {
        ionic.Platform.exitApp();
      } else {
        event.preventDefault();
      }
    }, 401);
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

    .controller('PerformersCtrl', function($scope, $ionicSlideBoxDelegate, MyServices, $timeout) {
      $scope.profile = $.jStorage.get('profile');




    $scope.closePopup = function () {
      $scope.show.close();
    };
    $scope.lockSlide = function () {
      $ionicSlideBoxDelegate.enableSlide(false);
    };
    $scope.myActiveSlide = 0;

    $scope.slidePrevious = function (text) {

      $ionicSlideBoxDelegate.$getByHandle(text).previous();
    };

    $scope.slideNext = function (text) {

      $ionicSlideBoxDelegate.$getByHandle(text).next();
     
    };

$scope.slideHasChanged = function(index) {
      $ionicSlideBoxDelegate.cssClass = 'fade-in'
    $scope.slideIndex = index;
    if ( ($ionicSlideBoxDelegate.count() -1 ) == index ) {
        $timeout(function(){
            $ionicSlideBoxDelegate.slide(0);

        },$scope.interval);
    }
};
$scope.interval = 2000;

$scope.homeSlider = {};
    $scope.homeSlider.data = [];
    $scope.homeSlider.currentPage = 0;
  $scope.setupSlider = function () {

      //some options to pass to our slider
      $scope.homeSlider.sliderOptions = {
        initialSlide: 0,
        direction: 'horizontal', //or vertical
        speed: 300,
        
        autoplay:"5000",
        effect: 'fade',
        
      };


      //create delegate reference to link with slider
      $scope.homeSlider.sliderDelegate = null;

      //watch our sliderDelegate reference, and use it when it becomes available
      $scope.$watch('homeSlider.sliderDelegate', function (newVal, oldVal) {
        if (newVal != null) {
          $scope.homeSlider.sliderDelegate.on('slideChangeEnd', function () {
            $scope.homeSlider.currentPage = $scope.homeSlider.sliderDelegate.activeIndex;
            //use $scope.$apply() to refresh any content external to the slider
            $scope.$apply();
          });
        }
      });
    };

    $scope.setupSlider();

    

  //detect when sliderDelegate has been defined, and attatch some event listeners
  $scope.$watch('sliderDelegate', function(newVal, oldVal){
    if(newVal != null){ 
      $scope.sliderDelegate.on('slideChangeEnd', function(){
        console.log('updated slide to ' + $scope.sliderDelegate.activeIndex);
        $scope.$apply();
      });
    }
  });

    MyServices.TopPerformer({},function(data) {
            console.log(data);
            $scope.performer = data;
            console.log("hello",$scope.performer.ff);
            $ionicSlideBoxDelegate.update();
          });
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


.controller('FeedbackCtrl', function($scope, $ionicSlideBoxDelegate, MyServices, $ionicPopup, $state) {
  $scope.myTitle = 'IONIC RATINGS DEMO';
  // $scope.profile.pending_feedbacks = ['2567'];
    $scope.ratingsObject = {
      iconOn: 'ion-ios-star', //Optional
      iconOff: 'ion-ios-star-outline', //Optional
      iconOnColor: 'rgb(000, 000, 000)', //Optional
      iconOffColor: 'rgb(000, 000, 000)', //Optional
      rating: 0, //Optional
      minRating: 0, //Optional
      readOnly: false, //Optional
      callback: function(rating, index) { //Mandatory    
        $scope.ratingsCallback(rating, index);
       
      }
      
    };
    $scope.ratingsCallback = function(rating, index) {
      console.log('Selected rating is : ', rating, ' and index is ', index);
      $scope.answers.qa3.answer = rating
      console.log("hello0", $scope.answers)
    };

    $scope.ratingsObject1 = {
      iconOn: 'ion-ios-star', //Optional
      iconOff: 'ion-ios-star-outline', //Optional
      iconOnColor: 'rgb(000, 000, 000)', //Optional
      iconOffColor: 'rgb(000, 000, 000)', //Optional
      rating: 0, //Optional
      minRating: 0, //Optional
      readOnly: false, //Optional
      callback: function(rating, index) { //Mandatory    
        $scope.ratingsCallback1(rating, index);
       
      }
      
    };
  
    $scope.ratingsCallback1 = function(rating, index) {
      console.log('Selected rating is : ', rating, ' and index is ', index);
      $scope.answers.qa4.answer = rating
      console.log("hello1", $scope.answers)
    };
  
  
  $scope.profile = $.jStorage.get('profile')
  //  $scope.profile.pending_feedbacks = ['2168'];
  console.log('fedup',$scope.profile)
  $scope.pendingfeedback = {}
  $scope.pendingfeedback.id = $scope.profile.id;
  $scope.pendingfeedback.orderid = $scope.profile.pending_feedbacks[0];
  console.log("pendingobject", $scope.pendingfeedback)
  MyServices.getpendingclaims($scope.pendingfeedback, function(data) {
    console.log(data);
    $scope.getpendingDetails = data;
    $scope.answers = data;
  });

  $scope.textare=function(){
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
  }
//  $scope.feedback = {
//     "orderid": "112,113",
//     "id": 12345,
//     "items": [
//         {
//             "orderid": 112,
//             "productId": 565,
//             "question": "How did you find the quality of the reward Iphone7s item delivered?",
//             "answer": null,
//             "comments": null
//         },
//         {
//             "orderid": 113,
//             "productId": 565,
//             "question": "How did you find the quality of the reward Samsung Galaxy J7 item delivered?",
//             "answer": null,
//             "comments": null
//         }
 
//     ],
//     "qa2": {
//         "question": "How many days did the redemption process take? (Time taken from the day you booked the reward item to the day the reward item was delivered)",
//         "answer": null
//     },
//     "qa3": {
//         "question": "How would you rate the overall Redemption Process?",
//         "answer": null
//     },
//     "qa4": {
//         "question": "How would you rate the overall Reward Program (i-Lead)?",
//         "answer": null
//     },
//     "status": "OK"
// }

// $scope.option={
//   "excellent": "Excellent",
//   "good": "Good",
//   "satisfactory": "satisfactory",
//   "unsatisfactory": "unsatisfactory"
// }


$scope.sendReview= function(index,answer,type) {
  console.log("sendreview",answer)
  console.log("sendreview",type)
if(type=='orderid'){
  $scope.answers.items[index].answer = answer
}else if(type=='qa2'){
  $scope.answers.qa2.answer = answer
}else{
  console.log('error')
}
  
$scope.checkFormStatus= function(formobject){
  // console.log("helloanswer",formobject)
  var checkMe=false;
  for(i=0;i<formobject.items.length;i++){
    console.log("helloanswer",formobject.items[i])
  if(formobject.items[i].answer == 'Unsatisfactory'  && formobject.items[i].comments == null  ){
    checkMe=false
  }else{
    checkMe=true
}
  }
  if(checkMe==true){
    MyServices.getpendingresponse(formobject, function(data) {
      console.log("unsatisfactory",formobject)
      if(data.status=='OK'){
        $scope.pendingfeedbackpop = data;
        // $.jStorage.get('profile').pending_feedbacks= null
        // console.log("kemcho",$.jStorage.get('profile'))
        // var userProfiw
        // $.jStorage.set('profile').pending_feedbacks = [];
        // console.log("kemcho",$.jStorage.get('profile'))
        $scope.profile.pending_feedbacks = $scope.pendingfeedbackpop.pending_feedbacks;
        $.jStorage.set('profile', $scope.profile);
        // $.jStorage.set('profile').pending_feedbacks.push($scope.pendingfeedbackpop.pending_feedbacks);
        console.log('showme',$scope.profile)
        if (data.pending_feedbacks.length!=0){
        var alertPopup = $ionicPopup.alert({
          
          cssClass: 'removedpopup',
          title: 'You have successfully sent your feedback.',
      
        });
      
        alertPopup.then(function (res) {
          console.log("notworking")
            window.location.reload(); 
            
        });
      }else{
        var alertPopup = $ionicPopup.alert({
          
          cssClass: 'removedpopup',
          title: 'You have successfully sent your feedback.',
      
        });
        alertPopup.then(function (res) {
          console.log("notworking")
            $state.go('home-menu')
            
        });
      }
      }else{
        var alertPopup = $ionicPopup.alert({
          
          cssClass: 'removedpopup',
          title: 'Sorry, internal error occurred. Please try again after sometime.',
      
        });
      
        alertPopup.then(function (res) {
          
          window.location.reload();
        });
      }
      console.log('showme',$scope.profile)
      console.log(data);
      // $scope.getpendingDetails = data;
      // $scope.answers = data;
    });
  }
  else{
    var alertPopup = $ionicPopup.alert({
      cssClass: 'removedpopup',
      title: 'Please Enter The Feedback',
    });
  
    alertPopup.then(function (res) {
      console.log("notworking")
    });
  }
}
  console.log("response", $scope.answers)
}
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
